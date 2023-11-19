import JoditEditor from 'jodit-react';

const TextEditor = ({ value, onChange, field }: any) => {
  return <JoditEditor value={value} onChange={onChange} {...field} />;
};

export default TextEditor;
