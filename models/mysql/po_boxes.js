const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('po_boxes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    countries_iso: {
      type: DataTypes.STRING(2),
      allowNull: false,
      references: {
        model: 'countries',
        key: 'iso'
      }
    },
    cities_postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'postal_code'
      }
    }
  }, {
    sequelize,
    tableName: 'po_boxes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_po_boxes_countries1_idx",
        using: "BTREE",
        fields: [
          { name: "countries_iso" },
        ]
      },
      {
        name: "fk_po_boxes_cities1_idx",
        using: "BTREE",
        fields: [
          { name: "cities_postal_code" },
        ]
      },
    ]
  });
};
