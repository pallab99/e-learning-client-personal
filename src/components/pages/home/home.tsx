import { useState } from "react";
import "./home.scss";
// import { Space } from 'antd';
// import Spline from '@splinetool/react-spline';
const HomePage = () => {
  const [courseDetails] = useState([
    {
      courseTitle: "Mrs",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Darcy Moyers",
      rating: 3.6,
      description: "hhhhhhhhhhh",
    },
    {
      courseTitle: "Mrs",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Jillayne Selly",
      rating: 1.7,
    },
    {
      courseTitle: "Mr",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Clayborn Kayser",
      rating: 4.1,
    },
    {
      courseTitle: "Ms",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Stuart Sholl",
      rating: 2.0,
    },
    {
      courseTitle: "Mr",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Madelaine Wimmer",
      rating: 0.0,
    },
    {
      courseTitle: "Mr",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Burl Sutherington",
      rating: 2.7,
    },
    {
      courseTitle: "Rev",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Jae Whillock",
      rating: 3.2,
    },
    {
      courseTitle: "Dr",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Moise Pedwell",
      rating: 2.3,
    },
    {
      courseTitle: "Dr",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Arlinda Brideau",
      rating: 0.4,
    },
    {
      courseTitle: "Rev",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Almire Peeters",
      rating: 1.8,
    },
    {
      courseTitle: "Mrs",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Lanita Benes",
      rating: 0.7,
    },
    {
      courseTitle: "Rev",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Jessalyn Swendell",
      rating: 3.0,
    },
    {
      courseTitle: "Mrs",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Ebenezer Brigdale",
      rating: 1.9,
    },
    {
      courseTitle: "Dr",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Abbye Starten",
      rating: 2.6,
    },
    {
      courseTitle: "Honorable",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Standford Ingold",
      rating: 3.2,
    },
    {
      courseTitle: "Ms",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Keir Sainthill",
      rating: 0.9,
    },
    {
      courseTitle: "Honorable",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Nikolos MacCumiskey",
      rating: 2.8,
    },
    {
      courseTitle: "Rev",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Pris Ezzell",
      rating: 4.1,
    },
    {
      courseTitle: "Ms",
      img: "https://img-c.udemycdn.com/course/480x270/246314_3f1f_5.jpg",
      tag: "best seller",
      instructorName: "Junia Spight",
      rating: 4.1,
    },
    {
      courseTitle: "Ms",
      img: "https://img-c.udemycdn.com/course/480x270/2068149_a63b_9.jpg",
      tag: "best seller",
      instructorName: "Jo Laverock",
      rating: 2.5,
    },
  ]);
  // return (
  //   // <div className="home-page-div mt-40 mb-30">
  //   //   {/* <Spline scene="https://prod.spline.design/IoaUG1hFbe3aQhcU/scene.splinecode" /> */}

  //   //   <div className="course-card-wrapper">
  //   //     {courseDetails?.map((ele: ICourseCardMolecules, index: number) => {
  //   //       return (
  //   //         <>
  //   //           <div className="single-card">
  //   //             <CourseCardOrganism
  //   //               key={index}
  //   //               courseTitle={ele.courseTitle}
  //   //               img={ele.img}
  //   //               instructorName={ele.instructorName}
  //   //               tag={ele.tag}
  //   //               rating={ele.rating}
  //   //             />
  //   //           </div>
  //   //           <div className="card-overlay">
  //   //             <Card className="course-card-overlay">
  //   //               <p>{ele.instructorName}</p>
  //   //               <p>{ele.instructorName}</p>
  //   //               <p>{ele.instructorName}</p>
  //   //             </Card>
  //   //           </div>
  //   //         </>
  //   //       );
  //   //     })}
  //   //   </div>
  //   // </div>
  // );
};

export default HomePage;
