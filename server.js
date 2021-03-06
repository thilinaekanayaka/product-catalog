const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Graphql = require('./models/graphql.model');

async function main() {
    // server configuration
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
            products: [Product],
            createProduct(product_id: Int!, product_name: String!, product_slug: String!, sku: String!, brand: String!): Result
        },
        type Product {
            product_id: Int
            product_name: String
            product_slug: String
            sku: String
            brand: String
        },
        type Result {
            error: Boolean,
            message: String
        }
    `);

    const createProduct = function (product) {
        console.log('createProduct', product)
        let result = {
            error: false,
            message: "Product added successfully!"
        }
        Graphql.insert(product);
        return result;
    }

    const root = {
        products: await Graphql.findAll(),
        createProduct: createProduct
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