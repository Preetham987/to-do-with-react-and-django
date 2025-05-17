from django.urls import path
from .views import ProductListView, OrderCreateView, StripeCheckoutView, HomeView

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("orders/", OrderCreateView.as_view(), name="order-create"),
    path("checkout/", StripeCheckoutView.as_view(), name="checkout"),
]
