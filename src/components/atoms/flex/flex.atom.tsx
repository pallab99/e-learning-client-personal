import { Flex } from 'antd';
import './flex.style.scss';
export interface IFLexAtom {
  vertical?: boolean | undefined;
  wrap?: React.CSSProperties['flexWrap'];
  justify?: string;
  align?: string;
  gap?: string;
  children?: React.ReactNode;
  class?: string;
}
const FlexAtom = (props: IFLexAtom) => {
  return (
    <Flex
      className={props.class}
      vertical={props.vertical}
      wrap={props.wrap}
      justify={props.justify}
      align={props.align}
      gap={props.gap}
    >
      {props.children}
    </Flex>
  );
};

export default FlexAtom;
