import { LoginModel } from "../models/loginModel";
import { RegisterModel } from "../models/registerModel";

export default class UserService {

      async login (login : LoginModel) : Promise<any>  {
       
        const result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({ login }),
            headers:{
                'Content-Type':'application/json'
            }
        })
            const data = await result.json()
            return data;
       }

    async register(register : RegisterModel) : Promise<any>  {
        const result = await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({register}),
            headers:{
                'Content-Type':'application/json'
            }         
        })
            const data = await result.json()
            return data;
    };

    async totalUser() : Promise<any>  {
        const result = await fetch('http://localhost:5000/total-user',{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            }         
        })
            const data = await result.json()
            return data;
    };
};