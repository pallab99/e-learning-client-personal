import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
interface ITextInputProps {
  label?: string;
  name?: string;
  rules?: [object];
  placeholder?: string;
  size?: SizeType;
}
const InputBoxPasswordMolecules = ({
  label,
  name,
  rules,
  placeholder,
  size,
}: ITextInputProps) => {
  return (
    <div className="inputBox">
      <Form.Item label={label} name={name} rules={rules}>
        <Input.Password placeholder={placeholder} size={size} />
      </Form.Item>
    </div>
  );
};

export default InputBoxPasswordMolecules;
