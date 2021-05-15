const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
    employee_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    salary: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false
    },
    job_title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cpr: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: "cpr_UNIQUE"
    },
    hired_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employees',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "cpr_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cpr" },
        ]
      },
    ]
  });
};
