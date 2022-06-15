const fs = require('fs');


const PATH = 'oglasi.json';


let getListaOglasaJSON = () => {
 
    let PATH = "../OglasiServis/oglasi.json";
    oglasi = fs.readFileSync(PATH, function (err, data) {
            if(err) throw err;        
        });
    
    return  JSON.parse(oglasi)
}
let snimiOglase=(data)=>{
    fs.writeFileSync(PATH,JSON.stringify(data));
}

exports.sviOglasi = () => {
    // console.log("tvoj xml je: \n" + procitajPodatkeIzXML());
    // console.log(typeof (procitajPodatkeIzXML));
    return getListaOglasaJSON();
}

exports.addOglas = (noviOglas) => {
    let id=1;
    let oglasi=this.sviOglasi();
    if(oglasi.length>0){
        id=parseInt(oglasi[oglasi.length-1].id)+1;
    }
    noviOglas.id=id;
    oglasi.push(noviOglas)
    snimiOglase(oglasi);
}
exports.getOglas = (id) => {
    return this.sviOglasi().find(x => x.id == id);
}
exports.izmeniOglas = (izmenjen) =>{
    let oglasi=this.sviOglasi(); 
    let oglas = this.getOglas(id)
    // izmenjen.id = id //mozda nepotrebno
    this.deleteOglas(id)    
    oglasi.push(izmenjen)

}
exports.deleteOglas = (id) => {
    snimiOglase(this.sviOglasi().filter(oglas=>oglas.id!=id));
}