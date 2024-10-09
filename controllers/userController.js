class UserController {
    constructor(UserService) {
        this.userService = UserService;
    }

    async createUser(req, res) {
        const { email, data_nasc, password } = req.body;
        try {
            const newUser = await this.userService.create(email, data_nasc, password);
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao gravar o novo usuário.' });
        }
    }

    async findAllUsers(req, res) {
        try {
            const allUsers = await this.userService.findAll();
            res.status(200).json(allUsers);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao localizar todos os usuários.' });
        }
    }

    async findUserById(req, res) {
        const { id } = req.query;
        try {
            const user = await this.userService.findById(id); 
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao localizar o usuário pelo ID.' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await this.userService.login(email, password);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao logar o usuário.' });
        }
    }
}

module.exports = UserController;
