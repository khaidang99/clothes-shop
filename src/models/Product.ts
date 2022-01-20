import axios from 'plugins/Axios';
import { ValuesFormUpdateProductAPI, ValuesFormCreateProductAPI, TypePagination } from 'types';

export default class Product {
    static async createProduct (product: ValuesFormCreateProductAPI) {
        return axios({ method: 'POST', url: "/products", data: product})
    }

    static async getAllProducts (params: TypePagination) {
        return axios({ method: 'GET', url: `/products`, params })
    }

    static async getOneProduct (id: string) {
        return axios({ method: 'GET', url: `/products/${id}`})
    }

    static async updateProduct ({id,...rest}: ValuesFormUpdateProductAPI) {
        return axios({ method: 'PUT', url: `/products/${id}`, data: rest})
    }

    static async deleteProduct (id: string) {
        return axios({ method: 'DELETE', url: `/products/${id}` })
    }

    static async getSibar () {
        return axios({ method: 'GET', url: `/products/sibar` })
    }
}