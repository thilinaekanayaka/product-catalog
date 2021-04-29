const { graphql } = require('graphql');
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

exports.findAll = async function () {
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

    return productsArr;
}