import { RequestHandler } from "express";
import TaskModel from "src/models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.find();
    await TaskModel.prototype.sort(Date.now);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
