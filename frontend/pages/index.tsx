import Link from 'next/link';

const linkStyle = {
  marginRight: 15
}

const Index = () => (
  <div>
    <Link href="/about">
      <a style={linkStyle}>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);

export default Index;
