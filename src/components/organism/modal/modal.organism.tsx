import { Form, Modal } from 'antd';
import InputBoxMolecules from '../../molecules/input-box/inputBox.molecules';
import ButtonAtom from '../../atoms/button/button.attom';
import HeadingAtom from '../../atoms/heading/heading.atom';
interface IModalOrganismProps {
  open?: boolean;
  name?: string;
  setOpenModal: (val: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish?: (val: any) => void;
  style?: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  centered?: any;
}
export default function ForgetPasswordModalOrganism({
  open,
  name,
  setOpenModal,
  onFinish,
  style,
}: IModalOrganismProps) {
  return (
    <Modal
      open={open}
      centered
      onCancel={() => setOpenModal(false)}
      //   onOk={onFinish}
      style={style}
      footer={null}
    >
      <HeadingAtom
        text="Enter your email to reset password"
        level={4}
        type="danger"
      ></HeadingAtom>
      <Form
        name={name}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        className="sign-in-form"
      >
        <Form.Item>
          <InputBoxMolecules
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
            placeholder="Please Enter your email"
          ></InputBoxMolecules>
        </Form.Item>
        <Form.Item>
          <ButtonAtom
            type="primary"
            htmlType="submit"
            text="submit"
            className="login-btn"
          ></ButtonAtom>
        </Form.Item>
      </Form>
    </Modal>
  );
}
