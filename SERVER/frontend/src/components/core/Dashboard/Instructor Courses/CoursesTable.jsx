/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { FaCheckCircle } from "react-icons/fa";
import { PiClockFill } from "react-icons/pi";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsApi";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
const CoursesTable = ({ courses, setCourses }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };
  return (
    <div className="m-10 ">
      <Table className="border border-richBlack-600 ">
        <Thead className="border border-richBlack-600 ">
          <Tr className="gap-x-10 p-5">
            <Th className="flex p-2">Courses</Th>
            <Th className=" pr-8">Duration</Th>
            <Th className=" pr-8">Price</Th>
            <Th className=" pr-8">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Th>
              <Td>No Courses Found.</Td>
            </Th>
          ) : (
            courses.map((course) => (
              <Tr key={course._id} className="gap-x-10 p-8 ">
                <Td className="flex gap-x-4 mb-10 p-5">
                  <img
                    src={course.thumbnail}
                    alt="thumbnail"
                    className="h-[150px] w-[200px] rounded-lg object-cover"
                  />
                  <div>
                    <p>{course.courseName}</p>
                    <p className="text-richBlack-200 mt-2 md:w-[400px]">
                      {course.courseDescription}
                    </p>
                    <p className="text-richBlack-5 mt-2">
                      Created: {course.createdAt}
                    </p>
                    {course.status === "Published" ? (
                      <div
                        className="text-yellow-50 flex items-center mt-2 gap-2
                       bg-richBlack-700 rounded-full w-28 justify-center"
                      >
                        <FaCheckCircle />
                        Published
                      </div>
                    ) : (
                      <div
                        className="text-pink-300 flex items-center mt-2 gap-2
                       bg-richBlack-700 rounded-full w-24 justify-center"
                      >
                        <PiClockFill />
                        Drafted
                      </div>
                    )}
                  </div>
                </Td>
                <Td>2h 30min</Td>
                <Td>{course.price}</Td>
                <Td>
                  <button
                    className="pr-5"
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course.",
                        text2:
                          "All the data related to this course will be deleted",
                        btnText: "Delete",
                        btn2Text: "Cancel",
                        btnHandler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                  >
                    <MdDelete />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CoursesTable;
