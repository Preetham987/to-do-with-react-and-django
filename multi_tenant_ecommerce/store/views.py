from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

class StripeCheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'product_data': {'name': request.data.get('product_name')},
                            'unit_amount': int(float(request.data.get('amount')) * 100),
                        },
                        'quantity': request.data.get('quantity', 1),
                    }
                ],
                mode='payment',
                success_url="http://localhost:8000/success/",
                cancel_url="http://localhost:8000/cancel/",
            )
            return Response({'url': checkout_session.url})
        except Exception as e:
            return Response({'error': str(e)}, status=400)

# Add the missing HomeView class
class HomeView(APIView):
    def get(self, request):
        return Response({"message": "Welcome to the Multi-Tenant E-Commerce Platform!"})
