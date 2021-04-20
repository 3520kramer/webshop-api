    /*  return {
        order: {
          order_id: orderOverView.order_id,
          created: orderOverView.created,
          comment: orderOverView.comment,
          shipper: orderOverView.shippers_shipper.company_name,
          shipper_price: orderOverView.shippers_shipper.price,
        },
        billing_customer: {
          first_name: orderOverView.customers_customer_id_billing_customer.first_name,
          last_name: orderOverView.customers_customer_id_billing_customer.last_name,
          street: orderOverView.customers_customer_id_billing_customer.street,
          email: orderOverView.customers_customer_id_billing_customer.email,
          phone: orderOverView.customers_customer_id_billing_customer.phone,
          cities_postal_code: orderOverView.customers_customer_id_billing_customer.cities_postal_code,
          countries_iso: orderOverView.customers_customer_id_billing_customer.countries_iso,
        },
        delivery_customer: {
          first_name: orderOverView.customers_customer_id_billing_customer.first_name,
          last_name: orderOverView.customers_customer_id_billing_customer.last_name,
          street: orderOverView.customers_customer_id_billing_customer.street,
          cities_postal_code: orderOverView.customers_customer_id_billing_customer.cities_postal_code,
          countries_iso: orderOverView.customers_customer_id_billing_customer.countries_iso,
        },
        productsInOrder,
        total: ""
  
  
      };
  */


      /*
    //console.log("result", result);
    const orderOverView = await model.orders.findAll({
      where: { order_id: result[0].orders_order_id },
      required: true,
      include: [{
        model: model.customers,
        as: "customers_customer_id_billing_customer",
        required: true
      },
      {
        model: model.shippers,
        as: "shippers_shipper",
        required: true
      },
      {
        model: model.order_product,
        as: "order_products",
        required: true,
        include: [{
          model: model.products,
          as: "products_product",
          required: true,
        }]
      }]
    });

    let total = 0;
    orderOverView.order_products.forEach(product => total += product.price * product.quantity);
    console.log("productsInOrder", total);*/