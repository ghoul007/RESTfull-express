const Thing = require('../models/thing')

exports.fetchStuff = async (req, res) => {
    const stuff = await Thing.find()
    res.status(200).send(stuff)
}

exports.fetchStuffByID = async (req, res) => {
    const id = req.params.id
    const stuff = await Thing.findById(id)
    res.status(200).send(stuff)
}

exports.updateStuff = async (req, res) => {
    const id = req.params.id;
    let thing = new Thing({ id: req.params._id })
    if (req.file) {
        const url = req.protocol + '://' + req.get('host')
        req.body.thing = JSON.parse(req.body.thing);
        thing = {
            _id: id,
            title: req.body.thing.title,
            description: req.body.thing.description,
            imageUrl: url + '/images/' + req.file.filename,
            price: req.body.thing.price,
            userId: req.body.thing.userId,
        }
    } else {
        thing = {
            _id: id,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            userId: req.body.userId,
        }
    }

    const stuff = await Thing.findByIdAndUpdate({ _id: id }, thing, { new: true })
    res.status(200).send(stuff)
}

exports.deleteStuff = async (req, res) => {
    const id = req.params.id;
    const result = await Thing.findByIdAndDelete({ _id: id })
    res.status(200).send(result)
}

exports.createStuff = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    req.body.thing = JSON.parse(req.body.thing);
    const thing = new Thing({
        title: req.body.thing.title,
        description: req.body.thing.description,
        imageUrl: url + '/images/' + req.file.filename,
        price: req.body.thing.price,
        userId: req.body.thing.userId,
    })
    const result = await thing.save()
    return res.status(200).send(result)
}