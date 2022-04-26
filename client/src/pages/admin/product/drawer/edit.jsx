import React, { useEffect, useRef, useState } from 'react';
import {
  Drawer,
  Button,
  Space,
  Form,
  Input,
  Radio,
  Select,
  Image,
  message,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import productApi from '../../../../services/product';
import { mapObjectToFormData } from '../../../../utils';
import { useForm } from 'antd/lib/form/Form';

const App = ({ edit, showEdit, product, setRefresh }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const hide = () => {
    showEdit(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    let data = image
      ? mapObjectToFormData({ ...values, image })
      : mapObjectToFormData(values);
    await productApi.update(product._id, data).then((res) => {
      message.success('Product updated successfully.');
      hide();
      setRefresh();
    });
    setLoading(false);
    form.resetFields();
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: product?.name,
      price: product?.price,
      stock: product?.stock,
      category: product?.category,
      description: product?.description,
    });
    setImage(product?.image.url);

    return () => {
      form.resetFields();
      setImage(null);
    };
  }, [product]);

  return (
    <>
      <Drawer
        title="Edit product"
        placement="right"
        size="large"
        onClose={hide}
        visible={edit}
      >
        <Form
          form={form}
          className="w-full"
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Name is required.' }]}
          >
            <Input placeholder="Enter name of the product" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Price is required.' }]}
          >
            <Input prefix="$" placeholder="Enter price of the product" />
          </Form.Item>
          <Form.Item
            label="Stocks"
            name="stock"
            rules={[
              { required: true, message: 'Number of stock is required.' },
            ]}
          >
            <Input placeholder="Enter number of stocks for the product" />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Category is required' }]}
          >
            <Select placeholder="select category">
              <Option value="tshirts">T-Shirts</Option>
              <Option value="pants">Pants</Option>
              <Option value="shoes">Shoes</Option>
              <Option value="jackets">Jackets</Option>
              <Option value="shirts">Shirts</Option>
              <Option value="caps">Caps</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <TextArea placeholder="Description about the product." allowClear />
          </Form.Item>

          <div className="my-8">
            <div>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={imageHandler}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {image && (
            <div className="flex justify-center m-4">
              <Image width={200} src={image} />
            </div>
          )}

          <Form.Item>
            <Button
              className="w-full"
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
            >
              Update now
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
