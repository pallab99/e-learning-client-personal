import React from 'react';
import FooterOrganism from '../../organism/footer/footerOrganism';

const HeaderFooterLayout = ({ children }: any) => {
  return (
    <>
      {children}
      <FooterOrganism />
    </>
  );
};

export default HeaderFooterLayout;
