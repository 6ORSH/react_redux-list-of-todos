import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { CombinedSliceReducer } from '@reduxjs/toolkit/dist/combineSlices';
import { useSelector } from 'react-redux';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice, FilterState } from '../features/filter';
import { todosSlice } from '../features/todos';
import { Todo } from '../types/Todo';

// Explicitly type rootReducer as 'any' to avoid type export issues
const rootReducer: CombinedSliceReducer<
  {
    todos: Todo[];
    currentTodo: Todo | null;
    filter: FilterState;
  },
  {
    todos: Todo[];
    currentTodo: Todo | null;
    filter: FilterState;
  }
> = combineSlices(todosSlice, currentTodoSlice, filterSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
