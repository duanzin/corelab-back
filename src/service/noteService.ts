import noteRepository from "../repository/noteRepository";

async function selectNotes() {
  const notes = await noteRepository.getAll();
  if (notes.rows.length === 0) {
    return [];
  }
  return notes.rows;
}

async function insertNote(title: string, text: string) {
  await noteRepository.create(title, text);
  const notes = await noteRepository.getAll();
  return notes.rows;
}

async function removeNote(id: number) {
  await noteRepository.remove(id);
  const notes = await noteRepository.getAll();
  return notes.rows;
}

async function setAsFavorite(id: number) {
  const result = await noteRepository.getOne(id);
  const favorite: boolean = result.rows[0].favorite;
  const newFavoriteStatus = !favorite;
  await noteRepository.markOrUnmarkFavorite(newFavoriteStatus, id);
  const notes = await noteRepository.getAll();
  return notes.rows;
}

async function updateColor(color: string, id: number) {
  await noteRepository.changeColor(color, id);
  const notes = await noteRepository.getAll();
  return notes.rows;
}

async function updateContent(title: string, text: string, id: number) {
  await noteRepository.changeContent(title, text, id);
  const notes = await noteRepository.getAll();
  return notes.rows;
}

export default {
  selectNotes,
  insertNote,
  removeNote,
  setAsFavorite,
  updateColor,
  updateContent,
};
