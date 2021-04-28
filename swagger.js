const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './routes/customer-routes.js',
    './routes/login-routes.js',
    './routes/order-routes.js',
    './routes/product-routes.js',
    './routes/user-routes.js'
]

const doc = {
    // info: General information about the API, such as: version, title and description.
    info: {
        version: "1.0.0",
        title: "Webshop API",
        description: "Documentation for webshop API"
    },
    // host: Path and port where your API will start.
    host: "localhost:3000",
    // basePath: This is the root of your project.
    basePath: "/",
    // schemes: These are the protocols used.
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Customer",
            "description": "CR for customer"
        },
        {
            "name": "Login",
            "description": "Login for the different types: User/Employee/Admin"
        },
        {
            "name": "Order",
            "description": "CR for order with search"
        },
        {
            "name": "Product",
            "description": "CRUD for product"
        },
        {
            "name": "User",
            "description": "CRUD for user, with search"
        },
    ],
    definitions: {

        AddCustomer: {
            customer: {
                "first_name": "David",
                "last_name": "Clements",
                "street": "59161 Chandler Rapids",
                "email": "nguyenpatrick@gmail.com",
                "phone": "84081093",
                "cities_postal_code": 9000,
                "countries_iso": "SE",
                "users_user_id": 15,
                "is_user_profile": 0
            }
        },


        AddUser: {
            user: {
                "username": "oliver1",
                "password": "c7230e5e7786d6d996a586b5a3616eec",
                "created_date": "2011-07-29",
                "is_archived": 0,
                "last_logged_in": "2006-05-29",
                "customers": {
                    "first_name": "Jennifer",
                    "last_name": "Chandler",
                    "street": "8650 Michael Grove",
                    "email": "gjoseph@gmail.com",
                    "phone": "40949002",
                    "cities_postal_code": 1000,
                    "countries_iso": "DK",
                    "users_user_id": 123,
                    "is_user_profile": 1
                }
            }

        },

        LoginUser: {
            login: {
                "username": "user1",
                "password": "user1kode"
            }
        },
        LoginEmployee: {
            login: {
                "email": "admin@gmail.com",
                "password": "adminkode"
            }
        },
        RegisterUser: {
            user: {
                "username": "oliv3f342",
                "password": "madoli123",
                "created_date": "2011-07-29",
                "is_archived": 0,
                "last_logged_in": "2006-05-29",
                "customers": {
                    "first_name": "Jennifer",
                    "last_name": "Chandler",
                    "street": "8650 Michael Grove",
                    "email": "gjoseph@gmail.com",
                    "phone": "40949002",
                    "cities_postal_code": 1000,
                    "countries_iso": "DK",
                    "users_user_id": 123,
                    "is_user_profile": 1
                }
            }
        },



        EditUser: {
            user: {
                "user_id": 16,
                "username": "sørfeneftfffffaf2ffffftfsffd32s",
                "password": "fjksdjfkljsdaf",
                "created_date": "2021-03-14",
                "is_archived": 0,
                "last_logged_in": "2018-11-27",
                "customers": {
                    "first_name": "Alexander",
                    "last_name": "Jensen",
                    "street": "6113 Frederick Trail Suite 882",
                    "email": "patricifa73@ho2fff3ffdtmfffsdfsdilfff.comes2",
                    "phone": "46437375",
                    "cities_postal_code": 2000,
                    "countries_iso": "DK",
                    "is_user_profile": 1
                }
            }
        },

        OrderTypeOne: {
            shipment_type: 1,
            order: {
                "comment": "blablabla",
                "shippers_shipper_id": 3,
                "warehouses_warehouse_id": 1,
            },
            product: [
                { "product_id": 1, "quantity": 1 },
                { "product_id": 3, "quantity": 3 },
                { "product_id": 2, "quantity": 1 },
                { "product_id": 7, "quantity": 5 },
                { "product_id": 4, "quantity": 2 },
            ],
        },
        OrderTypeTwo: {
            shipment_type: 2,
            customer: {
                "first_name": "David",
                "last_name": "Clements",
                "street": "59161 Chandler Rapids",
                "email": "nguyenpatrick@gmail.com",
                "phone": "84081093",
                "cities_postal_code": 9000,
                "countries_iso": "SE",
                "users_user_id": 15,
                "is_user_profile": 0
            },
            order: {
                "comment": "heyheyhey",
                "shippers_shipper_id": 2,
                "po_boxes_id": 3,
                "warehouses_warehouse_id": 2
            },
            product: [
                { "product_id": 8, "quantity": 2 },
                { "product_id": 3, "quantity": 3 },
                { "product_id": 2, "quantity": 1 },
                { "product_id": 7, "quantity": 5 },
                { "product_id": 4, "quantity": 2 },
                { "product_id": 15, "quantity": 8 },
            ]
        },
        AddProduct: {
            product: {
                "name": "cool cape",
                "price": 1800,
                "size": "l",
                "description": "totally awesome cape",
                "is_archived": false,
                "brands_brand_id": 2,
                "colors_color_id": 2,
                "manufacturers_manufacturer_id": 2,
                "categories_category_id": 2
            }
        },
        EditProduct: {
            product: {
                "product_id": 26,
                "name": "extra cool cape",
                "price": 1111,
                "size": "l",
                "description": "todtally mega awesome cape",
                "is_archived": false,
                "brands_brand_id": 2,
                "colors_color_id": 2,
                "manufacturers_manufacturer_id": 2,
                "categories_category_id": 2
            }
        },
    }
}

// rewrites the swagger_output file each time we run it with "node swagger.js"
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')
});
