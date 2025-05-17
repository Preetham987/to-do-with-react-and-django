from django_tenants.models import TenantMixin, DomainMixin
from django.contrib.auth.models import User
from django.db import models

class Store(TenantMixin):
    name = models.CharField(max_length=255, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_stores")
    created_on = models.DateField(auto_now_add=True)

    auto_create_schema = True  # Auto create DB schema when a store is created

class Domain(DomainMixin):
    pass
