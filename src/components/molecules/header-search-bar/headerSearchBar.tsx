import Search from "antd/es/input/Search";
import "./headerSearchBar.scss";
const HeaderSearchBarMolecules = () => {
  return (
    <div className="desktop-header-searchBar-div">
      <Search
        style={{ borderStartEndRadius: "20px" }}
        className="desktop-header-searchBar"
        size="large"
      ></Search>
    </div>
  );
};

export default HeaderSearchBarMolecules;
