# userinfo/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserInfoViewSet, generate_pdf, QuestionViewSet, CountyViewSet

router = DefaultRouter()
router.register(r'userinfo', UserInfoViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'counties', CountyViewSet)  # Registering the CountyViewSet

urlpatterns = [
    path('api/', include(router.urls)),
    path('pdf/<int:pk>/', generate_pdf, name='generate_pdf'),
    # path('update-userinfo/<int:pk>/', update_userinfo, name='update_userinfo'),
]
