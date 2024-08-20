async function loggedPostRequest({ url, body, cookie }) {
    return await axios.post(url, new URLSearchParams(body).toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cookie,
            'Connection': 'close'
        },
        withCredentials: true
    })
}

module.exports = { loggedPostRequest }