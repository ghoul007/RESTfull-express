
const Thing = require('./models/thing')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://ghoul:XmF6UIeRuSjpXNry@cluster0-k8jwy.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }).then(
    () => console.log('connection successfuly with mongoose ')
).catch(
    (err) => console.log(` error ${err}`)
)

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use((req, res, next)=>{
//     res.status(404);
//     console.log('test2');
//     next()
// })

app.get('/api/stuff', async (req, res) => {
    const stuff = await Thing.find()
    res.status(200).send(stuff)
})

app.get('/api/stuff/:id', async (req, res) => {
    const id = req.params.id
    const stuff = await Thing.findById(id)
    res.status(200).send(stuff)
})

app.put('/api/stuff/:id', async (req, res) => {
    const id = req.params.id
    const thing = new Thing({
        _id: id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId,
    })
    const stuff = await Thing.findByIdAndUpdate({ _id: id }, thing, { new: true })
    res.status(200).send(stuff)
})

app.delete('/api/stuff/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Thing.findByIdAndDelete({ _id: id })
    res.status(200).send(result)
})

app.post('/api/stuff', async (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId,
    })
    const result = await thing.save()
    return res.status(200).send(result)
})

app.use('/', (req, res, next) => {
    res.json({ message: "hello ghoul" });
    next();
})

app.use((req, res, next) => {
    console.log('request send successfuly', res)
})

app.listen(port, () => { console.log(`server is running at port ${port}`) })
module.exports = app