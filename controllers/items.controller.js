const apiMeli = require('../services/meli.service');
const { parseResultSearch, parseItemDescription, parseItemDetail } = require('../utils/itemsUtil');

/**
 * Search Items Ctrl
 * @method getItemsCtrl
 * @param req
 * @param res
 * @return
 */
const getItemsCtrl = async (req, res) => {
    const term = req.query.q;
    if (!term) {
        res.status(422);
        res.send({ error: 'term to search is required' });
    }

    let response = await apiMeli.doSearchItems(term);

    if (response.error) {
        res.status(500);
        res.send({ error: response.error });
    }

    response = parseResultSearch(response);

    res.send(response);

};

/**
 * Item detail
 * @method getDetailCtrl
 * @param  req
 * @param  res
 * @return
 */
const getDetailCtrl = async (req, res) => {
    const itemId = req.params.id;
    if (!itemId) {
        res.status(422);
        res.send({ error: 'Product Id is required' });
    }
    const responseDetail = await apiMeli.doGetItemDetail(itemId);

    if (responseDetail.error) {
        res.status(500);
        res.send({ error: responseDetail.error });
    }

    const parseDetail = parseItemDetail(responseDetail);

    const responseDescription = await apiMeli.doGetItemDescription(itemId);

    console.log('!!!!!!!!!!!!!!!', responseDescription);
    if (responseDescription.error) {
        res.status(500);
        res.send({ error: responseDescription.error });
    }

    parseDetail.item.description = parseItemDescription(
        responseDescription
    );

    res.send(parseDetail);
}

module.exports = {
    getItemsCtrl,
    getDetailCtrl
}