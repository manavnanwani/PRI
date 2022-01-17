import express from "express";

import { getUsers, addUser, editUser, getCount } from "../controllers/user.js";

const router = express.Router();

router.get("/getcount", getCount);
router.get("/getusers", getUsers);
router.post("/adduser", addUser);
router.patch("/edituser", editUser);

export default router;
