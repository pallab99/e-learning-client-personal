import { Input } from "antd";
interface IInputAtomProps {
  placeholder?: string;
  className?: string;
  fieldValues?: any;
  addonBefore?: string;
  disable?: boolean;
}
const TextInputAtom = ({
  placeholder,
  fieldValues,
  className,
  addonBefore,
  disable,
}: IInputAtomProps) => {
  return (
    <Input
      addonBefore={addonBefore}
      className={className}
      placeholder={placeholder}
      disabled={disable}
      {...fieldValues}
    />
  );
};

export default TextInputAtom;
