import yt_dlp as ydl
import pika


def preparer(string):
    url = ""
    qual = ""
    lIst = []
    
    lIst = string.split("#@#")
    url = lIst[0]
    qual = lIst[1]
    
    download(url , qual)
    
    
def download(url , qual):
    
    ydl_opts = {}
    print(qual)
    if qual == "140" or qual == "139":
        ydl_opts = {
            'format': qual ,
            'outtmpl': 'audio.mp3',  
        }
    else:
        if qual == "137" or qual == "136" or qual == "135":
            ydl_opts = {
                'format': f'{qual}+140' ,
                'outtmpl': 'video.mp4',  
                'merge_output_format': 'mp4',
            }
            
        else:
            ydl_opts = {
                'format': f'{qual}+139' ,
                'outtmpl': 'video.mp4',  
                'merge_output_format': 'mp4',
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
        preparer(video_url)
        
        

    channel.basic_consume(
        queue="downloader",
        on_message_callback=callback,
        auto_ack=True,
    )

    print("waiting! ")
    channel.start_consuming()


main()
