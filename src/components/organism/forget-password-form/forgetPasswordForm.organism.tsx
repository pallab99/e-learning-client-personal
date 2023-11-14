//@ts-nocheck
import { Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { passwordValidator } from "../../../helper/passwordValidator";
import useResetPassword from "../../../hooks/auth/useResetPassword";
import HeadingAtom from "../../atoms/heading/heading.atom";
import CenteredBtnOrganism from "../../molecules/centered-btn/centered-btn.molecules";
import InputBoxPasswordMolecules from "../../molecules/input-box-password/inputBoxPassword.molecules";

const ForgetPasswordFormOrganism = () => {
  const [form] = Form.useForm();
  const { userId, resetToken } = useParams();
  const { resetPasswordLoading, data, resetPassword } = useResetPassword();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const resetPasswordData = {
      ...values,
      userId,
      resetToken,
    };
    console.log(resetPasswordData);
    await resetPassword(resetPasswordData);
  };
  return (
    <div className="form-div">
      <div className="form-div-wrapper">
        <HeadingAtom level={4} text="Enter your new password"></HeadingAtom>
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
          <InputBoxPasswordMolecules
            label="Password"
            name="password"
            size="large"
            rules={[
              { required: true, message: "Please input your password!" },
              { validator: passwordValidator },
            ]}
            placeholder="Please Enter your password"
          ></InputBoxPasswordMolecules>
          <InputBoxPasswordMolecules
            label="Confirm Password"
            size="large"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
            placeholder="Please Enter your confirm password!"
          ></InputBoxPasswordMolecules>

          <Form.Item>
            <CenteredBtnOrganism
              justify="center"
              text="Change password"
              type="primary"
              size="large"
              htmlType="submit"
              loading={resetPasswordLoading}
              // size="large"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordFormOrganism;
