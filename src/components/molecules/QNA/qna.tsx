import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Input, Button } from 'antd';
import axios from 'axios';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import './QNA.scss';
import HeaderOrganism from '../../organism/headerOragnism/header';
import HeadingAtom from '../../atoms/heading/heading.atom';
const { Text } = Typography;

const QnAModal = () => {
  const [newQnA, setNewQnA] = useState('');
  const [reply, setReply] = useState('');

  const handleAddQnA = () => {
    // Add your logic to add a new Q&A here
  };

  const handleReply = (messageId: any) => {
    // Add your logic to reply to a Q&A here
  };
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/qna/all/details/65598f18ae9434dd4701cef8')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);
  console.log(data?.data?.messages);

  return (
    <div className="course_QNA_Container">
      <HeadingAtom
        text="All QNA of this course"
        level={3}
        className="mt-10 mb-20"
      ></HeadingAtom>
      <Input
        value={newQnA}
        onChange={(e) => setNewQnA(e.target.value)}
        placeholder="Add a new Q&A"
        className="mb-10"
      />
      <Button onClick={handleAddQnA}>Add Q&A</Button>
      {data &&
        data.data?.messages?.map((message: any, index: any) => (
          <Card key={index} className="mt-20 mb-20 qna-card">
            <div className="QNA_user_details primary-color">
              <Avatar src={message.user.dp} />
              <HeadingAtom
                style={{ color: '#8710d8' }}
                level={5}
                text={message?.user?.name}
              />
            </div>
            <ParagraphAtom
              text={message.message}
              className="text-18 mb-10"
            ></ParagraphAtom>
            <Input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Reply to this Q&A"
            />
            <Button type="link" onClick={() => handleReply(message._id)}>
              Reply
            </Button>
            {message.reply.map((reply: any, index: any) => (
              <Card
                key={index}
                style={{ marginTop: '10px' }}
                className="reply-card"
              >
                <div className="QNA_user_details">
                  <Avatar src={reply.user.dp} />

                  <HeadingAtom
                    style={{ color: '#8710d8' }}
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
          </Card>
        ))}
    </div>
  );
};

export default QnAModal;
