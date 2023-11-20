//@ts-nocheck
import { Card, Drawer, Empty, Image, Rate } from 'antd';
import React, { useState } from 'react';
import useGetWishlistByUser from '../../../hooks/wishlist/useGetUserWishlist';
import useRemoveCourseFromWishlist from '../../../hooks/wishlist/useRemoveCourseFromWishlist';
import ButtonAtom from '../../atoms/button/button.attom';
import HeadingAtom from '../../atoms/heading/heading.atom';
import InstructorCourseListSkeletonAtom from '../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import './wishlistDrawer.scss';
interface IWishlistDrawerMolecules {
  open?: boolean;
  setOpen?: any;
  onClose?: any;
  placement?: any;
  isMobile?: boolean;
  cartData?: any;
  setRecallApi?: any;
  cartLoading?: boolean;
}
const WishlistDrawerMolecules: React.FC<IWishlistDrawerMolecules> = ({
  open,
  setOpen,
  onClose,
  placement,
  isMobile,
  cartData,
  // setRecallApi,
  cartLoading,
}) => {
  const [recallApi, setRecallApi] = useState(0);
  const { wishlistData, wishlistLoading } = useGetWishlistByUser(
    open,
    recallApi
  );

  const { removeCourseFromWishlist, removeWishlistLoading } =
    useRemoveCourseFromWishlist();
  const handleRemoveCourseFromWishlist = async (courseId: string) => {
    await removeCourseFromWishlist(courseId);
    setRecallApi(Math.random());
  };

  return (
    <div className="cart-drawer-div">
      <Drawer
        title={<HeadingAtom text="Course Wishlist" level={3}></HeadingAtom>}
        open={open}
        onClose={onClose}
        key={placement}
        placement={placement}
        width={!isMobile ? '600px' : '300px'}
      >
        {wishlistData?.courses?.length && (
          <HeadingAtom
            level={5}
            text={`${wishlistData?.courses?.length} Course in Wishlist`}
          ></HeadingAtom>
        )}
        {wishlistData?.length <= 0 ? (
          <Empty />
        ) : wishlistLoading ? (
          [1, 2, 3, 4, 5].map((ele: any) => {
            return <InstructorCourseListSkeletonAtom key={ele} />;
          })
        ) : (
          wishlistData?.courses?.map((ele: any) => {
            return (
              <Card
                className="course-card mt-20"
                style={{ width: '100%' }}
                key={ele._id}
              >
                <div className="cart-left-div mt-20 mb-20">
                  <div className="cart-left-description">
                    <div className="cart-card-left-image">
                      <Image
                        src={ele?.thumbnail}
                        alt="Course thumbnail"
                        width={isMobile ? 80 : 120}
                        height={isMobile ? 50 : 80}
                      />
                    </div>
                    <div className="cart-card-left-description">
                      <ParagraphAtom
                        text={ele.title}
                        ellipsis={true}
                      ></ParagraphAtom>
                      <ParagraphAtom
                        text={`By ${ele?.instructors[0]?.name}`}
                        ellipsis={true}
                      ></ParagraphAtom>
                      <Rate
                        value={4.5}
                        style={{ fontSize: '15px' }}
                        disabled
                      ></Rate>
                      <div className="cart-card-right">
                        <ButtonAtom
                          text="remove"
                          type="link"
                          dangerBtn={true}
                          handleButtonClick={() =>
                            handleRemoveCourseFromWishlist(ele?._id)
                          }
                          loading={removeWishlistLoading}
                        ></ButtonAtom>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </Drawer>
    </div>
  );
};
export default WishlistDrawerMolecules;
