import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Upload, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useCreateCourseContent from '../../../hooks/course-content/useCreateCourseContent';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import { SelectFieldCustom } from '../../atoms/select-field-custom/selectFieldCustom';
import { SelectField } from '../../atoms/select-filed/selectField';
import CenteredBtnOrganism from '../centered-btn/centered-btn.molecules';
import { InputField } from '../input-field-controller/inputFieldController';
import UploadMolecules from '../upload/uploadMolecules';
import { ReactMediaRecorder } from 'react-media-recorder-2';
import ReactPlayer from 'react-player';
const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return stream ? (
    <video
      className="react-player"
      ref={videoRef}
      width={500}
      height={500}
      autoPlay
      controls
    />
  ) : null;
};

interface ICourseContentModalProps {
  courseId?: string | undefined;
  data?: string;
  open: boolean;
  sectionData: any;
  onClose: any;
}
const CourseContentMolecules: React.FC<ICourseContentModalProps> = ({
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
  const { loading, createCourseContent } = useCreateCourseContent();
  const [contentType, setContentType] = useState('');
  const [recordFile, setRecordedFile] = useState();

  const onSubmit = async (contentData: any) => {
    console.log('recorded', recordFile);

    const formData = new FormData();
    formData.append('title', contentData?.title);
    // formData.append('file_to_upload', contentData?.content?.file);
    formData.append('file_to_upload', recordFile);
    for (const value of formData.values()) {
      console.log('video', value);
    }
    // await createCourseContent(courseId, contentData?.sectionId, formData);
    // if (!loading) {
    //   onClose();
    // }
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
  const [enable, setEnable] = useState(true);
  const uploadVideo = async (mediaBlobUrl: any) => {
    const response = await fetch(mediaBlobUrl);
    const blob = await response.blob();
    const file = new File([blob], 'video.webm', { type: 'video/webm' });
    setRecordedFile(file);
    // const formData = new FormData();
    // formData.append('title', contentData?.title);
    // formData.append('video', file);
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <InputField
            name="title"
            control={control}
            text="* Enter the content title"
          ></InputField>

          <div className="input-group">
            <ParagraphAtom text="* Select the content type" />
            <SelectFieldCustom
              placeholder="Select content type"
              values={[
                { label: 'File', value: 'file' },
                { label: 'Record', value: 'record' },
              ]}
              handleOnchange={(value: string) => setContentType(value)}
              size="large"
            />
          </div>
          {contentType === 'file' && (
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
                  />
                )}
              />
            </div>
          )}
          {contentType === 'record' && (
            <div>
              <ReactMediaRecorder
                video
                blobPropertyBag={{
                  type: 'video/webm',
                }}
                askPermissionOnMount={true}
                render={({
                  previewStream,
                  status,
                  startRecording,
                  stopRecording,
                  mediaBlobUrl,
                }) => {
                  console.log(previewStream);
                  return (
                    <div>
                      <p>{status}</p>
                      <button
                        type="button"
                        onClick={() => {
                          startRecording();
                          setEnable(true);
                        }}
                      >
                        Start Recording
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          stopRecording();
                          setEnable(false);
                          uploadVideo(mediaBlobUrl);
                        }}
                      >
                        Stop Recording
                      </button>

                      {!enable && (
                        <ReactPlayer
                          className="react-player"
                          url={mediaBlobUrl}
                          controls
                          autoPlay
                        />
                      )}
                      {enable && <VideoPreview stream={previewStream} />}
                    </div>
                  );
                }}
              />
            </div>
          )}
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
            loading={loading}
          />
        </Space>
      </form>
    </Modal>
  );
};

export default CourseContentMolecules;
