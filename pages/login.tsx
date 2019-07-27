import Link from 'next/link'
import { Button, Row, Col } from 'antd'
import Layout from '../components/Layout'

const Index = () => {
  const handleBtnGoogleLoginClick = () => {
    // tslint:disable-next-line: no-console
    console.log('XXXX')
  }

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div>
        <Row type="flex" justify="center">
          <Col span={4}>
            <Button type="primary" onClick={handleBtnGoogleLoginClick}>
              Google
            </Button>
            <Button type="primary">Facebook</Button>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default Index
