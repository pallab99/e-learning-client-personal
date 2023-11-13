import React from 'react';
import HeadingAtom from '../../atoms/heading/heading.atom';
import { Form } from 'antd';
import ButtonAtom from '../../atoms/button/button.attom';
import InputBoxPasswordMolecules from '../../molecules/input-box-password/inputBoxPassword.molecules';
import { passwordValidator } from '../../../helper/passwordValidator';
import CenteredBtnOrganism from '../../molecules/centered-btn/centered-btn.molecules';

const ForgetPasswordFormOrganism = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log(values);
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
          // style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
          scrollToFirstError
          className="sign-in-form"
        >
          <InputBoxPasswordMolecules
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { validator: passwordValidator },
            ]}
            placeholder="Please Enter your password"
          ></InputBoxPasswordMolecules>
          <InputBoxPasswordMolecules
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input your confirm password!',
              },
              ({ getFieldValue }) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
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
              htmlType="submit"
              // size="large"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordFormOrganism;
