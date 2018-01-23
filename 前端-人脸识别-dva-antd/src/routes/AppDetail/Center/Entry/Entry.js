import s from './entry.css'
import { Row, Col, Icon, Checkbox } from 'antd'
import iconfont from '../../../../assets/font/iconfont.css'
import Replace from './Replace.js'

function Entry({name,type,owner,ownerId,size,time,_id,click,mediaId,download,deleteComp}) {    
    let myIcon
    myIcon = (<Icon type={type} />)

    if(type == 'msoffice' ){
        myIcon = (<i className={iconfont.iconfont+' '+iconfont['icon-office']}></i>)
    }
    if(type == 'folder' ){
        myIcon = (<i className={iconfont.iconfont+' '+iconfont['icon-wenjianjia']} style={{color:'#7ec9ff'}}></i>)
    }
    return (            
        <div className={s.entry}>
            <Row onClick={()=>{click(_id,type,name)}} >
                <Col span={8} offset={0} className={s.fileProp+' '+s.textTitleLimited}>
                    {myIcon} {name}
                </Col> 
                <Col span={2} offset={1} className={s.fileProp} >
                    {size}
                </Col> 
                <Col span={4} offset={2} className={s.fileProp+' '+s.textTitleLimited} >
                    {owner}
                </Col> 
                <Col span={3} offset={0} className={s.fileProp} >
                    {time}
                </Col> 
                <Col span={1} offset={1} className={s.fileProp+' '+s.hoverBlue} style={{textAlign:'center'}}>
                    {download}
                </Col> 

                <Col span={1} offset={0} className={s.fileProp+' '+s.primaryIcon} style={{textAlign:'center'}}>
                    {deleteComp}
                </Col> 

                <Col span={1} offset={0} className={s.fileProp+' '+s.primaryIcon} style={{textAlign:'center'}}>
                    <Replace id={_id} type={type} ownerId={ownerId}/>
                </Col> 

            </Row>        
        </div>
    )
}
export default Entry

