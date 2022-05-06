const handler = {}

handler.account = async (data, callback) => {
    const allowedHttpMethods = ['get', 'post', 'put', 'delete'];

    if (allowedHttpMethods.includes(data.httpMethod)) {
        return handler._method[data.httpMethod](data, callback);
    }

    return callback(400, {
        msg: `Account API endpoint nepalaiko "${data.httpMethod
            }" http metodo`
    });
}

handler._method = {}

handler._method.get = (data, callback) => {
    return callback(200, {
        msg: 'STAI TAU VISA PASKYROS INFO',
    });
}

handler._method.post = (data, callback) => {
    return callback(200, {
        msg: 'PASKYRA SUKURTA',
    });
}

handler._method.put = (data, callback) => {
    return callback(200, {
        msg: 'PASKYRA ATNAUJINTA',
    });
}

handler._method.delete = (data, callback) => {
    return callback(200, {
        msg: 'PASKYRA ISTRINTA',
    });
}

export default handler;