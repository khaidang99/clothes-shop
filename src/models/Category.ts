import axios from 'plugins/Axios';

export default class Category {
    static async createCategory (category: string) {
        return axios({ method: 'POST', url: "/category", data: {name: category}})
    }

    static async getAllCategories () {
        return axios({ method: 'GET', url: `/category`})
    }

    static async updateCategory ({id, name}: {id: string, name: string}) {
        return axios({ method: 'PUT', url: `/category/${id}`, data: {name}})
    }

    static async deleteCategory (id: string) {
        return axios({ method: 'DELETE', url: `/category/${id}`})
    }
}