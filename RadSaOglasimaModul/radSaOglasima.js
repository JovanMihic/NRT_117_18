const fs = require('fs');
const xml2js = require('xml2js');//sddsdd
const parser = new xml2js.Parser(); //ssdsda

const PATH = 'Oglasi.xml';
const util = require('util'); //za ispis u konzoli samo

let getListaOglasaJSON = () => {
    let podaci;
    let xml = fs.readFileSync(PATH, function (err, data) {
        if(err) throw err;        
    });
    parser.parseString(xml, function (err, result) {
        if (err) throw err
        console.log('Done');
        podaci = result;
        //console.dir(podaci.OglasiLista.Oglas[0])
    });    
    return podaci.OglasiLista;
}

exports.sviOglasi = () => {
    // console.log("tvoj xml je: \n" + procitajPodatkeIzXML());
    // console.log(typeof (procitajPodatkeIzXML));
    return getListaOglasaJSON();
}