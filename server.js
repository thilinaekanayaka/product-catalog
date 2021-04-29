const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

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


//-- graphql logic starts here --

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => {
        return 'Hello world!';
    },
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

//-- graphql logic ends here --


// server listening on port 5000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`GraphQL API server at http://localhost:5000/graphql`);
});