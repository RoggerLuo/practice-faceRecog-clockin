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
  return (
    <div style={{textAlign:'center'}}>
        <img id="bg" src="http://localhost:5002/video_feed" width='100%' height="100%"/> {/*438px*/}
    </div>
  );

}
function mapStateToProps(state) {
    return {photo:state.photo};
}
export default connect(mapStateToProps)(IndexPage)


