import { db } from "../config/database";
import { QueryResult } from "pg";
import { NoteParams } from "../protocols/noteProtocols";

async function create(title: string, text: string) {
  await db.query(`INSERT INTO notes (title, text) VALUES($1,$2)`, [
    title,
    text,
  ]);
}

async function getAll(): Promise<QueryResult<NoteParams>> {
  const notes: QueryResult<NoteParams> = await db.query(`SELECT * FROM notes`);
  return notes;
}

async function getOne(id: number): Promise<QueryResult<NoteParams>> {
  const note = await db.query(`SELECT * FROM notes WHERE id = $1`, [id]);
  return note;
}

async function remove(id: number) {
  await db.query(`DELETE FROM notes WHERE id = $1`, [id]);
}

async function markOrUnmarkFavorite(newFavoriteStatus: boolean, id: number) {
  await db.query(`UPDATE notes SET favorite=$1 WHERE id=$2`, [
    newFavoriteStatus,
    id,
  ]);
}

async function changeColor(newColor: string, id: number) {
  await db.query(`UPDATE notes SET color=$1 WHERE id=$2`, [
    newColor as string,
    id,
  ]);
}

async function changeContent(title: string, text: string, id: number) {
  await db.query(`UPDATE notes SET title=$1, text=$2 WHERE id=$3`, [
    title,
    text,
    id,
  ]);
}

export default {
  create,
  getAll,
  getOne,
  remove,
  markOrUnmarkFavorite,
  changeColor,
  changeContent,
};
