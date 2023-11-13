import type { TabsProps } from 'antd';
import { Image, Space, Tabs, Upload } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ButtonAtom from '../../atoms/button/button.attom';
import HeadingAtom from '../../atoms/heading/heading.atom';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import SpinnerAtom from '../../atoms/spin/spin';
import './profile.scss';
import './profilePicture.scss';
const { Dragger } = Upload;
const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Udemy Profile',
  },
  {
    key: '2',
    label: 'Profile Picture',
  },
];
const ProfilePictureOrganism = ({ data, loading }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  });
  console.log('dp', data);

  const navigate = useNavigate();
  const tabOnchange = (key: string) => {
    if (key === '1') {
      navigate('/profile/basic-information');
    } else if (key === '2') {
      navigate('/profile/photo');
    }
  };
  const onSubmit = (data: any) => {
    console.log(data);
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
        <SpinnerAtom />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Image src={data && data.dp} height={150}></Image>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div className="input-group">
              <ParagraphAtom text="Profile picture" />
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <Dragger {...field} listType="picture">
                    <p className="ant-upload-drag-icon">
                      <img
                        src="https://img-c.udemycdn.com/user/200_H/anonymous_3.png"
                        alt=""
                      />
                    </p>
                    <ParagraphAtom
                      text="Click or drag the profile picture to this area to upload"
                      className="ant-upload-text"
                    ></ParagraphAtom>
                  </Dragger>
                )}
              />
            </div>
            <ButtonAtom
              text="Save"
              type="primary"
              htmlType="submit"
              size="large"
            />
          </Space>
        </form>
      )}
    </div>
  );
};

export default ProfilePictureOrganism;
