import axios from 'plugins/Axios';

export default class Auth {
    static async login (user) {
        return axios({ method: 'POST', url: "/users/signin", data: user, isStatic: true })
    }
}