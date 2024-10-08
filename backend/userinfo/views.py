# from rest_framework import viewsets
# from .models import UserInfo
# from .serializers import UserInfoSerializer

# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas
# from django.http import HttpResponse
# from .models import UserInfo

# class UserInfoViewSet(viewsets.ModelViewSet):
#     queryset = UserInfo.objects.all()
#     serializer_class = UserInfoSerializer


# def generate_pdf(request, pk):
#     userinfo = UserInfo.objects.get(pk=pk)
#     response = HttpResponse(content_type='application/pdf')
    # response['Content-Disposition'] = f'attachment; filename="{userinfo.name}.pdf"'
    # response['Content-Disposition'] = f'inline; filename="user_{id}.pdf"'


    # p = canvas.Canvas(response, pagesize=letter)
    # p.drawString(100, 750, f'Name: {userinfo.name}')
    # p.drawString(100, 725, f'Age: {userinfo.age}')
    # p.drawString(100, 700, f'Address: {userinfo.address}')
    # p.showPage()
    # p.save()

    # return response

from rest_framework import viewsets
from .models import UserInfo, Question
from .serializers import UserInfoSerializer, QuestionSerializer
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from django.shortcuts import get_object_or_404


class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
def generate_pdf(request, pk):
    userinfo = get_object_or_404(UserInfo, pk=pk)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="user_{pk}.pdf"'

    # Create a PDF
    p = canvas.Canvas(response, pagesize=letter)
    width, height = letter

    # Starting position
    y_position = height - 100

    # Adding static text and placeholders for form fields
    p.setFont("Helvetica", 12)
    p.drawString(100, y_position, "This agreement is made between this law firm and")
    
    # Position for CLIENT NAME
    p.acroForm.textfield(name='name', tooltip='Name', x=370, y=y_position - 2, width=150, height=20, value=userinfo.name)
    y_position -= 20
    
    # Continuing text
    p.drawString(100, y_position, "residing at")
    
    # Position for CLIENT ADDRESS
    p.acroForm.textfield(name='address', tooltip='Address', x=160, y=y_position - 5, width=300, height=20, value=userinfo.address)
    y_position -= 20

    # Continuing text
    p.drawString(100, y_position, "The client,")
    
    # Position for CLIENT AGE
    p.acroForm.textfield(name='age', tooltip='Age', x=160, y=y_position - 5, width=50, height=20, value=str(userinfo.age))
    p.drawString(210, y_position, ", agrees to the terms and conditions outlined below:")

    # Continue with the rest of the text
    y_position -= 40

    # Wrapping the lorem ipsum text
    text = """Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tortor nisl, posuere ut nunc et,
porta mollis massa. Proin mattis dolor augue, ut vehicula ipsum venenatis vitae. Aliquam non
interdum velit, eget mattis felis. Etiam pharetra aliquam vulputate. Vestibulum odio tellus, vehicula
a turpis a, egestas viverra urna. Maecenas leo tellus, rhoncus eget tellus vel, luctus venenatis est.
Vestibulum at cursus metus."""
    
    # Create a text object to handle wrapping
    text_object = p.beginText(50, y_position)
    text_object.setFont("Helvetica", 12)
    text_object.setTextOrigin(50, y_position)
    text_object.setLeading(14)  # Set line height

    # Split the text into lines and add them to the text object
    for line in text.split('\n'):
        text_object.textLines(line)
    
    # Draw the text object onto the canvas
    p.drawText(text_object)

    p.showPage()
    p.save()

    return response





# userinfo/views.py

# from rest_framework import viewsets
# from .models import UserInfo
# from .serializers import UserInfoSerializer
# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas
# from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.http import JsonResponse
# from django.urls import reverse
# from django.shortcuts import render

# class UserInfoViewSet(viewsets.ModelViewSet):
#     queryset = UserInfo.objects.all()
#     serializer_class = UserInfoSerializer

# def generate_pdf(request, pk):
#     userinfo = UserInfo.objects.get(pk=pk)
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = f'inline; filename="user_{pk}.pdf"'

    # Create a PDF with form fields
    # p = canvas.Canvas(response, pagesize=letter)
    # width, height = letter

    # Add static text
    # p.drawString(100, height - 100, "Name:")
    # p.drawString(100, height - 140, "Age:")
    # p.drawString(100, height - 180, "Address:")

    # Add interactive form fields
#     p.acroForm.textfield(name='name', tooltip='Name', x=150, y=height - 115, width=200, height=20, value=userinfo.name)
#     p.acroForm.textfield(name='age', tooltip='Age', x=150, y=height - 155, width=100, height=20, value=str(userinfo.age))
#     p.acroForm.textfield(name='address', tooltip='Address', x=150, y=height - 195, width=300, height=20, value=userinfo.address)

#     p.showPage()
#     p.save()

#     pdf_url = reverse('generate_pdf', kwargs={'pk': pk})
#     return render(request, 'pdf_viewer.html', {'pdf_url': pdf_url})

# @csrf_exempt
# def update_userinfo(request, pk):
#     if request.method == 'POST':
#         userinfo = UserInfo.objects.get(pk=pk)
        
        # Extract the form data from the POST request
        # name = request.POST.get('name')
        # age = request.POST.get('age')
        # address = request.POST.get('address')

        # Update the UserInfo object with the new data
    #     if name:
    #         userinfo.name = name
    #     if age:
    #         userinfo.age = age
    #     if address:
    #         userinfo.address = address
    #     userinfo.save()

    #     return JsonResponse({'status': 'success', 'message': 'User information updated.'})
    # return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=400)
