let express = require('express');
let oglasiServis=require('radsaoglasimamodul');
let app = express();
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(request, response)=>{
    response.send("Server radi!!!");
});

app.get('/SviOglasi',(request, response)=>{
    response.send(oglasiServis.sviOglasi());
});

app.listen(port,()=>{console.log(`Server pokrenut na portu ${port}`)});