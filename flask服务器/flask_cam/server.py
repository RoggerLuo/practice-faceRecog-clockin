#!/usr/bin/env python

from flask import Flask, render_template, Response
from camera import VideoCamera
import cv2

cam = VideoCamera()
app = Flask(__name__) 

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(cam),mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 5002, debug=True)
