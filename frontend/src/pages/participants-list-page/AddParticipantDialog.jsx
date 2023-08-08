import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import styled from 'styled-components';
const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 10px;
`;

const AddParticipantDialog = ({ open, onClose, onSave, loading }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };

  const handleSubmit = () => {
    onSave({
      full_name: fullName,
      email,
      date_of_birth: dateOfBirth.toISOString().substring(0, 10),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Add New Participant</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Full Name'
          value={fullName}
          disabled={loading}
          onChange={handleFullNameChange}
        />
        <DatePicker
          label='Date of Birth'
          value={dateOfBirth}
          disabled={loading}
          onChange={handleDateOfBirthChange}
        />
        <TextField
          fullWidth
          label='Email'
          type='email'
          value={email}
          disabled={loading}
          onChange={handleEmailChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant='contained' disabled={loading} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddParticipantDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AddParticipantDialog;
