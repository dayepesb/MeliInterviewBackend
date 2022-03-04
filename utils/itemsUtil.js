const { authorObj } = require('../utils');

parseCategories = function (filters) {
    let categoryFilter = filters.filter(item => item.id === 'category');

    if (!categoryFilter || !categoryFilter[0]) return [];

    let categoryList = [];
    categoryFilter[0].values.forEach(categoryValue => {
        let names = categoryValue.path_from_root.map(path => path.name);
        categoryList = [...categoryList, ...names];
    });

    return categoryList;
};

parseItems = function (items) {
    return items.map(item => {
        const {
            id,
            title,
            thumbnail,
            condition,
            price,
            currency_id,
            shipping: { free_shipping },
        } = item;

        return {
            id,
            title,
            price: {
                currency: currency_id,
                amount: price,
                decimals: 0
            },
            picture: thumbnail,
            condition,
            free_shipping
        };
    });
};

parseResultSearch = function (result) {
    result = JSON.parse(result);
    const categories = parseCategories(result.filters);
    const items = parseItems(result.results);
    return {
        authorObj,
        categories,
        items
    };
};

parseItemDescription = function (description) {
    description = JSON.parse(description);
    return description.plain_text;
};

parseItemDetail = function (detail) {
    detail = JSON.parse(detail);
    const {
        id,
        title,
        currency_id,
        price,
        thumbnail,
        condition,
        shipping: { free_shipping },
        sold_quantity
    } = detail;

    return {
        authorObj,
        item: {
            id,
            title,
            price: {
                currency: currency_id,
                amount: price,
                decimals: 0
            },
            picture: thumbnail,
            condition,
            free_shipping,
            sold_quantity,
            description: ''
        }
    };
};
module.exports = {
    parseCategories,
    parseItems,
    parseResultSearch,
    parseItemDescription,
    parseItemDetail
}