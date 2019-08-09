import Link from 'next/link'
import { DatePicker } from 'antd'
import Layout from '@components/Layout'

const Index = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <div>
      <DatePicker />
    </div>
  </Layout>
)

export default Index
