import express from "express";
import { connectMongoDb } from "./db.js";
import productModel from "./models/product.model.js";

const productos = [
    { nombre: "Camiseta", categoria: "Ropa" },
    { nombre: "Teléfono", categoria: "Electrónica" },
    { nombre: "Zapatos", categoria: "Ropa" },
    { nombre: "Monitor", categoria: "Electrónica" },
    { nombre: "Libro", categoria: "Libros" },
    { nombre: "Pantalones", categoria: "Ropa" },
    { nombre: "Cámara", categoria: "Electrónica" },
    { nombre: "Sombrero", categoria: "Accesorios" },
    { nombre: "Altavoz", categoria: "Electrónica" },
    { nombre: "Cuaderno", categoria: "Papelería" },
    { nombre: "Vestido", categoria: "Ropa" },
    { nombre: "Reloj", categoria: "Accesorios" },
    { nombre: "Botas", categoria: "Ropa" },
    { nombre: "Tableta", categoria: "Electrónica" },
    { nombre: "Gafas", categoria: "Accesorios" },
    { nombre: "Agenda", categoria: "Papelería" },
    { nombre: "Jersey", categoria: "Ropa" },
    { nombre: "Lámpara", categoria: "Hogar" },
    { nombre: "Bolígrafo", categoria: "Papelería" },
    { nombre: "Calcetines", categoria: "Ropa" },
    { nombre: "Teclado", categoria: "Electrónica" },
    { nombre: "Mochila", categoria: "Accesorios" },
    { nombre: "Blusa", categoria: "Ropa" },
    { nombre: "Mouse", categoria: "Electrónica" },
    { nombre: "Billetera", categoria: "Accesorios" },
    { nombre: "Lápiz", categoria: "Papelería" },
    { nombre: "Gorra", categoria: "Accesorios" },
    { nombre: "Chaqueta", categoria: "Ropa" },
    { nombre: "Lámpara de escritorio", categoria: "Hogar" },
    { nombre: "Bolso", categoria: "Accesorios" },
    { nombre: "Cuaderno de notas", categoria: "Papelería" }
  ];
     

  function generarNumeroAleatorio() {
    return Math.floor(Math.random() * (3000 - 100 + 1)) + 100;
  }
  

  function generarCodigoHexadecimal(longitud) {
    let codigo = '';
    const caracteresHexadecimales = '0123456789ABCDEF';
  
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresHexadecimales.length);
      codigo += caracteresHexadecimales.charAt(indiceAleatorio);
    }
  
    return codigo;
  }
  


const productoss = ()=>{
    for (let i = 0; i <31; i++) {
        let productt={
            title:productos[i].nombre,
            description:"DescripcionPrueba",
            price:generarNumeroAleatorio(),
            code: generarCodigoHexadecimal(6),
            stock:30,
            status:true,
            category:productos[i].categoria
            }
        const product = new productModel(productt)
        product.save()
    }
    
}
productoss()


connectMongoDb();



// Ejemplo de uso

const app = express();

export default app;
