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

function CreateProduct(props) {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();

  const { sizes, categories } = useSelector((state) => state.products);
  useEffect(() => {
    async function fetchProducts() {
      await dispatch(getSibar());
      if (location.state && location.state.kind === "edit" && params.id) {
        const { data: product } = await Product.getOneProduct(params.id);
        form.setFieldsValue({
          name: "",
          price: number,
          image: [],
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
          price: number,
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

  const onFinish = async (values) => {
    var listBase64 = await convertFileToBase64(values.image);
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

  const convertFileToBase64 = (listFile) => {
    return Promise.all(
      listFile.map((file) => {
        return new Promise((resolve, reject) => {
          if (file.originFileObj) {
            var reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = (e) => {
              resolve(e.target.result);
            };
          } else {
            resolve(file.url);
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

  const formatImages = (imageUrls) => {
    return imageUrls.map((url, index) => {
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
      layout={{
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }}
    >
      <InputField
        name="name"
        label="Name product"
        placeholder="Name"
        rules={[{ required: true }]}
      />
      <InputNumberField
        name="price"
        type="number"
        label="Price product"
        placeholder="Price"
        rules={[{ required: true, type: "number", min: 1 }]}
      />
      <UploadImg
        name="image"
        label="image"
        placeholder="Eg: Wow nature ..."
        rules={[{ required: true }]}
      />
      <InputNumberField
        name="countInStock"
        type="number"
        label="CountInStock"
        placeholder="CountInStock"
        rules={[{ required: true, type: "number", min: 0 }]}
      />
      <SelectField
        name="brand"
        label="Brand"
        options={[
          {
            value: 123,
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
