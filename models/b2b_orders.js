const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('b2b_orders', {
    b2b_order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    warehouses_warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'warehouse_id'
      }
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
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    }
  }, {
    sequelize,
    tableName: 'b2b_orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "b2b_order_id" },
        ]
      },
      {
        name: "fk_b2b_orders_warehouses1_idx",
        using: "BTREE",
        fields: [
          { name: "warehouses_warehouse_id" },
        ]
      },
      {
        name: "fk_b2b_orders_manufacturers1_idx",
        using: "BTREE",
        fields: [
          { name: "manufacturers_manufacturer_id" },
        ]
      },
      {
        name: "fk_b2b_orders_employees1_idx",
        using: "BTREE",
        fields: [
          { name: "employees_employee_id" },
        ]
      },
    ]
  });
};
