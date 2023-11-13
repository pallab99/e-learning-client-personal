import React from 'react';
import ButtonAtom from '../../atoms/button/button.attom';
import './footerLinks.scss';
const FooterLinksMolecules = () => {
  return (
    <div className="footer-link-three-div mb-50">
      <div className="footer-link-left-div">
        <ButtonAtom
          className="text-align-left color-white"
          text="Udemy Business"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Teach On Udemy"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Get The App"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="About Us"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Contact Us"
          type="link"
        />
      </div>
      <div className="footer-link-middle-div">
        <ButtonAtom
          className="text-align-left color-white"
          text="Careers"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Blog"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Help & Support"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Affiliate"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Investors"
          type="link"
        />
      </div>
      <div className="footer-link-right-div">
        <ButtonAtom
          className="text-align-left color-white"
          text="Teams"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Privacy Policy"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Cookie Setting"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Sitemap"
          type="link"
        />
        <ButtonAtom
          className="text-align-left color-white"
          text="Accessibility statement"
          type="link"
        />
      </div>
    </div>
  );
};

export default FooterLinksMolecules;
