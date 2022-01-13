import axios from 'plugins/Axios';

export default class Product {
    static async createProduct (product) {
        return axios({ method: 'POST', url: "/products", data: product , isStatic: true })
    }

    static async getAllProducts (params) {
        return axios({ method: 'GET', url: `/products`, params, isStatic: true })
    }

    static async getOneProduct (id) {
        return axios({ method: 'GET', url: `/products/${id}`, isStatic: true })
    }

    static async updateProduct ({id,...rest}) {
        return axios({ method: 'PUT', url: `/products/${id}`, data: rest, isStatic: true })
    }

    static async deleteProduct (id) {
        return axios({ method: 'DELETE', url: `/products/${id}`, isStatic: true })
    }

    static async getSibar () {
        return axios({ method: 'GET', url: `/products/sibar`, isStatic: true })
    }
}