import { Request, Response } from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2/promise';

async function readUser(req: Request, res: Response) {
  let connection;
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send('ID is required!');
    
    connection = await pool.getConnection();
    
    const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user WHERE UserID = ?', [id]);
    if (rows.length === 0) return res.status(404).send('User not found!');
    
    res.send(rows[0]);
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

async function readAllUsers(req: Request, res: Response) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user');
    res.send(rows);
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


export default {readUser, readAllUsers};
