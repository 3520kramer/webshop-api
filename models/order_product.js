const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_product', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(6,2),
      allowNull: false
    },
    products_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    orders_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
          { name: "orders_order_id" },
        ]
      },
      {
        name: "fk_order_product_orders1_idx",
        using: "BTREE",
        fields: [
          { name: "orders_order_id" },
        ]
      },
    ]
  });
};
