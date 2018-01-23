import React from 'react'
import { connect } from 'dva'
// import s from './center.css';
// import c from '../../../assets/common.css';
import { Row, Col, Menu, Icon, Modal, Message } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
import Entry from './Entry.js'
import '../../../../utils/timeFormat'
import { iconMap, getType } from './iconMap'
import Download from './Download.js'
import Delete from './Delete.js'

function EntryContainer({ dispatch, appDetail, ownerId, ownerName, fileName, fileType, fileSize, createDate, mediaId, _id, link }) {
    let type = getType(fileName,fileType)
    const time = new Date(createDate).Format("yyyy-MM-dd")
    const size = (fileSize) => {
        if(isNaN(fileSize) || !fileSize) return '-'            
        let m = fileSize / 1024 / 1024
        if (m > 1) return m.toFixed(1) + 'MB'
        return Math.round(fileSize / 1024) + 'KB'
    }

    const click = () => {
        if(type != 'folder'){
            dispatch({ type: 'appDetail/log', fileId: _id})
        }
        if(type == 'compass'){
            window.open(link)
            return
        }
        if(type == 'picture'){
            dispatch({ type: 'appDetail/change', key: 'photoModal', value: true })
            dispatch({ type: 'appDetail/change', key: 'currentImageId', value: mediaId })
            return
        }
        if(type == 'folder'){
            dispatch({ type: 'appDetail/change', key: 'father', value: _id })
            dispatch({ type: 'appDetail/refreshList'})
            dispatch({ type: 'appDetail/pathPush',dirObj:{name:fileName,fatherId:_id}})
            dispatch({type:'appDetail/getComment',dirId:_id})
            return
        }        
        if(type == 'msoffice'){
            if(fileSize / 1024 / 1024 > 10){
                Message.info('大于10M的office文件无法预览，请点击右边按钮下载查看')
                return 
            }
            window.open("http://view.officeapps.live.com/op/view.aspx?src="+link)
            return
        }
        if(type == 'link'){
            window.open(link)
            return
        }
        Message.info('无法预览"'+fileName+'"，请点击右边按钮下载查看')
    }
    let  download = (<Download type={type} link={link} mediaId={mediaId}/>)//<Icon type="download" /> 
    let  deleteComp = (<Delete ownerId={ownerId} fileName={fileName} fileId={_id}/>)

    const obj = {
        name: fileName,
        type,
        ownerId,
        owner: ownerName,
        size: size(fileSize),
        time,
        click,
        // deleteFile,
        mediaId,
        download,
        deleteComp,
        _id
    }
    return (<Entry {...obj}/>)
}

function mapStateToProps(state) {
    return {
        appDetail: state.appDetail,
    }
}

export default connect(mapStateToProps)(EntryContainer)