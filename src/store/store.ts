import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

// Hostel reducers
// @ts-ignore
import authReducer from '../modules/hostel/redux/auth/authSlice';
// @ts-ignore
import studentReducer from '../modules/hostel/redux/student/studentSlice';
// @ts-ignore
import parentReducer from '../modules/hostel/redux/parent/parentSlice';
// @ts-ignore
import mealReducer from '../modules/hostel/redux/meal/mealSlice';
// @ts-ignore
import complaintReducer from '../modules/hostel/redux/complaint/complaintSlice';
// @ts-ignore
import healthReducer from '../modules/hostel/redux/health/healthSlice';
// @ts-ignore
import behaviourReducer from '../modules/hostel/redux/behaviour/behaviourSlice';
// @ts-ignore
import notificationReducer from '../modules/hostel/redux/notification/notificationSlice';
// @ts-ignore
import dashboardReducer from '../modules/hostel/redux/dashboard/dashboardSlice';

const customStorage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const hostelReducers = combineReducers({
  meals: mealReducer,
  complaints: complaintReducer,
  health: healthReducer,
  behaviour: behaviourReducer,
  dashboard: dashboardReducer,
});

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  parent: parentReducer,
  meal: mealReducer,
  complaint: complaintReducer,
  health: healthReducer,
  behaviour: behaviourReducer,
  notification: notificationReducer,
  dashboard: dashboardReducer,
  hostel: hostelReducers,
});

const persistConfig = {
  key: 't360_global_root',
  storage: customStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
