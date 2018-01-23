import request from '../utils/request';
import { protocol_and_host } from '../config'

export function create({ appName, appDes, message }) {
    const data = { name: appName, description: appDes }
    const options = { method: "POST", body: data }
    return request(protocol_and_host + '/app', options)
        .then(function(data) {
            return data.results
        })
}

export function get() {
    const options = { method: "GET" }
    return request(protocol_and_host + '/allpeople', options)
        // .then(function(data) {
            // console.log(data.results)
        //     return data.results
        // })
}

export function deleteReq(appId) {
    const options = { method: "DELETE" }
    return request(protocol_and_host + '/app/' + appId, options)
        .then(function(data) {
            // console.log(data.results)
            return data.results
        })
}
