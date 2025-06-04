const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import Models
db.User = require("./user.model")(sequelize, DataTypes);
db.Store = require("./store.model")(sequelize, DataTypes);
db.Rating = require("./rating.model")(sequelize, DataTypes);

// Relationships
db.User.hasMany(db.Rating, { foreignKey: "userId" });
db.Store.hasMany(db.Rating, { foreignKey: "storeId" });
db.Rating.belongsTo(db.User, { foreignKey: "userId" });
db.Rating.belongsTo(db.Store, { foreignKey: "storeId" });

// Store Owner Relation
db.User.hasMany(db.Store, { foreignKey: "ownerId" });
db.Store.belongsTo(db.User, { foreignKey: "ownerId" });

module.exports = db;
