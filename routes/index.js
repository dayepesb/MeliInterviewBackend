const itemController = require("../controllers/items.controller");

module.exports = app => {
    app.get('/api/items', itemController.getItemsCtrl);
    app.get('/api/items/:id', itemController.getDetailCtrl);
};