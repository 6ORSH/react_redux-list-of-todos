import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';

type Props = {
  query: string;
};

export const TodoFilter: React.FC<Props> = ({ query = '' }) => {
  const dispatch = useDispatch();

  const handleStatusChange = useCallback(
    (newStatus: Status) => {
      dispatch(filterSlice.actions.updateStatus(newStatus));
    },
    [dispatch],
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      dispatch(filterSlice.actions.updateQuery(newQuery.toLowerCase()));
    },
    [dispatch],
  );

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              handleStatusChange(e.currentTarget.value as Status);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => {
            handleQueryChange(e.currentTarget.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
