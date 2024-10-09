// ./services/userService.js
const auth = require('../auth');

const db = require('../models');

class UserService{
    constructor(UserModel){
        this.User = UserModel;
    }

    async create(email, data_nasc, password){
        try{
            const newUser = await this.User.create({
                email:email,
                data_nasc:data_nasc,
                password:password
            });
            return newUser? newUser : null;
            
        }
        catch (error){
            throw error;
        }
    }

    //Método para retornar todos os usuários
    async findAll()
    {
        try{
            const AllUsers = await this.User.findAll();
            return AllUsers? AllUsers : null;
        }
        catch(error){
            throw error;
        }

    }

    //Método para retornar o usuário pelo id
    async findById(id){
        try{
            const User = await this.User.findById(id);
            return User? User: null;
        }
        catch(error){
            throw error;
        }

    }

    //Método para login
    async login(email, password){
        try{
            const User = await this.User.findOne({
                where : {email}
            });
            if(User){ 
                const token = await auth.generateToken(User);
                User.dataValues.Token = token;
                User.dataValues.password = '';
            }
            return User? User:null;
        }
        catch(error){
            throw error;
        }

    }
}

module.exports = UserService;