import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'

import s from './IndexPage.css';
import Form from './LoginForm';
import { message } from 'antd';
import RegisterModal from './RegisterModal';
import monkey from '../assets/images/monkey.jpg'


import { Card } from 'antd';

  

function IndexPage({dispatch,photo}) {
  const isloading = photo.isloading
  const preload = () => {
    dispatch({
        type: 'photo/preload'
    })
  }
  const handleSubmit = (event,form) => {
      event.preventDefault()
      console.log(form.getFieldsValue())
      dispatch({
          type: 'common/login',
          payload: Object.assign({}, form.getFieldsValue(), { message })
      })
  }
  const register = () => {
      dispatch(routerRedux.push('/app-list'))
      // dispatch({type:'common/change',key:'registerVisitible',value:true})
  }
  //<Form handleSubmit={handleSubmit}/>
  let text 
  text = (<h1 className={s.title}>Menu</h1>)

  const goToPeople = () => {
      dispatch(routerRedux.push({
        pathname: '/people',
      }))
  }
  const goToRecognition = () => {
      dispatch(routerRedux.push({
        pathname: '/recognition',
      }))
  }

  return (
    <div style={{textAlign:'center'}}>


        <div style={{paddingTop:'5%'}}></div>
        <div style={{height:'100px',width:'100%'}}>{text}</div>
        {
          isloading?(<div style={{height:'10px',width:'auto',fontSize:'14px',marginTop:'-10px',cursor:'pointer',color:'red'}}>请稍等5分钟左右...</div>):
          (<div onClick={preload} style={{height:'10px',width:'auto',fontSize:'14px',marginTop:'-10px',cursor:'pointer'}}>预加载用户图像</div>)
        }
        
        


        <div  className={s.formContainer} style={{display:'flex',width:'100%',justifyContent: "space-evenly"}}>
            <div>
              <Card onClick={goToPeople} style={{ width: 240,cursor:'pointer',display:"inline-block"}} bodyStyle={{ padding: 0 }}>
                  <div className="custom-image" style={{height:'310px',display:'flex'}}>
                    <img style={{margin:'auto'}} alt="example" width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516614133380&di=42548a75af8e2d95eba24d52b96eb263&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Ddbca322d91504fc2b652b8468db48d64%2Fd4628535e5dde711640bfdd3adefce1b9d16613e.jpg" />
                  </div>
              </Card>
              <div className="custom-card" style={{height:'55px',marginTop:'10px'}}>
                <h2>人员管理</h2>
                <p>信息录入</p>
              </div>
            </div>


              <div>
                <Card onClick={goToRecognition} style={{ width: 240,cursor:'pointer',display:"inline-block"}} bodyStyle={{ padding: 0 }}>
                    <div className="custom-image" style={{height:'310px',display:'flex'}}>
                      <img alt="example" width="100%" style={{margin:'auto'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516603619943&di=6692f7e3e9988386f22f48f3473312f8&imgtype=0&src=http%3A%2F%2Fwww.72byte.com%2FUploads%2Fpost%2Fimage%2F20170717%2F1500289475356809.jpg" />
                    </div>
                  </Card>
                <div className="custom-card" style={{height:'55px',marginTop:'10px'}}> 
                  <h2>开始人脸识别</h2>
                  <p>自定义考勤</p>
                </div>

              </div>



              <div>
                <Card style={{ width: 240,cursor:'pointer',display:"inline-block"}} bodyStyle={{ padding: 0 }}>
                  <div className="custom-image" style={{height:'310px',display:'flex'}}>
                    <img alt="example" width="100%" style={{margin:'auto'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516614193394&di=2c16ae831633c4ced80687e8c77918e7&imgtype=0&src=http%3A%2F%2Fs14.sinaimg.cn%2Fmw690%2F0039gk0jzy6PEJ1eByt6d%26690" />
                  </div>
                </Card>
                <div className="custom-card" style={{height:'55px',marginTop:'10px'}}>
                  <h2>Excel导出</h2>
                  <p>数据查看和管理</p>
                </div>

              </div>
        </div>

    </div>
  );

}
/*
<img src={monkey} width="250"/>
*/
/*
<div className={s.formContainer}>
  <img src={qrcode}/>
</div>
<ul className={s.list}>
  <li>&nbsp;&nbsp;&nbsp;没有workplus账号？</li>
  <li><a onClick={register}>点击这里注册</a></li>
</ul>
<RegisterModal />*/

function mapStateToProps(state) {
    return {photo:state.photo};
}
export default connect(mapStateToProps)(IndexPage)


