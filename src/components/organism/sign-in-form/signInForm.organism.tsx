import { Divider, Form } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN, INSTRUCTOR } from '../../../constant/userType';
import useLogin from '../../../hooks/auth/useLogin';
import { useAppSelector } from '../../../redux/store';
import { ILogin } from '../../../types/loginData';
import ButtonAtom from '../../atoms/button/button.attom';
import HeadingAtom from '../../atoms/heading/heading.atom';
import CenteredBtnOrganism from '../../molecules/centered-btn/centered-btn.molecules';
import InputBoxPasswordMolecules from '../../molecules/input-box-password/inputBoxPassword.molecules';
import InputBoxMolecules from '../../molecules/input-box/inputBox.molecules';
import ForgetPasswordModalOrganism from '../modal/modal.organism';
import './signInForm.style.scss';

const SignInFormOrganism = () => {
  const [openModal, setOpenModal] = useState(false);
  const { loading, login } = useLogin();
  const userRank = useAppSelector((state) => state.auth.userData?.rank);
  const navigate = useNavigate();
  const onFinish = async (values: ILogin) => {
    await login(values);
    console.log(userRank);

    if (userRank === INSTRUCTOR) {
      navigate('/instructor/courses');
    } else if (userRank === ADMIN) {
      navigate('/admin/user/student');
    } else {
      navigate('/profile/basic-information');
    }
  };
  const openForgetPasswordModal = () => {
    setOpenModal(true);
  };
  const handleForgetPassword = async (values: any) => {
    console.log(values);
  };

  return (
    <div className="form-div">
      <div className="form-div-wrapper">
        <HeadingAtom level={4} text="Log in to your account"></HeadingAtom>
        <Form
          name="sign in"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          className="sign-in-form"
        >
          <InputBoxMolecules
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Please input your email!' },
            ]}
            placeholder="Please Enter your email"
          ></InputBoxMolecules>

          <InputBoxPasswordMolecules
            label="Password"
            name="password"
            placeholder="Please Enter your password"
          ></InputBoxPasswordMolecules>

          <Form.Item>
            <CenteredBtnOrganism
              justify="center"
              text="Login"
              type="primary"
              htmlType="submit"
              loading={loading}
            />
          </Form.Item>
        </Form>
        <p className="text-center">
          or{' '}
          <span className="text-18">
            <ButtonAtom
              text="Forgot Password"
              type="text"
              handleButtonClick={openForgetPasswordModal}
              dangerBtn={true}
            ></ButtonAtom>
          </span>
        </p>
        <Divider></Divider>
        <p className="text-center">
          Don't have an account?{' '}
          <Link className="text-18" to={'/sign-up'}>
            Sign up
          </Link>
        </p>
        <ForgetPasswordModalOrganism
          open={openModal}
          setOpenModal={setOpenModal}
          onFinish={handleForgetPassword}
          name="Forget password"
        ></ForgetPasswordModalOrganism>
      </div>
    </div>
  );
};

export default SignInFormOrganism;
