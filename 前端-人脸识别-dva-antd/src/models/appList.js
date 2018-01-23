import { create, get, deleteReq } from '../services/app'
import { addperson } from '../services/photo'
import { notification, message } from 'antd'

import { routerRedux } from 'dva/router';
const delay = timeout => new Promise(resolve => setTimeout(resolve,timeout))

export default {
    namespace: 'appList',
    state: {
        list: [],
        appKeyModalVisible:false,
        appKey:'',
        isLoading: false,
        showSuccessWord:false,
        settingModal:false
    },
    reducers: {
        change(state,{key,value}){
            let obj = {}
            obj[key] = value
            return Object.assign({}, state, obj)            
        },
        loadList(state,{listArr}){
            return Object.assign({}, state, {
                list: listArr
            })
        },
        openAppKeyModal(state,{appKey,showSuccessWord}) {
            return Object.assign({}, state, {
                appKeyModalVisible: true,
                appKey,
                showSuccessWord
            })
        },
        closeAppKeyModal(state) {
            return Object.assign({}, state, {
                appKeyModalVisible: false
            })
        },
        openModal(state) {
            return Object.assign({}, state, {
                modalVisible: true
            })
        },
        closeModal(state) {
            return Object.assign({}, state, {
                modalVisible: false
            })
        },
        loading(state) {
            return Object.assign({}, state, {
                isLoading: true
            })
        },
        stopLoading(state) {
            return Object.assign({}, state, {
                isLoading: false
            })
        }
    },
    effects: { 
        * addPerson({ payload }, { call, put, select }) {
            console.log(payload)
            const rs = yield call(addperson, payload.name)
            if (rs == 'ok') {
                message.success('人员添加成功')
                yield put({ type: 'closeModal' })
                yield put({ type: 'stopLoading' })
            } else {
                message.error('人员添加失败！')
            }
            yield put({type:'getAppList'})
        },
        * getAppList({}, { call, put }) {
            const listArr = yield call(get)
            yield put({ type: 'loadList', listArr })
        },


        * mimicAjax({query},{call,put}){
            yield put({type:'change',key:'isLoading',value:true})
            yield put({type:'change',key:'isLoading',value:false})
            yield put(routerRedux.push({pathname: '/app-detail',query}))
        },
        * deleteApp({appId}, { call, put }) {
            const listArr = yield call(deleteReq,appId)
            /*  刷新列表 */
            yield put({ type: 'getAppList' })
            yield put(routerRedux.push({pathname: '/app-list'}))
        },
        * createApp({ payload }, { call, put }) {
            const res = yield call(create, payload)
            yield put({ type: 'closeModal' })
            yield put({ type: 'stopLoading' })
            /* 弹出modal appKey 成功 */
            // yield put({ type: 'openAppKeyModal', showSuccessWord:true, appKey:res.appKey})
            /*  刷新列表 */
            yield put({ type: 'getAppList' })
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname,query }) => {
                if (pathname == '/people') {
                    dispatch({type: 'getAppList'})
                }
            })
        },
    }
}
// dispatch({type:'common/checkLogin'})
// debugger
//     dispatch({type: 'common/changePageTitle',title:'应用列表'})
