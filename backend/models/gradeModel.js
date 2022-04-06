const mongoose = require('moongose')

const gradeSchema = mongoose.Schema({
    grade: String,
})
module.exports = mongoose.model('grade', gradeSchema)