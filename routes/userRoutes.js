const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, getUserStats } = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(protect);
router.get('/', getUsers);
router.post('/', adminOnly, createUser);
router.put('/:id', adminOnly, updateUser);
router.delete('/:id', adminOnly, deleteUser);
router.get('/stats', getUserStats);

module.exports = router;
