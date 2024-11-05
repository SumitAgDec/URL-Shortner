const shortid = require('shortid');
const URL = require('../model/url.model.js');


async function handleNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });
    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });

    res.render('home', {
        id: shortID
    })
}

async function handleShortURL(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push : {
        visitHistory: {
            timestamp : Number(Date.now())
        }
    }})
    res.redirect(entry.redirectURL)
}

async function handleAnalyticsShortURL(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({
        numOfClicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}

module.exports = { 
    handleNewShortURL,
    handleShortURL,
    handleAnalyticsShortURL
};
