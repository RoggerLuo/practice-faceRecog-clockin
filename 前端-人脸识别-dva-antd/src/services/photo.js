import request from '../utils/request';
import { protocol_and_host } from '../config'


export function recognition() {
    const options = { method: "GET" }
    return request(protocol_and_host + '/recognition', options)
}

export function preloadphoto(name,filename) {
    const options = { method: "GET" }
    return request(protocol_and_host + '/preloadphoto', options)
}

export function photodelete(name,filename) {
    const options = { method: "GET" }
    return request(protocol_and_host + '/photodelete/' + name + '/' + filename, options)
}

export function somebodysphoto(name) {
    const options = { method: "GET" }
    return request(protocol_and_host + '/somebodysphoto/' + name, options)
}

export function kacha(name) {
    const options = { method: "GET" }
    return request(protocol_and_host + '/kacha/' + name, options)
}

export function addperson(name) {
    const options = { method: "GET" }
    return request(protocol_and_host + '/addperson/' + name, options)
}

export function deleteCommentReq(commentId) {
    const options = { method: "DELETE" }
    return request(protocol_and_host + '/comment/' + commentId, options)
        .then(function(data) {
            // console.log(data.results)
            return data.results
        })
}

export function getCommentReq(dirId) {
    const options = { method: "GET" }
    return request(protocol_and_host + '/comment/' + dirId, options)
        .then(function(data) {
            // console.log(data.results)
            return data.results
        })
}

export function createCommentReq(dirId, content) {
    function getBrowser(n) {
        var ua = navigator.userAgent.toLowerCase(),
            s,
            name = '',
            ver = 0;
        //探测浏览器
        (s = ua.match(/msie ([\d.]+)/)) ? _set("ie", _toFixedVersion(s[1])):
            (s = ua.match(/firefox\/([\d.]+)/)) ? _set("firefox", _toFixedVersion(s[1])) :
            (s = ua.match(/chrome\/([\d.]+)/)) ? _set("chrome", _toFixedVersion(s[1])) :
            (s = ua.match(/opera.([\d.]+)/)) ? _set("opera", _toFixedVersion(s[1])) :
            (s = ua.match(/version\/([\d.]+).*safari/)) ? _set("safari", _toFixedVersion(s[1])) : 0;

        function _toFixedVersion(ver, floatLength) {
            ver = ('' + ver).replace(/_/g, '.');
            floatLength = floatLength || 1;
            ver = String(ver).split('.');
            ver = ver[0] + '.' + (ver[1] || '0');
            ver = Number(ver).toFixed(floatLength);
            return ver;
        }

        function _set(bname, bver) {
            name = bname;
            ver = bver;
        }
        return (n == 'n' ? name : (n == 'v' ? ver : name + ver));
    }

    const options = { method: "POST", body: { content, anonymity: getBrowser() } }
    return request(protocol_and_host + '/comment/' + dirId, options)
        .then(function(data) {
            return data.results
        })
}

export function getShortcutsReq(appId) {
    const options = { method: "GET" }
    return request(protocol_and_host + '/detail/getShortcuts/' + appId, options)
        .then(function(data) {
            console.log(data.results)
            return data.results
        })
}

export function logReq(fileId, appId) {
    const options = { method: "POST", body: { fileId, appId } }
    return request(protocol_and_host + '/detail/insertOneLog', options)
        .then(function(data) {
            return data.results
        })
}

export function fileDownload() {
    const options = { method: "GET" }
    return request(protocol_and_host + '/detail/download?mediaId=Z3JvdXAxL00wMC8wNi8yMi9DaTh4Q0ZtQzdpbUFZRG1SQUFBMnJ5QTlBTDQ0OS5qcGVn', options)
        .then(function(data) {
            console.log(data.results)
            return data.results
        })
}

export function get(appKey, father) {
    const options = { method: "GET" }
    return request(protocol_and_host + '/detail/getList/' + appKey + '/' + father, options)
        .then(function(data) {
            // console.log(data.results)
            return data.results
        })
}

export function upload(formData, uploading, notiKey) {
    return new Promise(resolve => {
        const option = {
            url: protocol_and_host + '/detail/upload',
            uploading
        }
        const xhr = new XMLHttpRequest()
        // if(option.maxSize &&  input.files[0].size > option.maxSize * 1024 * 1024){
        //         content: '请上传小于'+option.maxSize+'M的文件',
        // }
        xhr.open('post', option.url);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function() {
            if (xhr.status == 200) {
                if (xhr.readyState == 4) {
                    console.log('success upload')
                    resolve(JSON.parse(xhr.responseText))
                }
            } else {
                console.log('success failed')
            }
        }
        xhr.upload.onprogress = function(event) {
            var pre = Math.floor(100 * event.loaded / event.total);
            if (option.uploading instanceof Function) {
                option.uploading(pre);
            }
            const progressDOM = document.getElementsByClassName(notiKey)[0] //'my-react-notification'
            if (progressDOM) {
                progressDOM.children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[0].style.width = pre + '%'
                progressDOM.children[0].children[0].children[1].children[0].children[0].children[1].innerText = pre + '%'
                if (pre == 100) {
                    progressDOM.children[0].children[0].children[1].children[0].children[0].innerHTML = ' <i class="anticon anticon-spin anticon-loading" ></i> 正在处理中'
                }
            }
        }
        xhr.send(formData)
    })
}

export function createDirReq(fileName, father, appId) {
    const options = { method: "POST", body: { fileName, father, appId } }
    return request(protocol_and_host + '/detail/createDir', options)
        .then(function(data) {
            return data.results
        })
}
export function createLinkReq(fileName, father, appId, link) {
    const options = { method: "POST", body: { link, fileName, father, appId } }
    return request(protocol_and_host + '/detail/createLink', options)
        .then(function(data) {
            return data.results
        })
}

export function refresh(appKey, hash) {
    const options = { method: "GET" }
    return request(protocol_and_host + '/bug/' + appKey + hash, options)
        .then(function(data) {
            console.log(data.results)
            return data.results
        })
}


export function fileDelete(fileId) {
    const options = { method: "DELETE" }
    return request(protocol_and_host + '/detail/' + fileId, options)
        .then(function(data) {
            console.log(data.results)
            return data.results
        })
}