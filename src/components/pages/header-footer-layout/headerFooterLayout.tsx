import FooterOrganism from "../../organism/footer/footerOrganism";
import HeaderOrganism from "../../organism/headerOragnism/header";
import "./headerFooterLayout.scss";
const HeaderFooterLayout = ({ children }: any) => {
  return (
    // <div className="all-content-wrapper">
    //   <div className="div1">
    //     <HeaderOrganism />
    //   </div>
    //   <div className="div2">{children}</div>
    //   <div className="div3">
    //     <FooterOrganism />
    //   </div>
    // </div>
    <>
      <HeaderOrganism></HeaderOrganism>
      {children}
      <FooterOrganism></FooterOrganism>
    </>
  );
};

export default HeaderFooterLayout;
