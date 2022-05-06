const handler = {}

handler.books = async (data, callback) => {
    const allowedHttpMethods = ['get', 'post', 'put', 'delete'];

    if (allowedHttpMethods.includes(data.httpMethod)) {
        return handler._method[data.httpMethod](data, callback);
    }

    return callback(400, {
        msg: `Books API endpoint nepalaiko "${data.httpMethod
            }" http metodo`
    });
}

handler._method = {}

handler._method.get = (data, callback) => {
    return callback(200, {
        msg: 'STAI TAU VISA KNYGOS INFO',
    });
}

handler._method.post = (data, callback) => {
    return callback(200, {
        msg: 'KNYGA SUKURTA',
    });
}

handler._method.put = (data, callback) => {
    return callback(200, {
        msg: 'KNYGA ATNAUJINTA',
    });
}

handler._method.delete = (data, callback) => {
    return callback(200, {
        msg: 'KNYGA ISTRINTA',
    });
}

export default handler;