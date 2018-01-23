import { getType, refresh } from '../services/bug'
import { get, upload, fileDelete, createDirReq,
     fileDownload, createLinkReq, logReq,
     getShortcutsReq, createCommentReq, getCommentReq, deleteCommentReq } from '../services/detail'
import {dealWithShortcutsData} from './dealWithShortcutsData';
import { notification, Message } from 'antd';

export default {
    namespace: 'appDetail',
    state: {
        uploadProgress:0,
        uploadStatus:'done',
        photoModal:false,
        settingModal: false,
        inputModal:false,
        inputLinkModal:false,
        uploader2:false,
        isLoading:false,

        father:'root',
        list: [],
        modalData: {},
        fromTo:'',
        tab:'file',
        fileArr:[],
        fileArrOrigin:[],
        filePath:[],
        shortcutLists:[],
        commentList:[]
    },
    reducers: {
        clearPath(state,{index}){
            let arr = state.filePath.slice(0,index)
            return Object.assign({}, state, {
                filePath:arr
            })
        },
        pathPush(state,{dirObj}){
            let arr = state.filePath.slice(0)
            arr.push(dirObj)
            return Object.assign({}, state, {
                filePath:arr
            })
        },
        change(state,{key,value}){
            let obj = {}
            obj[key] = value
            return Object.assign({}, state, obj)            
        },

        choosedTime(state, { fromTo }) {
            return Object.assign({}, state, {
                fromTo
            })
        },
        choosedUrl(state, { url }) {
            return Object.assign({}, state, {
                choosedUrl: url
            })
        },
        choosedBrowser(state, { browser }) {
            return Object.assign({}, state, {
                choosedBrowser: browser
            })
        },
        openModal(state, { record }) {
            return Object.assign({}, state, {
                modalVisible: true,
                modalData: record
            })
        },
        closeModal(state) {
            return Object.assign({}, state, {
                modalVisible: false
            })
        },
        loadDropdownOptions(state, { obj }) {
            const browserOptions = []
            for (let key in obj.types) {
                // console.log(key)
                let tempEl = {
                    name: key,
                    versions: obj.types[key]
                }
                browserOptions.push(tempEl)
            }
            return Object.assign({}, state, {
                urlOptions: obj.urls,
                browserOptions
            })
        }
    },
    effects: { 
        * deleteComment({ commentId, dirId }, { call, put, select }) {
            yield call(deleteCommentReq, commentId)
            yield put({type:'getComment',dirId})
        },
        * getComment({ dirId }, { call, put, select }) {
            const appId = yield select(state =>state.common.currentAppId)
            if(dirId =='root') dirId = appId            
            const listArr = yield call(getCommentReq,dirId)
            yield put({type:'change',value:listArr,key:'commentList'})
        },
        * createComment({ dirId, content }, { call, put, select }) {
            yield call(createCommentReq, dirId, content)
            yield put({type:'getComment',dirId})
        },
        * getShortcuts({}, { call, put, select }) {
            const father = yield select(state =>state.appDetail.father)
            const appId = yield select(state =>state.common.currentAppId)
            if(father != 'root') return
            const shortcutLists = yield call(getShortcutsReq, appId)                
            const newData = dealWithShortcutsData(shortcutLists)
            yield put({type:'change',value:newData,key:'shortcutLists'})
        },
        * log({ fileId }, { call, put, select }) {
            const appId = yield select(state =>state.common.currentAppId)
            yield call(logReq, fileId, appId)
        },
        * createLink({ fileName, link }, { call, put, select }) {
            const father = yield select(state =>state.appDetail.father)
            const appId = yield select(state =>state.common.currentAppId)
            yield call(createLinkReq, fileName, father, appId, link)
            yield put({type:'refreshList'})
        },
        * createDir({ fileName }, { call, put, select }) {
            const father = yield select(state =>state.appDetail.father)
            const appId = yield select(state =>state.common.currentAppId)
            yield call(createDirReq, fileName, father, appId)
            yield put({type:'refreshList'})
        },
        * deleteFile({ fileId }, { call, put }) {
            const returnText = yield call(fileDelete, fileId)
            yield put({type:'refreshList'})
        },
        * uploadFile({ formData, uploading, notiKey }, { call, put }) {
            yield put({type:'change',value:'ing',key:'uploadStatus'})
            const data = yield call(upload, formData, uploading, notiKey)
            if(data.status =='ok'){
                yield put({type:'change',value:'done',key:'uploadStatus'})
                yield put({type:'refreshList'})    
                // notification.destroy()
                notification.close(notiKey)            
            }else{
                yield put({type:'change',value:'done',key:'uploadStatus'})
                yield put({type:'refreshList'})    
                // notification.destroy()  

                notification.close(notiKey)            
          
                Message.error('未知原因导致上传失败')
            }
        },
        * refreshList({}, { call, put, select }) {
            const currentAppId = yield select(state =>state.common.currentAppId)
            const father = yield select(state =>state.appDetail.father)
            yield put({type:'getFileList',appKey:currentAppId,father})
        },
        * getFileList({ appKey, father }, { call, put }) {
            yield put({type:'change',key:'fileArr',value:[]})
            yield put({type:'change',key:'fileArrOrigin',value:[]})
            yield put({type:'change',key:'isLoading',value:true})

            const listArr = yield call(get, appKey,father)
            yield put({type:'change',value:listArr,key:'fileArr'})
            yield put({type:'change',value:listArr,key:'fileArrOrigin'})
            yield put({type:'change',key:'isLoading',value:false})

        },
        * getDropdownOptions({ appKey }, { call, put }) {
            const obj = yield call(getType, appKey)
            yield put({ type: 'loadDropdownOptions', obj })
        },
        * downloadFile({  }, { call, put }) {
            const returnText = yield call(fileDownload)
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {
                if (pathname === '/app-detail') {
                    // console.log(query.id)
                    if(!query.id){
                        alert('appId值丢失，请重新从PC端登录')
                        dispatch({type:'common/change',key:'login',value:false})
                    }
                    dispatch({type:'common/checkLogin',pathname,query})
                    dispatch({type:'common/change',key:'currentAppId',value:query.id})
                    dispatch({ type: 'getFileList', appKey: query.id, father:'root' })
                    dispatch({type: 'appList/getAppList'})
                    dispatch({type:'getComment',dirId:'root'})
                    /* 
                        应该在登录之后才拉取快捷列表，以区别游客和有身份的用户 
                        必须先选择应用，才有appId
                    */
                    dispatch({type:'getShortcuts'})
                }
            })
        },
    },
}
