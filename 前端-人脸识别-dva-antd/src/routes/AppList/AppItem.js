import React from 'react';
import { routerRedux } from 'dva/router';
import s from './AppList.css';
import c from '../../assets/common.css';
import AppLayout from '../../components/AppLayout';
import { Popover, Button, Layout, Row, Col } from 'antd';
import { Modal } from 'antd';

function AppItem({ dispatch, data, id }) {

    const goToDetail = () => {
        dispatch(routerRedux.push({
          pathname: '/person',
          query: {id:data,name:data},
        }))
        // dispatch({type:'common/changePageTitle',title:data.name})
        // dispatch({type:'appList/mimicAjax',query: {id:data._id||data.name,name:data.name}})
        // dispatch({type:'appDetail/change',key: 'filePath',value:[]})

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
    return (
        <div className={s.appItem} onClick={goToDetail}>
            <div className={s.appItemText} >
                {data}
            </div>
        </div>
    )
}

export default AppItem
