from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Task
from .serializers import TaskSerializer

class TaskListCreate(ListCreateAPIView):  # Handles GET & POST
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskDetail(RetrieveUpdateDestroyAPIView):  # Handles PATCH
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
