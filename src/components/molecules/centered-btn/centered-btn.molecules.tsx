import ButtonAtom, { IButtonAtomProps } from "../../atoms/button/button.attom";
import FlexAtom, { IFLexAtom } from "../../atoms/flex/flex.atom";
interface ICenteredBtn extends IFLexAtom, IButtonAtomProps {
  text?: string;
  style?: any;
}
const CenteredBtnOrganism = (props: ICenteredBtn) => {
  return (
    <FlexAtom
      vertical={props.vertical}
      wrap={props.wrap}
      justify={props.justify}
      align={props.align}
      gap={props.gap}
    >
      <ButtonAtom
        size={props.size}
        text={props.text}
        type={props.type}
        dangerBtn={props.dangerBtn}
        disabled={props.disabled}
        handleButtonClick={props.handleButtonClick}
        htmlType={props.htmlType}
        className={props.className}
        link={props.link}
        loading={props.loading}
        style={props.style}
      ></ButtonAtom>
    </FlexAtom>
  );
};

export default CenteredBtnOrganism;
