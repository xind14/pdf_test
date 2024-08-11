from rest_framework import viewsets
from .models import UserInfo
from .serializers import UserInfoSerializer

class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer


from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from .models import UserInfo

def generate_pdf(request, pk):
    userinfo = UserInfo.objects.get(pk=pk)
    response = HttpResponse(content_type='application/pdf')
    # response['Content-Disposition'] = f'attachment; filename="{userinfo.name}.pdf"'
    response['Content-Disposition'] = f'inline; filename="user_{id}.pdf"'


    p = canvas.Canvas(response, pagesize=letter)
    p.drawString(100, 750, f'Name: {userinfo.name}')
    p.drawString(100, 725, f'Age: {userinfo.age}')
    p.drawString(100, 700, f'Address: {userinfo.address}')
    p.showPage()
    p.save()

    return response
