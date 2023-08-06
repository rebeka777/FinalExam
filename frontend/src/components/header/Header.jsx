import { StyledLinksDiv, StyledNavigation } from './Header.styled';

import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
const Header = () => {
  const links = [
    { title: 'Login', to: '/login' },
    { title: 'Register', to: '/register' },
  ];

  return (
    <>
      <StyledNavigation>
        <Link component={RouterLink} to='/'></Link>
        <StyledLinksDiv>
          {links.map((link) => (
            <Link
              key={link.title}
              underline='none'
              fontWeight={600}
              component={RouterLink}
              to={link.to}
            >
              {link.title}
            </Link>
          ))}
        </StyledLinksDiv>
      </StyledNavigation>
    </>
  );
};

export default Header;
