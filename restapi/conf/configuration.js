const express = require('express')
const router = express.Router()
const Configure = require('../models/configure')


router.get('/', async (req, res) => {
    try {
        const configuration = await Configure.find()
        res.json(configuration)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getConfigure, (req, res) => {
    res.json(res.configure)
})

router.post('/', async (req, res) => {
    const configure = new Configure({
        name: req.body.name,
        value: req.body.value
    })
    try {
        const newConfigure = await configure.save()
        res.status(201).json(newConfigure)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

router.patch('/:id', getConfigure, async (req, res) => {
    if (req.body.name != null) {
        res.configure.name = req.body.name
    }
    if (req.body.value != null) {
        res.configure.value = req.body.value
    }
    try {
        const updatedConfigure = await res.configure.save()
        res.json(updatedConfigure)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

async function getConfigure(req, res, next) {
    let configure
    try {
        configure = await Configure.findById(req.params.id)
        if (configure == null) {
            return res.status(404).json({ message: 'Cannot find configure'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.configure = configure
    next()
}

module.exports = router