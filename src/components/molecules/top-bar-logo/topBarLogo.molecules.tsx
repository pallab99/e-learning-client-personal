import FlexAtom from '../../atoms/flex/flex.atom';
import IconAtom from '../../atoms/icon/icon.atom';
const TopBarLogoMolecules = () => {
  return (
    <FlexAtom justify="flex-end" gap="large" class="top-bar-logo-flex">
      <IconAtom type="notification" size="20px" className="on-hover"></IconAtom>
      <IconAtom type="user" size="20px" className="on-hover"></IconAtom>
    </FlexAtom>
  );
};

export default TopBarLogoMolecules;
