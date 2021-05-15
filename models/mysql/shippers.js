const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shippers', {
    shipper_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    delivery_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(5,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'shippers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "shipper_id" },
        ]
      },
    ]
  });
};
