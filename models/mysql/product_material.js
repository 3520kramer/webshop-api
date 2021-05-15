const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_material', {
    products_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    materials_material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'materials',
        key: 'material_id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_material',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
          { name: "materials_material_id" },
        ]
      },
      {
        name: "fk_product_material_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
        ]
      },
      {
        name: "fk_product_material_materials1_idx",
        using: "BTREE",
        fields: [
          { name: "materials_material_id" },
        ]
      },
    ]
  });
};
