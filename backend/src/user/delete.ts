import { Request, Response } from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2/promise';

async function deleteUser(req: Request, res: Response) {
  let connection;
  try {
    const { id } = req.params;
    
    // Validate id
    if (!id) return res.status(400).send('ID is required!');
    
    connection = await pool.getConnection();

    // Check if user exists
    const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user WHERE UserID = ?', [id]);
    if (rows.length === 0) return res.status(404).send('User not found!');
    
    await connection.query('DELETE FROM user WHERE UserID = ?', [id]);
    
    res.send('User deleted successfully');
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

export default deleteUser;
