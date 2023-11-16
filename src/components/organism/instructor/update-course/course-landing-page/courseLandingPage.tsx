import { useParams } from "react-router-dom";
import UploadPromoVideo from "./promoVideoUpload.tsx/promoVideoUpload";
import CourseThumbnail from "./thumbnailUpload/thumbnailUpload";

const CourseLandingPage = () => {
  const { courseId } = useParams();

  return (
    <>
      <CourseThumbnail courseId={courseId}></CourseThumbnail>
      <UploadPromoVideo courseId={courseId}></UploadPromoVideo>
    </>
  );
};

export default CourseLandingPage;
