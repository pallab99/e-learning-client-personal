import { Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import ButtonAtom from '../../atoms/button/button.attom';
import { Link } from 'react-router-dom';

interface IResultProps {
  status?: ResultStatusType;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  link?: string;
}
const ResultMolecules = (props: IResultProps) => {
  return (
    <Result
      status={props.status}
      title={props.title}
      subTitle={props.subTitle}
      extra={
        props.link ? (
          <Link to={props.link}>
            <ButtonAtom type="primary" text="Back to home"></ButtonAtom>
          </Link>
        ) : null
      }
    />
  );
};

export default ResultMolecules;
