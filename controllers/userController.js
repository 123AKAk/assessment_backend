const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;

    const query = {};

    // Filter by search term (name or role)
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { role: { $regex: search, $options: 'i' } }
        ];
    }

    // Filter by status if provided
    if (status) {
        query.status = status;
    }

    const users = await User.find(query)
        .select('-password')
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({ users, totalPages: Math.ceil(total / limit) });
};

exports.createUser = async (req, res) => {
    const { name, email, password, role, image, status } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role, image, status });
    if (!user) return res.status(400).json({ message: 'Error creating user' });

    res.status(201).json(user);
};

exports.updateUser = async (req, res) => {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
};

exports.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted' });
};


exports.getUserStats = async (req, res) => {
    try {
      const [total, totalAdmins, totalUsers, totalInactive] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: 'Admin' }),
        User.countDocuments({ role: 'User' }),
        User.countDocuments({ status: 'inactive' })
      ]);
  
      res.json({
        totalUsers: total,
        totalAdmins,
        totalRegularUsers: totalUsers,
        totalInactiveUsers: totalInactive
      });
    } catch (err) {
      console.error('Error fetching user stats:', err);
      res.status(500).json({ message: 'Failed to fetch user statistics' });
    }
  };
  