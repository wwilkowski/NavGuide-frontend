import { ADD_TASK, FETCH_TASKS_SUCCESSED } from './constants';
import { taskActionType, TaskState } from './types';

const initialState: TaskState = {
  tasks: []
};

const Example1Data = (state = initialState, action: taskActionType) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        tasks: [...state.tasks, { text: action.text, completed: false }]
      };
    case FETCH_TASKS_SUCCESSED:
      return {
        tasks: action.tasks
      };
    default:
      return state;
  }
};

export default Example1Data;
