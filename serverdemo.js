const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async(req,res)=>{
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0];
    try{
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        const data = response.data
        const info = {ip:ip,
            city:data.city,
            region:data.region,
            country:data.country,
            isp:data.isp,
            userAgent:req.headers['user-agent']
        };
        console.log(info)
        res.send(`<h1>Informacion recolectada</h1><pre>${JSON.stringify(info,null,2)}</pre>`)
    }catch(error){
        console.error(error)
        res.status(500).send('Error en el servidor')
    }
});
 const PORT= 3000;
 app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
 })