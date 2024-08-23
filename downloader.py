import yt_dlp as ydl
import pika

def download(url):
    ydl_opts = {
            'outtmpl': 'video.mp4',  
        }
    ydl.YoutubeDL(ydl_opts).download([url])  
            
            
            
def main():
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host="localhost"),
    )
    channel = connection.channel()

    channel.queue_declare(queue="downloader")

    def callback(ch, method, properties, body):

        

        video_url = body.decode()
        download(video_url)

        

    channel.basic_consume(
        queue="downloader",
        on_message_callback=callback,
        auto_ack=True,
    )

    print("waiting! ")
    channel.start_consuming()


main()
