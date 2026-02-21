import json
from channels.generic.websocket import AsyncWebsocketConsumer

# In-memory store: {room_id: set of channel_names}
room_users = {}

class PresenceConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = 'cozy-room'
        self.group_name = f'presence_{self.room_id}'

        # Add to channel group
        await self.channel_layer.group_add(self.group_name, self.channel_name)

        # Track in memory
        if self.room_id not in room_users:
            room_users[self.room_id] = set()
        room_users[self.room_id].add(self.channel_name)

        await self.accept()

        # Broadcast updated count to everyone
        await self.broadcast_count()

    async def disconnect(self, close_code):
        # Remove from memory
        if self.room_id in room_users:
            room_users[self.room_id].discard(self.channel_name)

        # Remove from group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

        # Broadcast updated count
        await self.broadcast_count()

    async def broadcast_count(self):
        count = len(room_users.get(self.room_id, set()))
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'presence_update',
                'count': count,
            }
        )

    async def presence_update(self, event):
        await self.send(text_data=json.dumps({
            'count': event['count']
        }))