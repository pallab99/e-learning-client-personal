//@ts-nocheck
import { Divider, Form, Select, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../../../api/AuthApi";
import { passwordValidator } from "../../../helper/passwordValidator";
import HeadingAtom from "../../atoms/heading/heading.atom";
import CenteredBtnOrganism from "../../molecules/centered-btn/centered-btn.molecules";
import InputBoxPasswordMolecules from "../../molecules/input-box-password/inputBoxPassword.molecules";
import InputBoxMolecules from "../../molecules/input-box/inputBox.molecules";
import "./signupForm.scss";
const { Option } = Select;

const SignUpFormOrganism = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      setLoading(true);
      const res = await AuthApi.signUp(values);
      console.log(res?.data);
      message.success(res?.data?.message);
      navigate("/log-in");
      setLoading(false);
    } catch (error: any) {
      message.error(error?.response?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-div  mt-50 mb-30">
      <div className="form-div-wrapper">
        <HeadingAtom level={4} text="Sign up and start learning" />
        <Form
          name="signUp"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          scrollToFirstError
          className="sign-in-form"
        >
          <InputBoxMolecules
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
            placeholder="Please Enter your name"
            size="large"
          />
          <InputBoxMolecules
            label="Email"
            name="email"
            size="large"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
            placeholder="Please Enter your email"
          />

          <InputBoxPasswordMolecules
            label="Password"
            name="password"
            size="large"
            rules={[
              { required: true, message: "Please input your password!" },
              { validator: passwordValidator },
            ]}
            placeholder="Please Enter your password"
          />
          <InputBoxPasswordMolecules
            label="Confirm Password"
            name="confirmPassword"
            size="large"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              {
                validator: async (_: any, value: any) => {
                  if (!value || form.getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The confirm password that you entered do not match!"
                  );
                },
              },
            ]}
            placeholder="Please Enter your confirm password!"
          />
          <InputBoxMolecules
            label="Phone Number"
            name="phoneNumber"
            size="large"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
            placeholder="Please Enter your name"
          />
          <Form.Item
            name="rank"
            label="You are a?"
            size="large"
            rules={[{ required: true, message: "Please Select an option" }]}
          >
            <Select placeholder="Select a option" allowClear>
              <Option value="3">student</Option>
              <Option value="2">instructor</Option>
            </Select>
          </Form.Item>

          {/* <Form.Item name="notificationSetting" valuePropName="checked">
            <Checkbox size="large">Send me regular updates via email</Checkbox>
          </Form.Item> */}
          <Form.Item>
            <CenteredBtnOrganism
              justify="center"
              text="Sign Up"
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              // size="large"
            />
          </Form.Item>
        </Form>

        <Divider />
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-18" to={"/log-in"}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpFormOrganism;
