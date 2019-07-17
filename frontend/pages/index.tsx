import Link from 'next/link';
import { DatePicker } from 'antd';

const linkStyle = {
  marginRight: 15
}

const Index = () => (
  <div>
    <Link href="/about">
      <a style={linkStyle}>About Page</a>
    </Link>
    <p>Hello Next.js</p>
    <DatePicker/>
  </div>
);

export default Index;
