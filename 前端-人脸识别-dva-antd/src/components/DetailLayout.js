import React from 'react';
import s from './AppLayout.css';
import c from '../assets/common.css';
import AppHeader from './AppHeader';

import {Layout,Row,Col} from 'antd';
import AppSider from './AppSider';

const Header=Layout.Header
const Footer=Layout.Footer
const Content=Layout.Content
const Sider=Layout.Sider

function MyLayout({children,color}) {
  let contentStyle
  if(color){
      contentStyle = {backgroundColor:color}
  }else{
      contentStyle = {display:'block'}
  }

  const onClick = function ({ key }) {
    message.info(`Click on item ${key}`);
  };
/*
<Sider className={s.sider}>
    <AppSider />
</Sider>
*/
  const heightAndHidden= {height:'100%',overflow:'hidden'}
  return (
    <Layout className={s.layout}>
      <Header className={s.header}>
        <AppHeader />
      </Header>
      <Layout style={heightAndHidden}>
        <Content className={s.body} style={Object.assign({},contentStyle,heightAndHidden)}>
            {children}
        </Content>
      </Layout>
    </Layout>
  );
}
export default MyLayout;
