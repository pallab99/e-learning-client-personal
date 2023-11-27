//@ts-nocheck
import { EllipsisOutlined, SendOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Empty,
  Input,
  Modal,
  Popconfirm,
  Popover,
  message,
} from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import QNAApi from "../../../api/QNAApi";
import useDeleteQuestion from "../../../hooks/QNA/useDeleteQuestion";
import useDeleteReply from "../../../hooks/QNA/useDeleteReply";
import useGetAllQNAOfACourse from "../../../hooks/QNA/useGetAllQNA";
import useUpdateQuestion from "../../../hooks/QNA/useUpdateQuestion";
import useUpdateReply from "../../../hooks/QNA/useUpdateReply";
import { useAppSelector } from "../../../redux/store";
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
  const [questionId, setQuestionId] = useState("");
  const [messageId, setMessageId] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [recallApi, setRecallApi] = useState(0);
  const [qnaId, setQnaId] = useState("");
  const [QNAReply, setQNAReply] = useState("");
  const [replyId, setReplyId] = useState("");

  const reset = () => {
    setValue("message", "");
    setQnaId("");
    setReplyId("");
    setShowReplyBox(false);
    setQNAReply("");
    setMessageId("");
    setQuestionId("");
  };
  const { courseId } = useParams();
  const { loading, data } = useGetAllQNAOfACourse(
    courseId as string,
    openModal,
    recallApi
  );
  const { updateQNA } = useUpdateQuestion();
  const onSubmit = async (data: any) => {
    if (questionId) {
      await updateQNA(courseId, questionId, data.message);
      setRecallApi(Math.random());
      setValue("message", "");
      setQuestionId("");
      reset();
    } else {
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
        reset();
      } catch (error: any) {
        setQuestionLoading(false);
        reset();
        message.error(error?.response?.message);
      }
    }
  };

  const handleReply = (messageId: any) => {
    setMessageId(messageId);
    setShowReplyBox(true);
  };
  const [qnaLoading, setQNALoading] = useState(false);
  const { updateReply } = useUpdateReply();
  const handleUpdateReply = async () => {
    await updateReply(courseId, questionId, replyId, QNAReply);
    setRecallApi(Math.random());
    setQNAReply("");
    reset();
  };
  const handleUpdateQuestion = async () => {};
  const handleReplyToQNA = async () => {
    if (replyId) {
      await updateReply(courseId, questionId, replyId, QNAReply);
      setRecallApi(Math.random());
      setQNAReply("");
      reset();
    } else {
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
          setQNAReply("");
          setRecallApi(Math.random());
        }
        reset();
      } catch (error: any) {
        message.error(error?.response?.message);
        setQNALoading(false);
        reset();
      }
    }
  };
  const userData = useAppSelector((state) => state.auth.userData);
  const { deleteReply } = useDeleteReply();
  const { deleteQuestion } = useDeleteQuestion();
  const handleDelete = async () => {
    if (replyId) {
      await deleteReply(courseId, qnaId, questionId, replyId);
      setRecallApi(Math.random());
      reset();
    } else {
      await deleteQuestion(courseId, qnaId, questionId);
      setRecallApi(Math.random());
      reset();
    }
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
      centered
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
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
                type="primary"
                icon={<SendOutlined />}
                htmlType="submit"
                loading={questionLoading}
              />
            </div>
            <>
              {data && data?.length <= 0 ? (
                <Empty />
              ) : (
                data &&
                data?.messages?.map((message: any, index: any) => (
                  <Card key={index} className="mt-20 mb-20 qna-card">
                    <div className="QNA_user_details primary-color">
                      <div className="items-center">
                        <Avatar src={message.user.dp} />
                        <HeadingAtom
                          style={{ color: "#8710d8" }}
                          level={5}
                          text={message?.user?.name}
                        />
                      </div>
                      <div>
                        {userData.email === message?.user?.email && (
                          <Popover
                            content={
                              <div className="cursor-pointer">
                                <ButtonAtom
                                  type="text"
                                  text="Update"
                                  handleButtonClick={() => {
                                    setValue("message", message?.message);
                                    setQuestionId(message?._id);
                                  }}
                                ></ButtonAtom>
                                <Popconfirm
                                  title="Are you sure?"
                                  onConfirm={() => {
                                    handleDelete();
                                  }}
                                >
                                  <Button
                                    danger
                                    type="text"
                                    onClick={() => {
                                      setQnaId(data?._id);
                                      setQuestionId(message?._id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </Popconfirm>
                              </div>
                            }
                            trigger="click"
                          >
                            <EllipsisOutlined
                              className="cursor-pointer"
                              style={{ fontSize: "30px" }}
                            />
                          </Popover>
                        )}
                      </div>
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
                          <div className="items-center">
                            <Avatar src={reply.user.dp} />

                            <HeadingAtom
                              style={{ color: "#8710d8" }}
                              text={reply.user.name}
                              level={5}
                            ></HeadingAtom>
                          </div>
                          <div>
                            {userData.email === reply?.user?.email && (
                              <Popover
                                content={
                                  <div className="cursor-pointer">
                                    <ButtonAtom
                                      type="text"
                                      text="Update"
                                      handleButtonClick={() => {
                                        setQNAReply(reply?.message);
                                        setShowReplyBox(true);
                                        setMessageId(message?._id);
                                        setReplyId(reply?._id);
                                        setQuestionId(message?._id);
                                      }}
                                    ></ButtonAtom>
                                    <Popconfirm
                                      title="Are you sure?"
                                      onConfirm={handleDelete}
                                    >
                                      <Button
                                        danger
                                        type="text"
                                        onClick={() => {
                                          setQnaId(data?._id);
                                          setReplyId(reply?._id);
                                          setQuestionId(message?._id);
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </Popconfirm>
                                  </div>
                                }
                                trigger="click"
                              >
                                <EllipsisOutlined
                                  className="cursor-pointer"
                                  style={{ fontSize: "30px" }}
                                />
                              </Popover>
                            )}
                          </div>
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
                          value={QNAReply}
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
