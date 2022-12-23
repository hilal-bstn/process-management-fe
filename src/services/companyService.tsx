import { CompanyModel } from "../models/companyModel";

export default class CompanyService {
    async companies()
    {
        await fetch('http://localhost:5000/companies',
        {
        headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`}
        });
    } 

    async companyDelete(id:string){
        await fetch(`http://localhost:5000/company/${id}`,{
            method:"Delete",
            headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`}
        });
    }    

   async companyUpdate (company:CompanyModel,id:string) {
             await fetch(`http://localhost:5000/company/${id}`,{
            method:'Put',
            body: JSON.stringify({company}),
            headers:{
                'Content-Type':"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`
             }});
   }
   
    
};