import { connect } from 'dva';
import s from './AppList.css';
import c from '../../assets/common.css';
import { message, Button, Layout, Row, Col, Icon } from 'antd';
import AppLayout from '../../components/AppLayout';
import { routerRedux } from 'dva/router';

import AppItem from './AppItem';
import CreateModal from './CreateModal';
import PhotoModal from './PhotoModal';
import AppKeyModal from './AppKeyModal';

function PersonComp({photo,dispatch,userId,location}) {
    const createNew = () => {
        dispatch({type:'appList/openModal'})
    }
    const goToPeople = () => {
        dispatch(routerRedux.push({
          pathname: '/people',
          // query: {id:data,name:data},
        }))
    }
    const list = photo.photoList.slice(0).filter(el=>el!='.DS_Store')

    list.reverse()
    
    return (
        <AppLayout>

            <div className={c.height100}>

                <div className={c.middleGap}></div>
                <Row>
                    <Col span={2} offset={0} style={{textAlign:'center',cursor:'pointer'}} onClick={goToPeople}>
                        <h2 style={{fontWeight:'400'}}>返回</h2>
                    </Col>

                    <Col span={3} offset={0}>
                        <h1>{location.query.name}</h1>
                    </Col>
                    <Col span={3} offset={14}>
                        <div onClick={createNew} className={s.addNewAPPText} style={{marginTop:'4px'}}>
                            <Icon type="plus" />添加照片
                        </div>
                    </Col>


                </Row>
                <div className={c.middleGap}></div>
                <div className={c.middleGap}></div>


                <div className={s.itemContainer}>
                    {list.map((el,index)=>(<AppItem {...{dispatch,data:el,key:index,id:index}} name={location.query.name}/>))}
                </div>
                <div className={c.smallGap}></div>


                <CreateModal name={location.query.name}/>
                <PhotoModal />
                <div className={c.largeGap}></div>
                <div className={c.largeGap}></div>
            </div>
        </AppLayout>
    )
}
function mapStateToProps(state) {
    return {photo:state.photo,userId:state.common.userId};
}
export default connect(mapStateToProps)(PersonComp);

// 
//appList.