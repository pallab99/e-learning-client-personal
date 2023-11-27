import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, message, type MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../../../../api/AuthApi";
import { ADMIN, STUDENT } from "../../../../constant/userType";
import { logOut, showTour } from "../../../../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
const MobileHeaderDropdownMenuMolecules = ({
  handleOpenCartDrawer,
  handleOpenWishlistDrawer,
}: any) => {
  const userData = useAppSelector((state) => state.auth.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isStudent = useAppSelector((state) => state?.auth?.userData?.rank);

  const logout = async () => {
    try {
      const res = await AuthApi.logOut();
      message.success(res?.data.message);
      if (userData?.rank === ADMIN) {
        navigate("/admin/log-in");
      } else {
        navigate("/log-in");
      }
      dispatch(logOut());
      dispatch(showTour(false));
    } catch (error: any) {
      message.error(error.response.message);
    }
  };
  const items: MenuProps["items"] = [
    {
      label: <Link to={"/profile/basic-information"}>Profile</Link>,
      key: "0",
    },
    isStudent === STUDENT
      ? {
          label: (
            <ParagraphAtom
              text="Cart"
              className="text-18 cursor-pointer"
              handleOnClick={handleOpenCartDrawer}
            ></ParagraphAtom>
          ),
          key: "1",
        }
      : null,
    isStudent === STUDENT
      ? {
          label: (
            <ParagraphAtom
              text="Wishlist"
              className="text-18 cursor-pointer"
              handleOnClick={handleOpenWishlistDrawer}
            ></ParagraphAtom>
          ),
          key: "2",
        }
      : null,
    isStudent === STUDENT
      ? {
          label: (
            <div>
              <Link
                to="/my-learning"
                style={{ textDecoration: "none" }}
                id="my_learning_link"
              >
                <ParagraphAtom
                  text="My Learning"
                  className="text-18 cursor-pointer"
                />
              </Link>
            </div>
          ),
          key: "3",
        }
      : null,
    {
      type: "divider",
    },
    {
      label: (
        <ParagraphAtom
          text="Logout"
          className="text-18 cursor-pointer"
          type="danger"
          handleOnClick={logout}
        ></ParagraphAtom>
      ),
      key: "4",
    },
  ];
  return (
    <>
      {userData.accessToken && (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Avatar
            size={30}
            icon={<UserOutlined />}
            className="cursor-pointer"
          />
        </Dropdown>
      )}
    </>
  );
};

export default MobileHeaderDropdownMenuMolecules;
