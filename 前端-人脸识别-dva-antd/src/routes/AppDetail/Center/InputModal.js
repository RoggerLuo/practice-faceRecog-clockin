import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal } from 'antd';
import Form from './Form'

const DetailModal = ({visible,dispatch}) => {
    const handleSubmit = (form) => {
        console.log(form.getFieldsValue())
        dispatch({
            type: 'appDetail/createDir',
            fileName: form.getFieldsValue().name
        })
        form.resetFields()
    }
    const cancel = () => {
        dispatch({type:'appDetail/change',key:'inputModal',value:false})
    }
    return (
        <Modal
          width="500px"
          title="新建文件夹"
          visible={visible}
          onCancel={cancel}
          footer={null}
        >
            <Form handleSubmit={handleSubmit} cancel={cancel}/>   
        </Modal>
    );
}
function mapStateToProps(state) {
    return {visible:state.appDetail.inputModal};
}

export default connect(mapStateToProps)(DetailModal);
