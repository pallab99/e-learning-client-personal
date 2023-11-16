import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const CourseTab = ({ items }: any) => {
  const navigate = useNavigate();

  const tabOnchange = (key: string) => {
    if (key === "1") {
      navigate("/profile/basic-information");
    } else if (key === "2") {
      navigate("/profile/photo");
    }
  };

  return (
    <Tabs
      size="large"
      defaultActiveKey="2"
      items={items}
      onChange={tabOnchange}
    />
  );
};

export default CourseTab;
