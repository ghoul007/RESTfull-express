
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const stuffRouter =  require('./routes/stuff')
const userRouter =  require('./routes/user')
const path =  require('path')
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


app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/auth', userRouter)
app.use('/api/stuff', stuffRouter)

app.use((req, res, next) => {
//     console.log('request send successfuly', res)
})

app.listen(port, () => { console.log(`server is running at port ${port}`) })
module.exports = app