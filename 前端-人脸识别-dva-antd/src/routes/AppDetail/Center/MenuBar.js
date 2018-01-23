import React from 'react'
import { connect } from 'dva'
import s from './center.css'
import c from '../../../assets/common.css'
import { Cascader, Button, Table, Row, Col, Menu, Icon, Dropdown, Checkbox } from 'antd'
// import MenuOptions from './MenuOptions'
import Path from './Path'
import { iconMap, wordMap, getType } from './Entry/iconMap'

function AppDetail({dispatch,appDetail,userId}) {    
    
    return (
        <div>
            <Row>
                <Col span={17} offset={0} className={s.fileTitle} >
                    <Path />
                </Col>

            </Row>        
        </div>
    )
}
/*

<Col span={2} offset={5} className={s.fileTitle+' '+c.pointer} style={{textAlign:'center'}}>
    {userId?(<Dropdown overlay={Menus} trigger={["hover"]}>
        <div>
            <Icon type="plus" style={{fontSize: '18px'}} className={s.pathSpan}/>
        </div>
    </Dropdown>):null}
</Col>                        

*/
/*
<Icon type="down" style={{fontSize: '10px'}}/>
*/
/*
{userId && (<Col span={2} offset={0} className={s.CCCTitle+' '+c.functionalIcon} >
    <Upload />
</Col>)||null} 
{userId && (<Col span={3} offset={0} className={s.CCCTitle+' '+c.functionalIcon} onClick={createLink}>
    <Icon type="link" /> 新建链接
</Col>)||null} 

{userId && (<Col span={3} offset={0} className={s.CCCTitle+' '+c.functionalIcon} onClick={createDir}>
    <Icon type="folder-add" /> 新建文件夹
</Col>)||null} 
                               */
function mapStateToProps(state) {
    return {
        appDetail:state.appDetail,
        userId:state.common.userId,
    }
}
export default connect(mapStateToProps)(AppDetail)
