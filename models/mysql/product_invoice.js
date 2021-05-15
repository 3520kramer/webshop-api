const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_invoice', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gross_price: {
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
    invoices_invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'invoices',
        key: 'invoice_id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_invoice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
          { name: "invoices_invoice_id" },
        ]
      },
      {
        name: "fk_product_invoice_invoices1_idx",
        using: "BTREE",
        fields: [
          { name: "invoices_invoice_id" },
        ]
      },
    ]
  });
};
