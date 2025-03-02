/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsApi";
import {
  BigPlayButton,
  LoadingSpinner,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
  CurrentTimeDisplay,
  TimeDivider,
} from "video-react";
import {
  setCompletedLectures,
  updateCompletedLectures,
} from "../../../slices/viewCourseSlice";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import { FaPlayCircle } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa6";
import { FaCaretLeft } from "react-icons/fa6";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseSectionData.length === 0) {
      return;
    }
    const filteredSection = courseSectionData?.filter(
      (section) => section._id === sectionId
    );
    const filteredSubsection = filteredSection[0]?.subSection?.filter(
      (subsection) => subsection._id === subSectionId
    );
    setVideoData(filteredSubsection?.[0]);
    // console.log(filteredSubsection[0]);
    setVideoEnded(false);
  }, [courseSectionData, sectionId, subSectionId]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSection - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    if (isLastVideo()) {
      return;
    }
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((subsection) => subsection._id === subSectionId);
    if (
      // checks if the current sub section is the last subsection in the section
      currentSubsectionIndex ===
      courseSectionData[currentSectionIndex]?.subSection.length - 1
    ) {
      // next sections ke 1st subsection ki 1st video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
      const nextSubsectionId =
        courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`
      );
    } else {
      // same section ki next subsection video
      const nextSectionId = courseSectionData[currentSectionIndex]._id;
      const nextSubsectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubsectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    if (isFirstVideo()) {
      return;
    }
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((subsection) => subsection._id === subSectionId);
    if (currentSubsectionIndex === 0) {
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const previousSubsectionId =
        courseSectionData[currentSectionIndex - 1]?.subSection[
          courseSectionData[currentSectionIndex - 1].subSection.length - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubsectionId}`
      );
    } else {
      const previousSectionId = courseSectionData[currentSectionIndex]?._id;
      const previousSubsectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubsectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubsectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    // status update
    dispatch(updateCompletedLectures([...completedLectures, videoData._id]));
    console.log("lecture completed", completedLectures);
    setLoading(false);
  };

  return (
    <div>
      {!videoData ? (
        <div>No data found</div>
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
          className="flex justify-center items-center"
        >
          <BigPlayButton position="center" />

          <LoadingSpinner />
          <ControlBar>
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <ReplayControl seconds={5} order={7.1} />
            <ForwardControl seconds={5} order={7.2} />
            <TimeDivider order={4.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
          </ControlBar>
          {videoEnded && (
            <div className="flex justify-center items-center">
              <div
                className="text-white z-20 absolute top-[40%] left-[46%] hover:scale-90 
                font-medium md:text-sm px-4 py-2 rounded-md flex items-center justify-center cursor-pointer"
              >
                <FaPlayCircle
                  className="h-20 w-20"
                  onClick={() => {
                    playerRef.current.seek(0);
                    playerRef.current.play();
                    setVideoEnded(false);
                  }}
                />
              </div>
              <div className="flex justify-center items-center">
                {!completedLectures?.includes(videoData._id) && (
                  <button
                    onClick={() => {
                      handleLectureCompletion();
                    }}
                    className="bg-richBlack-900 text-white absolute top-[60%] left-[44%] 
                  hover:scale-90 z-20 font-bold md:text-sm px-4 py-3 rounded-md"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
              <div className="flex justify-center items-center  ">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className=" text-white rounded-lg p-2 
                    cursor-pointer hover:scale-90 z-20 absolute top-[40%] left-[5%]"
                  >
                    <FaCaretLeft className="h-20 w-20" />
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className=" text-white rounded-lg p-2 cursor-pointer 
                    hover:scale-90 z-20 absolute top-[40%] right-[5%]"
                  >
                    <FaCaretRight className="h-20 w-20" />
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}
      <h1 className="text-white text-3xl font-bold">{videoData?.title}</h1>
      <p className="text-richBlack-100">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
