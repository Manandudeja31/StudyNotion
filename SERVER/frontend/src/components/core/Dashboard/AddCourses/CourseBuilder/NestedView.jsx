/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import SubSectionModal from "./SubSectionModal";

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: course._id,
      },
      token
    );
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <div>
      <div>
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex items-center justify-between gap-x-3 border-b-2">
              <div className="text-white flex items-center gap-x-3">
                <RxDropdownMenu />
                <p>{section.sectionName}</p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this section",
                      text2: "All the lecture in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btnHandler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBin6Line />
                </button>
                <span>|</span>
                <button>
                  <IoMdArrowDropdown />
                </button>
              </div>
            </summary>
            <div>
              {section?.subSection?.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-center justify-between gap-x-3 border-b-2"
                >
                  <div className="text-white flex items-center gap-x-3">
                    <RxDropdownMenu />
                    <p>{data.title}</p>
                  </div>
                  <div
                    className="flex items-center gap-x-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Delete this Sub Section",
                          text2: "Selected lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btnHandler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        });
                      }}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="mt-4 flex items-center gap-x-3 text-yellow-50"
                onClick={() => setAddSubSection(section._id)}
              >
                <IoMdAdd />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NestedView;
