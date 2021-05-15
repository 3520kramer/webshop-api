const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audit_products', {
    audit_product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    action_type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    user: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name_before: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    name_after: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    price_before: {
      type: DataTypes.FLOAT(6,2),
      allowNull: true
    },
    price_after: {
      type: DataTypes.FLOAT(6,2),
      allowNull: true
    },
    size_before: {
      type: DataTypes.ENUM('XS','S','M','L','XL'),
      allowNull: true
    },
    size_after: {
      type: DataTypes.ENUM('XS','S','M','L','XL'),
      allowNull: true
    },
    description_before: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    description_after: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    is_archived_before: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    is_archived_after: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    timestamp_before: {
      type: DataTypes.DATE,
      allowNull: true
    },
    timestamp_after: {
      type: DataTypes.DATE,
      allowNull: true
    },
    brands_brand_id_before: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    brands_brand_id_after: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    colors_color_id_before: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    colors_color_id_after: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    manufacturers_manufacturer_id_before: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    manufacturers_manufacturer_id_after: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    categories_category_id_before: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    categories_category_id_after: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'audit_products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "audit_product_id" },
        ]
      },
    ]
  });
};
