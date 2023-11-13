import { Form, Input } from 'antd';
interface ITextInputProps {
  label?: string;
  name?: string;
  rules?: [object];
  placeholder?: string;
}
const InputBoxPasswordMolecules = ({
  label,
  name,
  rules,
  placeholder,
}: ITextInputProps) => {
  return (
    <div className="inputBox">
      <Form.Item label={label} name={name} rules={rules}>
        <Input.Password placeholder={placeholder} />
      </Form.Item>
    </div>
  );
};

export default InputBoxPasswordMolecules;
