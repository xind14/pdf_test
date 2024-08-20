import os
import pymupdf  # Import PyMuPDF for PDF manipulation
from rest_framework import viewsets
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from .models import UserInfo
from .serializers import UserInfoSerializer

class UserInfoViewSet(viewsets.ModelViewSet):
    # Define the queryset and serializer for the UserInfo model
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

def replace_text_in_pdf(template_path, output_path, replacements):
    # Open the PDF template for editing
    pdf_document = pymupdf.open(template_path)
    
    # Define adjustments for each placeholder if needed
    placeholder_adjustments = {
        'DadFirst': (5, 18),  # Adjust coordinates for 'DadFirst'
        'DadAddress': (-100, 20),  # Adjust coordinates for 'DadAddress'
        # Add more placeholders and their adjustments as needed
    }
    
    # Define the expansion amount for the top of the redaction area
    top_expansion = 10  # Increase this value to make the redaction area larger at the top

    # Iterate through each page in the PDF
    for page_number in range(len(pdf_document)):
        page = pdf_document[page_number]
        
        # Replace placeholders with user-provided values
        for placeholder, replacement in replacements.items():
            text_instances = page.search_for(placeholder)  # Find all instances of the placeholder
            for inst in text_instances:
                x0, y0, x1, y1 = inst  # Coordinates of the placeholder
                
                # Expand the redaction area only at the top
                y0 -= top_expansion
                
                # Redact the placeholder text by adding a white annotation over it
                page.add_redact_annot([x0, y0, x1, y1], fill=(1, 1, 1))  # White out the text
                page.apply_redactions()  # Apply the redaction changes

                # Retrieve adjustments for the current placeholder
                x_adjustment, y_adjustment = placeholder_adjustments.get(placeholder, (0, 0))
                
                # Overlay the replacement text at the adjusted coordinates
                page.insert_text(
                    (x0 + x_adjustment, y0 + y_adjustment),
                    replacement,
                    fontsize=12,  # Ensure the fontsize matches the original text
                    color=(0, 0, 0)  # Ensure the color matches the original text
                )

    # Save the updated PDF to the specified output path
    pdf_document.save(output_path)
    pdf_document.close()

def generate_pdf(request, pk):
    # Retrieve the user information based on the primary key
    userinfo = get_object_or_404(UserInfo, pk=pk)

    # Define the path to the template PDF and the output path for the generated PDF
    template_path = os.path.join(settings.BASE_DIR, 'templates/Legitimation.pdf')
    output_path = os.path.join(settings.MEDIA_ROOT, f'user_{pk}.pdf')

    # Define the replacements for placeholders in the PDF
    replacements = {
        'DadFirst': userinfo.name,
        'DadAddress': userinfo.address,
        # Add more replacements as needed
    }

    # Replace placeholders in the PDF and save the updated file
    replace_text_in_pdf(template_path, output_path, replacements)

    # Serve the generated PDF to the user via HTTP response
    with open(output_path, 'rb') as pdf_file:
        response = HttpResponse(pdf_file.read(), content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="user_{pk}.pdf"'
        return response
