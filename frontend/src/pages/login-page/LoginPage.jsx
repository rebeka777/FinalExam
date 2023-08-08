import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/v1';
import {
  LoginPageContainer,
  Form,
  Input,
  Button,
  Div,
  Label,
  ErrorMessage,
  H1,
} from './LoginPage.styled';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      const token = response.data.token;

      console.log(token);

      localStorage.setItem('token', token);

      navigate('/participants');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <LoginPageContainer>
      <H1>Login</H1>
      <Form onSubmit={handleLogin}>
        <Div>
          <Label>Email:</Label>
          <Input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Div>
        <Div>
          <Label>Password:</Label>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Div>
        <Button type='submit'>Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </LoginPageContainer>
  );
};

export default LoginPage;
