import { Router } from "express";
import { getAllUsers } from "../controllers/usersController";
import { isAuthenticated } from "../middlewares/middleware";

const router = Router();

router.get('/', isAuthenticated, getAllUsers);

export default router;