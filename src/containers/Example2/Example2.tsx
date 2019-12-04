import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './actions';

export const Example2: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(actions.addUser('exampleUsername'));
        }}
      >
        Dodaj nowego usera
      </button>
      <button
        onClick={() => {
          dispatch(actions.fetchUsers());
        }}
      >
        Pobierz taski z API do store'a
      </button>
    </div>
  );
};

export default Example2;
