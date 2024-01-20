import { NextFunction, Request, Response } from "express";
import { CreateNoteParams } from "../protocols/noteProtocols";
import noteService from "../service/noteService";

async function getNotes(req: Request, res: Response, next: NextFunction) {
  try {
    const notes = await noteService.selectNotes();
    return res.status(200).send(notes);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function postNote(req: Request, res: Response, next: NextFunction) {
  const { title, text }: CreateNoteParams = req.body;
  try {
    const notes = await noteService.insertNote(title, text);
    res.status(201).send(notes);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteNote(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    if (isNaN(id)) {
      const error = new Error(`${req.params.id} is not a valid number`);
      res.status(400).json({ error: error.message });
    } else {
      const notes = await noteService.removeNote(id);
      res.status(200).send(notes);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function favoriteNote(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    if (isNaN(id)) {
      const error = new Error(`${req.params.id} is not a valid number`);
      res.status(400).json({ error: error.message });
    } else {
      const notes = await noteService.setAsFavorite(id);
      res.status(200).send(notes);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function editNoteColor(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    if (isNaN(id)) {
      const error = new Error(`${req.params.id} is not a valid number`);
      res.status(400).json({ error: error.message });
    } else {
      const notes = await noteService.updateColor(req.body.color as string, id);
      res.status(200).send(notes);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function editNoteContent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, text }: CreateNoteParams = req.body;
  const id: number = parseInt(req.params.id);
  try {
    if (isNaN(id)) {
      const error = new Error(`${req.params.id} is not a valid number`);
      res.status(400).json({ error: error.message });
    } else {
      const notes = await noteService.updateContent(title, text, id);
      res.status(200).send(notes);
    }
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
