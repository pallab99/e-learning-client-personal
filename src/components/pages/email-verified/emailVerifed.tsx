import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ButtonAtom from "../../atoms/button/button.attom";

const EmailVerifiedPage: React.FC = () => (
  <Result
    status="success"
    title="Your Email is verified successfully"
    subTitle="Now you can login and explore the website"
    extra={[
      <Link to={"/log-in"}>
        <ButtonAtom type="primary" text="Log-in" />
      </Link>,
    ]}
  />
);

export default EmailVerifiedPage;
