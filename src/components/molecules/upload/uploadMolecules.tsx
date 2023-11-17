import { Button, Upload } from 'antd';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import { UploadOutlined } from '@ant-design/icons';
export default function UploadMolecules(props: any) {
  return (
    <Upload
      listType="picture"
      beforeUpload={(file) => props.beforeUpload(file)}
      onRemove={() => {
        props.setFile(null);
      }}
      maxCount={1}
      style={{
        width: '100%',
      }}
      {...props.field}
    >
      <Button
        style={{
          width: '100%',
        }}
        icon={<UploadOutlined />}
        size="large"
      >
        Upload (Max: 1)
      </Button>
      <ParagraphAtom
        text={props.heading}
        className="ant-upload-text"
      ></ParagraphAtom>
    </Upload>
  );
}
