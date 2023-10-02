import { Router } from "express";
import noteController from "../controller/noteController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { noteSchema, colorSchema } from "../schema/noteSchema.js";

const noteRouter = Router();

noteRouter.get("/", noteController.getNotes);
noteRouter.post("/", validateSchema(noteSchema), noteController.postNote);
noteRouter.delete("/:id", noteController.deleteNote);
noteRouter.put("/favorite/:id", noteController.favoriteNote);
noteRouter.put(
  "/color/:id",
  validateSchema(colorSchema),
  noteController.editNoteColor
);
noteRouter.put("/content/:id", noteController.editNoteContent);

export default noteRouter;
