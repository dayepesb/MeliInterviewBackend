const parseOptions = function (options) {
    let str = [];
    for (let p in options)
        if (options.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(options[p]));
        }
    return str.join('&');
};

const authorObj = {
    name: process.env.AUTHOR_NAME,
    lastname: process.env.AUTHOR_LASTNAME,
};

module.exports = {
    authorObj,
    parseOptions
}