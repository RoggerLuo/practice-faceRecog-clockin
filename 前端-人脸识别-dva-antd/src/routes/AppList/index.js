import { connect } from 'dva';
import s from './AppList.css';
import c from '../../assets/common.css';
import { message, Button, Layout, Row, Col, Icon } from 'antd';
import AppLayout from '../../components/AppLayout';
import { routerRedux } from 'dva/router';

import AppItem from './AppItem';
import CreateModal from './CreateModal';
import AppKeyModal from './AppKeyModal';

function AppList({appList,dispatch,userId}) {
    const createNew = () => {
        dispatch({type:'appList/openModal'})
    }
    const goToIndex = () => {
        dispatch(routerRedux.push({
          pathname: '/'
        }))
    }

    return (
    <AppLayout>
        <div className={c.height100}>
            <div className={c.middleGap}></div>
            <Row>
                <Col span={2} offset={0} style={{textAlign:'center',cursor:'pointer'}} onClick={goToIndex}>
                    <h2 style={{fontWeight:'400'}}>返回</h2>
                </Col>
            </Row>


            <Row>
                <Col span={3} offset={2}>

                    <div onClick={createNew} className={s.addNewAPPText}><Icon type="plus" />添加新员工</div>

                </Col>
            </Row>
            <div className={c.middleGap}></div>
            <div className={c.smallGap}></div>


            <div className={s.itemContainer}>
                {appList.list
                    .filter(el=>el!='.DS_Store')
                    .map((el,index)=>(<AppItem {...{dispatch,data:el,key:index,id:index}}/>))}
            </div>
            <CreateModal />
            <AppKeyModal />
            <div className={c.largeGap}></div>
            <div className={c.largeGap}></div>
        </div>
        </AppLayout>
    )
}
function mapStateToProps(state) {
    return {appList:state.appList,userId:state.common.userId};
}
export default connect(mapStateToProps)(AppList);

// 
//appList.