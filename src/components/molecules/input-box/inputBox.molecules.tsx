// import TextInputAtom from '../../atoms/text-input/textInput.atom';
import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
interface ITextInputProps {
  label?: string;
  name?: string;
  rules?: object[];
  placeholder?: string;
  size?: SizeType;
}
const InputBoxMolecules = ({
  label,
  name,
  rules,
  placeholder,
  size,
}: ITextInputProps) => {
  return (
    <div className="inputBox">
      <Form.Item label={label} name={name} rules={rules}>
        <Input placeholder={placeholder} size={size} />
      </Form.Item>
    </div>
  );
};

export default InputBoxMolecules;
