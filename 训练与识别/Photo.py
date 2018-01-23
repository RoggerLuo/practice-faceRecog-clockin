import face_recognition as face
import os
import numpy as np
import cv2

IMAGE_SIZE = 32


class Photo(object):

    def __init__(self, path):
        print('加载照片:', path)
        # cv2.IMREAD_COLOR #cv2.IMREAD_GRAYSCALE
        self.image = cv2.imread(path, cv2.IMREAD_COLOR)
        assert type(self.image) == np.ndarray

    def show(self):
        cv2.imshow('image', self.image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        return self

    def write(self, image_name, dir_path):
        assert type(image_name) == str
        assert type(dir_path) == str

        if not os.path.exists(dir_path):
            os.mkdir(dir_path)
        print('dir_path in Photo:',dir_path) 
        dst = os.path.join(dir_path, image_name)
        print('write dst in Photo:',dst)
        cv2.imwrite(dst, self.image)
        print("照片写入成功：", dst)
        return self

    def clip(self):
        classfier = cv2.CascadeClassifier(
            "/Users/RogersMac/opcv/opencv-3.0.0/data/haarcascades/haarcascade_frontalface_alt.xml")
        faceRects = classfier.detectMultiScale(
            self.image, scaleFactor=1.2, minNeighbors=3, minSize=(32, 32))
        if len(faceRects) > 0:  # 大于0则检测到人脸
            faceRect = faceRects[0]
            x, y, w, h = faceRect
            self.image = self.image[y - 10: y + h + 10, x - 10: x + w + 10]
        else:
            raise Exception("抛出一个异常，没有找到人脸。 接异常，然后跳过这张照片")
        assert type(self.image) == np.ndarray
        return self

    def resize(self, height=IMAGE_SIZE, width=IMAGE_SIZE):
        top, bottom, left, right = (0, 0, 0, 0)
        # image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        h, w, _ = self.image.shape  # 获取图像尺寸 #如果是彩色 , _
        # 对于长宽不相等的图片，找到最长的一边
        longest_edge = max(h, w)
        # 计算短边需要增加多上像素宽度使其与长边等长
        if h < longest_edge:
            dh = longest_edge - h
            top = dh // 2
            bottom = dh - top
        elif w < longest_edge:
            dw = longest_edge - w
            left = dw // 2
            right = dw - left
        else:
            pass
        # RGB颜色
        BLACK = [0, 0, 0]
        # 给图像增加边界，是图片长、宽等长，cv2.BORDER_CONSTANT指定边界颜色由value指定
        constant = cv2.copyMakeBorder(
            self.image, top, bottom, left, right, cv2.BORDER_CONSTANT, value=BLACK)
        # 调整图像大小并返回
        self.image = cv2.resize(constant, (height, width))
        assert type(self.image) == np.ndarray
        return self

    # def cvt_digit(self):
    #     assert type(image) == np.ndarray
    #     return image
