import { useParams } from "react-router-dom";
import useGetAllAssignment from "../../../../hooks/assignment/useGetAllAssignment";
import InstructorDashboardSideBarOrganism from "../../../organism/instructor/dashboard/sidebar/sidebar.organism";
import ViewAssignment from "../../../organism/instructor/viewAssignment/viewAssignment";
import "./assignmentTable.scss";
const AssignmentTable = () => {
  const { courseId } = useParams();
  const { loading, assignment } = useGetAllAssignment(courseId);
  //   console.log(assignment);
  //   const assignments = assignment.map((assignment) => ({
  //     _id: assignment._id,
  //     title: assignment.title,
  //     point: assignment.point,
  //     assignmentFileURL: assignment.assignmentFileURL,
  //   }));
  //   console.log(assignments);

  return (
    <div className="instructor-dashboard-div-wrapper">
      <InstructorDashboardSideBarOrganism />
      <div className="instructor-dashboard-div-table">
        <ViewAssignment data={assignment}></ViewAssignment>
      </div>
    </div>
  );
};

export default AssignmentTable;
