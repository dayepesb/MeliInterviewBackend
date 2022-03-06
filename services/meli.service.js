const request = require('request');
const { parseOptions } = require('../utils');

const URL_BASE = process.env.API_BASE;

let MeliInstance = null;
function MeliIntegrator() {
    if (MeliInstance === null) {
        MeliInstance = this;
    }
    return MeliInstance;
}

MeliIntegrator.prototype.doSearchItems = function (
    search = '',
    opts = { limit: process.env.LIMIT_ITEMS || 4 }
) {
    const URI = process.env.API_SEARCH_URL.replace('%QUERY%', search);
    const url = `${URL_BASE}${URI}&${parseOptions(opts)}`;
    const options = { url };
    return new Promise((resolve, reject) => {
        try {
            request.get(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                reject({ error: error });
            });
        } catch (error) {
            reject({ error: error });
        }
    });
};

MeliIntegrator.prototype.doGetItemDetail = function (itemId) {
    const URI = process.env.API_DETAIL_ITEM_URL.replace('%ID%', itemId);
    const url = `${URL_BASE}${URI}`;
    const options = { url };

    return new Promise((resolve, reject) => {
        try {
            request.get(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                reject({ error: error });
            });
        } catch (error) {
            reject({ error: error });
        }
    });
};

MeliIntegrator.prototype.doGetItemDescription = function (itemId) {
    const URI = process.env.API_DESCRIPTION_ITEM_URL.replace('%ID%', itemId);
    const url = `${URL_BASE}${URI}`;
    const options = { url };

    return new Promise((resolve, reject) => {
        try {
            request.get(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                reject({ error: error });
            });
        } catch (error) {
            reject({ error: error });
        }
    });
};

module.exports = new MeliIntegrator();