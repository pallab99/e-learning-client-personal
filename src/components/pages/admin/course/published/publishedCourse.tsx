//@ts-nocheck
import { useState } from "react";
import useGetAllCourseByAdmin from "../../../../../hooks/course/getAllCourseAdmin";
import AllPublishedCourseTableOrganism from "../../../../organism/admin/course/published/publishedCourse";

const AllPublishedCoursePage = () => {
  const [selectValue, setSelectValue] = useState({});
  const { loading, data } = useGetAllCourseByAdmin(selectValue);

  const tableData = data?.courses?.map((ele: any) => {
    return {
      _id: ele?._id,
      title: ele?.title,
      totalStudent: ele?.students.length,
      category: ele?.category,
      level: ele?.level,
      totalHours: ele?.totalHours | 0,
      numberOfSection: ele?.courseSection?.length | 0,
      thumbnail: ele?.thumbnail,
      instructors: ele?.instructors?.name | "Pallab Majumdar",
    };
  });

  //   {
  //     _id: 1,
  //     title: 'validation testing course ',
  //     instructors: 'Pallab',
  //     totalStudent: 10,
  //     category: 'web',
  //     level: 'beginner',
  //     totalHours: 2,
  //     numberOfSection: 30,
  //     thumbnail:
  //       'https://mern-pallab-bucket.s3.eu-west-3.amazonaws.com/course/validationtestingcourse/1699265108533-1.png',
  //   },
  //   {
  //     _id: 2,
  //     title: 'validation testing course ',
  //     instructors: 'Pallab',
  //     totalStudent: 10,
  //     category: 'web',
  //     level: 'beginner',
  //     totalHours: 2,
  //     numberOfSection: 30,
  //     thumbnail:
  //       'https://mern-pallab-bucket.s3.eu-west-3.amazonaws.com/course/validationtestingcourse/1699265108533-1.png',
  //   },
  //   {
  //     _id: 3,
  //     title: 'validation testing course ',
  //     instructors: 'Pallab',
  //     totalStudent: 10,
  //     category: 'web',
  //     level: 'beginner',
  //     totalHours: 2,
  //     numberOfSection: 30,
  //     thumbnail:
  //       'https://mern-pallab-bucket.s3.eu-west-3.amazonaws.com/course/validationtestingcourse/1699265108533-1.png',
  //   },
  //   {
  //     _id: 4,
  //     title: 'validation testing course ',
  //     instructors: 'Pallab',
  //     totalStudent: 10,
  //     category: 'web',
  //     level: 'beginner',
  //     totalHours: 2,
  //     numberOfSection: 30,
  //     thumbnail:
  //       'https://mern-pallab-bucket.s3.eu-west-3.amazonaws.com/course/validationtestingcourse/1699265108533-1.png',
  //   },
  // ];
  return (
    <AllPublishedCourseTableOrganism
      loading={loading}
      data={tableData}
      setSelectValue={setSelectValue}
    />
  );
};

export default AllPublishedCoursePage;
