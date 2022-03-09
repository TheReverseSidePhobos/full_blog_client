import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '../Button/Button';


const Nav = styled.nav`
  background: #fff;
  padding: 17px 0;
`;

const Navbaritem = styled.div`
  position: relative;
`;

const Logo = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #3260a1;
  cursor: pointer;
`;

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <Nav>
        <div className="container">
          <Navbaritem>
            <Link href={'/'}>
              <Logo>Next | blog</Logo>
            </Link>
            <Button
              
              href={'add_post'}
              text={'Add article'}
            ></Button>
            {/* <AddPostBtn onClick={() => router.push('/add_post')}>
              Add article
            </AddPostBtn> */}
          </Navbaritem>
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
