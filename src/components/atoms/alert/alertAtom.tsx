import { Alert } from 'antd';

const AlertAtom = ({ message, className, type }: any) => {
  return (
    <Alert showIcon message={message} className={className} type={type}></Alert>
  );
};

export default AlertAtom;
