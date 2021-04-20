const express = require('express')
require('./db/mongoose')
const Holiday = require('./models/holiday')
const User = require('./models/user')
const Password = require('./models/password')


const app = express()
const port = process.env.PORT
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.get('/passwords/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const password = await Password.findById(_id)

        if (!password) {
            return res.status(404).send()
        }

        res.send(password)
    } catch (e) {
        res.status(500).send(e)
    }
})



app.post('/passwords', async (req, res) => {
    const password = new Password(req.body)

    try {
        await password.save()
        res.status(201).send(password)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/passwords/login', async (req, res) => {
    try {
        const password = await Password.findByCredentials(req.body.name, req.body.password)
        res.send(password)
    } catch (e) {
        res.status(400).send()
    }  
})

app.patch('/passwords/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const password = await Password.findById(req.params.id)

        updates.forEach((update) => {
            password[update] = req.body[update]
        })

        await password.save()

        if (!password) {
            return res.status(404).send()
        }

        res.send(password)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}).sort({_id: 1})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/users/crewNumber', async (req, res) => {
    try {
        const users = await User.find({ crewNumber: req.body.crewNumber })
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.put('/users/:id', async (req, res) => {
    const _id = req.params.id
    const user = await User.findByIdAndUpdate(_id, req.body, {
        new: true
    })

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/holidays', async (req, res) => {
    try {
        const holidays = await Holiday.find({})
        res.send(holidays)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/holidays/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const holiday = await Holiday.findById(_id)
        
        if (!holiday) {
            return res.status(404).send()
        }

        res.send(holiday)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/holidays', async (req, res) => {
    const holiday = new Holiday(req.body)
    
    try {
        await holiday.save()
        res.status(201).send(holiday)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.patch('/holidays/:id', async (req, res) => {
    try {
        const holiday = await Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!holiday) {
            return res.status(404).send()
        }

        res.send(holiday)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

