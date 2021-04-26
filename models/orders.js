const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    shipped_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    order_status: {
      type: DataTypes.ENUM('NOT PROCESSED','PROCESSING','SHIPPED','CANCELLED'),
      allowNull: false
    },
    customers_customer_id_billing: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'customer_id'
      }
    },
    customers_customer_id_delivery: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'customer_id'
      }
    },
    shippers_shipper_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shippers',
        key: 'shipper_id'
      }
    },
    employees_employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    },
    po_boxes_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'po_boxes',
        key: 'id'
      }
    },
    warehouses_warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'warehouse_id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "fk_orders_customers1_idx",
        using: "BTREE",
        fields: [
          { name: "customers_customer_id_delivery" },
        ]
      },
      {
        name: "fk_orders_shippers1_idx",
        using: "BTREE",
        fields: [
          { name: "shippers_shipper_id" },
        ]
      },
      {
        name: "fk_orders_employees1_idx",
        using: "BTREE",
        fields: [
          { name: "employees_employee_id" },
        ]
      },
      {
        name: "fk_orders_po_boxes1_idx",
        using: "BTREE",
        fields: [
          { name: "po_boxes_id" },
        ]
      },
      {
        name: "fk_orders_warehouses1_idx",
        using: "BTREE",
        fields: [
          { name: "warehouses_warehouse_id" },
        ]
      },
      {
        name: "fk_orders_customers2_idx",
        using: "BTREE",
        fields: [
          { name: "customers_customer_id_billing" },
        ]
      },
      {
        name: "idx_created",
        using: "BTREE",
        fields: [
          { name: "created" },
        ]
      },
      {
        name: "idx_shipped",
        using: "BTREE",
        fields: [
          { name: "shipped_date" },
        ]
      },
    ]
  });
};
