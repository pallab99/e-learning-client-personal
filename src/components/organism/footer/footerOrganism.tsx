import { Card, Divider, Space } from "antd";
import IconAtom from "../../atoms/icon/icon.atom";
import FooterLinksMolecules from "../../molecules/footer-links/footerLinks";
import "./footer.scss";
const FooterOrganism = () => {
  return (
    <div className="footer">
      <Card
        style={{ backgroundColor: "#1c1d1f", color: "white" }}
        className="mt-20"
      >
        <div className="footer-div">
          <div className="social-links">
            <Space size={"large"}>
              <IconAtom size="25px" type="facebook" />
              <IconAtom size="25px" type="linkedIn" />
              <IconAtom size="25px" type="instagram" />
              <IconAtom size="25px" type="twitter" />
            </Space>
          </div>
          <Divider style={{ background: "#706d6d" }} />
          <div className="footer-links-div">
            <FooterLinksMolecules />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FooterOrganism;
