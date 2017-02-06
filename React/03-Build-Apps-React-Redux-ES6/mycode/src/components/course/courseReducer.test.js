'use strict';

import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from './courseActions';

describe('Course Reducer', () => {
  it('should add course when pass CREATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {title: 'A'},
      {title:'B'}
    ];

    const newCourse = {title: 'C'};

    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should update course when pass UPDATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'New Title'}
    ];

    const newCourse = {id: 'C', title: 'New Title'};
    const action = actions.updatedCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find( x => x.id === newCourse.id);
    const untouchedCourse = newState.find( x => x.id === 'A');

    // assert
    expect(newState.length).toEqual(3);
    expect(updatedCourse.title).toBe('New Title');
    expect(untouchedCourse.title).toBe('A');
  });

});
