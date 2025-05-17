from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Person
from .serializers import PersonSerializer
from django.shortcuts import render

# Renders the form template
def create_person_form(request):
    return render(request, 'form.html')

# Handles form submission
@api_view(['POST'])
def create_person(request):
    print("📥 Incoming data to endpoint:", request.data)  # Debug in terminal

    serializer = PersonSerializer(data=request.data)
    if serializer.is_valid():
        person = serializer.save()
        print("Data saved to database:", person.name, person.email)  # Debug in terminal
        return Response({'message': 'Person created successfully!'})
    else:
        print("Validation Error:", serializer.errors)
        return Response(serializer.errors, status=400)
