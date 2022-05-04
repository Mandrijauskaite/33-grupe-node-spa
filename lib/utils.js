const utils = {};

utils.fileExtension = (url) => {
    //  -> ''
    // about -> ''
    // services/design -> ''
    // css/main.css -> 'css'
    // js/main.js -> 'js'
    // css/fontawesome.min.css -> 'css'
    // js/main.js?v=2 -> 'js'

    const pathParts = url.split('?')[0].split('.');
    return pathParts[pathParts.length - 1];
}

utils.parseJSONtoObject = (text) => {
    try {
        return JSON.parse(text);
    } catch (error) {
        return false;
    }
}

export { utils }