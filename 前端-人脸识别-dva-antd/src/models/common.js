import { login, logout,info,register } from '../services/account'
import { routerRedux } from 'dva/router'
import { Message } from 'antd'
import { notification } from 'antd'

function delay(timeout){ 
    return new Promise(resolve => setTimeout(resolve, timeout) )
}
export default {
    namespace: 'common',
    state: {
        loginPageTextMode:'normal',
        login:false,
        currentAppId:'',
        // registerVisitible:false,

        avatar:'',
        nickname:'',
        userId:''
    },
    reducers: {
        change(state,{key,value}){
            let obj = {}
            obj[key] = value
            return Object.assign({}, state, obj)            
        },
        changePageTitle(state, { title }) {
            return Object.assign({}, state, {
                pageTitle: title
            })
        }
    },
    effects: { 
        * register({ payload }, { call, put }) {
            const data = yield call(register, payload)
            if(data.status =='ok'){
                yield put({type:'change',key:'registerVisitible',value:false})
                Message.success('创建成功')
                yield put(routerRedux.push('/app-list'))
            }else{
                Message.error('创建失败')
            }
        },
        * login({ query }, { call, put }) {
            yield put({type:'change',key:'loginPageTextMode',value:'normal'})
            const data = yield call(login, query)
            if (data.status == 'ok') {
                yield put({type:'change',key:'avatar',value:data.results.avatar})
                yield put({type:'change',key:'nickname',value:data.results.nickname})
                yield put({type:'change',key:'login',value:true})
                console.log(data.results)
                console.log('data.results.userId')
                console.log(data.results.userId)
                yield put({type:'change',key:'userId',value:data.results.userId})
                yield put(routerRedux.push('/app-list'))
            }
        },
        * logout({ }, { call, put }) {
            const data = yield call(logout)
            if (data.status == 'ok') {
                yield put({type:'change',key:'avatar',value:''})
                yield put({type:'change',key:'nickname',value:''})
                yield put({type:'change',key:'userId',value:''})
                yield put({type:'change',key:'login',value:false})
                yield put(routerRedux.push('/'))
            }
        },
        * checkLogin({ pathname, query }, { call, put, select }) {
            // const islogin = yield select(state =>{
            //     return state.common.login
            // })
            // if(islogin){
            //     return 
            // }
            // const {status,results} = yield call(info)

            // if(status =='ok'){
            //     yield put({type:'change',key:'login',value:true})
            //     yield put({type:'change',key:'avatar',value:results.avatar})
            //     yield put({type:'change',key:'nickname',value:results.nickname})
            //     yield put({type:'change',key:'userId',value:results.userId})
            //     if(pathname == '/'){
            //         yield put(routerRedux.push('/app-list'))
            //     }
            // }else{
            //     Message.info('检测到您尚未登录，请重新登录')   //跳转登录页面. . .')  检测到您尚未登录，
            //     if(pathname != '/'){
            //         yield put(routerRedux.push('/'))                                            
            //     }

                // if(query.visitor=='true'){
                //     yield put({type:'change',key:'avatar',value:false})
                //     yield put({type:'change',key:'nickname',value:'游客'})
                //     yield put({type:'change',key:'login',value:true})
                // }
                // if(pathname != '/'){
                //     if(!islogin){

                        // Message.info('当前以游客身份登录')   //跳转登录页面. . .')  检测到您尚未登录，
                        // yield call(delay, 2000)
                        // yield put({type:'change',key:'login',value:true})                        
                    // }
                    // yield put(routerRedux.push('/app-list'))
                    // yield put(routerRedux.push('/'))                                            
                // }else{
                //     yield put({type:'change',key:'loginPageTextMode',value:''})
                //     // Message.info('当前以游客身份登录')
                //     yield call(delay, 1000)
                //     yield put({type:'change',key:'login',value:true})                        
                //     yield put(routerRedux.push('/app-list'))
                // }
        //     }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname,query }) => {
                notification.config({
                    placement: 'bottomRight',
                    duration: null,
                })

                if (pathname === '/') {
                    console.log(query)
                    if(query.ticket){
                        dispatch({type:'login',query})                                            
                    }else{
                        dispatch({type:'checkLogin',pathname,query})                        
                    }
                }
            })
        },
    },
};
