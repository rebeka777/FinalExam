import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import PropTypes from 'prop-types';

const AddParticipantDialog = ({ open, onClose, onSave, loading }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  return (
    <Dialog
      open={open}
      maxWidth='sm'
      fullWidth
      onClose={!loading ? onClose : undefined}
    >
      <DialogTitle>Add new participant</DialogTitle>
      <DialogContent>
        <Stack pt={2} spacing={2}>
          <TextField
            fullWidth
            label='Full Name'
            value={fullName}
            disabled={loading}
            onChange={(e) => setFullName(e.target.value)}
          />
          <DatePicker
            label='Date of Birth'
            value={dateOfBirth}
            disabled={loading}
            onChange={(date) => setDateOfBirth(date)}
          />
          <TextField
            fullWidth
            label='Email'
            type='email'
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant='contained'
          disabled={loading}
          onClick={() =>
            onSave({
              full_name: fullName,
              email,
              date_of_birth: dateOfBirth.toISOString().substring(0, 10),
            })
          }
        >
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
