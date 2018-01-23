import face_recognition as face
import os
import numpy as np
import cv2


class Directory(object):

    def __init__(self, path):
        self.path = path

    def find_images(self):
        image_info_list = []

        def read_path(path_name):
            for dir_item in os.listdir(path_name):
                # 从初始路径开始叠加，合并成可识别的操作路径
                full_path = os.path.abspath(os.path.join(path_name, dir_item))

                if os.path.isdir(full_path):  # 如果是文件夹，继续递归调用
                    read_path(full_path)
                else:  # if 文件
                    if dir_item.endswith('.jpg') or dir_item.endswith('.bmp') or dir_item.endswith('.png') or dir_item.endswith('.jpeg'):
                        image_name = dir_item
                        image_path = full_path
                        image_dir_path = path_name
                        image_info_list.append(
                            {'image_name': image_name, 'image_path': image_path, 'image_dir_path': image_dir_path})

        read_path(self.path)
        return image_info_list  # dict:  image_name, image_path, image_dir_path

    