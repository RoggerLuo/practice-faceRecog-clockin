import React from 'react';
import { connect } from 'dva';
import s from './center.css';
// import c from '../../../assets/common.css';
import { Cascader, Button, Row, Col, Menu, Icon, Dropdown, Checkbox } from 'antd'
import Entry from './Entry'
import MenuBar from './MenuBar'
import Header from './Header'
import InputModal from './InputModal'
import InputLinkModal from './InputLinkModal'
// import {layer1,layer2} from './data';
//,marginRight:'15px'
function AppDetail({ dispatch, appDetail }) {    
    return (
        <div style={{paddingRight:'0px',height:'100%'}}>
            <div style={{height:'100%',marginLeft:'20px'}}>
                <MenuBar />
                <Header />
                <Row>
                  <div style={{height:'1px',backgroundColor:'#ccc'}}></div> 
                </Row>
                <div style={{height:'100%',paddingBottom:'100px'}} className={s.overflowAuto}>
                    {appDetail.fileArr&&appDetail.fileArr.map((el,index)=>(<Entry {...el} key={index}/>))||null}
                </div>
                <InputModal/>
                <InputLinkModal/>
            </div>        
        </div> 
    )
}
function mapStateToProps(state) {
    return {
        appDetail:state.appDetail,
    }
}

export default connect(mapStateToProps)(AppDetail);
