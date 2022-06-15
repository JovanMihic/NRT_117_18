const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path');
const axios = require('axios');
const { json } = require("express");
const { parse } = require("path");
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

let procitajPogledZaNaziv = (naziv) => {
    return fs.readFileSync(path.join(__dirname + "/view/" + naziv + ".html"), "utf-8")
}

app.get("/", (req, res) => {
    res.send(procitajPogledZaNaziv("index"));
});
app.get("/dodajoglas", (req, res) => {
    res.send(procitajPogledZaNaziv("dodaj"));
});
app.get("/obrisi/:id", (req, res) => {
    axios.delete(`http://localhost:5050/obrisiOglas/${req.params["id"]}`)
    res.redirect("/sviOGlasi");
});
app.get("/izmeni/:id", (req, res) => {
    // axios.delete(`http://localhost:5050/obrisiOglas/${req.params["id"]}`)
    res.redirect("/dodajglas"); 
});
app.get("/svioglasi", (req, res) => {
    axios.get('http://localhost:5050/svioglasi')
        .then(response => {
            let prikaz = ""
            let podaci = response.data
            podaci.forEach(oglas => {
                prikaz += `<tr id="${oglas.id}" >
                <td><h3>${oglas.Tekst}</h3></td>
                <td>${oglas.Kategorija}</td>
                <td>${oglas.DatumIsteka}</td>
                <td>${oglas.Cena.vrednost} ${oglas.Cena.valuta}</td>
                <td>${oglas.Oznaka}</td>
                <td>${oglas.Email}<a href="/obrisi/${oglas.id}">Obrisi</a>
                <a href="/izmeni/${oglas.id}">Izmeni</a></td>
                
                </tr>
                `;
            });

            res.send(procitajPogledZaNaziv("sviOglasi").replace("#{data}", prikaz));
        })
        .catch(error => {
            console.log(error);
        });
});
app.post("/snimiOglas", (req, res) => {
    axios.post("http://localhost:5050/addOglas", {
        Kategorija: req.body.Kategorija,
        DatumIsteka: req.body.Datum,
        Cena: { vrednost: req.body.CenaVrednost, valuta: req.body.CenaValuta },
        Tekst: req.body.Tekst,
        Oznaka: [req.body.Oznaka],
        Email: [req.body.Email],
    })
    res.redirect("/sviOglasi");
})



app.listen(port, () => { console.log(`klijent na portu ${port}`) });