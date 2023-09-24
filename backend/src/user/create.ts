import { Request, Response } from 'express';
import pool from '../db';

async function createUser(req: Request, res: Response) {
  let connection;
  try {
    const { Username, Email, Password, SubscriptionType } = req.body;
    
    // Validation
    if (!Username || !Email || !Password || !SubscriptionType) {
      return res.status(400).send('All fields are required!');
    }

    connection = await pool.getConnection();
    await connection.query('INSERT INTO user (Username, Email, Password, SubscriptionType) VALUES (?, ?, ?, ?)', [Username, Email, Password, SubscriptionType]);

    res.send('User created successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  } finally {
    if (connection) connection.release();
  }
}

export default createUser;
