import { Router } from 'express';
import { 
    loginUser, 
    registerUser, 
    githubAuthCallback, 
    githubAuth,
    googleAuth, 
    githubAuthSuccess
} from '../controllers/usersController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.get('/github', githubAuth);
router.get('/github/callback', githubAuthCallback, githubAuthSuccess);

export default router;