import HeadingAtom from "../../../atoms/heading/heading.atom";
import "./requirements.scss";
const Requirements = ({ prerequisitesData }: any) => {
  return (
    <div className="requirements_container mt-30 mb-50">
      <div className="requirements_header">
        <HeadingAtom text="Requirements" level={3}></HeadingAtom>
      </div>
      <div className="requirements_list mt-20 text-18">
        <ul>
          {prerequisitesData &&
            prerequisitesData?.map((ele: any) => {
              return <li className="mt-10">{ele}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Requirements;
