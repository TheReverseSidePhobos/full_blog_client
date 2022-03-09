import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import Layout from '../Components/Layout/Layout';

const Wrapper = styled.div`
  background: #eff5fe;
  height: 100vh;
  width: 100%;
  padding-bottom: 30px;
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 30px;
`;

const Post = styled.div`
  width: 350px;
  height: 270px;
  border-radius: 15px;
  margin-top: 50px;
  cursor: pointer;
  position relative;
  user-select: none;
  background: url('${(props) => props.bgImage}') center / cover no-repeat;
  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
    transition: 0.3s all easy;
  }
  &:active {
    opacity: 0.7;
  }
`;

const PostTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 15px 20px;
  position absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: black;
  background: white;
  border-radius: 0px 0px 15px 15px;
`;

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:5000/api/post`);
  const posts = await res.json();
  if (!posts) {
    return {
      notFound: true
    };
  }
  return {
    props: { posts }
  };
}

export default function Home({ posts }) {
  if (!posts) {
    return <div>Loading ...</div>;
  }
  return (
    <Wrapper>
      <Head>
        <title>NEXT BLOG | ARTICELS</title>
      </Head>
      <Layout>
        <div className="container">
          <PostsWrapper>
            {posts.map((post, i) => (
              <Link href={`/post/${post._id}`}>
                <Post bgImage={post.imgUrl}>
                  <PostTitle>{post.title}</PostTitle>
                </Post>
              </Link>
            ))}
          </PostsWrapper>
        </div>
      </Layout>
    </Wrapper>
  );
}
