import { connect } from 'dva';
import s from './AppHeader.css';
import c from '../assets/common.css';
import f from '../assets/font/iconfont.css';
import { routerRedux } from 'dva/router';
import { Dropdown, Button,Layout,Row,Col,Icon, Avatar, Badge, Menu, Input} from 'antd';
import exit from "../assets/images/exit.png"
const { Search } = Input

function AppHeader({common,dispatch}) {    
    const logout = () => {
        console.log('logout click')
        dispatch({type:'common/logout'})
    }
    const titleClick = () => {
        dispatch(routerRedux.push({
          pathname: '/app-list'
        }))        
    }
    let menu2 = (
      <Menu>
        <Menu.Item>
            <div style={{fontSize:'15px'}}> 账号设置 </div>
        </Menu.Item>
        <Menu.Item>
            <div style={{fontSize:'16px',width:'180px'}} onClick={logout}> 注销 <Icon type="lock" /></div>
        </Menu.Item>
      </Menu>
    )
    if(!common.userId){
        menu2 = (<Menu>
            <Menu.Item>
                <div style={{fontSize:'15px',width:'140px'}}>你好，游客</div>            
            </Menu.Item>
          </Menu>
        )
    }

  return (
    <div className={c.height}>
         <Row className={c.height100}>
             
             <Col span={1}  offset={0} className={c.height100} >
                <h2 className={s.title+' '+c.pointer} onClick={titleClick}>
                     Gibbon 
                </h2>
             </Col>

             <Col span={5} offset={1} className={c.height100} style={{paddingLeft:'15px'}} >
                 <Search
                     placeholder="文件检索"
                     style={{ width: 200 }}
                     onSearch={value => console.log(value)}
                   />
             </Col>

             <Col span={4}  offset={0} className={c.height100} >
             </Col>

             <Col span={3} offset={10} className={c.height100+' '+c.pointer} >
                
                <Dropdown overlay={menu2} trigger={["click"]}>
                    <div style={{textAlign:'right',paddingRight:'20px',marginRight:'10px'}}>
                        <span className={s.userName}>{common.nickname||"游客"}&nbsp;&nbsp;</span>
                        <Badge count={0} overflowCount={10}>
                            <Avatar size="small" src={'https://api3.workplus.io/v1/medias/images/'+common.avatar} />
                        </Badge>
                    </div>
                </Dropdown>

             </Col>
         </Row>
    </div>
  )
}                        

function mapStateToProps(state) {
    return {
        common:state.common
    }
}

export default connect(mapStateToProps)(AppHeader);
