# Generated by Django 3.2.4 on 2021-07-22 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='album',
            name='id',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='id',
        ),
        migrations.RemoveField(
            model_name='track',
            name='id',
        ),
        migrations.AddField(
            model_name='album',
            name='spot_id',
            field=models.CharField(default=None, max_length=250, primary_key=True, serialize=False),
        ),
        migrations.AddField(
            model_name='artist',
            name='spot_id',
            field=models.CharField(default=None, max_length=250, primary_key=True, serialize=False),
        ),
        migrations.AddField(
            model_name='profile',
            name='genre',
            field=models.CharField(blank=True, max_length=350),
        ),
        migrations.AddField(
            model_name='track',
            name='spot_id',
            field=models.CharField(default=None, max_length=250, primary_key=True, serialize=False),
        ),
    ]
