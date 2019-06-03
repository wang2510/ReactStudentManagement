import axios from 'axios';

import { SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  GET_COURSES: 'course/GET_COURSES',
  ADD_COURSE: 'course/ADD_COURSE',
  UPDATE_COURSE: 'course/UPDATE_COURSE',
  DELETE_COURSE: 'course/DELETE_COURSE',
  CLEAR_COURSES: 'course/CLEAR_COURSES'
};

const initialState = {
  courses: []
};

export type ApplicationCourseState = Readonly<typeof initialState>;

export default (state: ApplicationCourseState = initialState, action): ApplicationCourseState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.GET_COURSES):
      console.log('get ' + JSON.stringify(state));
      console.log('get ' + JSON.stringify(action.payload.data));
      return {
        ...state,
        courses: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.ADD_COURSE):
      return {
        ...state,
        courses: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.UPDATE_COURSE):
      return {
        ...state,
        courses: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURSE):
      //let newerState = { ...state };
      console.log('newerState ' + JSON.stringify(state));
      const indexOfDelete;
      state.courses.filter((course, index) => {
        const url = action.payload.config.url;
        let courseName = url.replace('/api/course/deleteCourse/', '');
        console.log('action.course.courseName ' + courseName);
        console.log('course.courseName ' + course.courseName);
        if (course.courseName == courseName) {
          console.log('find');
          console.log('find index ' + index);
          indexOfDelete = index;
          return indexOfDelete;
        }
        return -1;
      });
      console.log('indexOfDelete ' + indexOfDelete);
      state.courses.splice(indexOfDelete, 1);
      console.log('newerState ' + JSON.stringify(state));
      //return newerState;
      return {
        ...state
      };

    case ACTION_TYPES.CLEAR_COURSES:
      let newState = { ...state };
      delete newState.courses;
      return {
        ...newState
      };
    default:
      return state;
  }
};

export const getCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.GET_COURSES,
    payload: axios.get('api/course/findAllCourses')
  });

export const addACourse = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.ADD_COURSE,
    payload: axios.post('/api/course/addCourse')
  });
export const updateACourse = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.UPDATE_COURSE,
    payload: axios.put('/api/course/updateCourse')
  });

export const deleteACourse = courseName => dispatch =>
  dispatch({
    type: ACTION_TYPES.DELETE_COURSE,
    payload: axios.delete(`/api/course/deleteCourse/${courseName}`)
  });

export const clearCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.CLEAR_COURSES
  });
