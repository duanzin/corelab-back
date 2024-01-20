import { Router } from "express";
import noteController from "../controller/noteController";
import { validateSchema } from "../middleware/validateSchema";
import { noteSchema, colorSchema } from "../schema/noteSchema";

const noteRouter = Router();

noteRouter.get("/", noteController.getNotes);
noteRouter.post("/", validateSchema(noteSchema), noteController.postNote);
noteRouter.delete("/:id", noteController.deleteNote);
noteRouter.patch("/favorite/:id", noteController.favoriteNote);
noteRouter.patch(
  "/color/:id",
  validateSchema(colorSchema),
  noteController.editNoteColor
);
noteRouter.put(
  "/:id",
  validateSchema(noteSchema),
  noteController.editNoteContent
);

export default noteRouter;
