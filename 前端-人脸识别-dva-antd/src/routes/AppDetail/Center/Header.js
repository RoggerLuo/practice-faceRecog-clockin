import React from 'react';
import { connect } from 'dva';
import s from './center.css';
import c from '../../../assets/common.css';
import { Cascader, Button, Table, Row, Col, Menu, Icon, Dropdown, Checkbox } from 'antd';
import Path from './Path';
import { iconMap, wordMap, getType } from './Entry/iconMap'

function AppDetail({dispatch,appDetail,title}) {        
    let tempArr = []
    appDetail.fileArrOrigin && appDetail.fileArrOrigin.forEach(el=>{
        let type = getType(el.fileName,el.fileType)
        let name = wordMap[type]
        if(!tempArr.some(el2=>el2.name == name)){
            tempArr.push({name,type})
        }
    })
    tempArr.unshift({name:'所有文件',type:'all'})
    function selectFilter(type){
        if(type=='all'){
            dispatch({type:'appDetail/change',key:'fileArr',value:appDetail.fileArrOrigin})
            return
        }
        const fileArr = appDetail.fileArrOrigin && appDetail.fileArrOrigin.filter((el)=>{
            let elementType = getType(el.fileName,el.fileType)
            return elementType == type
        })||[]
        dispatch({type:'appDetail/change',key:'fileArr',value:fileArr})
    }

    const Menus = (
        <Menu >
            {tempArr.map((el,ind)=>(<Menu.Item key={ind}>
                    <div onClick={()=>{selectFilter(el.type)}} style={{fontSize:'14px'}}>{el.name}</div>
                </Menu.Item>)
            )}
        </Menu>
    )
    return (                   
        <Row>
            <Col span={2} offset={0} className={s.fileTitle+' '+s.pathSpan}>
                <Dropdown overlay={Menus} trigger={["click"]}>
                    <div>
                        名称 <Icon type="filter" />
                    </div>
                </Dropdown>
            </Col> 
            <Col span={2} offset={7} className={s.fileTitle} >
                大小
            </Col> 
            <Col span={3} offset={2} className={s.fileTitle} >
                创建人
            </Col> 
            <Col span={3} offset={1} className={s.fileTitle} >
                创建时间
            </Col> 
            <Col span={2} offset={1} className={s.fileTitle}  style={{textAlign:'left'}}>
                下载
            </Col> 
        </Row>  
    )
}
function mapStateToProps(state) {
    return {
        appDetail:state.appDetail,
        title:state.common.pageTitle,
    }
}
export default connect(mapStateToProps)(AppDetail);
