//@ts-nocheck
import type { TabsProps } from 'antd';
import { Input, Space, Tabs } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ButtonAtom from '../../atoms/button/button.attom';
import HeadingAtom from '../../atoms/heading/heading.atom';
const { TextArea } = Input;

import './profile.scss';
import EditProfileSkeleton from '../../atoms/edit-profile-skeleton/editProfileSkeleton';
import useUpdateUser from '../../../hooks/user/updateUser';
import { InputField } from '../../molecules/input-field-controller/inputFieldController';
import {
  FACEBOOK_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  YOUTUBE_URL,
} from '../../../constant/url';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';

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
const ProfileOrganism = ({ data, loading }: any) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    setValue('firstName', data?.name?.split(' ')[0] as string);
    setValue('lastName', data?.name?.split(' ')[1] as string);
    setValue('bio', data?.bio);
    setValue('email', data?.email);
    setValue('heading', data?.heading);
    setValue('website', data?.website);
    setValue('facebook', data?.facebook?.split('/')[3]);
    setValue('twitter', data?.twitter?.split('/')[3]);
    setValue('linkedIn', data?.linkedIn?.split('/')[3]);
    setValue('youtube', data?.youtube?.split('/')[3]);
  }, [data, setValue]);
  const { btnLoading, updateUser } = useUpdateUser();

  const onSubmit = async (data: any) => {
    const userData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      bio: data.bio,
      heading: data.heading,
      website: data?.website,
      facebook: `${
        data.facebook ? `http://www.facebook.com/${data?.facebook}` : ''
      }`,
      twitter: `${data.twitter ? `http://twitter.com/${data?.twitter}` : ''}`,
      linkedIn: `${
        data.linkedIn ? `http://www.linkedin.com/${data?.linkedIn}` : ''
      }`,
      youtube: `${
        data.youtube ? `http://www.youtube.com/${data?.youtube}` : ''
      }`,
    };
    await updateUser(userData);
  };
  const tabOnchange = (key: string) => {
    if (key === '1') {
      navigate('/profile/basic-information');
    } else if (key === '2') {
      navigate('/profile/photo');
    }
  };

  return (
    <div className="profile-form mb-40 mt-40">
      <Tabs
        size="large"
        defaultActiveKey="1"
        items={items}
        onChange={tabOnchange}
      />
      <HeadingAtom text="Profile" />
      {loading ? (
        <EditProfileSkeleton />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div className="form-wrapper">
              <div className="form-left">
                <InputField
                  name="firstName"
                  control={control}
                  text="First name"
                />
                <InputField
                  name="lastName"
                  control={control}
                  text="Last Name"
                />
                <InputField name="email" control={control} text="Email" />
                <div className="input-group mb-20">
                  <ParagraphAtom text="Biography" />
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <TextArea {...field} rows={3} maxLength={100} showCount />
                    )}
                  />
                </div>
                <InputField name="heading" control={control} text="Heading" />
              </div>
              <div className="form-right">
                <InputField
                  name="website"
                  control={control}
                  text="Website"
                  placeholder="Url"
                />
                <InputField
                  name="facebook"
                  control={control}
                  text="Facebook"
                  addonBefore={FACEBOOK_URL}
                  placeholder="username"
                />
                <InputField
                  name="twitter"
                  control={control}
                  text="Twitter"
                  addonBefore={TWITTER_URL}
                  placeholder="username"
                />
                <InputField
                  name="linkedIn"
                  control={control}
                  text="LinkedIn"
                  addonBefore={LINKEDIN_URL}
                  placeholder="username"
                />
                <InputField
                  name="youtube"
                  control={control}
                  text="Youtube"
                  addonBefore={YOUTUBE_URL}
                  placeholder="username"
                />
              </div>
            </div>

            <ButtonAtom
              text="Save"
              type="primary"
              htmlType="submit"
              size="large"
              loading={btnLoading}
            />
          </Space>
        </form>
      )}
    </div>
  );
};

export default ProfileOrganism;
