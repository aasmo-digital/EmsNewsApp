import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import Route from './src/navigation';
import {Store} from './src/services/redux/store';
// import {InternetCheck} from './src/components/componentsIndex';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead',
]);
LogBox.ignoreAllLogs();
let persistor = persistStore(Store);

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <Route />
          {/* <InternetCheck /> */}
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};
export default App;
