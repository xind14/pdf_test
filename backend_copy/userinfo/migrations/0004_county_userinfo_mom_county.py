# Generated by Django 5.0.3 on 2024-09-12 04:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userinfo', '0003_question_rename_name_userinfo_first_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='County',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='userinfo',
            name='mom_county',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='userinfo.county'),
        ),
    ]
