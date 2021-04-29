const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

async function main() {
    // server config
    const port = process.env.PORT || 5000;
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static("public"));
    app.get('/', (req, res) => {
        res.send("Product Catalog App");
    });

    // products route specification
    const productRoutes = require('./routes/product.routes')
    app.use('/api/v1/products', productRoutes)


    //-- graphql operations --

    const schema = buildSchema(`
        type Query {
            products: [Product]
        },
        type Product {
            product_id: Int
            product_name: String
            product_slug: String
            sku: String
            brand: String
        }
    `);

    ////////////////////////////////////////////////////////////////////////////

    const Sequelize = require('sequelize');
    const { INTEGER, STRING } = require('sequelize');

    const sequelize = new Sequelize('products_catalog', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
    })

    const productModel = sequelize.define('Product', {
        product_id: {
            type: INTEGER,
        },
        product_name: {
            type: STRING
        },
        product_slug: {
            type: STRING
        },
        sku: {
            type: STRING
        },
        brand: {
            type: STRING
        }
    });

    const products = await productModel.findAll(
        {
            attributes: [
                'product_id', 'product_name', 'product_slug', 'sku', 'brand'
            ]
        }
    );

    const productsArr = [];
    for (product of products) {
        productsArr.push(JSON.parse(JSON.stringify(product)));
    }

    const root = {
        products: productsArr
    };

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

    //-- graphql operations end --


    // server listening on port 5000
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
        console.log(`GraphQL API server at http://localhost:5000/graphql`);
    });
}

main();