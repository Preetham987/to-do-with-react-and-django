from django.urls import path
from .views import create_person, create_person_form

urlpatterns = [
    path('create/', create_person_form, name='form-page'),     # Shows the form
    path('api/create/', create_person, name='create-person'),  # API endpoint
]
