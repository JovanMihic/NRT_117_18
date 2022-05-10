const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const PATH = 'Oglasi.xml';
const util = require('util'); //za ispis u konzoli samo

let procitajPodatkeIzXML = () => {
    // let XMLobj
    let json;
    let xml = fs.readFileSync(PATH, (err, data) => {
        if (err) throw err;          
    });
    parser.parseString(xml, (err, res) => {
        if(err) throw err;
        json = JSON.stringify(res)
    });
    
    return json;

}

exports.sviOglasi = () => {
    // console.log("tvoj xml je: \n" + procitajPodatkeIzXML());
    // console.log(typeof (procitajPodatkeIzXML));
    return procitajPodatkeIzXML();
}