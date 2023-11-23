import { SendOutlined } from "@ant-design/icons";
import { Avatar, Card, Empty, Input, Modal, message } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import QNAApi from "../../../api/QNAApi";
import useGetAllQNAOfACourse from "../../../hooks/QNA/useGetAllQNA";
import ButtonAtom from "../../atoms/button/button.attom";
import EditProfileSkeleton from "../../atoms/edit-profile-skeleton/editProfileSkeleton";
import HeadingAtom from "../../atoms/heading/heading.atom";
import ParagraphAtom from "../../atoms/paragraph/paragraph.atom";
import "./QNA.scss";
const QnAModal = ({ openModal, closeModal }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      message: "",
      reply: "",
    },
  });
  const [messageId, setMessageId] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  console.log({ messageId });

  const [questionLoading, setQuestionLoading] = useState(false);
  const [recallApi, setRecallApi] = useState(0);
  const { courseId } = useParams();
  const { loading, data } = useGetAllQNAOfACourse(
    courseId as string,
    openModal,
    recallApi
  );
  const onSubmit = async (data: any) => {
    try {
      setQuestionLoading(true);
      let newData = {};
      if (data?.message) {
        newData = {
          message: data?.message,
          courseId: courseId,
        };
        const response = await QNAApi.addQNA(newData);
        message.success(response?.data?.message);
      }

      setQuestionLoading(false);
      if (!questionLoading) {
        setRecallApi(Math.random());
        setValue("message", "");
      }
    } catch (error: any) {
      setQuestionLoading(false);

      message.error(error?.response?.message);
    }
  };

  const handleReply = (messageId: any) => {
    setMessageId(messageId);
    setShowReplyBox(true);
  };
  const [qnaLoading, setQNALoading] = useState(false);
  const [QNAReply, setQNAReply] = useState("");
  const handleReplyToQNA = async () => {
    try {
      setQNALoading(true);
      const newData = {
        reply: QNAReply,
        courseId: courseId,
      };
      const response = await QNAApi.replyToQNA(messageId, newData);
      setQNALoading(false);
      message.success(response?.data?.message);
      if (!qnaLoading) {
        setRecallApi(Math.random());
      }
    } catch (error: any) {
      message.error(error?.response?.message);
      setQNALoading(false);
    }
    console.log("data", QNAReply);
  };

  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => {
        setShowReplyBox(false);
        closeModal();
      }}
      bodyStyle={{ overflowY: "auto" }}
    >
      {loading ? (
        <EditProfileSkeleton />
      ) : (
        <div
          className="course_QNA_Container"
          style={{ overflowY: "auto", height: "100%" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeadingAtom
              text="All QNA of this course"
              level={3}
              className="mt-10 mb-20"
            ></HeadingAtom>
            <Controller
              name="message"
              control={control}
              rules={{ required: true, maxLength: 5000 }}
              render={({ field }: any) => (
                <Input
                  {...field}
                  placeholder="Add a new Q&A"
                  className="mb-10"
                  key={recallApi}
                  allowClear
                />
              )}
            />
            <ButtonAtom
              text="Add Q&A"
              type="primary"
              // handleButtonClick={() => handleSubmit(onSubmit)()}
              htmlType="submit"
              loading={questionLoading}
            />
            <>
              {data && data?.length <= 0 ? (
                <Empty />
              ) : (
                data &&
                data?.messages?.map((message: any, index: any) => (
                  <Card key={index} className="mt-20 mb-20 qna-card">
                    <div className="QNA_user_details primary-color">
                      <Avatar src={message.user.dp} />
                      <HeadingAtom
                        style={{ color: "#8710d8" }}
                        level={5}
                        text={message?.user?.name}
                      />
                    </div>
                    <ParagraphAtom
                      text={message.message}
                      className="text-18 mb-10"
                    ></ParagraphAtom>

                    <ButtonAtom
                      type="link"
                      text="reply"
                      handleButtonClick={() => handleReply(message._id)}
                    />

                    {message?.reply?.map((reply: any, index: any) => (
                      <Card
                        key={index}
                        style={{ marginTop: "10px" }}
                        className="reply-card"
                      >
                        <div className="QNA_user_details">
                          <Avatar src={reply.user.dp} />

                          <HeadingAtom
                            style={{ color: "#8710d8" }}
                            text={reply.user.name}
                            level={5}
                          ></HeadingAtom>
                        </div>
                        <ParagraphAtom
                          text={reply.message}
                          className="text-18"
                        ></ParagraphAtom>
                      </Card>
                    ))}
                    {showReplyBox && messageId === message?._id && (
                      <div className="reply_box mt-20">
                        <Input
                          onChange={(e: any) => {
                            console.log(e.target.value);
                            setQNAReply(e.target.value);
                          }}
                          placeholder="Reply to this Q&A"
                        />
                        {errors.reply && <p>This field is required</p>}
                        <ButtonAtom
                          icon={<SendOutlined />}
                          handleButtonClick={handleReplyToQNA}
                          loading={qnaLoading}
                        ></ButtonAtom>
                      </div>
                    )}
                  </Card>
                ))
              )}
            </>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default QnAModal;
