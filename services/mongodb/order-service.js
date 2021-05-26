const Order = require('../../models/mongodb/orders').OrderModel;
const schemes = require('../../models/mongodb/orders').schemes;

// works - user sends to own address
const createOrderForCustomerToOwnAddress = async (newOrder) => {
  console.log("createOrderForCustomerToOwnAddress", { newOrder });

  try {
    // take the current date/time and sets timestamp
    newOrder.created = new Date().toISOString();

    const createdOrder = await new Order(newOrder).save();
    // console.log("order", createdOrder);

    if (!createdOrder) throw new Error("Error creating order");


    let total = 0;
    // this calulates the total price of all the products bought
    createdOrder.products.forEach(product => total += product.price * product.quantity);

    console.log("total", total);

    return {order_overview: createdOrder, total: total};
    //return { order_overview: orderOverView.orderOverView, total: orderOverView.total };

  } catch (error) {
    return { error: error.message };
  }
}


// works. 
const getOneOrder = async (orderId) => {
  console.log("getOneOrder", orderId);
  try {
    const order = await Order.findById(orderId);

    if (!order) throw new Error("No order");

    console.log("order", order);

    return order;

  } catch (error) {
    return { error: error.message };
  }
}


// works with pagination
const getAllOrders = async (page, size) => {
  console.log("getAllOrders", { page, size });

  // taking input and parsing to int 
  const pageAsNumber = Number.parseInt(page);
  const sizeAsNumber = Number.parseInt(size);

  // initially 0 from the start
  let defaultPage = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    defaultPage = pageAsNumber;
  }

  // default response size of rows
  let defaultSize = 100;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 100000) {
    defaultSize = sizeAsNumber;
  }

  try {

    const orders = await Order.find({}).skip(defaultPage * defaultSize).limit(defaultSize);
    
    /*
     * Estimates the number of documents in the collection. 
     * estimatedDocumentCount() is faster than using countDocuments(), because it 
     * uses collection metadata rather than scanning the entire collection
     */
    const ordersCount = await Order.estimatedDocumentCount();

    return {
      onPage: defaultPage,
      // rounds off the total of pages 
      totalPages: Math.ceil(ordersCount / defaultSize),
      totalEntries: ordersCount,
      content: orders
    };

  } catch (error) {
    return { error: error.message };
  }
}


// works. basically like orders but with search 
const ordersSearch = async (key, value, page) => {
  console.log("ordersSearch", { key, value, page });

  // makes sure page is a number
  const pageAsNumber = Number.parseInt(page);

  // default size 
  let defaultSize = 100;

  // initially 0 from the start
  let defaultPage = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    defaultPage = pageAsNumber;
  }

  try {
    // Mongo doesn't allow searching with 'like' as sql. To search strings we can use regex, 
    // but with other datatypes we must search with operators such as $lt (less than), $gt (greater than) etc.
    // Therefore we need to now the type of the key which is used to search (both in document and subdocuments)
    let keyType;

    // List containg the order schema and its subdocument schemes 
    const schemaList = [
      Order.schema,
      schemes.employeeOrderSchema,
      schemes.productSchema,
      schemes.shipmentSchema,
      schemes.poBoxDeliverySchema,
      schemes.customerOrderSchema
    ];

    // Iterates the schemes to find if the key is present in one of them
    // using some() instead of forEach() as some() breaks if true is returned
    schemaList.some((schema, index) => {
      console.log("hey", index)

      // If there is a match we save the type of the key
      if (schema.path(key) !== undefined) {
        console.log("in if")
        keyType = schema.path(key).instance;
        return true;
      }

      if (index === schemaList.length - 1) {
        throw new Error(`Database object does not contain key "${key}"`);
      }
    });

    // List of sub document collections in the orders collection
    const subDocumentCollections = [
      'employee',
      'products',
      'shipment',
      'poBoxDelivery',
      'customerBilling',
      'customerDelivery'
    ]

    // Here we handle searching strings with regex - and all other data types with an exact value
    let orders;

    // Sets the search to use regex if it's a string 
    if (keyType === 'String') {
      const subDocumentSearchCondition = subDocumentCollections.map((subDocCollection) => {
        return { [`${subDocCollection}.${key}`]: { $regex: value } }
      })

      // We use the $or operator to search both documents and subdocuments 
      orders = await Order.find({ $or: [{ [key]: { $regex: value } }, { ...subDocumentSearchCondition }] }).skip(defaultPage * defaultSize).limit(defaultSize);

      // Sets the search to use exact values if it's not a string
    } else {
      const subDocumentSearchCondition = subDocumentCollections.map((subDocCollection) => {
        return { [`${subDocCollection}.${key}`]: value }
      })

      // We use the $or operator to search both documents and subdocuments 
      orders = await Order.find({ $or: [{ [key]: value }, { ...subDocumentSearchCondition }] }).skip(defaultPage * defaultSize).limit(defaultSize);
    }

    if (!orders || orders.length === 0) throw new Error("No orders");

    return {
      onPage: defaultPage,
      // rounds off the total of pages 
      totalPages: Math.ceil(orders.length / defaultSize),
      totalEntries: orders.length,
      content: orders
    };

  } catch (error) {
    return { error: error.message };
  }
}

// gets a overview of a certain users orders 
const getUsersOrders = async (user_id) => {
  try {

    //return orders;

  } catch (error) {
    return { error: error.message };
  }
}


module.exports = {
  createOrderForCustomerToOwnAddress,
  getOneOrder,
  getAllOrders,
  ordersSearch,
  getUsersOrders,
}



/*
// works - customer (no user) sends to PO box
const createOrderForCustomerToPO = async (newOrder, productsList, newCustomer) => {
  console.log("createOrderForCustomerToPO", { newOrder, productsList, newCustomer });

  try {

    //return { order_overview: orderOverView.orderOverView, total: orderOverView.total };

  } catch (error) {
    return { error: error.message };
  }
}


// handels creating the order, product. Return order_product
const createOrderAndProducts = async (productsList, newOrder, t) => {

  try {
    // sets order_status to not processed
    newOrder.order_status = "NOT PROCESSED";

    //return createdOrderProduct;
  } catch (error) {
    return { error: error.message };
  }
}


// works - gets the returned order with the product bought and a total
const getOrderOverView = async (orderId) => {
  console.log("orderId", orderId);
  try {

    //return { orderOverView: orderOverView, total: total };

  } catch (error) {
    return { error: error.message };
  }
}



*/