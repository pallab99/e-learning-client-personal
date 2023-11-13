import { Spin } from "antd";
import "./spinner.scss";
const SpinnerAtom = () => {
  return (
    <div className="spin-div mt-20">
      <Spin size="large" />
    </div>
  );
};

export default SpinnerAtom;
