import { Router } from "express";
import { getAccessTokenGitHub, getGitHubUserData } from "../controllers/authController";

const router = Router();

router.get('/getAccessTokenGitHub', getAccessTokenGitHub);
router.get('/getGitHubUserData', getGitHubUserData);

export default router;