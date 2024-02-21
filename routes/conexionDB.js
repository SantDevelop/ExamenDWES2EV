const bcrypt = require('bcryptjs')
const mysql = require('mysql2/promise')
const dotenv = require('dotenv').config()



const pool = mysql.createPool({
    database: process.env.NAME,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS
})

console.log("Conexion establecida")

const cons_comprEmail_user = `SELECT id FROM usuarios WHERE email = ?`
const cons_obtUser_user = `SELECT id, username, email, password FROM usuarios WHERE email = ?`


const cons_insert_user = `INSERT INTO usuarios (username, email, password) VALUES (?,?,?)`



const comprob_regis = async (email) => {
    const [comprobar] = await pool.query(cons_comprEmail_user, [email])
    if ( comprobar && comprobar.length > 0 ){
        console.log("El usuario se encuentra en la base de datos")
        return false
    } else {
        console.log("El usuario no existe en la base de datos")
        return true
    }
}


const obtDatosUser = async (email) => {
    try {
        const [usuario] = await pool.query(cons_obtUser_user, [email])
        if (usuario && usuario.length > 0) {
            return usuario
        } else {
            return false
        }
    } catch (error) {
        console.log("Error al obtener datos del usuario", error.message)
    }
}



const insertUser = async (usuario) => {
    pool.execute (cons_insert_user, [usuario.username, usuario.email, usuario.password_hashed])
}




module.exports = {
    comprob_regis,
    insertUser,
    obtDatosUser,
}