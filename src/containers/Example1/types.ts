import { ADD_TASK, FETCH_TASKS_FAILED, FETCH_TASKS_REQUESTED, FETCH_TASKS_SUCCESSED } from './constants';

export interface TaskType {
  text: string;
  completed: boolean;
}

export interface TaskState {
  tasks: TaskType[];
}

export interface addTaskAction {
  type: typeof ADD_TASK;
  text: string;
}

export interface fetchTasksAction {
  type: typeof FETCH_TASKS_REQUESTED;
}

export interface fetchTasksSuccessedAction {
  type: typeof FETCH_TASKS_SUCCESSED;
  tasks: TaskType[];
}

export interface fetchTasksFailedAction {
  type: typeof FETCH_TASKS_FAILED;
  message: string;
}

export type taskActionType = addTaskAction | fetchTasksSuccessedAction;
