from django.urls import path
from .views import portfolio_data, send_message

urlpatterns = [
    path("portfolio/", portfolio_data),
    path("contact/", send_message),
]