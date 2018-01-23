import React from 'react'
import { connect } from 'dva'
import { Icon, Progress, Modal } from 'antd'
import { protocol_and_host } from '../../../../config.js'
class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.deleteFile = this.deleteFile.bind(this)
    }
    deleteFile(event) {
        let dispatch = this.props.dispatch
        const fileId = this.props.fileId
        Modal.confirm({
            title: '确认',
            content: '你确定要删除：“'+this.props.fileName+'”吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                dispatch({ type: 'appDetail/deleteFile', fileId })
            }
        })
        event.stopPropagation()
    }
    render() {
        if(this.props.userId != this.props.ownerId){
            return (<div onClick={(event)=>{event.stopPropagation()}}>&nbsp; </div>)
        }
        return (
            <div onClick={this.deleteFile}>
                <Icon type="delete"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        appDetail: state.appDetail,
        userId: state.common.userId,
    }
}

export default connect(mapStateToProps)(Upload)
