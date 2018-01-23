import { connect } from 'dva';
import { Form, Icon, Input, Row, Col, Button } from 'antd'

const FormItem = Form.Item;
const FormComp = ({handleSubmit,form,cancel})=>{
    const { getFieldDecorator } = form
    const click = () => {
        handleSubmit(form)
        cancel()
    }
    return(
        <Form onSubmit={handleSubmit}>
            <FormItem label="文件夹名称">
                {getFieldDecorator('name', {
                   rules: [{ required: true, message: '请输入文件夹名称!', whitespace: true }],
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

