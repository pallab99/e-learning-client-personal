import { List } from 'antd';
import './requirements.scss';
import HeadingAtom from '../../../atoms/heading/heading.atom';
const Requirements = () => {
  const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  return (
    <div className="requirements_container mt-30 mb-50">
      <div className="requirements_header">
        <HeadingAtom text="Requirements" level={3}></HeadingAtom>
      </div>
      <div className="requirements_list mt-20 text-18">
        <ul>
          <li className="mt-10">
            No programming experience needed - I'll teach you everything you
            need to know
          </li>
          <li className="mt-10">A computer with access to the internet</li>
          <li className="mt-10">No paid software required</li>
          <li className="mt-10">
            I'll walk you through, step-by-step how to get all the software
            installed and set up
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Requirements;
