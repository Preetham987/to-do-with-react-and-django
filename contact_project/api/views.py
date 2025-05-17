from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ContactSerializer

@api_view(['POST'])
def submit_contact(request):
    print("\nIncoming POST request to /api/submit/")
    print("Raw request data:", request.data)

    serializer = ContactSerializer(data=request.data)
    
    if serializer.is_valid():
        print("Data is valid! Saving to database...")
        instance = serializer.save()
        print("Saved entry:")
        print(f"Name: {instance.name}, Email: {instance.email}, Message: {instance.message}")
        return Response({"message": "Contact saved!"}, status=status.HTTP_201_CREATED)

    print("Invalid data received!")
    print("Errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
