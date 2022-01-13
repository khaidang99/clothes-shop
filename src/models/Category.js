import axios from 'plugins/Axios';

export default class Category {
    static async createCategory (category) {
        return axios({ method: 'POST', url: "/category", data: {name: category} , isStatic: true })
    }

    static async getAllCategories () {
        return axios({ method: 'GET', url: `/category`, isStatic: true })
    }

    static async updateCategory ({id, name}) {
        return axios({ method: 'PUT', url: `/category/${id}`, data: {name}, isStatic: true })
    }

    static async deleteCategory (id) {
        return axios({ method: 'DELETE', url: `/category/${id}`, isStatic: true })
    }
}