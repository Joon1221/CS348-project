from django.urls import path
from . import views

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),
    path('get_all_courses/', views.get_all_courses, name='get_all_courses'),
]
