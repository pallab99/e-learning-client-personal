import { Card, Drawer, Empty, Image, Rate } from "antd";
import React from "react";
import useRemoveCourseFromCart from "../../../hooks/cart/removeCourseFromCart";
import useApplyForSubscription from "../../../hooks/subscriptionList/useApplyForSubscription";
import ButtonAtom from "../../atoms/button/button.attom";
import HeadingAtom from "../../atoms/heading/heading.atom";
import InstructorCourseListSkeletonAtom from "../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton";
import ParagraphAtom from "../../atoms/paragraph/paragraph.atom";
import "./cartDrawer.scss";
interface ICartDrawerMolecules {
  open?: boolean;
  setOpen?: any;
  onClose?: any;
  placement?: any;
  isMobile?: boolean;
  cartData?: any;
  setRecallApi?: any;
  cartLoading?: boolean;
}
const CartDrawerMolecules: React.FC<ICartDrawerMolecules> = ({
  open,
  setOpen,
  onClose,
  placement,
  isMobile,
  cartData,
  setRecallApi,
  cartLoading,
}) => {
  console.log(cartData);
  const { loading, removeCourseFromCart } = useRemoveCourseFromCart();
  const { subsLoading, applyForSubscription } = useApplyForSubscription();
  const handleRemoveCourseFromCart = async (courseId: string) => {
    await removeCourseFromCart(courseId);
    setRecallApi(Math.random());
  };
  const handleAddSubscription = async (cartId: string) => {
    await applyForSubscription(cartId);
    setRecallApi(Math.random());
  };
  return (
    <div className="cart-drawer-div">
      <Drawer
        title={<HeadingAtom text="Shopping Cart" level={3}></HeadingAtom>}
        open={open}
        onClose={onClose}
        key={placement}
        placement={placement}
        width={!isMobile ? "600px" : "300px"}
      >
        {cartData?.courses?.length && (
          <ParagraphAtom
            text={`${cartData?.courses?.length} Course in Cart`}
          ></ParagraphAtom>
        )}
        {cartData?.length <= 0 ? (
          <Empty />
        ) : cartLoading ? (
          [1, 2, 3, 4, 5].map((ele: any) => {
            return <InstructorCourseListSkeletonAtom key={ele} />;
          })
        ) : (
          cartData?.courses?.map((ele: any) => {
            return (
              <Card
                className="course-card mt-20"
                style={{ width: "100%" }}
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
                        style={{ fontSize: "15px" }}
                        disabled
                      ></Rate>
                    </div>
                  </div>
                  <div className="cart-card-right">
                    <ButtonAtom
                      text="remove"
                      type="link"
                      handleButtonClick={() =>
                        handleRemoveCourseFromCart(ele?._id)
                      }
                      loading={loading}
                    ></ButtonAtom>
                  </div>
                </div>
              </Card>
            );
          })
        )}
        {cartData?.courses?.length && (
          <ButtonAtom
            text="Apply For Subscription"
            className="mt-20"
            type="primary"
            size="large"
            style={{ width: "100%" }}
            handleButtonClick={() => handleAddSubscription(cartData?._id)}
            loading={subsLoading}
          ></ButtonAtom>
        )}
      </Drawer>
    </div>
  );
};
export default CartDrawerMolecules;
