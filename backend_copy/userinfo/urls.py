# userinfo/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserInfoViewSet, generate_pdf

router = DefaultRouter()
router.register(r'userinfo', UserInfoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('pdf/<int:pk>/', generate_pdf, name='generate_pdf'),
    # path('update-userinfo/<int:pk>/', update_userinfo, name='update_userinfo'),
]
