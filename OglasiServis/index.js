let express = require('express');
let oglasiServis = require('radsaoglasimamodul');
let app = express();
const port = 5050;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (request, response) => {
    response.send("Server radi!!!");
});

app.get('/svioglasi', (request, response) => {
    response.send(oglasiServis.sviOglasi());
});

app.post('/addOglas',(request, response)=>{
    oglasiServis.addOglas(request.body);
    response.end("OK");
})
app.listen(port, () => { console.log(`Server pokrenut na portu ${port}`) });