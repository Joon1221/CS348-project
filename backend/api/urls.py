from django.urls import path
from . import views

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),
    path('get_all_courses/', views.get_all_courses, name='get_all_courses'),
    path('get_user_course/', views.get_user_course, name='get_user_course'),
    path('put_user_course/', views.put_user_course, name='put_user_course'),
    path('delete_user_course/', views.delete_user_course,
         name='delete_user_course'),
    path('login_user/', views.login_user, name='login_user'),
    path('signup_user/', views.signup_user, name='signup_user'),
    path('get_user_course_taken/', views.get_user_course_taken,
         name='get_user_course_taken'),
    path('put_user_course_taken/', views.put_user_course_taken,
         name='put_user_course_taken'),
    path('update_user_course_taken/', views.put_user_course_taken,
         name='update_user_course_taken'),
    path('get_subject_codes/', views.get_subject_codes,
         name='get_subject_codes'),
    path('get_catalog_numbers/', views.get_catalog_numbers,
         name='get_catalog_numbers'),
]
