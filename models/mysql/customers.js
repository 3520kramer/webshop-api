const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers', {
    customer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cities_postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'postal_code'
      }
    },
    countries_iso: {
      type: DataTypes.STRING(2),
      allowNull: false,
      references: {
        model: 'countries',
        key: 'iso'
      }
    },
    users_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    is_user_profile: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'customers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "fk_customers_cities1_idx",
        using: "BTREE",
        fields: [
          { name: "cities_postal_code" },
        ]
      },
      {
        name: "fk_customers_countries1_idx",
        using: "BTREE",
        fields: [
          { name: "countries_iso" },
        ]
      },
      {
        name: "fk_customers_users1_idx",
        using: "BTREE",
        fields: [
          { name: "users_user_id" },
        ]
      },
    ]
  });
};
