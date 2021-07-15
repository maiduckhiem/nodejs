import Auth from '../models/auth';

export const signup = (req,res) => {
    const {name , email , hash_password} = new Auth(req.body);
    console.log("choa")
}