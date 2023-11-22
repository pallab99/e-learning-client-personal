// import './addReview.scss';
import { Modal, Rate, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import TextArea from 'antd/es/input/TextArea';
// import './addReview.scss';
import CenteredBtnOrganism from '../../centered-btn/centered-btn.molecules';
import HeadingAtom from '../../../atoms/heading/heading.atom';
import { zodResolver } from '@hookform/resolvers/zod';
import reviewSchema from '../../../../schema/review-rating/reviewSchema';
import AlertAtom from '../../../atoms/alert/alertAtom';
import reviewApi from '../../../../api/reviewApi';
import { useEffect, useState } from 'react';
const UpdateReviewModal = ({
  openModal,
  closeModal,
  reviewData,
  setRecallApi,
}: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(reviewSchema),
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (reviewData) {
      setValue('rating', reviewData?.rating);
      setValue('reviewMessage', reviewData?.reviewMessage);
    }
  }, [setValue, reviewData]);
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const result = await reviewApi.updateReview(
        reviewData?.reviewId as string,
        data
      );
      message.success(result?.data?.message);
      setLoading(false);
      if (!loading) {
        closeModal();
        setRecallApi(Math.random());
      }
    } catch (error: any) {
      setLoading(false);

      message.error(error?.response?.message);
    }
  };
  return (
    <div className="addReviewModal">
      <Modal open={openModal} onCancel={closeModal} footer={null}>
        <form onSubmit={handleSubmit(onSubmit)} className=" mt-40">
          <HeadingAtom text="Rate this course" level={3} />
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
          {errors?.rating && (
            <AlertAtom
              className="mb-20"
              type="error"
              message={errors?.rating?.message}
            />
          )}
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
            {errors?.reviewMessage && (
              <AlertAtom
                className="mt-30"
                type="error"
                message={errors?.reviewMessage?.message}
              />
            )}
          </div>
          <CenteredBtnOrganism
            justify="center"
            text="Submit"
            htmlType="submit"
            type="primary"
            size="large"
            className="mt-20"
            loading={loading}
          />
        </form>
      </Modal>
    </div>
  );
};

export default UpdateReviewModal;
