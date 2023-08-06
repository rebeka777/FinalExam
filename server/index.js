const express = require('express');
const mysql = require('mysql2');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { authenticate } = require('./middleware');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(cors({ origin: 'http://localhost:5173' }));

const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'events',
};

const organizatorSchema = Joi.object({
  full_name: Joi.string().trim(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const dbPool = mysql.createPool(mysqlConfig).promise();

server.get('/', authenticate, (req, res) => {
  console.log(req.user);
  res.status(200).send({ message: 'Authorized' });
});

server.post('/login', async (req, res) => {
  let payload = req.body;

  try {
    payload = await organizatorSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);

    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const [data] = await dbPool.execute(
      `
SELECT * FROM organizators
WHERE email = ?
`,
      [payload.email]
    );

    if (!data.length) {
      return res.status(400).send({ error: 'Email or password did not match' });
    }

    const isPasswordMatching = await bcrypt.compare(
      payload.password,
      data[0].password
    );

    if (isPasswordMatching) {
      const token = jwt.sign(
        {
          email: data[0].email,
          id: data[0].id,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).send({ token });
    }

    return res.status(400).send({ error: 'Email or password did not match' });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.post('/register', async (req, res) => {
  let payload = req.body;

  try {
    payload = await organizatorSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);

    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    const [response] = await dbPool.execute(
      `
INSERT INTO organizators (full_name, email, password)
VALUES (?, ?, ?)
`,
      [payload.full_name, payload.email, encryptedPassword]
    );
    const token = jwt.sign(
      {
        email: payload.email,
        id: response.insertId,
        full_name: payload.full_name,
      },
      process.env.JWT_SECRET
    );
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.get('/participants', authenticate, async (req, res) => {
  try {
    const organizatorId = req.user.id;
    const [data] = await dbPool.execute(
      `
SELECT participants.id, participants.full_name, participants.email, participants.date_of_birth
FROM events
INNER JOIN participants ON events.id = participants.events_id
WHERE events.organizators_id = ?
`,
      [organizatorId]
    );

    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.post('/participants', authenticate, async (req, res) => {
  const { full_name, email, date_of_birth } = req.body;
  const organizatorId = req.user.id;

  try {
    const [event] = await dbPool.execute(
      `
SELECT id
FROM events
WHERE organizators_id = ?
`,
      [organizatorId]
    );
    const [result] = await dbPool.execute(
      `
INSERT INTO participants (full_name, email, date_of_birth, events_id)
VALUES (?, ?, ?, ?)
`,
      [full_name, email, date_of_birth, event[0].id]
    );
    if (result.affectedRows === 1) {
      return res.status(201).end();
    } else {
      return res.status(500).send({ error: 'Failed to insert participant' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.delete('/participants/:id', authenticate, async (req, res) => {
  try {
    const participantId = req.params.id;
    const organizatorId = req.user.id;

    const [existingParticipant] = await dbPool.execute(
      `
SELECT * FROM participants
WHERE id = ? AND events_id IN (
SELECT id FROM events WHERE organizators_id = ?
)
`,
      [participantId, organizatorId]
    );
    if (!existingParticipant.length) {
      return res.status(404).send({
        error: 'Participant not found or is not participating in your event',
      });
    }
    await dbPool.execute(
      `
DELETE FROM participants
WHERE id = ?
`,
      [participantId]
    );

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.put('/participants/:id', authenticate, async (req, res) => {
  try {
    const { full_name, email, date_of_birth } = req.body;
    const participantId = req.params.id;
    const organizatorId = req.user.id;
    if (
      !full_name ||
      full_name.trim() === '' ||
      !email ||
      email.trim() === '' ||
      !date_of_birth
    ) {
      return res
        .status(400)
        .send({ error: 'Full name, email, and date of birth are required' });
    }
    const [existingParticipant] = await dbPool.execute(
      `
SELECT * FROM participants
WHERE id = ? AND events_id IN (
SELECT id FROM events WHERE organizators_id = ?
)
`,
      [participantId, organizatorId]
    );
    if (!existingParticipant.length) {
      return res.status(404).send({
        error: 'Participant not found or is not participating in your event',
      });
    }
    await dbPool.execute(
      `
UPDATE participants
SET full_name = ?, email = ?, date_of_birth = ?
WHERE id = ?
`,
      [full_name, email, date_of_birth, participantId]
    );
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});
server.listen(process.env.PORT, () =>
  console.log(`Server is listening to ${process.env.PORT} port`)
);
