import React from 'react';
import { connect } from 'dva';
import s from './sider.css';
import c from '../../../assets/common.css';
import { Cascader, Button, Table, Row, Col, Menu, Icon, Dropdown,Checkbox, Message } from 'antd';
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
import { Collapse, Card ,Input} from 'antd'
const Panel = Collapse.Panel
const { TextArea,Search } = Input
import { iconMap, getType } from '../Center/Entry/iconMap'

const Shortcuts = ({appDetail,dispatch})=>{
    const clickFactory = ({_id,mediaId,fileName,link,fileType}) => {
        let type = getType(fileName,fileType)
        return () => {
            if(type != 'folder'){
                dispatch({ type: 'appDetail/log', fileId: _id})
            }
            if(type == 'picture'){
                dispatch({ type: 'appDetail/change', key: 'photoModal', value: true })
                dispatch({ type: 'appDetail/change', key: 'currentImageId', value: mediaId })
                return
            }
            if(type == 'folder'){
                dispatch({ type: 'appDetail/change', key: 'father', value: _id })
                dispatch({ type: 'appDetail/refreshList'})
                dispatch({ type: 'appDetail/pathPush',dirObj:{name:fileName,fatherId:_id}})
                return
            }        
            if(type == 'msoffice'){
                window.open("http://view.officeapps.live.com/op/view.aspx?src="+link)
                return
            }
            if(type == 'link'){
                window.open(link)
                return
            }
            if(type == 'compass'){
                window.open(link)
                return
            }
            Message.info('无法预览"'+fileName+'"')
        }
    }
    function addClick(el){
        el.click = clickFactory(el.file)
        return el
    }
    const data = Object.assign({},appDetail.shortcutLists) 
    if(!data.part1) return null        
    for(let k in data) data[k] = data[k].map(addClick)
    const {part1,part2,part3,part4} = data
    
    let portionLeft = '60%'
    let portionRight = '40%'
    
    
    return (<div style={{height:'200px',width:'100%',minWidth:'450px'}}>
      <div className="上面" style={{height:'50%'}}>

          <div className="上面左边" style={{height:'100%',width:portionLeft,display:'inline-block',textAlign:'right',paddingRight:'8px'}}>
              <span style={{verticalAlign:'bottom',display:'inline-block',width:'1px',height:'100%'}}></span>
              <div style={{display:'inline-block'}}>
                  {part1.map((el,ind)=>(<div onClick={el.click} className={s.lables} style={el.style} key={ind}>{el.text}</div>))}                
              </div>
          </div>
          <div className="上面右边" style={{verticalAlign: 'top',height:'100%',width:portionRight,display:'inline-block'}}>
              <span style={{verticalAlign:'bottom',display:'inline-block',width:'1px',height:'100%'}}></span>
              <div style={{display:'inline-block'}}>
                  {part2.map((el,ind)=>(<div onClick={el.click} className={s.lables} style={el.style} key={ind}>{el.text}</div>))}                
              </div>
          </div>

      </div>

      <div className="下面" style={{height:'50%'}}>
          <div className="下面左边" style={{height:'100%',width:portionRight,display:'inline-block',textAlign:'right',paddingRight:'8px'}}>
              {part3.map((el,ind)=>(<div onClick={el.click} className={s.lables} style={el.style} key={ind}>{el.text}</div>))}                

          </div>
        
          <div className="下面右边" style={{height:'100%',display:'inline-block',verticalAlign: 'top'}}>
              {part4.map((el,ind)=>(<div onClick={el.click} className={s.lables} style={el.style} key={ind}>{el.text}</div>))}                
          </div>
      </div>

    </div>)
}

function mapStateToProps(state) {
    return {
        appDetail:state.appDetail,
        title:state.common.pageTitle,
    }
}
export default connect(mapStateToProps)(Shortcuts);
