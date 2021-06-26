from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import CustomUser 
 
class CustomUserCreationForm(UserCreationForm):
    name = forms.CharField(max_length=255, help_text='Name')
    class Meta(UserCreationForm.Meta):       
        model = CustomUser
        fields = UserCreationForm.Meta.fields + ('email', 'name')
        # fields = ('email', 'name', )  # adding a new field      
        # fields = ("first_name", "last_name",
        #           "email", "username", "password1", "password2")  
class CustomUserChangeForm(UserChangeForm):    
    class Meta:        
        model = CustomUser        
        fields = UserChangeForm.Meta.fields



# # Fields doesnt seem to change in the backend
# # https://stackoverflow.com/questions/66936963/how-can-i-add-first-name-and-last-name-in-my-registration-form