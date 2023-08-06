import Footer from '../../components/footer/Footer';
import { Outlet } from 'react-router-dom';
import { StyledContainer } from './PageTemplateStyled';
import Header from '../../components/header/Header';

const PageTemplate = () => {
  return (
    <StyledContainer>
      <Header />
      <Outlet />
      <Footer />
    </StyledContainer>
  );
};

export default PageTemplate;
