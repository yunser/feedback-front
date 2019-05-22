let debug = process.env.NODE_ENV !== 'production'

let imgDomain
let apiDomain
if (process.env.NODE_ENV === 'production') {
    imgDomain = 'http://120.79.29.47'
    apiDomain = 'https://nodeapi.yunser.com'
} else {
    imgDomain = 'http://120.79.29.47'
    apiDomain = 'http://localhost:1026'
    // apiDomain = 'https://nodeapi.yunser.com'
}

module.exports = {
    imgDomain,
    apiDomain,
    debug
}
