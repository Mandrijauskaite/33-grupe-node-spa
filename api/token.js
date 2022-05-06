const handler = {}

handler.token = async (data, callback) => {
    const allowedHttpMethods = ['get', 'post', 'put', 'delete'];

    if (allowedHttpMethods.includes(data.httpMethod)) {
        return handler._method[data.httpMethod](data, callback);
    }

    return callback(400, {
        msg: `Token API endpoint nepalaiko "${data.httpMethod
            }" http metodo`
    });
}

handler._method = {}

handler._method.get = (data, callback) => {
    return callback(200, {
        msg: 'STAI TAU VISA TOKEN INFO',
    });
}

handler._method.post = (data, callback) => {
    return callback(200, {
        msg: 'TOKEN SUKURTAS',
    });
}

handler._method.put = (data, callback) => {
    return callback(200, {
        msg: 'TOKEN ATNAUJINTAS',
    });
}

handler._method.delete = (data, callback) => {
    return callback(200, {
        msg: 'TOKEN ISTRINTAS',
    });
}

export default handler;