import AllPendingCourseTableOrganism from '../../../../organism/admin/course/pending/pendingCourse';

const AllPendingCoursePage = () => {
  const data = [
    {
      _id: 1,
      title: 'validation testing course ',
      instructors: 'Pallab',
      totalStudent: 10,
      category: 'web',
      level: 'beginner',
      totalHours: 2,
      numberOfSection: 30,
      thumbnail:
        'https://mern-pallab-bucket.s3.eu-west-3.amazonaws.com/course/validationtestingcourse/1699265108533-1.png',
    },
    {
      _id: 2,
      title: 'validation testing course ',
      instructors: 'Pallab',
      totalStudent: 10,
      category: 'web',
      level: 'beginner',
      totalHours: 2,
      numberOfSection: 30,
      thumbnail:
        'https://mern-pallab-bucket.s3.eu-west-3.amazonaws.com/course/validationtestingcourse/1699265108533-1.png',
    },
    {
      _id: 3,
      title: 'validation testing course ',
      instructors: 'Pallab',
      totalStudent: 10,
      category: 'web',
      level: 'beginner',
      totalHours: 2,
      numberOfSection: 30,
      thumbnail:
        'https://mern-pallab-bucket.s3.eu-west-3.amazonaws.com/course/validationtestingcourse/1699265108533-1.png',
    },
    {
      _id: 4,
      title: 'validation testing course ',
      instructors: 'Pallab',
      totalStudent: 10,
      category: 'web',
      level: 'beginner',
      totalHours: 2,
      numberOfSection: 30,
      thumbnail:
        'https://mern-pallab-bucket.s3.eu-west-3.amazonaws.com/course/validationtestingcourse/1699265108533-1.png',
    },
  ];
  return <AllPendingCourseTableOrganism data={data} />;
};

export default AllPendingCoursePage;
