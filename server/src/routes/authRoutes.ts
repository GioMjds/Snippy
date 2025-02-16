import { Router } from "express";
import { getAccessTokenGitHub, getGitHubUserData, googleCallback, googleLogin } from "../controllers/authController";

const router = Router();

router.get('/getAccessTokenGitHub', getAccessTokenGitHub);
router.get('/getGitHubUserData', getGitHubUserData);
router.get('/google/login', googleLogin);
router.get('/google/callback', googleCallback);

export default router;