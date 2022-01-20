import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { number } from "yup/lib/locale";

import InputField from "custom-fields/input/InputField";
import InputNumberField from "custom-fields/input/InputNumberField";
import SelectField from "custom-fields/select/SelectField";
import UploadImg from "custom-fields/upload/UploadImg";
import { fetchCreateProduct, getSibar } from "./ProductsSlice";
import { setLoadingFullPage } from "features/common/commonSlice";
import Product from "models/Product";
import {
  TypeLocationCreateProduct,
  ImageURL,
  ValuesFormCreate,
  ImageListFiles,
  ImageFile,
} from "types";
import { RcFile } from "antd/lib/upload";
import type { RootState } from "app/Store";
import { UploadFile } from "antd/lib/upload/interface";

function CreateProduct() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  let location = useLocation() as TypeLocationCreateProduct;
  let navigate = useNavigate();
  let params = useParams();

  const { sizes, categories } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    async function fetchProducts() {
      await dispatch(getSibar());
      if (location.state && location.state.kind === "edit" && params.id) {
        const { data: product } = await Product.getOneProduct(params.id);
        form.setFieldsValue({
          name: "",
          price: 0,
          brand: "",
          countInStock: 0,
          category: [],
          size: [],
          description: "",
          ...product,
          image: formatImages(product.image),
        });
      } else {
        form.setFieldsValue({
          name: "",
          price: 0,
          image: [],
          brand: "",
          countInStock: 0,
          category: [],
          size: [],
          description: "",
        });
      }
    }
    fetchProducts();
  }, []);

  const onFinish = async (values: ValuesFormCreate) => {
    var listBase64 : string[] = await convertFileToBase64(values.image);
    console.log({ id: params.id, ...values, image: listBase64 });
    dispatch(setLoadingFullPage(true));
    if (location.state && location.state.kind === "edit" && params.id) {
      const aa = await Product.updateProduct({
        id: params.id,
        ...values,
        image: listBase64,
      });
      console.log(aa);
      dispatch(setLoadingFullPage(false));
      navigate("/admin");
    } else {
      const res = await dispatch(
        fetchCreateProduct({ ...values, image: listBase64 })
      );
      console.log(res);
      dispatch(setLoadingFullPage(false));
      navigate("/admin");
    }
  };

  function instanceOfUploadFile(object: any): object is UploadFile<any> {
    return "originFileObj" in object;
  }

  const convertFileToBase64 = (listFile: UploadFile<any>[] | [ImageURL]) => {
    return Promise.all(
      listFile.map((file: UploadFile<any> | ImageURL) => {
        return new Promise<string>((resolve, reject) => {
          if (instanceOfUploadFile(file)) {
            var reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as RcFile);
            reader.onload = (e: ProgressEvent<FileReader>) => {
              resolve(e.target!.result as string);
            };
          } else {
            resolve(file.url as string);
          }
        });
      })
    ).then((values) => {
      return values;
    });
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const formatImages = (imageUrls: string[]): ImageURL[] => {
    return imageUrls.map((url: string, index: number) => {
      return {
        uid: index,
        url: url,
      };
    });
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      name="nest-messages"
      validateMessages={validateMessages}
      wrapperCol={{ span: 14 }}
      labelCol={{ span: 4 }}
      className="mt-5 pt-4"
    >
      <InputField
        name="name"
        label="Name product"
        placeholder="Name"
        rules={[{ required: true }]}
      />
      <InputNumberField
        name="price"
        label="Price product"
        placeholder="Price"
        rules={[{ required: true, min :2, type: "number"}]}
      />
      <UploadImg name="image" label="image" rules={[{ required: true }]} />
      <InputNumberField
        name="countInStock"
        label="CountInStock"
        placeholder="CountInStock"
        rules={[{ required: true, min: 0, type: "number"}]}
      />
      <SelectField
        name="brand"
        label="Brand"
        options={[
          {
            value: "123",
            name: "Levi",
          },
        ]}
        rules={[{ required: true }]}
      />
      <SelectField
        name="category"
        label="Category"
        options={categories}
        mode="multiple"
        rules={[{ required: true }]}
      />
      <SelectField
        name="size"
        label="Size"
        options={sizes}
        mode="multiple"
        rules={[{ required: true }]}
      />
      <InputField
        name="description"
        label="Description"
        placeholder="description"
        rules={[{ required: true }]}
      />

      <button type="submit">{params.id ? "Update" : "Create"}</button>
    </Form>
  );
}

export default CreateProduct;
