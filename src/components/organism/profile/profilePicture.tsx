import { PlusOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import { Space, Tabs, Upload, message } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserApi from "../../../api/UserApi";
import { DP_FILE_SIZE } from "../../../constant/file";
import { recallUserApi } from "../../../redux/slices/authSlice";
import { useAppDispatch } from "../../../redux/store";
import ButtonAtom from "../../atoms/button/button.attom";
import HeadingAtom from "../../atoms/heading/heading.atom";
import ParagraphAtom from "../../atoms/paragraph/paragraph.atom";
import EditProfilePicSkeleton from "../../edit-profile-picture/editProfilePicture";
import "./profile.scss";
import "./profilePicture.scss";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Udemy Profile",
  },
  {
    key: "2",
    label: "Profile Picture",
  },
];
const ProfilePictureOrganism = ({ data, loading }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [btnloading, setBtnLoading] = useState(false);
  const tabOnchange = (key: string) => {
    if (key === "1") {
      navigate("/profile/basic-information");
    } else if (key === "2") {
      navigate("/profile/photo");
    }
  };
  const onSubmit = async (data: any) => {
    const file = data?.thumbnail[0]?.originFileObj;
    if (file) {
      const formData = new FormData();
      formData.append("file_to_upload", file);
      try {
        setBtnLoading(true);
        const response = await UserApi.updateDp(formData);
        message.success(response?.data.message);
        setBtnLoading(false);
        dispatch(recallUserApi());
      } catch (error: any) {
        setBtnLoading(false);
        message.error(error.response.message);
      }
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    console.log(file);

    if (!isImage) {
      message.error("You can only upload image files!");
    } else if (file.size > DP_FILE_SIZE) {
      message.error("Your picture can not exceed 20 megabytes");
    }
    return false;
  };

  return (
    <div className="profile-picture-form mb-40 mt-40">
      <Tabs
        size="large"
        defaultActiveKey="2"
        items={items}
        onChange={tabOnchange}
      />
      <HeadingAtom text="Profile Picture"></HeadingAtom>
      {loading ? (
        <EditProfilePicSkeleton />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <div className="input-group">
              <ParagraphAtom text="Profile picture" />
              <Controller
                name="thumbnail"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Upload
                    listType="picture-circle"
                    className="avatar-uploader"
                    beforeUpload={beforeUpload}
                    fileList={value}
                    onChange={({ fileList }) => onChange(fileList)}
                    {...field}
                  >
                    {data && data.dp ? (
                      <div className="">
                        <img
                          src={data && data.dp}
                          alt="avatar"
                          style={{ width: "100%", borderRadius: "50%" }}
                        />
                      </div>
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                )}
              />
            </div>

            <ButtonAtom
              text="Save"
              type="primary"
              htmlType="submit"
              size="large"
              loading={btnloading}
            />
          </Space>
        </form>
      )}
    </div>
  );
};

export default ProfilePictureOrganism;
