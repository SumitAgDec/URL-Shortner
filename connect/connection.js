const mongoose = require('mongoose')

async function connectionDB(url){
    await mongoose.connect(url)
    .then(()=> console.log('mongodb connected'))
    .catch((error)=> console.log('ERROR: ', error))
}

module.exports={
    connectionDB
}