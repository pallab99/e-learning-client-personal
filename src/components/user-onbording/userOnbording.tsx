//@ts-nocheck
import type { TourProps } from "antd";
import { Button, Modal, Tour } from "antd";
import React, { useEffect, useState } from "react";
import { showTour } from "../../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./userOnboard.scss";
const UserOnboarding: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
      setOpenModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const steps: TourProps["steps"] = [
    {
      title: "Search Bar",
      description:
        "Search for your desired course effortlessly using our intuitive search bar.",
      target: () => {
        const element = document.querySelector("#top_search_bar");
        return element ? element : null;
      },
    },
    {
      title: "My Learning",
      description:
        "Access all your enrolled courses conveniently in one place.",
      target: () => {
        const element = document.querySelector("#my_learning_link");
        return element ? element : null;
      },
    },
    {
      title: "Wishlist",
      description:
        "Curate and manage your desired courses in your personal wishlist.",
      target: () => {
        const element = document.querySelector("#my_wishlist");
        return element ? element : null;
      },
    },
    {
      title: "Cart Preview",
      description:
        "Preview and manage all courses added to your cart effortlessly.",
      target: () => {
        const element = document.querySelector("#my_cart");
        return element ? element : null;
      },
    },
    {
      title: "Your Profile",
      description:
        "Access and update your personalized profile settings with ease.",
      target: () => {
        const element = document.querySelector("#my_profile");
        return element ? element : null;
      },
    },
    {
      title: "Course Filtering",
      description:
        "Filter out your desired courses based on categories, ratings, etc.",
      target: () => {
        const element = document.querySelector("#course_filter");
        return element ? element : null;
      },
    },
    {
      title: "Course Display",
      description: "Discover the perfect course that meets your needs.",
      target: () => {
        const element = document.querySelector("#course_card");
        return element ? element : null;
      },
    },
    {
      title: "More Courses to Explore",
      description:
        "Explore beyond this section, there are more courses available.",
      target: () => {
        const element = document.querySelector("#course_pagination");
        return element ? element : null;
      },
    },
  ];

  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
    dispatch(showTour(false));
    setOpenModal(false);
  };
  const showTourButton = useAppSelector((state) => state.auth.showTourButton);

  return (
    <>
      {showButton && showTourButton && (
        <div className="user_onboard_modal">
          {!open && (
            <Modal
              open={openModal}
              onCancel={handleClose}
              footer={null}
              centered
              width={200}
            >
              <div className="take_a_tour_btn">
                <Button
                  type="primary"
                  onClick={() => setOpen(true)}
                  className="button_tour"
                  size="large"
                >
                  Get A Tour
                </Button>
              </div>
            </Modal>
          )}
        </div>
      )}

      <Tour
        open={open}
        onClose={handleClose}
        steps={steps}
        zIndex={100000000000}
        arrow
      />
    </>
  );
};

export default UserOnboarding;
