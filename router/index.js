//let carrito = require("../components/carrito")
//let card = require("../components/card")
//const fetch = require("node-fetch");
const Producto = require('../objetos/Producto');
const Carrito = require('../objetos/Carrito')
const { tamanioArray, carrito } = require('../src/daos');
const ProductoDaoMemoria = require('../src/daos')
const CarritoDao = require('../src/daos')
const baseProductos = require('../src/daos');
const { json } = require('express/lib/response');
 let administrador = false;
console.log(ProductoDaoMemoria)
console.log(baseProductos)

function calcularTiempo(){
    let t = new Date();
    const dia = t.getDate();
    const mes = t.getMonth()+1;
    const anio = t.getFullYear();
    const hora = t.getHours();
    const min = t.getMinutes();
    const seg = t.getSeconds();

    if(mes < 10){
        return dia+"/"+0+mes +"/"+anio +"-"+hora + ":" + min + ":"+seg;
    }else{
        return dia+"/"+mes +"/"+anio +"-"+hora + ":" + min + ":"+seg;
    }

}

module.exports = app =>{
  

    //Vista Ingreso
    app.get("/api/ingreso", (req,res)=>{
        let existCarri = false
        let administrador = true;

        if(CarritoDao.tamanioArrayCarrito() != 0){
            existCarri = true;
        }
        
        res.render("../index",{existCarri,administrador});
    })
    
    // Vista ingreso para Editar
    app.get("/api/ingreso/:id",(req,res)=>{
        const array = baseProductos.listarAll();
        let {id} = req.params;
        for(producto of array){
            if(producto.id == id){
                res.render("../edicion",producto);
            }
        }

    })
    
    //Grabar  de datos
    app.post("/api/ingreso",(req,res,next)=>{
        //console.log(baseProductos.tamanioArray())
        let id = baseProductos.tamanioArray() + 1;
        let timestamp = calcularTiempo();
        let {nombre} = req.body;
        let {descripcion} = req.body;
        let {codigo} = req.body;
        let {precio} = req.body;
        let {ruta} = req.body;
        let {stock} = req.body;
    
    ProductoDaoMemoria.insertarProducto(new Producto(id,timestamp,nombre,descripcion,codigo,ruta,precio,stock))
    res.redirect("/api/ingreso");
      
    })
    
    // Vista PRODUCTOS

    app.get("/api/productos", (req,res,next)=>{
        let existCarri = false


        if(CarritoDao.tamanioArrayCarrito() != 0){
            existCarri = true;
        }
        const array = baseProductos.listarAll();
        res.render("../card", {array,existCarri});
        console.log(array)
        
    })


/*
    app.get("/api/productos/:id", (req,res,next)=>{
        let {id} = req.params;
        let encontrado = false;
    
            for(producto of productos){
                if(producto.id == id){
                    encontrado=true
                    const productos = [producto]
                    res.render("../card",{productos});
                }
            }
            if(encontrado == false){
                res.json({
                    "ERROR": "producto no encontrado"
                })
            }
    })
*/

    // Grabar Edicion
   app.put("/api/edicion/:id",(req,res,next)=>{
       console.log("entro al PUT")
        const {id} = req.params;
        let encontrado = false;
        let {nombre} = req.body;
        let {descripcion} = req.body;
        let {codigo} = req.body;
        let {precio} = req.body;
        let {ruta} = req.body;
        let {stock} = req.body;

        const array = baseProductos.listarAll();
        for(producto of array){
            if(producto.id == id){
                encontrado=true
                producto.set(nombre,descripcion,codigo,precio,ruta,stock)
            }
        }

        if(encontrado == false){
            res.json({
                "ERROR": "producto no encontrado"
            })
        }else{
            //alert("producto Guardado")
            res.render("../card",{array});
            //res.render("../card",{productos});
        }  
    })

    function borrar(req,res,next){

    }

    // Eliminar Producto
    app.delete('/api/productos/:id', (req,res,next)=>{
        const {id} = req.params
        baseProductos.borrarElemento(id);
        const array = baseProductos.listarAll();
        
        
      
    })

    app.post('/api/carrito',(req,res)=>{
        
        const id = CarritoDao.tamanioArrayCarrito() + 1
        const timestamp = calcularTiempo();

        CarritoDao.insertarACarrito(new Carrito(id,timestamp))
        console.log(CarritoDao.listarAllCarrito());
    })
   app.post('/api/carrito/:id/productos',(req,res)=>{
        const {ids} = req.body;
        const array = baseProductos.listarAll();
        const carri = CarritoDao.listarAllCarrito();
        for(producto of array){
            if(producto.id == ids){
                encontrado=true
                console.log(producto)
                    carri[0].agregarProductos(producto)
                
              
            }
        }
        console.log(CarritoDao.listarAllCarrito())
   })

   app.get('/api/carrito/:id/productos',(req,res)=>{
       let {id} = req.params;
       let array = CarritoDao.verCarrito(id)
        console.log(array)
       res.render('../carrito',{array})
   })
}
