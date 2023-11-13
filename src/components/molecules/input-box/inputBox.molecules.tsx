// import TextInputAtom from '../../atoms/text-input/textInput.atom';
import { Form, Input } from 'antd';
interface ITextInputProps {
  label?: string;
  name?: string;
  rules?: object[];
  placeholder?: string;
}
const InputBoxMolecules = ({
  label,
  name,
  rules,
  placeholder,
}: ITextInputProps) => {
  return (
    <div className="inputBox">
      <Form.Item label={label} name={name} rules={rules}>
        <Input placeholder={placeholder} />
      </Form.Item>
    </div>
  );
};

export default InputBoxMolecules;
