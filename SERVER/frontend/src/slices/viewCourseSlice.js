import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
    setCompletedLectures: (state, action) => {
      console.log("setCompletedLectures payload:", action.payload);
      state.completedLectures = Array.isArray(action.payload)
        ? action.payload
        : [];
    },
    updateCompletedLectures: (state, action) => {
      console.log("updateCompletedLectures payload:", action.payload);
      if (!Array.isArray(state.completedLectures)) {
        console.warn(
          "completedLectures was not an array, initializing to empty array."
        );
        state.completedLectures = [];
      }
      state.completedLectures = [...state.completedLectures, action.payload];
    },
  },
});

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
