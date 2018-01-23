import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, message } from 'antd';
import Form from './Form'

const DetailModal = ({name,visible,dispatch,shoting}) => {
    const takeAShot = () => {
        //name 带着name 去拍照
        dispatch({type:'photo/shot',name})
    }
    const handleSubmit = (form) => {
        console.log(form.getFieldsValue())
        dispatch({
            type: 'appList/createApp',
            payload: Object.assign({}, form.getFieldsValue(), {message})
        })
        dispatch({type:'appList/loading'})
    }
    const cancel = () => {
        dispatch({type:'appList/closeModal'})
    }
    return (
        <Modal
          width="800px"
          title="图像信息录入"
          visible={visible}
          onCancel={cancel}
          footer={null}
          destroyOnClose={true}
        >
          <div style={{textAlign:'center'}}>
            {shoting?(<div style={{height:'438px',width:'100%'}}>{'正在处理.gif'}</div>):(<img id="bg" src="http://localhost:5002/video_feed" width='100%' height="438px"/>)}
            <div 
              onClick={takeAShot}
              style={{
                marginTop:'10px',
                fontSize:'14px',
                cursor:'pointer',
                lineHeight:'70px',
                color:'white',
                borderRadius:'35px',
                width:'70px',
                height:'70px',
                backgroundColor:'#00b0ff',
                display:'inline-block'
              }}
            > 
               Shot!
            </div>
          </div>

        </Modal>
    );
}
function mapStateToProps(state) {
    return {visible:state.appList.modalVisible,shoting:state.photo.shoting};
}

export default connect(mapStateToProps)(DetailModal);
//          <Form handleSubmit={handleSubmit} cancel={cancel}/>   
//            <div style={{width:'50px',height:'50px',backgroundColor:'blue'}}> </div>
//style={{display:'flex'}}