import { ProductModel } from "../models/productModel";

export default class ProductService {
    async products()
    {
        await fetch('http://localhost:5000/products',
        {
        headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`}
        });
    } 

    async productDelete(id:string){
        await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`}
        });
    }    

   async productUpdate (product:ProductModel,id:string) {
             await fetch(`http://localhost:5000/product/${id}`,{
            method:'Put',
            body: JSON.stringify({product}),
            headers:{
                'Content-Type':"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`
             }});
   }

};