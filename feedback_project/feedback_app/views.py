from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import FeedbackSerializer
from .models import Feedback

@api_view(['POST', 'GET'])
def submit_feedback(request):
    if request.method == 'POST':
        print("\n📝 New Feedback Submitted:")
        print(request.data)
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            feedback = serializer.save()
            print("✅ Saved to DB:", feedback)
            return Response({"message": "Feedback submitted!"}, status=status.HTTP_201_CREATED)
        print("❌ Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # GET request - return all feedback
    elif request.method == 'GET':
        feedbacks = Feedback.objects.all().order_by('-submitted_at')
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)
