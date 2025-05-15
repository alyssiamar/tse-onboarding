import { RequestHandler } from "express";
//import task from "src/models/task";
import TaskModel from "src/models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const task = await TaskModel.find();
    await task.sort(Date.now);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
