export const iconMap = {
    jpeg:'picture',
    photo:'picture',
    gif:'picture',
    jpg:'picture',
    bmp:'picture',
    png:'picture',

    dir: 'folder',
    link: 'link',

    docx:'msoffice',
    xlsx:'msoffice',
    pptx:'msoffice',

    doc:'msoffice',
    xls:'msoffice',
    ppt:'msoffice',
    
    zip:'wallet',
    // webPage:'compass'
}
export const wordMap = {
    picture:'图片',
    folder: '文件夹',
    link: '链接',
    msoffice:'office文件',
    file:'其他文件',
    wallet:'zip压缩文件',
    compass:'网页文件'
}
export function getType(fileName,fileType){
    const suffix = /[^\.]+$/.exec(fileName)
    let type = iconMap[suffix[0]] || 'file'
    if(fileType == 'webPage'){
        type = 'compass'
    }
    if(fileType == 'dir'){
        type = 'folder'
    }
    if(fileType == 'link'){
        type = 'link'
    }
    return type
}
