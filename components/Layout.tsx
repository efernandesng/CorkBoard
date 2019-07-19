import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
  Avatar,
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Col,
  Row,
  Typography,
} from 'antd'

const { Header, Content, Footer } = Layout
const { Text } = Typography

import '../styles.less'

type Props = {
  title?: string
}

const MainLayout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <Layout className="layout">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header>
      <Row>
        <Col span={12}>
          <div className="logo" />
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end" align="middle">
            <Col>
              <Button type="primary" size="large" icon="plus-square">
                ANUNCIAR E VENDER
              </Button>
            </Col>
            <Col span={8}>
              <Row gutter={8}>
                <Col span={20} style={{ textAlign: 'right' }}>
                  <Text strong>Minha conta</Text>
                </Col>
                <Col span={4}>
                  <Avatar icon="user" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        Content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
)

export default MainLayout
