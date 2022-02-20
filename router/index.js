//let carrito = require("../components/carrito")
//let card = require("../components/card")
let productos = [];


module.exports = app =>{
  //  carrito(app)

    //fetch('/api/ingreso')
    //.then(response => response.json())
    //.then(data => mostrarData(data))
    //.catch(error =>console.log(error))
    

    app.get("/api/ingreso", (req,res)=>{
        res.render("../index",{});
    })

    app.get("/api/ingreso/:id",(req,res)=>{
        let {id} = req.params;
        console.log("entro a GETingresoId");
        for(producto of productos){
            if(producto.id == id){
                console.log(producto);
                res.render("../edicion",producto);
                
            }
        }

    })

    app.post("/api/ingreso",(req,res,next)=>{
        let id = productos.length + 1;
        let timestamp = 12;
        let {nombre} = req.body;
        let {descripcion} = req.body;
        let {codigo} = req.body;
        let {precio} = req.body;
        let {ruta} = req.body;
        let {stock} = req.body;

    productos.push({id: id,timestamp: timestamp,nombre: nombre,descripcion: descripcion,codigo:codigo,precio:precio,ruta:ruta,stock:stock})
    res.redirect("/api/ingreso");
      
    })

    app.get("/api/productos", (req,res,next)=>{
        res.render("../card",{productos});
        
    })

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

   app.put("/api/ingreso/:id",(req,res,next)=>{
       console.log("entro en PUTingresoId")
        const {id} = req.params;
        let encontrado = false;
        let {nombre} = req.body;
        let {descripcion} = req.body;
        let {codigo} = req.body;
        let {precio} = req.body;
        let {ruta} = req.body;
        let {stock} = req.body;
        for(producto of productos){
            if(producto.id == id){
                encontrado=true
                producto.nombre = nombre;
                producto.descripcion = descripcion;
                producto.codigo = codigo;
                producto.precio = precio;
                producto.ruta = ruta
                productos.stock = stock;
            }
        }
        console.log(productos)
        if(encontrado == false){
            res.json({
                "ERROR": "producto no encontrado"
            })
        }else{
            alert("producto Guardado")
            res.render("../card",{productos});
        }  
    })


}