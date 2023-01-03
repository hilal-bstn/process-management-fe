import Login from "../components/auth/Login";
import { ProductModel } from "../models/productModel";
import NotificationService from "./notificationService";

export default class ProductService {
    async products(): Promise<any>
    {

        const result = await fetch('http://localhost:5000/products',
        {
            headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`}
        });

        const data = await result.json();
        return data;
    } 


    async newProducts():Promise<any>
    {
        const result = await fetch('http://localhost:5000/newproducts',
        {
            headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`}
        });
        
        if(result.status===401)
        {
            localStorage.clear();
            <Login/>
            NotificationService.openErrorNotification({description:"Unauthorized.Please login again.",placement:"bottomRight",title:""});
        }
        const data = await result.json()
        return data;
    } 

    async productDelete(id:string)
    {
        const result =await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`}
            
        });
        const data = await result.json()
        return data;
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
   async productAdd (product:ProductModel) {
                await fetch(`http://localhost:5000/add-product`,{
            method:'Post',
            body: JSON.stringify({product}),
            headers:{
                'Content-Type':"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`
                }});
    }

    async search(key:string) : Promise<any>
        {
            const result = await fetch(`http://localhost:5000/product-search/${key}`)
            const data = await result.json()
            return data;
        } 
};