const db = require("../models");
const Rating = db.Rating;
const Store = db.Store;

exports.submitOrUpdateRating = async (req, res) => {
  const userId = req.user.id;
  const { storeId, value } = req.body;

  if (value < 1 || value > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  try {
    // Check if the store exists
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: "Store not found." });

    // Check if rating already exists
    let rating = await Rating.findOne({ where: { userId, storeId } });

    if (rating) {
      rating.value = value;
      await rating.save();
    } else {
      rating = await Rating.create({ userId, storeId, value });
    }

    // Recalculate average rating
    const ratings = await Rating.findAll({ where: { storeId } });
    const average =
      ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;

    store.rating = average.toFixed(2);
    await store.save();

    return res.status(200).json({ message: "Rating submitted.", rating, average });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getMyRatings = async (req, res) => {
  try {
    const userRatings = await Rating.findAll({
      where: { userId: req.user.id },
      include: [{ model: Store, attributes: ["name", "address", "rating"] }],
    });

    return res.status(200).json(userRatings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
