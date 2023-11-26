import FooterOrganism from '../../organism/footer/footerOrganism';
import HeaderOrganism from '../../organism/headerOragnism/header';
import './headerFooterLayout.scss';

const HeaderFooterLayout = ({ children }: any) => {
  return (
    <>
      <HeaderOrganism></HeaderOrganism>
      {children}
      <FooterOrganism></FooterOrganism>
    </>
  );
};

export default HeaderFooterLayout;
