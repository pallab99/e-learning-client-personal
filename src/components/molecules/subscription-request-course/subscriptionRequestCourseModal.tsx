import { Card, Image, Modal } from "antd";
import React from "react";
import ButtonAtom from "../../atoms/button/button.attom";
import FlexAtom from "../../atoms/flex/flex.atom";
import ParagraphAtom from "../../atoms/paragraph/paragraph.atom";
interface ISubscriptRequestCourseModal {
  isModalOpen: boolean;
  closeModal: any;
  courseData: any;
  acceptRequest: any;
  rejectRequest: any;
}
const SubscriptRequestCourseModal: React.FC<ISubscriptRequestCourseModal> = ({
  isModalOpen,
  closeModal,
  courseData,
  acceptRequest,
  rejectRequest,
}) => {
  return (
    <>
      <Modal open={isModalOpen} onCancel={closeModal}>
        {courseData &&
          courseData?.courses?.map((ele: any) => {
            return (
              <FlexAtom
                justify="space-evenly"
                gap="large"
                class="mt-20 cursor-pointer card-hover"
                key={ele._id}
              >
                <Card className="course-card" style={{ width: "100%" }}>
                  <FlexAtom gap="large" align="center">
                    <div className="card-left">
                      <Image
                        src={ele?.thumbnail}
                        alt="Course thumbnail"
                        width={120}
                        height={80}
                      />
                      <ParagraphAtom
                        text={ele.title}
                        // level={5}
                        ellipsis={true}
                      ></ParagraphAtom>
                    </div>
                    <div className="">
                      <ButtonAtom
                        text="accept"
                        type="link"
                        handleButtonClick={() =>
                          acceptRequest(courseData?._id, ele?._id)
                        }
                      ></ButtonAtom>
                      <ButtonAtom
                        text="reject"
                        type="link"
                        dangerBtn={true}
                        handleButtonClick={() =>
                          rejectRequest(courseData?._id, ele?._id)
                        }
                      ></ButtonAtom>
                    </div>
                  </FlexAtom>
                </Card>
              </FlexAtom>
            );
          })}
      </Modal>
    </>
  );
};

export default SubscriptRequestCourseModal;
