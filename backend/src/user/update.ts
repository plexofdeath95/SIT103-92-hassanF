import { Request, Response } from 'express';
import pool from '../db';
import { OkPacket } from 'mysql2/promise';

async function updateUser(req: Request, res: Response) {
  let connection;
  try {
    const { id } = req.params;
    const { Username, Email, SubscriptionType } = req.body;
    
    if (!id) return res.status(400).send('ID is required!');
    
    connection = await pool.getConnection();

    const [results] = await connection.query<OkPacket>('UPDATE user SET Username = ?, Email = ?, SubscriptionType = ? WHERE UserID = ?', [Username, Email, SubscriptionType, id]);
    if (results.affectedRows === 0) return res.status(404).send('User not found!');

    res.send('User updated successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  } finally {
    if (connection) connection.release();
  }
}

export default updateUser;
