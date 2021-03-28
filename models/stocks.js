const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stocks', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock_location: {
      type: DataTypes.STRING(10),
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
    warehouses_warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'warehouses',
        key: 'warehouse_id'
      }
    }
  }, {
    sequelize,
    tableName: 'stocks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
          { name: "warehouses_warehouse_id" },
        ]
      },
      {
        name: "fk_stocks_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
        ]
      },
      {
        name: "fk_stocks_warehouses1_idx",
        using: "BTREE",
        fields: [
          { name: "warehouses_warehouse_id" },
        ]
      },
    ]
  });
};
