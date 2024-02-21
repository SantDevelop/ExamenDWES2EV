const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { encryptPASS, comprPASS } = require('./pass')
const { comprob_regis, insertUser, obtDatosUser} = require('./conexionDB')


const verificarToken = (req, res, next) => {
    const token = req.cookies.id
    if (!token) {
        return res.status(401).send('Acceso no autorizado. Debes iniciar sesión.')
    }
    jwt.verify(token, process.env.SECRETO, (err, decoded) => {
        if (err) {
            return res.status(401).send('Acceso no autorizado. Token no válido.')
        }
        req.usuario = decoded
        next()
    })
}

const esAdmin = (id) => {
    return id === process.env.ID_ADMIN
}


router.get('/profilePage', async (req, res) => {
  res.render('profilePafe')
})



router.post('/regisPOST', async (req, res) => {
    try {
        const { username, email, password } = req.body
        password_hashed = await encryptPASS(password)
        const comprobar = await comprob_regis(email)
        if (comprobar) {
            await insertUser({username, email, password_hashed})
            res.render('Plogin')
        } else {
            res.send("El usuario ya está registrado, o el correo ya está en uso")
        }
    } catch (error) {
        console.log("No se pudo regitrar el usuario", error.message)
    }

})

router.post('/loginPOST', async (req, res) => {
    try {
        const { email, password } = req.body
        const usuario = await obtDatosUser(email)
        if (usuario) {
            const comprob_PASS = await comprPASS(usuario, password)
            console.log(comprob_PASS)
            if (comprob_PASS) {
                const idAdmin = parseInt(process.env.ID_ADMIN)
                const esAdmin = (usuario[0].id === idAdmin)
                const token = jwt.sign({ 
                    id_token: usuario[0].id, 
                    esAdmin: esAdmin 
                }, process.env.SECRETO)
                res.cookie('id', token, { httpOnly: true })
                console.log(esAdmin)
                if (esAdmin) {
                  res.render('homeAdmin', {usuario})
                } else {
                  res.render('home', {usuario})
                }
                
            } else {
                res.send("Datos incorrectos")
            }
        } else {
            res.send("El usuario no existe")
        }
    } catch (error) {
        console.log("No se pudo loguear el usuario", error.message)
    }
})

router.use(verificarToken)


router.get('/cabeSel', async (req, res) => {
    if (req.usuario.esAdmin) {
        res.render('inserJuego');
    } else {
        res.status(403).send('Acceso prohibido. No tienes los permisos necesarios.');
    }
})


router.post('/logout', (req, res) => {
    res.clearCookie('id')
    res.redirect('/')
})


module.exports = router