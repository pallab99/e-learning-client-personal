import { Modal, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CourseSectionApi from '../../../api/CourseSectionApi';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import TextInputAtom from '../../atoms/text-input/textInput.atom';
import CenteredBtnOrganism from '../centered-btn/centered-btn.molecules';
import './courseSection.scss';
interface ICourseSectionModalProps {
  courseId: string | undefined;
  data?: string;
  open: boolean;
  onClose: any;
}
const CreateSectionModal: React.FC<ICourseSectionModalProps> = ({
  courseId,
  data,
  open,
  onClose,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
  });
  const [loading, setLoading] = useState(false);
  console.log(data);

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);
      let res: any;
      if (data?.title.length && data?.id.length) {
        res = await CourseSectionApi.updateSection(
          courseId,
          data?.id,
          formData
        );
        console.log('update');
      } else {
        res = await CourseSectionApi.createSection(courseId, formData);
        console.log('create');
      }
      message.success(res?.data?.message);
      setLoading(false);
    } catch (error) {
      message.error(error?.response?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue('title', data.title || '');
  }, [data, setValue]);

  return (
    <Modal open={open} onCancel={onClose} className="course-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <div className="input-group">
            <ParagraphAtom text="Enter the course title" />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder={'Enter the course title'}
                  fieldValues={field}
                />
              )}
            />
            <ParagraphAtom
              type="secondary"
              text="Your title should be a mix of attention-grabbing, informative, and optimized for search"
              className="mt-20 text-15"
            />
          </div>
          <CenteredBtnOrganism
            justify="center"
            text={data?.title?.length && data?.id?.length ? 'Update' : 'Create'}
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
            loading={loading}
          />
        </Space>
      </form>
    </Modal>
  );
};

export default CreateSectionModal;
