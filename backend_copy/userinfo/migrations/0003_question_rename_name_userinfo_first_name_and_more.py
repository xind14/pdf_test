# Generated by Django 5.0.3 on 2024-09-12 01:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userinfo', '0002_userinfo_pdf_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('answer', models.TextField()),
            ],
        ),
        migrations.RenameField(
            model_name='userinfo',
            old_name='name',
            new_name='first_name',
        ),
        migrations.RemoveField(
            model_name='userinfo',
            name='pdf_file',
        ),
        migrations.AddField(
            model_name='userinfo',
            name='last_name',
            field=models.CharField(default='Unknown', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userinfo',
            name='middle_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='userinfo',
            name='suffix',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
