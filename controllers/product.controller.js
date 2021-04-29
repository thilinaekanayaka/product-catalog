const Product = require('../models/product.model');
const csv = require('csv-string');

exports.findAll = function (req, res) {
    Product.findAll(function (err, product) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', product);
        res.send(product);
    });
};

exports.create = function (req, res) {
    const product = new Product(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Product.create(product, function (err, product) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "Product added successfully!", data: product });
        });
    }
};

exports.csv = function (req, res) {
    const buffer = req.file["buffer"]
    const bufferString = buffer.toString()
    const parsedCSV = csv.parse(bufferString);

    for (const row of parsedCSV) {
        const productObj = {
            product_id: row[0],
            product_name: row[1],
            product_slug: row[2],
            sku: row[3],
            brand: row[4],
        }
        const product = new Product(productObj);
        if (productObj === Object && Object.keys(productObj).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Product.create(product, function (err, product) {
                if (err)
                    res.send(err);
            });
        }
    }

    res.json({ error: false, message: "Products added successfully!" });
};

exports.findById = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Product.update(req.params.id, new Product(req.body), function (err, product) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'Product successfully updated' });
        });
    }
};

exports.delete = function (req, res) {
    Product.delete(req.params.id, function (err, product) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Product successfully deleted' });
    });
};