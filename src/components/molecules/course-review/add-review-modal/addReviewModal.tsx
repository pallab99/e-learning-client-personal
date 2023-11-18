import React, { useState } from 'react';
import './addReview.scss';
import { Modal, Rate } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import TextArea from 'antd/es/input/TextArea';
import './addReview.scss';
import CenteredBtnOrganism from '../../centered-btn/centered-btn.molecules';
import HeadingAtom from '../../../atoms/heading/heading.atom';
const AddReviewModal = ({ openModal, closeModal }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="addReviewModal">
      <Modal open={openModal} onCancel={closeModal} footer={null}>
        <form onSubmit={handleSubmit(onSubmit)} className=" mt-40">
          <HeadingAtom text="Rate this course" level={2} />
          <div className="input-group justify-center mb-30">
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Rate
                  {...field}
                  style={{ fontSize: '34px', color: '#b4690e' }}
                />
              )}
            />
          </div>
          <div className="input-group">
            <Controller
              name="reviewMessage"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={3}
                  placeholder="Describe your experience with this course (optional)"
                  maxLength={1000}
                />
              )}
            />
          </div>
          <CenteredBtnOrganism
            justify="center"
            text="Submit"
            htmlType="submit"
            type="primary"
            size="large"
            className="mt-20"
          />
        </form>
      </Modal>
    </div>
  );
};

export default AddReviewModal;
