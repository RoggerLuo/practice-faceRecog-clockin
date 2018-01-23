import React from 'react'
import { connect } from 'dva'
import { Icon, Progress, notification, Message } from 'antd'
import { protocol_and_host } from '../../../../config.js'

class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.uploadClick = this.uploadClick.bind(this)
    }
    uploadClick(event) {
        let input = this.refs.upload
        input.click()
        event.stopPropagation()
    }
    handleFileUpload(event) {
        if (!this.props.currentAppId) {
            alert('appId值丢失，请重新从PC端登录')
            this.props.dispatch({ type: 'common/change', key: 'login', value: false })
        }
        const uploading = (progress) => {
            this.props.dispatch({type:'appDetail/change',value:progress,key:'uploadProgress'})
        }
        const openNotification = (name,i) => {
            notification.open({
                message: (<div>{'正在上传文件:'+name}</div>),
                description: (<Progress percent={0} strokeWidth={5} status="active" />),  //( <div><i className="anticon anticon-spin anticon-loading" ></i> 正在处理中</div>),//
                key:'my-react-notification'+i,
                className:'my-react-notification'+i
            })
        }
        const files = event.target.files
        for(let i=0;i<files.length;i++){
            let file = files[i]
            const formData = new FormData()
            formData.append('appId', this.props.currentAppId)
            formData.append('father', this.props.appDetail.father)
            formData.append('file', file)
            formData.append('isPages', true)
            formData.append('replaceId', this.props.id||false)

            if(file.type.indexOf('zip')!= -1){
                openNotification(file.name,i)
                this.props.dispatch({type:'appDetail/uploadFile',formData,uploading,notiKey:'my-react-notification'+i})
            }else{
                Message.error('当前文件格式不符合，网页上传只接受zip打包文件')
            }
        }
        event.target.value = ''
    }
    render() {
        let uploadButton = (<div><Icon type="sync" /></div>)
        if(this.props.type != 'compass'){
            uploadButton = null
            return null
        }
        if(!this.props.userId){
            uploadButton = null
            return null
        }
        if(this.props.ownerId != this.props.userId){
            uploadButton = null
            return null
        }
        return (
            <div onClick={this.uploadClick}>
                {uploadButton}
                <input type="file" name="file" onChange={this.handleFileUpload} style={{display:'none'}} ref='upload' />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        appDetail: state.appDetail,
        currentAppId: state.common.currentAppId,
        userId:state.common.userId
    }
}

export default connect(mapStateToProps)(Upload)
