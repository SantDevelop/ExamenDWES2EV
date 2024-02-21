const express = require('express')
const bcrypt = require('bcryptjs')


const encryptPASS = async (password) => {
    const password_hash = await bcrypt.hash(password, 10)
    return password_hash
}


const comprPASS = async (usuario, password) => {
    const comprobar = await bcrypt.compare(password, usuario[0].password)
    if (comprobar){
        return true
    } else {
        return false
    }
}


module.exports = {
    encryptPASS,
    comprPASS
}