const env = process.env.NODE_ENV == 'development'
// console.log('env')
// console.log(env)
export const protocol_and_host = env?'http://localhost:5000':''//api //'http://172.16.1.178:8090' //http://log.workapps.io' // /api'//
