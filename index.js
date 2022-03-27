
const express = require("express")
//const {Router} = express;
const app = express()


//const router = new Router()
const serverRoutes = require("./router")

app.use(express.json());                    
app.use(express.urlencoded({extended:true}));

app.set("views", "./views/ejs");
app.set("view engine", "ejs");
//app.use('/',router)

serverRoutes(app)


app.listen(8080, err=>{
    console.log(`estamos escuchando en esta url: http://localhost:8080/api/productos`)
})