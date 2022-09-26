const express = require('express')
const app = express.Router()
const database = require('./../database')

const createNewImpression = async (data) => {
    await database.connect()
    return database.connection.execute('INSERT INTO `native_ab_test` (`placement_id`, `ab`, `event`, `domain`, `price`) VALUES(?,?,?,?,?)', Object.values(data));
}

app.get('/trk', async (req, res) => {
    const data = {
        placement_id: parseInt(req.query.pid, 10),
        ab: req.query.ab,
        event: req.query.event,
        domain: req.query.domain ?? null,
        price: parseFloat(req.query.price) ?? 0.00,
    }

    if (data.placement_id && data.event && data.ab) {
        return await createNewImpression(data)
            .then(() => {
                res.writeHead(200, { 'Content-Type': 'image/gif' });
                res.end(
                    Buffer.from('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64'),
                    'binary'
                );
            })
            .catch(() => {
                res.status(404).send('')
            })
    }

    res.status(204).send('')
})

module.exports = app
