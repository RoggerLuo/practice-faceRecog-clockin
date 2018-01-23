import { Modal, Button, Table } from 'antd'
import { connect } from 'dva'

const DetailModal = ({ visible, dispatch, url }) => {
    const cancel = () => {
        dispatch({type:'photo/change',key: 'displayModal',value:false})
    }
   
    return (
        <Modal
          style={{top:'10%'}}
          width="60%"
          title="预览"
          visible={visible}
          onCancel={cancel}
          footer={null}
        >
          <div style={{textAlign:'center'}}>
            <img style={{maxWidth:'100%'}} src={url} alt="图片地址出错了" />
          </div>
        </Modal>
    );
}

function mapStateToProps(state) {
    return {
      visible:state.photo.displayModal,
      url:state.photo.displayUrl
    }
}

export default connect(mapStateToProps)(DetailModal);
