const express = require('express');
const { register, login, getMe, getSocialAuthUrl, googleCredentialLogin, updateProfile, updatePassword, deleteAccount, socialAuthCallback } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);
router.delete('/account', deleteAccount);
router.post('/social/google/credential', googleCredentialLogin);
router.get('/social/:provider/url', getSocialAuthUrl);
router.get('/social/:provider/callback', socialAuthCallback);
router.get('/me', getMe);

module.exports = router;
