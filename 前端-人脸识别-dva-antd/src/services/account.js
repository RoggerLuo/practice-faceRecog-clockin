import request from '../utils/request';
import { protocol_and_host } from '../config'
import {Message} from 'antd'
export function info() {
    const options = { method: "GET" }
    return request(protocol_and_host + '/account/info', options)
        .then(function(data) {
            return data
        })
}

export function login(query) {
    // const data = { password: password }
    const options = { method: "POST", body: query }
    return request(protocol_and_host + '/account/login', options)
        .then(function(data) {
            console.log(data)
            if (data.status != 'ok') {
                Message.warning('登录出错：' + data.status);
            }
            return data
        })
}

export function register({ mobile, password }) {
    const data = { password, mobile, username:'none' }
    const options = { method: "POST", body: data }
    return request(protocol_and_host + '/account/register', options)
        .then(function(data) {
            console.log(data)
            return data
        })
}

export function logout() {
    const options = { method: "GET" }
    return request(protocol_and_host + '/account/logout', options)
        .then(function(data) {
            console.log(data.results)
            return data
        })
}
