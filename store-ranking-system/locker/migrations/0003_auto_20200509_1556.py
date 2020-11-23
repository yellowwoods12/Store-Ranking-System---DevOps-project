# Generated by Django 3.0.5 on 2020-05-09 10:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('locker', '0002_auto_20200502_0258'),
    ]

    operations = [
        migrations.CreateModel(
            name='Coordinates',
            fields=[
                ('lockerid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='locker.Onboard')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
            ],
        ),
        migrations.RemoveField(
            model_name='availability',
            name='id',
        ),
        migrations.AlterField(
            model_name='availability',
            name='lockerid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='locker.Onboard'),
        ),
    ]
