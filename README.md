# youtube_downloader
give link page of video and this app downloaded video.
download youtube video with special quality! 
---

## needs
- [RabbitMQ](https://www.rabbitmq.com)
- [ffmpeg](https://github.com/BtbN/FFmpeg-Builds/releases)
- node.js (v20.14.0)
- py (3.10.5)

---

## start app:

> should set environment variables for ffmpeg (in windows in path(environment variables))

```
rabbitmq start
node controller.js
node model.js
py downloader.py

```

> you can set env PORT , but defult port is 1000 (localhost:1000).
