# from django.db import models

# class UserInfo(models.Model):
#     name = models.CharField(max_length=100)
#     age = models.IntegerField()
#     address = models.TextField()

#     def __str__(self):
#         return self.name

from django.db import models

class UserInfo(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    address = models.TextField()
    # pdf_file = models.FileField(upload_to='user_pdfs/', null=True, blank=True)
    def __str__(self):
        return self.name
