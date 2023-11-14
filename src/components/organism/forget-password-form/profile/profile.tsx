import type { TabsProps } from "antd";
import { Space, Switch, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonAtom from "../../../atoms/button/button.attom";
import HeadingAtom from "../../../atoms/heading/heading.atom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import SpinnerAtom from "../../../atoms/spin/spin";
import TextInputAtom from "../../../atoms/text-input/textInput.atom";
import "./profile.scss";

//@ts-ignore
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
const ProfileOrganism = ({ data, loading }: any) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  useEffect(() => {
    setValue("firstName", data?.name?.split(" ")[0] as string);
    setValue("lastName", data?.name?.split(" ")[1] as string);
    setValue("bio", data?.bio);
    setValue("email", data?.email);
  }, [data, setValue]);
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const tabOnchange = (key: string) => {
    if (key === "1") {
      navigate("/profile/basic-information");
    } else if (key === "2") {
      navigate("/profile/photo");
    }
  };
  const [editForm, setEditForm] = useState<boolean>(true);

  const handleEditForm = () => {
    setEditForm(!editForm);
  };
  return (
    <div className="profile-form mb-40 mt-40">
      <Tabs
        size="large"
        defaultActiveKey="1"
        items={items}
        onChange={tabOnchange}
      />
      <HeadingAtom text="Profile"></HeadingAtom>
      <Switch
        unCheckedChildren="edit"
        checkedChildren="close"
        onChange={handleEditForm}
      ></Switch>
      {loading ? (
        <SpinnerAtom />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <div className="form-wrapper">
              <div className="form-left">
                <div className="input-group mb-20">
                  <ParagraphAtom text="First name" />
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom disable={editForm} fieldValues={field} />
                    )}
                  />
                </div>
                <div className="input-group mb-20">
                  <ParagraphAtom text="Last Name" />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom disable={editForm} fieldValues={field} />
                    )}
                  />
                </div>
                <div className="input-group mb-20">
                  <ParagraphAtom text="Email" />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom disable={editForm} fieldValues={field} />
                    )}
                  />
                </div>
                <div className="input-group mb-20">
                  <ParagraphAtom text="Biography" />
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        disabled={editForm}
                        {...field}
                        rows={3}
                        maxLength={6}
                      />
                    )}
                  />
                </div>
                <div className="input-group mb-20">
                  <ParagraphAtom text="Heading" />
                  <Controller
                    name="heading"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom disable={editForm} fieldValues={field} />
                    )}
                  />
                </div>
              </div>
              <div className="form-right">
                <div className="input-group mb-20">
                  <ParagraphAtom text="Website" />
                  <Controller
                    name="website"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom
                        disable={editForm}
                        placeholder={"Url"}
                        fieldValues={field}
                      />
                    )}
                  />
                </div>
                <div className="input-group mb-20">
                  <ParagraphAtom text="Facebook" />
                  <Controller
                    name="facebook"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom
                        disable={editForm}
                        addonBefore="http://www.facebook.com/"
                        placeholder={"username"}
                        fieldValues={field}
                      />
                    )}
                  />
                </div>
                <div className="input-group mb-20">
                  <ParagraphAtom text="Website" />
                  <Controller
                    name="twitter"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom
                        disable={editForm}
                        addonBefore="http://www.twitter.com/"
                        placeholder={"username"}
                        fieldValues={field}
                      />
                    )}
                  />
                </div>
                <div className="input-group mb-20">
                  <ParagraphAtom text="Linkedin" />
                  <Controller
                    name="linkedin"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom
                        disable={editForm}
                        addonBefore="http://www.linkedin.com/"
                        placeholder={"resources ID"}
                        fieldValues={field}
                      />
                    )}
                  />
                </div>
                <div className="input-group mb-20">
                  <ParagraphAtom text="Youtube" />
                  <Controller
                    name="youtube"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom
                        disable={editForm || true}
                        addonBefore="http://www.youtube.com/"
                        placeholder={"Username"}
                        fieldValues={field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <ButtonAtom
              text="Save"
              type="primary"
              htmlType="submit"
              size="large"
              disabled={editForm}
            />
          </Space>
        </form>
      )}
    </div>
  );
};

export default ProfileOrganism;
