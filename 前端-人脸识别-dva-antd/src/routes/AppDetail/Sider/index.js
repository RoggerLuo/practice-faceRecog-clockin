import React from 'react';
import { connect } from 'dva';
import s from './sider.css';
import c from '../../../assets/common.css';
import { Cascader, Button, Table, Row, Col, Menu, Icon, Dropdown,Checkbox } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import { Collapse, Card , Message} from 'antd';
const Panel = Collapse.Panel;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

import Comment from './Comment.js'
const example = (<div>
    <div style={{fontSize:'15px',lineHeight:'2'}}>
    <h2>Readme Demo</h2>
    <p>React is a JavaScript library for building user interfaces.</p>
    </div>
</div>)
/*    <ul>
    <li><strong>Declarative:</strong> React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.</li>
    </ul>
*/
import Shortcuts from './Shortcuts';

function AppDetail({dispatch,appDetail,location,common}) {
    function comment(evt){
        evt.stopPropagation()
        Message.success('功能尚未实现，敬请期待')
    }
    function handleSubmit(form){
        console.log(form.getFieldsValue())
        let dirId = appDetail.father
        if(appDetail.father =='root'){
            dirId = common.currentAppId
        }
        dispatch({
            type: 'appDetail/createComment',
            content: form.getFieldsValue().comment,
            dirId
        })
        form.resetFields()
    }
      let header 
      const mdHeader =  (<div className={s.collapseHeader}>
          <span>文档说明</span> 
          <span className={c.functionalIcon} onClick={comment}>
              <Icon type="edit"/> 编辑 
          </span>
      </div>)

      const linkHeader =  (<div className={s.collapseHeader}>
          <span>快速入口</span> 
      </div>)
      
      let windowTop 
      let defaultActiveKey
      if(appDetail.father == 'root'){
          windowTop = (<Shortcuts/>)
          defaultActiveKey = ['1','2']
          header = linkHeader
      }else{
          windowTop = example
          defaultActiveKey = ['1','2']
          header = mdHeader
      }
      return (
          <div className={c.height100+' '+s.overflowAuto}>
              <div style={{borderLeft:'1px solid #CCC',marginRight:'20px'}}>
                  <Collapse bordered={false} activeKey={defaultActiveKey}>
                    <Panel header={header} key="1">
                        <div style={{minHeight:'200px'}}>{windowTop}</div>
                    </Panel>
                    <Panel header="评论" key="2">
                      <Comment />
                    </Panel>
                  </Collapse>
              </div>
          </div> 
    )
}

function mapStateToProps(state) {
    return {
        appDetail:state.appDetail,
        common:state.common,
    }
}
export default connect(mapStateToProps)(AppDetail);
