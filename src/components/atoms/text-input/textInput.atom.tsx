import { Input } from 'antd';
interface IInputAtomProps {
  placeholder?: string;
  className?: string;
  fieldValues?: any;
  addonBefore?: string;
  disabled?: boolean;
  size?: 'large' | 'default' | 'small';
}
const TextInputAtom = ({
  placeholder,
  fieldValues,
  className,
  addonBefore,
  disabled,
  size,
}: IInputAtomProps) => {
  return (
    <Input
      addonBefore={addonBefore}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      {...fieldValues}
    />
  );
};

export default TextInputAtom;
