import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/v1';
import {
  LoginPageContainer,
  Form,
  Input,
  Button,
  ErrorMessage,
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
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <Input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type='submit'>Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </LoginPageContainer>
  );
};

export default LoginPage;
