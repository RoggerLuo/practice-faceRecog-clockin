import React from 'react';
import s from './AppLayout.css';
import c from '../assets/common.css';

import { Button, Layout, Row, Col } from 'antd';
import AppHeader from './AppHeader';

const Header = Layout.Header
const Footer = Layout.Footer
const Content = Layout.Content
const Sider = Layout.Sider

function MyLayout({ children, color }) {
    let contentStyle
    if (color) {
        contentStyle = { backgroundColor: color }
    } else {
        contentStyle = { display: 'block' }
    }
    return (
        <Layout className={s.layout}>
          <Layout className={s.layoutContent+' '+c.height100}>
            <Content className={s.body} >
              {children}
            </Content>
          </Layout>
        </Layout>
    );
}
//          <Footer className={s.footer}>Bug Catcher</Footer>

export default MyLayout;
/*
<Header className={s.header}>
  <AppHeader />
</Header>
*/

//+' '+c.height100
//style={contentStyle}