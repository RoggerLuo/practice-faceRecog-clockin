import { connect } from 'dva';
import AppLayout from '../../components/DetailLayout';
import MenuBar from './MenuBar';
import Center from './Center';
import Sider from './Sider';
import { Row,Col, Spin } from 'antd';
import s from './AppDetail.css';
import c from '../../assets/common.css'
import SettingModal from './SettingModal';
import PhotoModal from './PhotoModal';
// import c from '../../assets/common.css';

function AppDetail({dispatch,appDetail,location}) {
    let center = (<Center/>)
    if(appDetail.tab == 'file'){
        center = (<Center/>)
    }
    if(appDetail.tab == 'discuss'){
        center = (<h1>讨论功能尚未开通，敬请期待</h1>)
    }
    if(appDetail.tab == 'info'){
        center = (<h1>公告功能尚未开通，敬请期待</h1>)
    }
    return (
        <AppLayout color={"white"}>
            <Spin spinning={appDetail.isLoading} style={{position:'absolute',left:'50%',top:'45%'}} size='large'/>
            <MenuBar location={location}/>
            <Row className={c.height100} style={{paddingBottom:'50px'}}>
                <Col span={16} offset={0} className={s.fileTitle} style={{height:'100%'}}>
                    {center}
                </Col> 
                <Col span={8} offset={0} className={s.description+' '+c.height100} > 
                    <Sider />
                </Col> 
            </Row>
        <SettingModal/>
        <PhotoModal/>
        </AppLayout>
    );
}
function mapStateToProps(state) {
    return {
        appDetail:state.appDetail,
        title:state.common.pageTitle,
    }
}

export default connect(mapStateToProps)(AppDetail);
