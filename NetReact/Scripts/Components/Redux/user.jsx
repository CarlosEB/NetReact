const userAction = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                id: action.user.id,
                name: action.user.name
            }

        default:
            return state
    }
}

const users = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
            return [userAction(undefined, action), ...state];

        default:
            return state;
    }
}


const usersFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}


const getUsers = (usersList = [], filter) => {    
    switch (filter) {
        case undefined:
        case 'SHOW_ALL':
            return usersList;
    }
}

class User extends React.Component {
    constructor() {
        super();
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log('User - Should update.')
        return true;
    }

    render() {
        var result = this.props.usersProps.users.length == 0 ? "Nothing to Show" :
            this.props.usersProps.users.map((item) => {
                return <div key={item.id}>
                    {item.name}
                </div>
            });
        return (
            <div>{result}</div>
        );
    }
}

const combined = Redux.combineReducers({
    users,
    usersFilter
})

var store = Redux.createStore(combined);

const mapStateToProps = (state) => {
    return { usersProps: getUsers(state, state.action) }
}

const UserConnect = ReactRedux.connect(mapStateToProps)(User);

const App = () => (
  <div>
    <UserConnect />
  </div>
)

ReactDOM.render
    (
    <ReactRedux.Provider store={store}>
    <App />
    </ReactRedux.Provider>,
    document.getElementById('content'))
