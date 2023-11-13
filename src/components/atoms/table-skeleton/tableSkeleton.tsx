import { Skeleton } from 'antd';
import './tableSkeleton.scss';
const TableSkeletonAtom = () => {
  return (
    <>
      {[1, 2, 3, 4].map((ele: any) => {
        return (
          <div key={ele} className="table-skeleton-div">
            <Skeleton.Image />
            <Skeleton />
            <Skeleton.Button />
          </div>
        );
      })}
    </>
  );
};

export default TableSkeletonAtom;
