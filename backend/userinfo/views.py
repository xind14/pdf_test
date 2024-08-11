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
from .models import UserInfo
from .serializers import UserInfoSerializer
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from django.http import HttpResponse

class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

def generate_pdf(request, pk):
    userinfo = UserInfo.objects.get(pk=pk)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="user_{pk}.pdf"'

    # Create a PDF with form fields
    p = canvas.Canvas(response, pagesize=letter)
    width, height = letter

    # Add static text
    p.drawString(100, height - 100, "Name:")
    p.drawString(100, height - 140, "Age:")
    p.drawString(100, height - 180, "Address:")

    # Add interactive form fields
    p.acroForm.textfield(name='name', tooltip='Name', x=150, y=height - 115, width=200, height=20, value=userinfo.name)
    p.acroForm.textfield(name='age', tooltip='Age', x=150, y=height - 155, width=100, height=20, value=str(userinfo.age))
    p.acroForm.textfield(name='address', tooltip='Address', x=150, y=height - 195, width=300, height=20, value=userinfo.address)

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
