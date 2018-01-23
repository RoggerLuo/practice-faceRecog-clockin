import React from 'react';
import { connect } from 'dva';
import s from './sider.css';
import c from '../../../assets/common.css';
import { Form, Button ,Input} from 'antd';
const { TextArea,Search } = Input;

const FormItem = Form.Item;
const FormComp = ({handleSubmit,form})=>{
    const { getFieldDecorator } = form
    const click = () => {
        handleSubmit(form)
    }
    return(
      <Form onSubmit={handleSubmit} style={{marginBottom:'-15px'}}>
          <FormItem label="">
              {getFieldDecorator('comment', {
                 rules: [{ required: false, message: '评论不能为空', whitespace: true }],
              })(
                  <TextArea placeholder="在这里发表评论，按回车键提交" autosize={{ minRows: 2, maxRows: 10 }} onPressEnter={(e)=>{
                      if(e.shiftKey){
                          return 
                      }
                      handleSubmit(form)
                      e.target.value = ''
                      e.preventDefault()
                      return false
                  }} />
              )}
          </FormItem>
       </Form>
    )
}
/*
<FormItem style={{textAlign:'right',marginTop:'-10px'}}>
   <Button htmlType="submit" >确定</Button>
</FormItem>    

onClick={click}  
style={{visibility:'hidden'}}
<FormItem style={{textAlign:'right',marginTop:'-10px'}}>
   <Button onClick={click}>确定</Button>
</FormItem>    
*/
const FormCompCreated = Form.create()(FormComp)

export default FormCompCreated
