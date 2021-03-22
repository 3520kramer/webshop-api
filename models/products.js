const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(6,2),
      allowNull: false
    },
    size: {
      type: DataTypes.ENUM('XS','S','M','L','XL'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    brands_brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'brands',
        key: 'brand_id'
      }
    },
    colors_color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colors',
        key: 'color_id'
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
    categories_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_products_brands_idx",
        using: "BTREE",
        fields: [
          { name: "brands_brand_id" },
        ]
      },
      {
        name: "fk_products_colors1_idx",
        using: "BTREE",
        fields: [
          { name: "colors_color_id" },
        ]
      },
      {
        name: "fk_products_manufacturers1_idx",
        using: "BTREE",
        fields: [
          { name: "manufacturers_manufacturer_id" },
        ]
      },
      {
        name: "fk_products_category1_idx",
        using: "BTREE",
        fields: [
          { name: "categories_category_id" },
        ]
      },
    ]
  });
};
