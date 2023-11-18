import * as React from 'react';
import './courseCard.scss';
import ButtonAtom from '../../atoms/button/button.attom';
import { HeartOutlined } from '@ant-design/icons';
import { Card, Pagination, Rate } from 'antd';
import { FaChartSimple } from 'react-icons/fa6';
const courses = [
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
  {
    title:
      'The Complete Python Bootcamp From Zero to Hero in PythonLearn Python',
    author: 'Josh Portilla',
    ratings: '4.6',
    reviews: '(7888)',
    price: '$9.99',
    level: 'intermediate',
    imgSrc: 'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg',
  },
];

const CourseCardMolecules = () => {
  return (
    <div className="CardContainer cursor-pointer">
      <h2>All Courses</h2>
      <div className="CardContent">
        {courses.map((course, index) => (
          <div className="Cards mt-20">
            <Card key={index}>
              <img
                src={course.imgSrc}
                alt="course"
                width="240"
                height="135"
                loading="lazy"
                style={{ overflow: 'hidden', width: '100%', height: 'auto' }}
              />
              <div className="lowerCard mb-20">
                <p className="title mt-5">{course.title}</p>
                <p className="author mt-5">{course.author}</p>
                <div className="ratings mt-5 text-18">
                  {course.ratings}
                  <Rate disabled defaultValue={4} />
                  <span className="reviews">{`(123,00)`}</span>
                </div>
                <p className="Price mt-5 text-18">
                  <FaChartSimple />{' '}
                  <span className="cross">{course.level}</span>
                </p>
                <p className="Hover">
                  <ButtonAtom
                    text="Add To Cart"
                    type="primary"
                    style={{ width: '100%' }}
                  ></ButtonAtom>
                  {/* <HeartOutlined style={{ fontSize: '30px' }}></HeartOutlined> */}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="pagination-div">
        <Pagination
          className="mt-40"
          defaultCurrent={1}
          total={50}
        ></Pagination>
      </div>
    </div>
  );
};

export default CourseCardMolecules;
