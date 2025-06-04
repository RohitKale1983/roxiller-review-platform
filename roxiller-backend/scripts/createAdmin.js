const bcrypt = require("bcryptjs");
const db = require("../models");

(async () => {
  await db.sequelize.sync();

  const existing = await db.User.findOne({ where: { email: "admin@example.com" } });
  if (existing) return console.log("Admin already exists.");

  const hashed = await bcrypt.hash("Admin@123", 10);

  await db.User.create({
    name: "Admin User With Long Enough Name",
    email: "admin@example.com",
    password: hashed,
    address: "Admin HQ, Pune",
    role: "admin",
  });

  console.log("✅ Admin created: admin@example.com / Admin@123");
})();
