import React from 'react';
import { connect } from 'dva';
import s from './sider.css';
import c from '../../../assets/common.css';
import Form from './Form.js'
import { Cascader, Button, Icon, Dropdown, Modal, Checkbox } from 'antd';
import '../../../utils/timeFormat.js'

function AppDetail({dispatch,appDetail,location,common}) {
    function CommentEntry({_id,ownerId,owner,createDate,content,dirId}) {
        const deleteComment = () => {
            Modal.confirm({
                title: '确认',
                content: '你确定要删除评论吗？',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    dispatch({type:'appDetail/deleteComment',commentId:_id,dirId})
                }
            })
        }
        return (<div style={{marginBottom:'15px'}}>
            <div style={{fontSize:'15px'}}>{content}</div>
            <div style={{fontSize:'11px',display:'flex',color:'#9a9a9a'}}>
              <div> {owner} &nbsp;</div> 
              <div> {new Date(createDate).Format("yyyy-MM-dd hh:mm:ss")} </div>
              {common.userId==ownerId?(<div onClick={deleteComment} className={s.delete}> &nbsp;删除 </div>):null}
            </div>
        </div>)
    }

    function comment(evt){
        evt.stopPropagation()
        Message.success('功能尚未实现，敬请期待')
    }
    function handleSubmit(form){
        // console.log(form.getFieldsValue())
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
      return (
          <div>
              {common.userId && (<Form handleSubmit={handleSubmit}/>)||null}
              {appDetail.commentList.map((el,ind)=>{
                  return (<CommentEntry key={ind} {...el}/>)
              }).reverse().slice(0,12)}
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
