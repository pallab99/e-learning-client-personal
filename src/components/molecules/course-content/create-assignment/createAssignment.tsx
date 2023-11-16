import { Button, Modal, Space, Upload, message } from 'antd';
import React, { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { UploadOutlined } from '@ant-design/icons';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import TextInputAtom from '../../../atoms/text-input/textInput.atom';
import { SelectField } from '../../../atoms/select-filed/selectField';
import CenteredBtnOrganism from '../../centered-btn/centered-btn.molecules';

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
  const onSubmit = async (contentData: any) => {
    console.log(contentData);
    const formData = new FormData();
    formData.append('title', contentData?.title);
    formData.append('file_to_upload', data?.content?.file);
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
          <div className="input-group">
            <ParagraphAtom text="* Enter the assignment title" />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder={'Enter the assignment title'}
                  fieldValues={field}
                />
              )}
            />
          </div>
          <div className="input-group">
            <ParagraphAtom text="* Enter the assignment description" />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder={'Enter the assignment description'}
                  fieldValues={field}
                />
              )}
            />
          </div>
          <div className="input-group">
            <ParagraphAtom text="* Enter the assignment instructions" />
            <Controller
              name="instructions"
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder={'Enter the assignment instructions'}
                  fieldValues={field}
                />
              )}
            />
          </div>
          <div className="input-group">
            <ParagraphAtom text="* Enter the assignment point" />
            <Controller
              name="point"
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder={'Enter the assignment point'}
                  fieldValues={field}
                />
              )}
            />
          </div>
          <div className="input-group">
            <ParagraphAtom text="Select a appropriate lesson for this section" />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Upload
                  listType="picture"
                  beforeUpload={(file) => beforeUpload(file)}
                  onRemove={() => {
                    setFile(null);
                  }}
                  maxCount={1}
                  style={{ width: '100%' }}
                  {...field}
                >
                  <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
                    Upload (Max: 1)
                  </Button>
                  <ParagraphAtom
                    text="Select the file to upload"
                    className="ant-upload-text"
                  ></ParagraphAtom>
                </Upload>
              )}
            />

            {/* {uploadProgress && btnLoading && (
                <Progress percent={uploadProgress}></Progress>
              )} */}
          </div>
          <div className="input-group">
            <ParagraphAtom text="* Select the section" />
            <Controller
              name="sectionId"
              control={control}
              render={({ field }) => (
                <SelectField
                  values={sectionData}
                  placeholder={'Select the section'}
                  fieldValues={field}
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
