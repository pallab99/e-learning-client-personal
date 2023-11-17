import { Button, Modal, Space, Upload, message } from 'antd';
import React, { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { UploadOutlined } from '@ant-design/icons';
import useCreateCourseAssignment from '../../../../hooks/assignment/useCreateCourseAssignment';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import { SelectField } from '../../../atoms/select-filed/selectField';
import CenteredBtnOrganism from '../../centered-btn/centered-btn.molecules';
import { InputField } from '../../input-field-controller/inputFieldController';
import UploadMolecules from '../../upload/uploadMolecules';

interface ICourseContentModalProps {
  courseId?: string | undefined;
  data?: string;
  open: boolean;
  sectionData: any;
  onClose: any;
}

const CreateAssignmentMolecules: React.FC<ICourseContentModalProps> = ({
  courseId,
  data,
  open,
  onClose,
  sectionData,
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
  const { loading, createAssignment } = useCreateCourseAssignment();
  const onSubmit = async (contentData: any) => {
    console.log(contentData);
    const formData = new FormData();
    formData.append('title', contentData?.title);
    formData.append('description', contentData?.description);
    formData.append('instructions', contentData?.instructions);
    formData.append('point', contentData?.point);
    formData.append('sectionId', contentData?.sectionId);
    formData.append('file_to_upload', contentData?.content?.file);
    await createAssignment(courseId, contentData.sectionId, formData);
    if (!loading) {
      onClose();
    }
  };
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);

  const beforeUpload = (file: File) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'text/plain',
      'video/mp4',
    ];
    const isTypeAllowed = allowedTypes.includes(file.type);
    const isLt100M = file.size / 1024 / 1024 < 100;

    if (!isTypeAllowed) {
      message.error(
        'You can only upload images, PDFs, text documents, or videos!'
      );
    } else if (!isLt100M) {
      message.error('File must be smaller than 100MB!');
    } else {
      setFile(file);
    }
    return false;
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <InputField
            name="title"
            control={control}
            text="* Enter the assignment title"
          />
          <InputField
            name="description"
            control={control}
            text="* Enter the assignment description"
          />
          <InputField
            name="instructions"
            control={control}
            text="* Enter the assignment instructions"
          />
          <InputField
            name="point"
            control={control}
            text="* Enter the assignment point"
          />

          <div className="input-group">
            <ParagraphAtom text="Select a appropriate lesson for this section" />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <UploadMolecules
                  setFile={setFile}
                  beforeUpload={beforeUpload}
                  field={field}
                  // heading="Choose the appropriate file"
                />
              )}
            />
          </div>

          <div className="input-group">
            <ParagraphAtom text="* Select the section. Max 1 assignment under a section" />
            <Controller
              name="sectionId"
              control={control}
              render={({ field }) => (
                <SelectField
                  values={sectionData}
                  placeholder={'Select the section'}
                  fieldValues={field}
                  size="large"
                />
              )}
            />
          </div>

          <CenteredBtnOrganism
            justify="center"
            text={'create'}
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
            // loading={loading}
          />
        </Space>
      </form>
    </Modal>
  );
};

export default CreateAssignmentMolecules;
