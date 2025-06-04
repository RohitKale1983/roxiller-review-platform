const db = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const User = db.User;
const Rating = db.Rating;

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect." });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await db.Store.count();
    const totalRatings = await Rating.count();

    return res.status(200).json({
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    const filter = {};

    if (name) filter.name = { [Op.iLike]: `%${name}%` };
    if (email) filter.email = { [Op.iLike]: `%${email}%` };
    if (address) filter.address = { [Op.iLike]: `%${address}%` };
    if (role) filter.role = role;

    const users = await User.findAll({
      where: filter,
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.Store,
          attributes: ["id", "name", "rating"],
        },
      ],
    });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
