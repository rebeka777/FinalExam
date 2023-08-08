import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/v1';
import {
  RegistrationPageContainer,
  Form,
  Input,
  Button,
  ErrorMessage,
  H1,
  Label,
  Div,
} from './RegistrationPage.styled';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await register(fullName, email, password);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <RegistrationPageContainer>
      <H1>Register</H1>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Div>
          <Label htmlFor='fullName'>Full Name:</Label>
          <Input
            type='text'
            id='fullName'
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
        </Div>
        <Div>
          <Label htmlFor='email'>Email:</Label>
          <Input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Div>
        <Div>
          <Label htmlFor='password'>Password:</Label>
          <Input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </Div>
        <Div>
          <Label htmlFor='confirmPassword'>Confirm Password:</Label>
          <Input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </Div>
        <Button type='submit'>Register</Button>
      </Form>
    </RegistrationPageContainer>
  );
};

export default RegistrationPage;
