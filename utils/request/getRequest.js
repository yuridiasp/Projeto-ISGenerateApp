async function loggedGetRequest({ url, cookie }) {
    return await axios.post(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cookie,
            'Connection': 'close'
        },
        withCredentials: true
    })
}

module.exports = { loggedGetRequest }