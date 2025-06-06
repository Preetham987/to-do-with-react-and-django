from django.urls import path
from .views import TaskListCreate, TaskDetail

urlpatterns = [
    path('tasks/', TaskListCreate.as_view(), name='task-list'),  # POST new task
    path('tasks/<int:pk>/', TaskDetail.as_view(), name='task-detail'),  # PATCH task
]
