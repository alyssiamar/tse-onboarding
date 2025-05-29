import { RequestHandler } from "express";
import UserModel from "src/models/user";
import { validationResult } from "express-validator";
import validationErrorParser from "src/util/validationErrorParser";
import createHttpError from "http-errors";

export const createUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { name, profilePictureURL } = req.body;

  try {
    // if there are errors, then this function throws an exception
    validationErrorParser(errors);

    const user = await UserModel.create({
      name: name,
      profilePictureURL: profilePictureURL,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // if the ID doesn't exist, then findById returns null
    const task = await UserModel.findById(id);

    if (task === null) {
      throw createHttpError(404, "Task not found.");
    }

    res.status(200).json(task);
  } catch (error) {
    // pass errors to the error handler
    next(error);
  }
};
