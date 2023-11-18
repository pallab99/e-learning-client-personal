import { Image } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useGetCartByUser from '../../../hooks/cart/useGetUserCart';
import IconAtom from '../../atoms/icon/icon.atom';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import CartDrawerMolecules from '../../molecules/cart-drawer/cartDrawerMolecules';
import DesktopHeaderDropdownMenuMolecules from '../../molecules/header-dropdown-menu/desktop-header-dropdown/headerDropdownMenu';
import MobileHeaderDropdownMenuMolecules from '../../molecules/header-dropdown-menu/mobile-header-dropdown/headerDropdownMenu';
import HeaderSearchBarMolecules from '../../molecules/header-search-bar/headerSearchBar';
import WishlistDrawerMolecules from '../../molecules/wishlist-drawer/wishlistDrawerMolecules';
import './header.scss';

const HeaderOrganism = () => {
  const [recallApi, setRecallApi] = useState(false);
  const { data, loading } = useGetCartByUser(recallApi);
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

  return (
    <>
      <div className="desktop-header-div">
        <div className="desktop-header-wrapper">
          <Link to={'/'}>
            <Image
              height={60}
              width={80}
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              preview={false}
              className="cursor-pointer"
            ></Image>
          </Link>
          <ParagraphAtom text="Categories" className="text-18 cursor-pointer" />
          <HeaderSearchBarMolecules />
          <ParagraphAtom
            text="udemy Business"
            className="text-18 cursor-pointer"
          />

          <ParagraphAtom text="Instructor" className="text-18 cursor-pointer" />
          <ParagraphAtom
            text="My Learning"
            className="text-18 cursor-pointer"
          />
          <IconAtom
            type="heart"
            className="text-18 cursor-pointer"
            handleOnClick={handleOpenWishlistDrawer}
          ></IconAtom>
          <WishlistDrawerMolecules
            open={openWishlistDrawer}
            onClose={handleCloseWishlistDrawer}
            key={'right'}
            isMobile={isMobile}
            placement={isMobile ? 'bottom' : 'right'}
            setRecallApi={setRecallApi}
            cartLoading={loading}
          />
          <div className="cart-icon-count">
            <IconAtom
              type="cart"
              className="text-18 cursor-pointer cart-icon"
              handleOnClick={handleOpenCartDrawer}
            ></IconAtom>
            <ParagraphAtom
              className="cart-count"
              text={data?.length <= 0 ? 0 : data?.courses?.length}
            ></ParagraphAtom>
          </div>
          <CartDrawerMolecules
            open={openCartDrawer}
            onClose={handleCloseCartDrawer}
            key={'right'}
            isMobile={isMobile}
            placement={isMobile ? 'bottom' : 'right'}
            cartData={data}
            setRecallApi={setRecallApi}
            cartLoading={loading}
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
