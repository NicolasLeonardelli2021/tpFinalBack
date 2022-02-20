const express = require("express")
const {Router} = express;
const app = express()
let {config} = require("./config")
const router = new Router()
let serverRoutes = require("./router")

app.use(express.json());                    
app.use(express.urlencoded({extended:true}));

app.set("views", "./views/ejs");
app.set("view engine", "ejs");

let productos = [];


serverRoutes(app)
//app.use('/',router)
app.listen(config.port, err=>{
    console.log(`estamos escuchando en esta url: http://localhost:${config.port}/api/productos`)
})