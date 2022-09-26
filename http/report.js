const express = require('express')
const app = express.Router()
const DB = require(__dirname + '/../database')

app.get('/ab', async (req, res) => {
    await DB.connect()
    const content = {
        data: []
    };

    const [records] = await DB.connection.execute('SELECT COUNT(*) as total, placement_id, ab, event FROM native_ab_test GROUP BY placement_id, ab, event ORDER BY placement_id')
    let data = {}

    records.forEach((rec) => {
        if (typeof data[rec.placement_id+rec.ab] === "undefined") {
            data[rec.placement_id+rec.ab] = {
                placement: rec.placement_id,
                ab: rec.ab,
                imps: rec.event === 'imp' ? rec.total : 0,
                reqs: rec.event === 'req' ? rec.total : 0,
            }
        } else {
            if (rec.event === 'imp') {
                data[rec.placement_id+rec.ab]['imps'] = rec.total
            } else if (rec.event === 'req') {
                data[rec.placement_id+rec.ab]['reqs'] = rec.total
            }
        }
    })
    content.data.push(Object.values(data))
    res.status(200).json(content)
})

module.exports = app
