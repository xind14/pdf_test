# from django.db import models

# class UserInfo(models.Model):
#     name = models.CharField(max_length=100)
#     age = models.IntegerField()
#     address = models.TextField()

#     def __str__(self):
#         return self.name

from django.db import models

class UserInfo(models.Model):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    suffix = models.CharField(max_length=10, blank=True, null=True)
    age = models.IntegerField()
    address = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Question(models.Model):
    text = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return self.text
    

