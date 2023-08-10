import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

const UpdateParticipantDialog = ({
  open,
  onClose,
  onUpdate,
  onCancel,
  participant,
}) => {
  const [fullName, setFullName] = useState(participant.full_name);
  const [email, setEmail] = useState(participant.email);
  const [dateOfBirth, setDateOfBirth] = useState(participant.date_of_birth);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Participant</DialogTitle>
      <DialogContent>
        <TextField
          label='Full Name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Date of Birth'
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          fullWidth
          margin='normal'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant='contained'
          onClick={() => {
            const updatedParticipant = {
              id: participant.id,
              full_name: fullName,
              email: email,
              date_of_birth: dateOfBirth,
            };
            onUpdate(updatedParticipant);
          }}
        >
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
    id: PropTypes.number,
    full_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date_of_birth: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateParticipantDialog;
