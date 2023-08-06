import axios from 'axios';
const baseURL = 'http://localhost:8080/';
export const login = (email, password) =>
  axios.post(`${baseURL}login`, { email, password });
export const register = (full_name, email, password) =>
  axios.post(`${baseURL}register`, { full_name, email, password });
export const fetchParticipants = (token) =>
  axios.get(`${baseURL}participants`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createParticipant = (token, full_name, email, date_of_birth) =>
  axios.post(
    `${baseURL}participants`,
    { full_name, email, date_of_birth },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const deleteParticipant = (token, participantId) =>
  axios.delete(`${baseURL}participants/${participantId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateParticipant = (
  token,
  participantId,
  full_name,
  email,
  date_of_birth
) =>
  axios.put(
    `${baseURL}participants/${participantId}`,
    { full_name, email, date_of_birth },
    { headers: { Authorization: `Bearer ${token}` } }
  );
