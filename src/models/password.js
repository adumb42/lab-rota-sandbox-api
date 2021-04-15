const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const passwordSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        password: {
            type: String
        }
    }
)

passwordSchema.statics.findByCredentials = async (name, password) => {
    const passwordOne = await Password.findOne({ name: name })

    if (!passwordOne) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, passwordOne.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return passwordOne
}



// Hash the plain text password before saving
passwordSchema.pre('save', async function (next) {
    const password = this

    if (password.isModified('password')) {
        password.password = await bcrypt.hash(password.password, 8)
    }

    next()
})

const Password = mongoose.model('Password', passwordSchema)

module.exports = Password
