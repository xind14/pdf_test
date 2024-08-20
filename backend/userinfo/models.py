# userinfo/models.py

from django.db import models

class UserInfo(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    address = models.TextField()

    def __str__(self):
        return self.name

class Question(models.Model):
    text = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return self.text
