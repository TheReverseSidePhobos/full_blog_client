import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../Components/Layout/Layout';

const Wrapper = styled.div`
  background: #eef5ff;
  min-height: 100vh;
  width: 100%;
`;
const BackBtn = styled.button`
  min-width: 110px;
  margin: 10px 0 10px 0;
  display: inline-block;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  user-select: none;
  line-height: 1.5em;
  font-size: 18px;
  outline: none;
  background-color: #fff;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
    transition: 1s all easy;
  }
`;

const PostWrapper = styled.div`
  display: flex;
  background: #fefefe;
  border-radius: 15px;
  padding: 35px;
  margin-top: 50px;
  padding-bottom: 100px;
  position: relative;
`;

const PostItem = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  flex: 0 0 50%;
  justify-content: center;
  padding: 35px;
`;

const PostTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #3260a1;

  margin-bottom: 25px;
`;

const PostText = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #000;
`;

const RemovePostBtn = styled.a`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  background: #561215;
  box-shadow: 8px 10px 25px rgba(148, 174, 213, 0.15);
  border-radius: 10px;
  position: absolute;
  width: 139px;
  height: 25px;
  left: 50%;
  bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%);
  cursor: pointer;
`;

export async function getServerSideProps(ctx) {
  const res = await fetch(`http://localhost:5000/api/post/${ctx.query.id}`);
  const post = await res.json();
  if (!post) {
    return {
      notFound: true
    };
  }
  return {
    props: { post }
  };
}

const Post = ({ post }) => {
  const router = useRouter();

  const backHandle = () => {
    router.back();
  };
  if (!post) {
    return <div>Loading ...</div>;
  }

  const removePost = async () => {
    const id = post._id;
    await axios
      .post('http://localhost:5000/api/post/remove', { postId: post._id })
      .then(() => {
        router.push('/');
      });
  };
  return (
    <Wrapper>
      <Head>
        <title>NEXT BLOG | {post.title}</title>
      </Head>
      <Layout>
        <div className="container">
          <BackBtn onClick={backHandle}>
            <div className="btnContainer">
              <div className="backBtn">
                <Image src={'/icons/arrow_left.svg'} width={16} height={16} />
              </div>
              <div>Back</div>
            </div>
          </BackBtn>
          <PostWrapper>
            <PostItem>
              <PostTitle>{post.title}</PostTitle>
              <PostText>{post.text}</PostText>
            </PostItem>
            <PostItem>
              <img className="postImg" src={post.imgUrl} alt={post.title} />
            </PostItem>
            <RemovePostBtn onClick={removePost}>Remove</RemovePostBtn>
          </PostWrapper>
        </div>
      </Layout>
    </Wrapper>
  );
};

export default Post;
