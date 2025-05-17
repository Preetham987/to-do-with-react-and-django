from django.urls import path
from .views import create_person
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name="form.html"), name='form'),
    path('api/create/', create_person, name='create_person'),
]
