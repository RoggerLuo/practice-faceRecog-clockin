import cv2

color = (0, 255, 0)
size = 300
face_margin = 15

classfier = cv2.CascadeClassifier(
    "/Users/RogersMac/opcv/opencv-3.0.0/data/haarcascades/haarcascade_frontalface_alt.xml")


class VideoCamera(object):

    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def resize(self, frame):
        rate = size / frame.shape[0]
        small_frame = cv2.resize(frame, (0, 0), fx=rate, fy=rate)
        return small_frame

    def rectangle(self, frame):
        frame = self.resize(frame)
        greyFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faceRects = classfier.detectMultiScale(
            greyFrame, scaleFactor=1.2, minNeighbors=3, minSize=(32, 32))
        for face in faceRects:
            x, y, w, h = face
            cv2.rectangle(frame, (x - face_margin, y - face_margin),
                          (x + w + face_margin, y + h + face_margin), color, 2)
        return frame

    def get_frame(self):
        success, image = self.video.read()
        image = self.rectangle(image)
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

    def __del__(self):
        self.video.release()
