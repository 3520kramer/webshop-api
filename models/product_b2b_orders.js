const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_b2b_orders', {
    b2b_orders_b2b_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'b2b_orders',
        key: 'b2b_order_id'
      }
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_b2b_orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "b2b_orders_b2b_order_id" },
          { name: "products_product_id" },
        ]
      },
      {
        name: "fk_product_b2b_orders_b2b_orders1_idx",
        using: "BTREE",
        fields: [
          { name: "b2b_orders_b2b_order_id" },
        ]
      },
      {
        name: "fk_product_b2b_orders_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
        ]
      },
    ]
  });
};
