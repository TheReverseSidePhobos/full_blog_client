import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../Components/Layout/Layout';

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

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background: #fff;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
`;

const InputFiled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  display: flex;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  padding: 5px 10px;
`;
const TextLabel = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 10px;
  color: #222222;
  letter-spacing: 2px;
`;

const TextArea = styled.textarea`
  font-style: normal;
  font-weight: 300;
  color: #222222;
  outline: none;
  border: 1px solid #e5e5e5;
  min-height: 100px;
  padding: 5px 10px;
  line-height: 21px;
`;
const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const AddBtn = styled.button`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  background: #67bfff;
  box-shadow: 8px 10px 25px rgba(148, 174, 213, 0.15);
  border-radius: 10px;
  width: 139px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
`;
const Add_post = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const addPost = async () => {
    try {
      await axios
        .post('http://localhost:5000/api/post/add', {
          title,
          text,
          imgUrl
        })
        .then(() => {
          router.push('/');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const router = useRouter();

  const backHandle = () => {
    router.back();
  };

  return (
    <Wrapper>
      <Head>
        <title>Main Page</title>
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
          <FormWrapper>
            <Form onSubmit={(e) => e.preventDefault()}>
              <InputFiled>
                <TextLabel>Title</TextLabel>
                <Input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </InputFiled>
              <InputFiled>
                <TextLabel>Text</TextLabel>
                <TextArea
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </InputFiled>
              <InputFiled>
                <TextLabel>img url </TextLabel>
                <Input
                  onChange={(e) => {
                    setImgUrl(e.target.value);
                  }}
                />
              </InputFiled>
              <InputFiled>
                <BtnWrapper>
                  <AddBtn onClick={addPost}>Add</AddBtn>
                </BtnWrapper>
              </InputFiled>
            </Form>
          </FormWrapper>
        </div>
      </Layout>
    </Wrapper>
  );
};

export default Add_post;
