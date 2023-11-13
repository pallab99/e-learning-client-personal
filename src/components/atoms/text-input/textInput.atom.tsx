import { Input } from 'antd';
interface IInputAtomProps {
  placeholder?: string;
  className?: string;
  fieldValues?: any;
  addonBefore?: string;
  disabled?: boolean;
  size?: 'large' | 'default' | 'small';
  showCount?: boolean;
  maxLength?: number;
}
const TextInputAtom = ({
  placeholder,
  fieldValues,
  className,
  addonBefore,
  disabled,
  size,
  showCount,
  maxLength,
}: IInputAtomProps) => {
  return (
    <Input
      addonBefore={addonBefore}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      showCount={showCount}
      maxLength={maxLength}
      {...fieldValues}
    />
  );
};

export default TextInputAtom;
