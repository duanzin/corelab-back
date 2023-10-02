import joi from "joi";

export const noteSchema = joi.object({
    title: joi.string().min(1).max(24).required(),
    text: joi.string().min(1).max(300).required()
  });

export const colorSchema = joi.object({
    color: joi.string().required()
})