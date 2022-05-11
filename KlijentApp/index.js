const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path');
const axios = require('axios');
const { json } = require("express");
const { parse } = require("path");
const port = 7000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let procitajPogledZaNaziv = (naziv) => {
    return fs.readFileSync(path.join(__dirname + "/view/" + naziv + ".html"), "utf-8")
}

app.get("/", (req, res) => {
    res.send(procitajPogledZaNaziv("index"));
});
app.get("/svioglasi", (req, res) => {
    axios.get('http://localhost:5050/svioglasi')
        .then(response => {
            let prikaz = ""
            let podaci = response.data.Oglas
            // console.log(typeof (podaci))
            // console.dir(podaci)
            console.log(Object.keys(podaci[0].Cena));
            
            podaci.forEach(oglas => {  
                       
                prikaz += `<tr>
                <td>${oglas.Tekst}</td>
                <td>${oglas.Kategorija}</td>
                <td>${oglas.DatumIsteka}</td>
                <td>${oglas.Cena._} </td>
                <td>${oglas.Oznaka}</td>
                <td>${oglas.Email}</td>
                </tr>`;
            });

            res.send(procitajPogledZaNaziv("index").replace("#{data}", prikaz));
        })
        .catch(error => {
            console.log(error);
        });


});

app.listen(port, () => { console.log(`klijent na portu ${port}`) });