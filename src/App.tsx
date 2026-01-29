/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { useAppSelector } from './app/store';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { todosSlice } from './features/todos';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const query = useAppSelector(state => state.filter.query);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const fetchTodos = useCallback(() => {
    getTodos()
      .then(fetchedTodos => {
        dispatch(todosSlice.actions.setTodos(fetchedTodos));
      })
      .catch(error => setFetchError(error.message))
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleRetry = () => {
    setLoading(true);
    setFetchError(null);
    fetchTodos();
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : fetchError ? (
                <>
                  <div className="notification is-danger">{fetchError}</div>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="button is-link mt-4"
                  >
                    Reload todos
                  </button>
                </>
              ) : (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};

export default React.memo(App);
