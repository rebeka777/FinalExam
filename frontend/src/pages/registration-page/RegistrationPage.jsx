import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/v1';
import {
  RegistrationPageContainer,
  Form,
  Input,
  Button,
  ErrorMessage,
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
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div>
          <label htmlFor='fullName'>Full Name:</label>
          <Input
            type='text'
            id='fullName'
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <Input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <Input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <Input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <Button type='submit'>Register</Button>
      </Form>
    </RegistrationPageContainer>
  );
};

export default RegistrationPage;
