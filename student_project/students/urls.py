from django.urls import path
from . import views

urlpatterns = [
    path('', views.student_form, name='student_form'),
    path('students/', views.student_list, name='student_list'),
]
