import { connect } from 'dva';
import { Form, Icon, Input, Row, Col, Button } from 'antd'

const FormItem = Form.Item;
const FormComp = ({handleSubmit,form,cancel})=>{
    const { getFieldDecorator } = form
    const click = () => {
        handleSubmit(form)
        cancel()
    }
    const reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    return(
        <Form onSubmit={handleSubmit}>
            <FormItem label="链接名称">
                {getFieldDecorator('name', {
                   rules: [{ required: true, message: '请输入链接名称!', whitespace: true }],
                })(
                   <Input />
                )}
            </FormItem>
            <FormItem label="链接地址">
                {getFieldDecorator('link', {
                   rules: [{ required: true, message: '请输入完整的url地址(包含http://或https://)', whitespace: true, pattern:reg }],
                })(
                   <Input />
                )}
            </FormItem>

             <FormItem>
                <Row>
                    <Col span={4} offset={16}>
                        <Button size="large" onClick={cancel}>取消</Button>             
                    </Col>
                    <Col span={4}>
                        <Button onClick={click} type="primary" size="large">创建</Button>             
                    </Col>
                </Row>
             </FormItem>    
         </Form>
    )
}
const FormCompCreated = Form.create()(FormComp)
function mapStateToProps(state) {
    return {}
}
export default connect(mapStateToProps)(FormCompCreated);

