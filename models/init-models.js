var DataTypes = require("sequelize").DataTypes;
var _b2b_orders = require("./b2b_orders");
var _brands = require("./brands");
var _categories = require("./categories");
var _cities = require("./cities");
var _colors = require("./colors");
var _countries = require("./countries");
var _customers = require("./customers");
var _employees = require("./employees");
var _invoices = require("./invoices");
var _manufacturers = require("./manufacturers");
var _materials = require("./materials");
var _order_product = require("./order_product");
var _orders = require("./orders");
var _po_boxes = require("./po_boxes");
var _product_b2b_orders = require("./product_b2b_orders");
var _product_invoice = require("./product_invoice");
var _product_material = require("./product_material");
var _products = require("./products");
var _shippers = require("./shippers");
var _stocks = require("./stocks");
var _users = require("./users");
var _warehouses = require("./warehouses");

function initModels(sequelize) {
  var b2b_orders = _b2b_orders(sequelize, DataTypes);
  var brands = _brands(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var cities = _cities(sequelize, DataTypes);
  var colors = _colors(sequelize, DataTypes);
  var countries = _countries(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var invoices = _invoices(sequelize, DataTypes);
  var manufacturers = _manufacturers(sequelize, DataTypes);
  var materials = _materials(sequelize, DataTypes);
  var order_product = _order_product(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var po_boxes = _po_boxes(sequelize, DataTypes);
  var product_b2b_orders = _product_b2b_orders(sequelize, DataTypes);
  var product_invoice = _product_invoice(sequelize, DataTypes);
  var product_material = _product_material(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var shippers = _shippers(sequelize, DataTypes);
  var stocks = _stocks(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var warehouses = _warehouses(sequelize, DataTypes);

  b2b_orders.belongsToMany(products, { as: 'products_products', through: product_b2b_orders, foreignKey: "b2b_orders_b2b_order_id", otherKey: "products_product_id" });
  invoices.belongsToMany(products, { as: 'products_products', through: product_invoice, foreignKey: "invoices_invoice_id", otherKey: "products_product_id" });
  materials.belongsToMany(products, { as: 'products_products', through: product_material, foreignKey: "materials_material_id", otherKey: "products_product_id" });
  orders.belongsToMany(products, { as: 'products_products', through: order_product, foreignKey: "orders_order_id", otherKey: "products_product_id" });
  products.belongsToMany(b2b_orders, { as: 'b2b_orders_b2b_orders', through: product_b2b_orders, foreignKey: "products_product_id", otherKey: "b2b_orders_b2b_order_id" });
  products.belongsToMany(invoices, { as: 'invoices_invoices', through: product_invoice, foreignKey: "products_product_id", otherKey: "invoices_invoice_id" });
  products.belongsToMany(materials, { as: 'materials_materials', through: product_material, foreignKey: "products_product_id", otherKey: "materials_material_id" });
  products.belongsToMany(orders, { as: 'orders_orders', through: order_product, foreignKey: "products_product_id", otherKey: "orders_order_id" });
  products.belongsToMany(warehouses, { as: 'warehouses_warehouses', through: stocks, foreignKey: "products_product_id", otherKey: "warehouses_warehouse_id" });
  warehouses.belongsToMany(products, { as: 'products_products', through: stocks, foreignKey: "warehouses_warehouse_id", otherKey: "products_product_id" });
  invoices.belongsTo(b2b_orders, { as: "b2b_orders_b2b_order", foreignKey: "b2b_orders_b2b_order_id"});
  b2b_orders.hasMany(invoices, { as: "invoices", foreignKey: "b2b_orders_b2b_order_id"});
  product_b2b_orders.belongsTo(b2b_orders, { as: "b2b_orders_b2b_order", foreignKey: "b2b_orders_b2b_order_id"});
  b2b_orders.hasMany(product_b2b_orders, { as: "product_b2b_orders", foreignKey: "b2b_orders_b2b_order_id"});
  products.belongsTo(brands, { as: "brands_brand", foreignKey: "brands_brand_id"});
  brands.hasMany(products, { as: "products", foreignKey: "brands_brand_id"});
  products.belongsTo(categories, { as: "categories_category", foreignKey: "categories_category_id"});
  categories.hasMany(products, { as: "products", foreignKey: "categories_category_id"});
  customers.belongsTo(cities, { as: "cities_postal_code_city", foreignKey: "cities_postal_code"});
  cities.hasMany(customers, { as: "customers", foreignKey: "cities_postal_code"});
  po_boxes.belongsTo(cities, { as: "cities_postal_code_city", foreignKey: "cities_postal_code"});
  cities.hasMany(po_boxes, { as: "po_boxes", foreignKey: "cities_postal_code"});
  products.belongsTo(colors, { as: "colors_color", foreignKey: "colors_color_id"});
  colors.hasMany(products, { as: "products", foreignKey: "colors_color_id"});
  customers.belongsTo(countries, { as: "countries_iso_country", foreignKey: "countries_iso"});
  countries.hasMany(customers, { as: "customers", foreignKey: "countries_iso"});
  po_boxes.belongsTo(countries, { as: "countries_iso_country", foreignKey: "countries_iso"});
  countries.hasMany(po_boxes, { as: "po_boxes", foreignKey: "countries_iso"});
  orders.belongsTo(customers, { as: "customers_customer_id_billing_customer", foreignKey: "customers_customer_id_billing"});
  customers.hasMany(orders, { as: "orders", foreignKey: "customers_customer_id_billing"});
  orders.belongsTo(customers, { as: "customers_customer_id_delivery_customer", foreignKey: "customers_customer_id_delivery"});
  customers.hasMany(orders, { as: "customers_customer_id_delivery_orders", foreignKey: "customers_customer_id_delivery"});
  users.belongsTo(customers, { as: "customers_customer", foreignKey: "customers_customer_id"});
  customers.hasMany(users, { as: "users", foreignKey: "customers_customer_id"});
  b2b_orders.belongsTo(employees, { as: "employees_employee", foreignKey: "employees_employee_id"});
  employees.hasMany(b2b_orders, { as: "b2b_orders", foreignKey: "employees_employee_id"});
  invoices.belongsTo(employees, { as: "employees_employee", foreignKey: "employees_employee_id"});
  employees.hasMany(invoices, { as: "invoices", foreignKey: "employees_employee_id"});
  orders.belongsTo(employees, { as: "employees_employee", foreignKey: "employees_employee_id"});
  employees.hasMany(orders, { as: "orders", foreignKey: "employees_employee_id"});
  product_invoice.belongsTo(invoices, { as: "invoices_invoice", foreignKey: "invoices_invoice_id"});
  invoices.hasMany(product_invoice, { as: "product_invoices", foreignKey: "invoices_invoice_id"});
  b2b_orders.belongsTo(manufacturers, { as: "manufacturers_manufacturer", foreignKey: "manufacturers_manufacturer_id"});
  manufacturers.hasMany(b2b_orders, { as: "b2b_orders", foreignKey: "manufacturers_manufacturer_id"});
  invoices.belongsTo(manufacturers, { as: "manufacturers_manufacturer", foreignKey: "manufacturers_manufacturer_id"});
  manufacturers.hasMany(invoices, { as: "invoices", foreignKey: "manufacturers_manufacturer_id"});
  products.belongsTo(manufacturers, { as: "manufacturers_manufacturer", foreignKey: "manufacturers_manufacturer_id"});
  manufacturers.hasMany(products, { as: "products", foreignKey: "manufacturers_manufacturer_id"});
  product_material.belongsTo(materials, { as: "materials_material", foreignKey: "materials_material_id"});
  materials.hasMany(product_material, { as: "product_materials", foreignKey: "materials_material_id"});
  order_product.belongsTo(orders, { as: "orders_order", foreignKey: "orders_order_id"});
  orders.hasMany(order_product, { as: "order_products", foreignKey: "orders_order_id"});
  orders.belongsTo(po_boxes, { as: "po_box", foreignKey: "po_boxes_id"});
  po_boxes.hasMany(orders, { as: "orders", foreignKey: "po_boxes_id"});
  order_product.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(order_product, { as: "order_products", foreignKey: "products_product_id"});
  product_b2b_orders.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(product_b2b_orders, { as: "product_b2b_orders", foreignKey: "products_product_id"});
  product_invoice.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(product_invoice, { as: "product_invoices", foreignKey: "products_product_id"});
  product_material.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(product_material, { as: "product_materials", foreignKey: "products_product_id"});
  stocks.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(stocks, { as: "stocks", foreignKey: "products_product_id"});
  orders.belongsTo(shippers, { as: "shippers_shipper", foreignKey: "shippers_shipper_id"});
  shippers.hasMany(orders, { as: "orders", foreignKey: "shippers_shipper_id"});
  b2b_orders.belongsTo(warehouses, { as: "warehouses_warehouse", foreignKey: "warehouses_warehouse_id"});
  warehouses.hasMany(b2b_orders, { as: "b2b_orders", foreignKey: "warehouses_warehouse_id"});
  orders.belongsTo(warehouses, { as: "warehouses_warehouse", foreignKey: "warehouses_warehouse_id"});
  warehouses.hasMany(orders, { as: "orders", foreignKey: "warehouses_warehouse_id"});
  stocks.belongsTo(warehouses, { as: "warehouses_warehouse", foreignKey: "warehouses_warehouse_id"});
  warehouses.hasMany(stocks, { as: "stocks", foreignKey: "warehouses_warehouse_id"});

  return {
    b2b_orders,
    brands,
    categories,
    cities,
    colors,
    countries,
    customers,
    employees,
    invoices,
    manufacturers,
    materials,
    order_product,
    orders,
    po_boxes,
    product_b2b_orders,
    product_invoice,
    product_material,
    products,
    shippers,
    stocks,
    users,
    warehouses,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
