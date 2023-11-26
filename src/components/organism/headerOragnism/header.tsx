import { Image } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { STUDENT } from '../../../constant/userType';
import useGetCartByUser from '../../../hooks/cart/useGetUserCart';
import { useAppSelector } from '../../../redux/store';
import ButtonAtom from '../../atoms/button/button.attom';
import IconAtom from '../../atoms/icon/icon.atom';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import CartDrawerMolecules from '../../molecules/cart-drawer/cartDrawerMolecules';
import DesktopHeaderDropdownMenuMolecules from '../../molecules/header-dropdown-menu/desktop-header-dropdown/headerDropdownMenu';
import MobileHeaderDropdownMenuMolecules from '../../molecules/header-dropdown-menu/mobile-header-dropdown/headerDropdownMenu';
import HeaderSearchBarMolecules from '../../molecules/header-search-bar/headerSearchBar';
import WishlistDrawerMolecules from '../../molecules/wishlist-drawer/wishlistDrawerMolecules';
import './header.scss';
import logo from './../../../assets/logo/Skillbase.png';
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

  return (
    <>
      <div className="desktop-header-div">
        <div className="desktop-header-wrapper">
          <Link to={'/'}>
            <Image
              height={80}
              width={100}
              src={logo}
              preview={false}
              className="cursor-pointer"
            ></Image>
          </Link>

          {(!userData.accessToken || student === STUDENT) && (
            <HeaderSearchBarMolecules />
          )}
          {student === STUDENT && (
            <Link to="/my-learning" style={{ textDecoration: 'none' }}>
              <ParagraphAtom
                text="My Learning"
                className="text-18 cursor-pointer"
              />
            </Link>
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
            key={'right'}
            isMobile={isMobile}
            placement={isMobile ? 'bottom' : 'right'}
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
              <Link to={'/log-in'}>
                <ButtonAtom
                  // type="primary"
                  size="large"
                  text="Log In"
                ></ButtonAtom>
              </Link>
            )}
            {!userData.accessToken && (
              <Link to={'/sign-up'}>
                <ButtonAtom
                  size="large"
                  text="Sign Up"
                  type="primary"
                  style={{ backgroundColor: '#2d2f31' }}
                ></ButtonAtom>
              </Link>
            )}
          </div>
          <CartDrawerMolecules
            open={openCartDrawer}
            onClose={handleCloseCartDrawer}
            isMobile={isMobile}
            placement={isMobile ? 'bottom' : 'right'}
            cartData={data}
            setRecallApi={setRecallApi}
            cartLoading={loading}
            error={error}
          />
          <DesktopHeaderDropdownMenuMolecules />
        </div>
      </div>
      <div className="mobile-header-div">
        <div className="mobile-header-wrapper">
          <Link to={'/'}>
            <Image
              height={60}
              width={80}
              src={logo}
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
