import { Controller } from 'react-hook-form';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import TextInputAtom from '../../atoms/text-input/textInput.atom';

export const InputField = ({
  name,
  control,
  text,
  addonBefore,
  placeholder,
}: any) => (
  <div className="input-group mb-20">
    <ParagraphAtom text={text} />
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInputAtom
          addonBefore={addonBefore}
          placeholder={placeholder}
          size="large"
          fieldValues={field}
        />
      )}
    />
  </div>
);
