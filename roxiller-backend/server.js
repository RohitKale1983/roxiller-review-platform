const app = require("./app");
const db = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: false }).then(() => {
  console.log("✅ Database synced.");
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});
