const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send("Product Catalog App");
});

const productRoutes = require('./routes/product.routes')

app.use('/api/v1/products', productRoutes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});