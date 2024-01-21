import joi from "joi";

export const noteSchema = joi.object({
  title: joi.string().min(1).max(18).required(),
  text: joi.string().min(1).max(300).required(),
});

export const colorSchema = joi.object({
  color: joi.string().length(7).required(),
});
