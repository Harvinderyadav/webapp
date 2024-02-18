import express from "express";
import { deleteUser, getAllUsers, getUser, newUser, } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();
console.log("stage1");
app.post("/new", newUser);
//user/new  -> user will be added as prefix.
app.get("/all", adminOnly, getAllUsers);
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);
export default app;
