//@ts-ignore
import { Checkbox, Divider, Form, Select } from "antd";
import { Link } from "react-router-dom";
import { passwordValidator } from "../../../helper/passwordValidator";
import HeadingAtom from "../../atoms/heading/heading.atom";
import CenteredBtnOrganism from "../../molecules/centered-btn/centered-btn.molecules";
import InputBoxPasswordMolecules from "../../molecules/input-box-password/inputBoxPassword.molecules";
import InputBoxMolecules from "../../molecules/input-box/inputBox.molecules";

const { Option } = Select;

const SignUpFormOrganism = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <div className="form-div">
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
          />
          <InputBoxMolecules
            label="Email"
            name="email"
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
            rules={[
              { required: true, message: "Please input your password!" },
              { validator: passwordValidator },
            ]}
            placeholder="Please Enter your password"
          />
          <InputBoxPasswordMolecules
            label="Confirm Password"
            name="confirmPassword"
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
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
            placeholder="Please Enter your name"
          />
          <Form.Item
            name="rank"
            label="You are a?"
            rules={[{ required: true, message: "Please Select an option" }]}
          >
            <Select placeholder="Select a option" allowClear>
              <Option value="3">student</Option>
              <Option value="2">instructor</Option>
            </Select>
          </Form.Item>

          <Form.Item name="notificationSetting" valuePropName="checked">
            <Checkbox>Send me regular updates via email</Checkbox>
          </Form.Item>
          <Form.Item>
            <CenteredBtnOrganism
              justify="center"
              text="Sign Up"
              type="primary"
              htmlType="submit"
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
