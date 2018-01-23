import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, Message } from 'antd';
import Form from './LinkForm'

const DetailModal = ({visible,dispatch}) => {
    const handleSubmit = (form) => {
        var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if(!reg.test(form.getFieldsValue().link)){
            Message.error('请输入正确的url')
            return false
        }
        dispatch({
            type: 'appDetail/createLink',
            fileName: form.getFieldsValue().name,
            link: form.getFieldsValue().link
        })
        form.resetFields()

    }
    const cancel = () => {
        dispatch({type:'appDetail/change',key:'inputLinkModal',value:false})
    }
    return (
        <Modal
          width="500px"
          title="新建链接"
          visible={visible}
          onCancel={cancel}
          footer={null}
        >
            <Form handleSubmit={handleSubmit} cancel={cancel}/>   
        </Modal>
    )
}
function mapStateToProps(state) {
    return {visible:state.appDetail.inputLinkModal};
}

export default connect(mapStateToProps)(DetailModal);
