let express = require('express');
let app = express();
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(request, response)=>{
    response.send("Server radi!!!");
});

app.listen(port,()=>{console.log(`Server pokrenut na portu ${port}`)});