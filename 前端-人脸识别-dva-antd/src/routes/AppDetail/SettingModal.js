import { Modal, Button, Table } from 'antd'
import { connect } from 'dva'
import Character from './Character'
import '../../utils/timeFormat'

const DetailModal = ({ visible, dispatch, appId, appList, userId }) => {
    const cancel = () => {
        console.log('come in')
        dispatch({ type: 'appDetail/change',key:'settingModal',value:false})
    }
    const columnsBasicInfo = [
      {
          title: '项目名称',
          dataIndex: 'name',
          key: 'name',
          width: '33%',
        },{
          title: '创建时间',
          dataIndex: 'createDate',
          key: 'createDate',
          width: '33%',
        },
        {
          title: '创建人',
          dataIndex: 'owner',
          key: 'owner',
          width: '34%',
      }
    ]
   
    let data = appList.list.filter(el=>{
        return el._id==appId
    })

    if(data[0]){
        data[0].createDate = new Date(data[0].createDate).Format("yyyy-MM-dd")
    }
    const deleteApp = () => {
          Modal.confirm({
              title: '确认',
              content: '你确定要删除应用：“'+data[0].name+'”吗？',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                  dispatch({type:'appList/deleteApp',appId})
                  cancel()
              }
          })
    }
    return (
        <Modal
          width="700px"
          title="项目设置"
          visible={visible}
          onCancel={cancel}
          footer={null}
        >
          <Table
              columns={columnsBasicInfo}
              dataSource={data}
              bordered
              size="middle"
              pagination={false}
          />
            <br/>
            {data[0] && (data[0].ownerId == userId)?(<Button type="danger" onClick={deleteApp}>删除项目</Button>):null}
        </Modal>
    );
}
/*
<div>项目人员</div>
<div>添加人员</div>
<div><Character /><Character /><Character /><Character /></div>
*/

function mapStateToProps(state) {
    return {
      appList:state.appList,
      appDetail:state.appDetail,
      appId:state.common.currentAppId,
      userId:state.common.userId,
      visible:state.appDetail.settingModal
    }
}

export default connect(mapStateToProps)(DetailModal);
