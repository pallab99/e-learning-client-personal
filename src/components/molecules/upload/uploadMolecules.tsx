import { Controller } from 'react-hook-form';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function UploadMolecules({
  control,
  setFile,
  beforeUpload,
  heading,
}: any) {
  return (
    <Controller
      name="file_to_upload"
      control={control}
      render={({ field }) => (
        <Upload
          listType="picture"
          beforeUpload={(file) => {
            setFile(file);
            return beforeUpload(file);
          }}
          onRemove={() => {
            setFile(null);
          }}
          maxCount={1}
          style={{ width: '100%' }}
          {...field}
        >
          <Button
            style={{ width: '100%' }}
            icon={<UploadOutlined />}
            size="large"
          >
            Upload (Max: 1)
          </Button>
        </Upload>
      )}
    />
  );
}
