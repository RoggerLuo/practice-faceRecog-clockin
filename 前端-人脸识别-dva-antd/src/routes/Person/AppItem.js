import React from 'react';
import { routerRedux } from 'dva/router';
import s from './AppList.css';
import c from '../../assets/common.css';
import AppLayout from '../../components/AppLayout';
import { Popover, Button, Layout, Row, Col } from 'antd';
import { Modal } from 'antd';

function AppItem({ name, dispatch, data, id }) {
    const del = (e) =>{
        dispatch({type:'photo/delPhoto',name,filename:data})
        e.stopPropagation()
    }
    const goToDetail = (url) => {
        dispatch({type:'photo/change',key: 'displayUrl',value:url})
        dispatch({type:'photo/change',key: 'displayModal',value:true})
    }

    const showAppKey = () => {
        dispatch({ type: 'appList/openAppKeyModal', showSuccessWord: false, appKey:data._id})
    }
    const onDelete = () => {
        Modal.confirm({
            title: '提示',
            content: '你真的要删除应用"'+data.name+'"吗',
            onOk() {
                dispatch({type:'appList/deleteApp',appKey:data._id})
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const content = (
      <div>
        <div onClick={onDelete} className={s.menuButton}>删除应用</div>
        <div onClick={showAppKey} className={s.menuButton}>查看appKey</div>
      </div>
    );
    const stopPropagation = (e) => {
        e.stopPropagation()
    }
    const src = `http://localhost:5000/user_photo/${name}/${data}`
    return (
        <div className={s.appItem} onClick={()=>goToDetail(src)}>
            <div onClick={del} className={s.hoverBlack} style={{height:'20px',width:'100%',paddingRight:'15px',marginTop:"-20px",cursor:'pointer'}}>
                删除
            </div>
            
            <div className={s.appItemText} >
                <img src={src} width="100%" style={{margin:'auto',cursor:'pointer'}}/>
            </div>
        </div>
    )
}

export default AppItem
