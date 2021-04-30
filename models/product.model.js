const databaseConnection = require('../config/db.config');

const Product = function (product) {
    this.product_id = product.product_id;
    this.product_name = product.product_name;
    this.product_slug = product.product_slug;
    this.sku = product.sku;
    this.brand = product.brand;
};

Product.create = function (product, result) {
    databaseConnection.query("INSERT INTO products SET ?", product, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Product.findById = function (id, result) {
    databaseConnection.query("SELECT * FROM products WHERE product_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Product.findAll = function (result) {
    databaseConnection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('products : ', res);
            result(null, res);
        }
    });
};

Product.update = function (id, product, result) {
    databaseConnection.query("UPDATE products SET product_name=?,product_slug=?,sku=?,brand=? WHERE product_id = ?", [product.product_name, product.product_slug, product.sku, product.brand, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Product.delete = function (id, result) {
    databaseConnection.query("DELETE FROM products WHERE product_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Product;