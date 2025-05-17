from django.contrib import admin
from .models import Employee  # or Task or whatever model you're using

admin.site.register(Employee)
