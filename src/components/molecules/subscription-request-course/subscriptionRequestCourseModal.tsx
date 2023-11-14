import { Card, Image, Modal } from 'antd';
import React from 'react';
import ButtonAtom from '../../atoms/button/button.attom';
import FlexAtom from '../../atoms/flex/flex.atom';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import './SubscriptRequestCourseModal.scss';
interface ISubscriptRequestCourseModal {
  isModalOpen: boolean;
  closeModal: any;
  courseData: any;
  acceptRequest: any;
  rejectRequest: any;
  btnLoading1?: any;
  btnLoading2?: any;
}
const SubscriptRequestCourseModal: React.FC<ISubscriptRequestCourseModal> = ({
  isModalOpen,
  closeModal,
  courseData,
  acceptRequest,
  rejectRequest,
  btnLoading1,
  btnLoading2,
}) => {
  return (
    <div className="Subscription-request-course-modal-div">
      <Modal
        className="Subscription-request-course-modal-div"
        open={isModalOpen}
        onCancel={closeModal}
      >
        {courseData &&
          courseData?.courses?.map((ele: any) => {
            return (
              <FlexAtom
                justify="space-evenly"
                gap="large"
                class="mt-20 cursor-pointer card-hover"
                key={ele._id}
              >
                <Card className="course-card" style={{ width: '100%' }}>
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
                        loading={btnLoading1}
                        handleButtonClick={() =>
                          acceptRequest(courseData?._id, ele?._id)
                        }
                      ></ButtonAtom>
                      <ButtonAtom
                        text="reject"
                        type="link"
                        dangerBtn={true}
                        loading={btnLoading2}
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
    </div>
  );
};

export default SubscriptRequestCourseModal;
