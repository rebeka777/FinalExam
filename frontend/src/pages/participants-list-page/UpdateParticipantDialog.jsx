import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';

const UpdateParticipantDialog = ({
  open,
  onClose,
  onUpdate,
  onCancel,
  participant,
}) => {
  const [fullName, setFullName] = useState(participant.full_name);
  const [email, setEmail] = useState(participant.email);
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    setDateOfBirth(participant.date_of_birth);
  }, [participant]);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleSubmit = () => {
    const updatedParticipant = {
      id: participant.id,
      full_name: fullName,
      email: email,
      date_of_birth: dateOfBirth,
    };
    onUpdate(updatedParticipant);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Participant</DialogTitle>
      <DialogContent>
        <TextField
          label='Full Name'
          value={fullName}
          onChange={handleFullNameChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Email'
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Date of Birth'
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
          fullWidth
          margin='normal'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant='contained' onClick={handleSubmit}>
          Update
        </Button>
        <Button variant='outlined' onClick={onCancel}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

UpdateParticipantDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  participant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date_of_birth: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateParticipantDialog;
