import React from 'react'
import { connect } from 'dva'
import { Icon, Progress } from 'antd'
import { protocol_and_host } from '../../../../config.js'
class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.downloadClick = this.downloadClick.bind(this)
    }
    downloadClick(event) {
        let form = this.refs.myForm
        form.submit()
        event.stopPropagation()
    }
    render() {
        if(
            this.props.type == 'folder'
            ||this.props.type == 'link'

            ){
            return (<div onClick={(event)=>{event.stopPropagation()}}>&nbsp; </div>)
        }

        let url
        if(this.props.link){
            url = this.props.link
            if(this.props.type == 'msoffice'||this.props.type == 'compass'){
                url = protocol_and_host + '/detail/download/'+this.props.mediaId
            }
        }else{
            url = protocol_and_host + '/detail/download/'+this.props.mediaId
        }
        // console.log(url)
        return (
            <div onClick={this.downloadClick}>
                <Icon type="download" style={{fontSize:'16px'}}/> 
                <form ref="myForm" style={{display:'none'}} method="get" action={url} target="new"></form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        appDetail: state.appDetail,
        currentAppId: state.common.currentAppId,
    }
}

export default connect(mapStateToProps)(Upload)

// export default Upload
/*
<ReactUploadFile options={options} 
    re={<YourChooseButton />} 
/>
*/