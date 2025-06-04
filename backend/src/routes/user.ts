/**
 * Task route requests.
 */

import express from "express";
import * as TaskController from "src/controllers/user";
import * as TaskValidator from "src/validators/user";

const router = express.Router();

router.get("/:id", TaskController.getUser);
// router.put("/:id", TaskValidator.createUser, TaskController.createUser);

router.post("/", TaskValidator.createUser, TaskController.createUser);

export default router;
