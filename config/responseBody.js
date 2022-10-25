function responseBody(data = {}, status = 200) {
    /* istanbul ignore next */
    if (data.errors) {
        return data;
    }
    return {
        "status": status,
        "data": data
    };
}

module.exports = responseBody;
