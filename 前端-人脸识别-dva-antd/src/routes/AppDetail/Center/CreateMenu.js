import React from 'react';
import { connect } from 'dva';
import s from './center.css';
import c from '../../../assets/common.css';
import { Cascader, Button, Table, Row, Col, Menu, Icon, Dropdown, Checkbox } from 'antd';
import Upload from './Upload'
import UploadPages from './UploadPages'

function AppDetail({dispatch,appDetail,userId}) {        
    function createDir(){
        dispatch({type:'appDetail/change',key:'inputModal',value:true})
    }
    function createLink(){
        dispatch({type:'appDetail/change',key:'inputLinkModal',value:true})
    }
    const Menus = (
        <Menu >
            <Menu.Item style={{fontSize:'14px'}} >
                <Upload />
            </Menu.Item>
            <Menu.Item style={{fontSize:'14px'}} >
                <UploadPages />
            </Menu.Item>

            <Menu.Item style={{fontSize:'14px'}}>
                <div onClick={createLink}><Icon type="link" /> 新建链接</div>
            </Menu.Item>
            <Menu.Item style={{fontSize:'14px'}} >
                <div onClick={createDir}><Icon type="folder-add" /> 新建文件夹</div>
            </Menu.Item>
        </Menu>
    )
    return (
        <div>
            {userId?(<Dropdown overlay={Menus} trigger={["hover"]}>
                <div style={{color:'#CCC'}}>
                    <span  className={s.pathSpan}> &nbsp;
                    <Icon type="plus-circle-o" 
                        style={{display:'inline-block',paddingRight:'40px',fontSize:'16px',verticalAlign:'middle'}}/>
                    </span>
                </div>
            </Dropdown>):null}
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
