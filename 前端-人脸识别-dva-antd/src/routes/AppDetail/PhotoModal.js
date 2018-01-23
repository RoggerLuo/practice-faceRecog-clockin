import { Modal, Button, Table } from 'antd'
import { connect } from 'dva'
import Character from './Character'
const DetailModal = ({ visible, dispatch, imageId }) => {
    const cancel = () => {
        console.log('come in')
        dispatch({ type: 'appDetail/change',key:'photoModal',value:false})
    }
   
    return (
        <Modal
          style={{top:'10%'}}
          width="60%"
          title="项目设置"
          visible={visible}
          onCancel={cancel}
          footer={null}
        >
          <div style={{textAlign:'center'}}>
            <img style={{maxWidth:'100%'}} src={'https://api3.workplus.io/v1/medias/images/'+ imageId} alt="图片地址出错了" />
          </div>
        </Modal>
    );
}

function mapStateToProps(state) {
    return {
      imageId:state.appDetail.currentImageId,
      visible:state.appDetail.photoModal
    }
}

export default connect(mapStateToProps)(DetailModal);
