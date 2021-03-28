const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoices', {
    invoice_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    received_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    manufacturers_manufacturer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'manufacturers',
        key: 'manufacturer_id'
      }
    },
    employees_employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    },
    b2b_orders_b2b_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'b2b_orders',
        key: 'b2b_order_id'
      }
    }
  }, {
    sequelize,
    tableName: 'invoices',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "invoice_id" },
        ]
      },
      {
        name: "fk_invoices_manufacturers1_idx",
        using: "BTREE",
        fields: [
          { name: "manufacturers_manufacturer_id" },
        ]
      },
      {
        name: "fk_invoices_employees1_idx",
        using: "BTREE",
        fields: [
          { name: "employees_employee_id" },
        ]
      },
      {
        name: "fk_invoices_b2b_orders1_idx",
        using: "BTREE",
        fields: [
          { name: "b2b_orders_b2b_order_id" },
        ]
      },
    ]
  });
};
