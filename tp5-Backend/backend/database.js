const mongoose = require('mongoose');
const URI = 'mongodb://0.0.0.0/proyectodb'; 
mongoose.connect(URI)
    .then(db => console.log('DB conectada'))
    .catch(err => console.error(err))
module.exports = mongoose;