import React from 'react';
import { connect } from 'dva';
import s from './center.css';
import c from '../../../assets/common.css';
import { Cascader, Button, Table, Row, Col, Menu, Icon, Dropdown, Checkbox } from 'antd';
import CreateMenu from './CreateMenu';
import Upload from './Upload'

function AppDetail({dispatch,appDetail,userId}) {        
    const clearPath = (index) => {
        dispatch({type:'appDetail/clearPath',index:index+1})
    } 
    const goToRoot = () => {
        clearPath(-1)
        dispatch({type:'appDetail/change',key:'father',value:'root'})
        dispatch({type:'appDetail/refreshList'})
        dispatch({type:'appDetail/getComment',dirId:'root'})

    }
    const goToPath = (index,fatherId) => {
        if(appDetail.filePath.length == index+1) return
        clearPath(index)
        dispatch({type:'appDetail/change',key:'father',value:fatherId})
        dispatch({type:'appDetail/refreshList'})
    }
    return (
        <div style={{display:'flex'}}>
            <div>
                <span onClick={()=>{goToRoot()}} className={s.pathSpan}>Home</span>  
                {appDetail.filePath.map((el,index)=>{
                    return ( <span key={index} style={{userSelect:'none'}}> >&nbsp; 
                        <span onClick={()=>{goToPath(index,el.fatherId)}} className={s.pathSpan}>
                            {el.name}
                        </span>
                    </span>)
                })}
            </div>
            &nbsp;&nbsp;&nbsp;
            <CreateMenu />
        </div>
    )
}
function mapStateToProps(state) {
    return {
        appDetail:state.appDetail,
        userId:state.common.userId,
    }
}

export default connect(mapStateToProps)(AppDetail);
