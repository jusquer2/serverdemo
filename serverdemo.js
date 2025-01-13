const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

app.use(express.json());

app.get('/', async(req,res)=>{
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0];
    try{
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        const data = response.data
        const info = {ip:ip,
            userAgent:req.headers['user-agent'],
            ...data
        };
        console.log(info)
        //res.send(`<h1>Informacion recolectada</h1><pre>${JSON.stringify(info,null,2)}</pre>`)
        const filePath = path.join(__dirname, 'index.html'); // Ruta completa al archivo
        res.sendFile(filePath); // Envía el archivo HTML
    }catch(error){
        console.error(error)
        res.status(500).send('Error en el servidor')
    }
});
app.post('/json', (req, res) => {
    const receivedJson = req.body;
    console.log('JSON recibido:', receivedJson);

    // Respuesta al cliente
    res.status(200).json({ message: 'JSON recibido y pintado en consola' });
});

 const PORT= 3000;
 app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
 })