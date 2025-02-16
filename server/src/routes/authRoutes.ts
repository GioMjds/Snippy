import { Router } from "express";
import { 
    getAccessTokenGitHub, 
    getGitHubUserData, 
    googleFrontendCallback,
} from "../controllers/authController";

const router = Router();

// GitHub OAuth Routes
router.get('/getAccessTokenGitHub', getAccessTokenGitHub);
// router.get('/getGitHubUserData', getGitHubUserData);

// Google OAuth Routes
router.post('/google/frontend-callback', googleFrontendCallback);

export default router;