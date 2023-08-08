import { useEffect, useState } from 'react';
import {
  Button,
  LinearProgress,
  Card,
  Stack,
  CardContent,
  Typography,
} from '@mui/material';
import {
  fetchParticipants,
  createParticipant,
  deleteParticipant,
  updateParticipant,
} from '../../api/v1';
import AddParticipantDialog from './AddParticipantDialog';
import UpdateParticipantDialog from './UpdateParticipantDialog';
import { StyledCardContainer } from './ParticipantsListPage.styled';

const ParticipantsListPage = () => {
  const [participantsList, setParticipantsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const fetchParticipantsList = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await fetchParticipants(token);
      setParticipantsList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipantsList();
  }, []);

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
  };

  const handleAddParticipant = async (body) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const { full_name, email, date_of_birth } = body;
      const formattedDateOfBirth = date_of_birth.split('T')[0];

      await createParticipant(token, full_name, email, formattedDateOfBirth);

      const { data } = await fetchParticipants(token);

      setParticipantsList(data);

      setIsAddDialogOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDialogOpen = (participant) => {
    setSelectedParticipant(participant);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleUpdateParticipant = async (updatedParticipant) => {
    console.log('ParticipantId to update:', updatedParticipant.id);
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const { id, full_name, email, date_of_birth } = updatedParticipant;
      const formattedDateOfBirth = new Date(date_of_birth)
        .toISOString()
        .split('T')[0];

      await updateParticipant(
        token,
        id,
        full_name,
        email,
        formattedDateOfBirth
      );

      setParticipantsList((prevParticipantsList) =>
        prevParticipantsList.map((participant) =>
          participant.id === id
            ? {
                ...participant,
                full_name,
                email,
                date_of_birth: formattedDateOfBirth,
              }
            : participant
        )
      );

      setIsUpdateDialogOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteParticipant = async (participantId) => {
    console.log('ParticipantId to delete:', participantId);
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await deleteParticipant(token, participantId);
      fetchParticipantsList();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const card = (participantData) => (
    <>
      <CardContent>
        <Typography variant='h5'>{participantData.full_name}</Typography>
        <Typography paragraph={true}>{participantData.email}</Typography>
        <Typography paragraph={true}>
          {new Date(participantData.date_of_birth).toLocaleDateString()}
        </Typography>
      </CardContent>
      <Stack spacing={1} alignItems='center' pb={3}>
        <Button
          variant='outlined'
          disabled={isLoading}
          onClick={() => handleDeleteParticipant(participantData.id)}
        >
          Delete
        </Button>
        <Button
          variant='outlined'
          disabled={isLoading}
          onClick={() => handleUpdateDialogOpen(participantData)}
        >
          Update
        </Button>
      </Stack>
    </>
  );

  return (
    <>
      <Button
        variant='contained'
        size='medium'
        onClick={() => setIsAddDialogOpen(true)}
      >
        Add Participant
      </Button>

      {isLoading && <LinearProgress />}
      <StyledCardContainer>
        {participantsList.map((participant) => (
          <Card key={participant.id} variant='outlined'>
            {card(participant)}
          </Card>
        ))}
      </StyledCardContainer>

      {isAddDialogOpen && (
        <AddParticipantDialog
          open={isAddDialogOpen}
          onClose={handleAddDialogClose}
          onSave={handleAddParticipant}
          loading={isLoading}
        />
      )}

      {isUpdateDialogOpen && selectedParticipant && (
        <UpdateParticipantDialog
          open={isUpdateDialogOpen}
          onClose={handleUpdateDialogClose}
          onUpdate={handleUpdateParticipant}
          onCancel={handleUpdateDialogClose}
          participant={selectedParticipant}
        />
      )}
    </>
  );
};

export default ParticipantsListPage;
