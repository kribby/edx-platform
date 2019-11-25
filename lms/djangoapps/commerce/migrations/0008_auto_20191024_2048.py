# -*- coding: utf-8 -*-
# Generated by Django 1.11.25 on 2019-10-24 20:48
from __future__ import absolute_import, unicode_literals

from django.conf import settings
from django.db import migrations

USERNAME = settings.ECOMMERCE_SERVICE_WORKER_USERNAME
NEW_EMAIL = USERNAME + '@example.com'
OLD_EMAIL = USERNAME + '@fake.email'

class Migration(migrations.Migration):

    def forwards(apps, schema_editor):
        """Update the email of the service user."""
        User = apps.get_model("auth", "User")
        try:
            user = User.objects.get(username=USERNAME, email=OLD_EMAIL)
        except User.DoesNotExist:
            # Fake email doesn't need to updated if it doesn't exist
            return

        user.email = NEW_EMAIL
        user.save()

    def backwards(apps, schema_editor):
        """Replaces new email with old email for the service user."""
        User = apps.get_model("auth", "User")
        try:
            user = User.objects.get(username=USERNAME, email=NEW_EMAIL)
        except User.DoesNotExist:
            # Fake email doesn't need to reverted if it wasn't changed by migration
            return

        user.email = OLD_EMAIL
        user.save()

    dependencies = [
        ('commerce', '0007_auto_20180313_0609'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]

