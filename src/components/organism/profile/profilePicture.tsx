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
import { PlusOutlined } from '@ant-design/icons';

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
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const imageOnChange = (e: any) => {
    console.log(e);
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
          {/* <Image src={data && data.dp} height={150}></Image> */}
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div className="input-group">
              <ParagraphAtom text="Profile picture" />
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    {...field}
                  >
                    {data && data.dp ? (
                      <div
                        className=""
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Image
                          src={data && data.dp}
                          alt="avatar"
                          style={{ width: '100%', borderRadius: '50%' }}
                          onChange={imageOnChange}
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
            />
          </Space>
        </form>
      )}
    </div>
  );
};

export default ProfilePictureOrganism;
