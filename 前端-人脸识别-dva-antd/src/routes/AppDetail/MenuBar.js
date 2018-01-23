import React from 'react';
import { connect } from 'dva';
import s from './AppDetail.css';
import c from '../../assets/common.css';
// import TimerPicker from './TimerPicker';
import AppLayout from '../../components/DetailLayout';
import { Cascader, Button, Table, Row, Col, Menu, Icon, Dropdown,Checkbox } from 'antd';
import '../../utils/timeFormat'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function AppDetail({dispatch,appDetail,appList,location,title}) {
     const showSetting = () => {
        dispatch({type:'appDetail/change',key:'settingModal',value:true})
     }
     const menu = (
      <Menu>
          {appList.list.map((el,index)=>{
              // const url = `/#/app-detail?id=${el._id}&name=${el.name}`

              const goToDetail = () => {
                // window.navigate(`/#/app-detail?id=${el._id}&name=${el.name}`); 
                // return
                // window.location.replace(`/#/app-detail?id=${el._id}&name=${el.name}`)
                // return 
                //   debugger
                  // debugger

                  // window.location.reload(true)
                  // window.location.href = `/#/app-detail?id=${el._id}&name=${el.name}`

                  // debugger

                  // document.URL = window.location.href 
                  dispatch({type:'appList/mimicAjax',query: {id:el._id||el.name,name:el.name}})
                  dispatch({type:'appDetail/change',key: 'filePath',value:[]})
              }
              //                  
              //style={{display:'none'}}
              /*
                  <form  method="get" action={url} target="">
                      <button>{el.name}</button>
                  </form>

              */
              return (<Menu.Item key={index}>
                <div style={{fontSize:'14px'}} onClick={goToDetail}> {el.name} </div>
              </Menu.Item>)
          })}
      </Menu>
    );
    function handleClick(e){
        console.log(e.key)
        dispatch({type:'appDetail/change',key:'tab',value:e.key})
    }
    return (
        <Row>
            <Col span={5} offset={0} className={c.pointer}>
                <div className={s.dpdn}>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <span className={s.textTitle}><span className={s.textTitleLimited}>{location.query.name}</span> <Icon type="down" /></span> 
                    </Dropdown>
                </div>
            </Col>

            <Col span={7} offset={4} >
                <div style={{width:'275px',marginLeft:'20px'}}>
                    <Menu
                       onClick={handleClick}
                       selectedKeys={[appDetail.tab||'mail']}
                       mode="horizontal"
                     >
                           <Menu.Item key="file">
                             <Icon type="file" />文件
                           </Menu.Item>
                           <Menu.Item key="discuss" >
                             <Icon type="smile-o" />讨论
                           </Menu.Item>
                           <Menu.Item key="info" >
                             <Icon type="pushpin-o" />公告栏
                           </Menu.Item>
                    </Menu>
                </div>
            </Col>
            <Col span={2} offset={6} className={s.dpdn} >
                <div className={c.primaryIcon} style={{textAlign:'right',paddingRight:'20px'}} onClick={showSetting}>
                    <Icon type="bars"/> 管理
                </div>
            </Col>
        </Row>
    );
}
function mapStateToProps(state) {
    return {
        appDetail:state.appDetail,
        appList:state.appList,
        title:state.common.pageTitle,
    }
}

export default connect(mapStateToProps)(AppDetail);
