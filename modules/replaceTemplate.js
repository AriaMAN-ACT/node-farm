module.exports = (template, data) => {
    let output = template
        .replace(/{%PRODUCT_NAME%}/g, data.productName)
        .replace(/{%PRODUCT_IMAGE%}/g, data.image)
        .replace(/{%PRODUCT_PRICE%}/g, data.price)
        .replace(/{%PRODUCT_FROM%}/g, data.from)
        .replace(/{%PRODUCT_HEALTH%}/g, data.nutrients)
        .replace(/{%PRODUCT_QUANTITY%}/g, data.quantity)
        .replace(/{%PRODUCT_DESCRIPTION%}/g, data.description)
        .replace(/{%PRODUCT_ID%}/g, data.id);

    if (!data.organic) {
        output = output.replace(/{%PRODUCT_NOT_ORGANIC%}/g, 'not-organic');
    }

    return output;
};