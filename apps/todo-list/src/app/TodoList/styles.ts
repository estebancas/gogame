import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        paddingHorizontal: 16,
        marginTop: 24,
        paddingBottom: 24,
        height: '90%',
    },
    item: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 18,
    },
    itemDelete: {
        color: '#63000A',
        fontSize: 16,
    },
    header: {

    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    createTodo: {
        padding: 16,
        backgroundColor: '#EDEDED',
    },
    createTodoText: {
        fontSize: 16,
        fontWeight: '600',
    }
})

export default styles;
