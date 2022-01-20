import axios from 'plugins/Axios';
import { valuesLogin } from 'types'

export default class Auth {
    static async login(user: valuesLogin) {
        return axios({ method: 'POST', url: "/users/signin", data: user})
    }
    static async profile() {
        return axios({ method: 'GET', url: "/users/profile"})
    }
}