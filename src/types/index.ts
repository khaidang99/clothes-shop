import { number } from 'prop-types';
import { UploadFile } from 'antd/lib/upload/interface';

export interface User {
  _id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  token: string
}

export interface valuesLogin {
  email: string | undefined;
  password: string | undefined;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}
export interface TypeLocationCreateProduct {
  state: {
    from?: {
      pathname?: string;
    };
    kind: string
  }
}

export interface Cart {
  _id: string,
  name: string,
  image: string[],
  size: string[],
  price: number,
  description: string,
  brand: string
}

export interface TypeCart extends Omit<Cart, "image" | "description"> {
  image: string,
  sizeSelected: string,
  quantity: number,
  select: boolean,
}

export interface CartSession extends Omit<Cart, "image" | "description" | "brand"> {
  id: string,
  image: string,
  sizeSelected: string,
  quantity: number,
  select: boolean,
}

export interface CartModal extends Cart{
  _id: string,
  name: string,
  image: string[],
  size: string[],
  price: number,
}

export interface TypePagination {
  page?: number,
  perPage?: number,
  category?: string[],
}

export interface TypeFilterSibar {
  name?: string,
  categories?: string[],
  sizes?: string[],
}

export interface ImageURL {
  uid: number,
  url: string,
}

export interface ValuesFormCreate {
  name: string,
  price: number,
  image: [ImageURL] | UploadFile<any>[],
  brand: string,
  countInStock: number,
  category: string[],
  size: string[],
  description: string
}

export interface ValuesFormCreateProductAPI extends Omit<ValuesFormCreate, 'image'> {
  image: [{uid: number, url: string}] | string[],
}

export interface ValuesFormUpdateProductAPI extends Omit<ValuesFormCreate, 'image'> {
  id: string,
  image: [{uid: number, url: string}] | string[],
}

export type ImageFile = ImageURL | UploadFile<any>

export type ImageListFiles = [ImageURL | UploadFile<any>]