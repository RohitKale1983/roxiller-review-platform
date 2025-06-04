const db = require("../models");
const { Op } = require("sequelize");
const Store = db.Store;
const User = db.User;
const Rating = db.Rating;

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const owner = await User.findByPk(ownerId);
    if (!owner || owner.role !== "store_owner") {
      return res.status(400).json({ message: "Invalid store owner ID." });
    }

    const store = await Store.create({ name, email, address, ownerId });
    return res.status(201).json({ message: "Store created.", store });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const { name, email, address, sortBy = "name", order = "ASC" } = req.query;

    const filters = {};
    if (name) filters.name = { [Op.iLike]: `%${name}%` };
    if (email) filters.email = { [Op.iLike]: `%${email}%` };
    if (address) filters.address = { [Op.iLike]: `%${address}%` };

    const stores = await Store.findAll({
      where: filters,
      order: [[sortBy, order]],
      include: [{ model: User, attributes: ["name", "email"], as: "User" }],
    });

    return res.status(200).json(stores);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getMyStoreDetails = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
      include: [
        {
          model: Rating,
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
      ],
    });

    if (!store) return res.status(404).json({ message: "No store found." });

    return res.status(200).json(store);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
