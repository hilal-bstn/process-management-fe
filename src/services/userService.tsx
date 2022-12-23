import { LoginModel } from "../models/loginModel";
import { RegisterModel } from "../models/registerModel";

export default class UserService {

   async login(login:LoginModel)  {
    await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({login}),
            headers:{
                'Content-Type':'application/json'
            }
    }
  )};

  async register(register:RegisterModel)  {
    await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({register}),
            headers:{
                'Content-Type':'application/json'
            }         
        })};
};