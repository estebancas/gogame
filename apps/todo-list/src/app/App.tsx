import React from 'react';
import { SafeAreaView } from 'react-native';
import { StoreProvider } from '../store/StoreContext';
import { TodoList } from './TodoList';

export const App = () => {
  return (
    <StoreProvider>
      <SafeAreaView />
      <TodoList />
      <SafeAreaView style={{ backgroundColor: '#EDEDED' }} />
    </StoreProvider>
  );
};

export default App;
