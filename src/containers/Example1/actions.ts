import { ADD_TASK, FETCH_TASKS_REQUESTED } from './constants';

export const addTask = (text: string) => ({
  type: ADD_TASK,
  text
});

export const fetchTasks = () => ({
  type: FETCH_TASKS_REQUESTED
});
