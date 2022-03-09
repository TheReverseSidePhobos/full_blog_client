import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const AddPostBtn = styled.a`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  background: #67bfff;
  box-shadow: 8px 10px 25px rgba(148, 174, 213, 0.15);
  border-radius: 10px;
  position: absolute;
  width: 139px;
  height: 25px;
  left: 50%;
  top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%);
  cursor: pointer;
`;

const Button = ({ href, text }) => {
  const [showBtn, setShowBtn] = useState(true);

  const router = useRouter();
  useEffect(() => {
    console.log('router: ', router);
    if (router.pathname.includes('/add_post') || router.pathname.includes('/post/')) {
      setShowBtn(false);
    }
  }, []);
  return (
    <>
      <AddPostBtn
        className={showBtn ? '' : 'disabled'}
        onClick={() => router.push(href)}
      >
        {text}
      </AddPostBtn>
    </>
  );
};

export default Button;
