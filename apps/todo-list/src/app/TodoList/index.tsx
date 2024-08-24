import { useRef } from 'react';

import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ListRenderItemInfo,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useStoreContext } from '../../store/StoreContext';
import { RadioButton } from '../../components/RadioButton';

import styles from './styles';

export const TodoList = () => {
  const { addTask, completeTask, pendingTasks, removeTask, state } =
    useStoreContext();
  const flatListRef = useRef<FlatList>(null);

  const handleCreateNew = () => {
    Alert.prompt(
      'Add new task',
      undefined,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Ok',
          onPress: (text) => {
            if (text) {
              addTask({
                todo: text,
                state: 'pending',
              });

              flatListRef.current?.scrollToIndex({ index: 0 });
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const CreateTodo = () => (
    <TouchableOpacity style={styles.createTodo} onPress={handleCreateNew}>
      <Text style={styles.createTodoText}>Create new</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <View style={styles.item}>
      <RadioButton
        label={item.todo}
        checked={item.state === 'done'}
        onPress={() => {
          setTimeout(() => {
            completeTask(item.id);
          }, 750);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          removeTask(item.id);
        }}
      >
        <Text style={styles.itemDelete}>delete</Text>
      </TouchableOpacity>
    </View>
  );

  const Header = () => (
    <View>
      <Text style={styles.headerText}>Tasks</Text>
    </View>
  );

  const ListEmpty = () => (
    <View>
      <TouchableOpacity>
        <Text>
          You dont have any task <Text>click here</Text> to create you first
          task
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (!state.user) {
    return (
      <View style={styles.fallback}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <FlatList
        ref={flatListRef}
        ListHeaderComponent={<Header />}
        data={pendingTasks}
        keyExtractor={(item, i) => item.id || String(i)}
        renderItem={renderItem}
        style={styles.flatList}
        ListEmptyComponent={<ListEmpty />}
      />
      <CreateTodo />
    </>
  );
};
