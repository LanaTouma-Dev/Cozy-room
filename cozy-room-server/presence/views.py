from django.http import JsonResponse
from .consumers import room_users

def room_count(request):
    count = len(room_users.get('cozy-room', set()))
    return JsonResponse({'count': count})