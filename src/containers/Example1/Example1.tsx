import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './actions';

export const Example1: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(actions.addTask('example '));
        }}
      >
        Dodaj nowy task to store'a
      </button>
      <button
        onClick={() => {
          dispatch(actions.fetchTasks());
        }}
      >
        Pobierz taski z API do store'a
      </button>
    </div>
  );
};

export default Example1;
