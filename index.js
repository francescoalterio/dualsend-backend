const express = require('express');
const getContentDir = require('./utils/getContentDir.js');
const fileUpload = require('express-fileupload');

const app = express()

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use(fileUpload());

app.get('/', async (req, res) => {
    const path = 'C:/'
    const data = await getContentDir(path)
    res.send(data)
})

app.get('/:path', async (req, res) => {
    const paramsPath = req.params.path.split('-'); 
    const path = 'C:/' + paramsPath.join('/')
    const data = await getContentDir(path)
    res.send(data)
})

app.post('/upload/:path', async (req, res) => {
    const paramsPath = req.params.path.split('-'); 
    const path = 'C:/' + paramsPath.join('/')
    await req.files.file.mv(path + '/' + req.files.file.name)
    const data = await getContentDir(path)
    res.send(data)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})