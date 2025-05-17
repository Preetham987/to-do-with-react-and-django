from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import PersonSerializer
from .models import Person

@api_view(['POST'])
def create_person(request):
    print("✅ Data received at endpoint:", request.data)
    serializer = PersonSerializer(data=request.data)
    if serializer.is_valid():
        person = serializer.save()
        print("✅ Data saved to DB:", person)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print("❌ Invalid data:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
