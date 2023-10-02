import { db } from "../config/database.js";
import { NextFunction, Request, Response } from "express";
import { NoteParams, CreateNoteParams } from "../protocols/noteProtocols.js";
import { QueryResult, QueryResultRow } from "pg";

async function getNotes(req: Request, res: Response, next: NextFunction) {
  try {
    const notes: QueryResult<NoteParams> = await db.query(
      `SELECT * FROM notes`
    );

    if (notes.rows.length === 0) {
      return res.status(200).send([]);
    }

    return res.status(200).send(notes.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function postNote(req: Request, res: Response, next: NextFunction) {
  const { title, text }: CreateNoteParams = req.body;
  try {
    await db.query(`INSERT INTO notes (title, text) VALUES($1,$2)`, [
      title,
      text,
    ]);
    const notes: QueryResult<NoteParams> = await db.query(
      `SELECT * FROM notes`
    );
    res.status(201).send(notes.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function deleteNote(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    await db.query(`DELETE FROM notes WHERE id = $1`, [id]);
    const notes: QueryResult<NoteParams> = await db.query(
      `SELECT * FROM notes`
    );
    res.status(200).send(notes.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function favoriteNote(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    const result: QueryResult<QueryResultRow> = await db.query(
      `SELECT favorite FROM notes WHERE id = $1`,
      [id]
    );
    const favorite: boolean = result.rows[0].favorite;
    const newFavoriteStatus = !favorite;
    await db.query(`UPDATE notes SET favorite=$1 WHERE id=$2`, [
      newFavoriteStatus,
      id,
    ]);
    const notes: QueryResult<NoteParams> = await db.query(
      `SELECT * FROM notes`
    );
    res.status(200).send(notes.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function editNoteColor(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    await db.query(`UPDATE notes SET color=$1 WHERE id=$2`, [
      req.body.color as string,
      id,
    ]);
    const notes: QueryResult<NoteParams> = await db.query(
      `SELECT * FROM notes`
    );
    res.status(200).send(notes.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function editNoteContent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, text } = req.body;
  const id: number = parseInt(req.params.id);
  try {
    await db.query(`UPDATE notes SET title=$1, text=$2 WHERE id=$3`, [
      title,
      text,
      id,
    ]);
    const notes = await db.query(`SELECT * FROM notes`);
    res.status(200).send(notes.rows);
  } catch (err) {
    next(err);
  }
}

export default {
  getNotes,
  postNote,
  deleteNote,
  favoriteNote,
  editNoteColor,
  editNoteContent,
};
