import requests
from instagrapi import Client
import os

API_ENDPOINT = 'YOUR_API_ENDPOINT'  # Replace with your real API endpoint

response = requests.get(API_ENDPOINT)
print(response.status_code)
print(response.text)
if response.status_code == 200:
    data = response.json()
    image_url = data[0]['image_url']
    caption = "Today's Top News Story 📰"

    # Download image
    image_data = requests.get(image_url).content
    with open('post.jpg', 'wb') as f:
        f.write(image_data)

    # Post to Instagram
    cl = Client()
    cl.login(os.environ.get("IG_USERNAME"), os.environ.get("IG_PASSWORD"))
    cl.photo_upload('post.jpg', caption)
else:
    print("Failed to fetch data from API")
