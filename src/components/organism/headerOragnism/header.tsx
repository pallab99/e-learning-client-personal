import { Image } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { STUDENT } from "../../../constant/userType";
import useGetCartByUser from "../../../hooks/cart/useGetUserCart";
import { useAppSelector } from "../../../redux/store";
import ButtonAtom from "../../atoms/button/button.attom";
import IconAtom from "../../atoms/icon/icon.atom";
import ParagraphAtom from "../../atoms/paragraph/paragraph.atom";
import CartDrawerMolecules from "../../molecules/cart-drawer/cartDrawerMolecules";
import DesktopHeaderDropdownMenuMolecules from "../../molecules/header-dropdown-menu/desktop-header-dropdown/headerDropdownMenu";
import MobileHeaderDropdownMenuMolecules from "../../molecules/header-dropdown-menu/mobile-header-dropdown/headerDropdownMenu";
import HeaderSearchBarMolecules from "../../molecules/header-search-bar/headerSearchBar";
import WishlistDrawerMolecules from "../../molecules/wishlist-drawer/wishlistDrawerMolecules";
import "./header.scss";

const HeaderOrganism = () => {
  const [recallApi, setRecallApi] = useState(false);
  const { data, loading, error } = useGetCartByUser(recallApi);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [openWishlistDrawer, setOpenWishlistDrawer] = useState(false);

  const handleOpenCartDrawer = () => {
    setOpenCartDrawer(true);
  };
  const handleOpenWishlistDrawer = () => {
    setOpenWishlistDrawer(true);
  };
  const handleCloseWishlistDrawer = () => {
    setOpenWishlistDrawer(false);
  };
  const handleCloseCartDrawer = () => {
    setOpenCartDrawer(false);
  };
  const isMobile = window.innerWidth <= 768;
  const student = useAppSelector((state) => state.auth.userData.rank);
  const userData = useAppSelector((state) => state.auth.userData);
  // const loggedIn=useAppSelector(state=>state?.auth?.userData)
  console.log({ userData });

  return (
    <>
      <div className="desktop-header-div">
        <div className="desktop-header-wrapper">
          <Link to={"/"}>
            <Image
              height={60}
              width={80}
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              preview={false}
              className="cursor-pointer"
            ></Image>
          </Link>
          {/* {(!userData.accessToken || student === STUDENT) && (
            <ParagraphAtom
              text="Categories"
              className="text-18 cursor-pointer"
            />
          )} */}
          {(!userData.accessToken || student === STUDENT) && (
            <HeaderSearchBarMolecules />
          )}
          <ParagraphAtom text="Instructor" className="text-18 cursor-pointer" />
          {student === STUDENT && (
            <ParagraphAtom
              text="My Learning"
              className="text-18 cursor-pointer"
            />
          )}
          {student === STUDENT && (
            <IconAtom
              type="heart"
              className="text-18 cursor-pointer"
              handleOnClick={handleOpenWishlistDrawer}
            ></IconAtom>
          )}

          <WishlistDrawerMolecules
            open={openWishlistDrawer}
            onClose={handleCloseWishlistDrawer}
            key={"right"}
            isMobile={isMobile}
            placement={isMobile ? "bottom" : "right"}
            setRecallApi={setRecallApi}
            cartLoading={loading}
          />
          {student === STUDENT && (
            <div className="cart-icon-count">
              <IconAtom
                type="cart"
                className="text-18 cursor-pointer cart-icon"
                handleOnClick={handleOpenCartDrawer}
              ></IconAtom>
              <ParagraphAtom
                className="cart-count"
                text={error || data?.length <= 0 ? 0 : data?.courses?.length}
              ></ParagraphAtom>
            </div>
          )}
          <div className="log-in-sign-up-btn">
            {!userData.accessToken && (
              <Link to={"/log-in"}>
                <ButtonAtom
                  type="primary"
                  size="large"
                  text="Log In"
                ></ButtonAtom>
              </Link>
            )}
            {!userData.accessToken && (
              <Link to={"/sign-up"}>
                <ButtonAtom size="large" text="Sign Up"></ButtonAtom>
              </Link>
            )}
          </div>
          <CartDrawerMolecules
            open={openCartDrawer}
            onClose={handleCloseCartDrawer}
            // key={}
            isMobile={isMobile}
            placement={isMobile ? "bottom" : "right"}
            cartData={data}
            setRecallApi={setRecallApi}
            cartLoading={loading}
            error={error}
            // key
          />
          <DesktopHeaderDropdownMenuMolecules />
        </div>
      </div>
      <div className="mobile-header-div">
        <div className="mobile-header-wrapper">
          <Link to={"/"}>
            <Image
              height={60}
              width={80}
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              preview={false}
              className="cursor-pointer"
            ></Image>
          </Link>
          <HeaderSearchBarMolecules />

          <MobileHeaderDropdownMenuMolecules
            handleOpenCartDrawer={handleOpenCartDrawer}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderOrganism;
