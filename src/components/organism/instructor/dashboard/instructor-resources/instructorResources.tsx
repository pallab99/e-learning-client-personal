import React from 'react';
import InstructorResourceMolecules, {
  IInstructorResource,
} from '../../../../molecules/instructor-resource-molecules/instructorResource';
import FlexAtom from '../../../../atoms/flex/flex.atom';
import './instructorResource.scss';
const InstructorResourceOrganism = () => {
  const [instructorResources] = React.useState<IInstructorResource[]>([
    {
      img: 'https://s.udemycdn.com/instructor/dashboard/engaging-course-2x.jpg',
      headingText: 'Create an Engaging Course',
      paragraphText:
        'Whether you ve been teaching for years or are teaching for the first time, you can make an engaging course. We ve compiled resources and best practices to help you get to the next level, no matter where youre starting.',
      btnText: 'Get Started',
    },
    {
      img: 'https://s.udemycdn.com/instructor/dashboard/video-creation-2x.jpg',
      headingText: 'Get Started with Video',
      paragraphText:
        'Quality video lectures can set your course apart. Use our resources to learn the basics.',
      btnText: 'Get Started',
    },
    {
      img: 'https://s.udemycdn.com/instructor/dashboard/build-audience-2x.jpg',
      headingText: 'Build Your Audience',
      paragraphText:
        'Set your course up for success by building your audience.',
      btnText: 'Get Started',
    },
    {
      img: 'https://s.udemycdn.com/instructor/dashboard/newcomer-challenge-2x.jpg',
      headingText: 'Join the New Instructor Challenge!',
      paragraphText:
        'Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!',
      btnText: 'Get Started',
    },
  ]);
  return (
    <div className="instructor-resource-div">
      <InstructorResourceMolecules
        img={instructorResources[0].img}
        headingText={instructorResources[0].headingText}
        paragraphText={instructorResources[0].paragraphText}
        btnText={instructorResources[0].btnText}
      />
      <div className="instructor-resource-middle">
        <InstructorResourceMolecules
          img={instructorResources[1].img}
          headingText={instructorResources[1].headingText}
          paragraphText={instructorResources[1].paragraphText}
          btnText={instructorResources[1].btnText}
        />
        <InstructorResourceMolecules
          img={instructorResources[2].img}
          headingText={instructorResources[2].headingText}
          paragraphText={instructorResources[2].paragraphText}
          btnText={instructorResources[2].btnText}
        />
      </div>
      <InstructorResourceMolecules
        img={instructorResources[3].img}
        headingText={instructorResources[3].headingText}
        paragraphText={instructorResources[3].paragraphText}
        btnText={instructorResources[3].btnText}
      />
    </div>
  );
};

export default InstructorResourceOrganism;
