const ILovePDFApi = require('@ilovepdf/ilovepdf-nodejs')
const ILovePDFFile = require('@ilovepdf/ilovepdf-nodejs/ILovePDFFile')
const path = require('path')
const fs = require('fs')
require("dotenv").config()


const instance = new ILovePDFApi('<PUBLIC_KEY>', '<SECRET_KEY>')

const task = instance.newTask('officepdf')

task.start()
.then(() => {
    const file = new ILovePDFFile(path.resolve(__dirname,'TJSE 12072023.pdf'))

    return task.addFile(file)
})
.then(() => {
    return task.process()
})
.then(() => {
    return task.download()
})
.then((data) => {
    console.log('DONE')
    fs.writeFileSync(__dirname+'TJSE', data)
})