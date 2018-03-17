const initState = {
    users: [],
    widgets: []
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return Object.assign({}, state, {
                users: [action.user, ...state.users] })

        case 'ADD_WIDGET':
            return Object.assign({}, state, {
                widgets: [action.widget, ...state.widgets] })

        default:
            return state;
    }
}

class User extends React.Component {
    constructor() {
        super();
        this.addUser = this.addUser.bind(this)
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log('User - Should update.')
        return true;
    }

    addUser(e) {         
        this.props.addUser(this.refs.txName.value)
        this.refs.txName.value = "";
    }

    render() {
        var result = this.props.userList.length == 0 ? "Nothing to Show" :
            this.props.userList.map((item) => {
                return <div key={item.id}>{item.name}
                </div>
            });
        return (
            <div>
                <div>{result}</div>
                <div>
                    <input type="text" ref='txName' />
                    <input type="button" value="add" onClick={this.addUser} />
                </div>
            </div>
        );
    }
}

class Widget extends React.Component {
    constructor() {
        super();
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log('Widget - Should update.')
        return true;
    }

    render() {
        var result = this.props.widgetList.length == 0 ? "Nothing to Show" :
            this.props.widgetList.map((item) => {
                return <div key={item.id}>{item.name}
                </div>
            });
        return (
           <div>{result}</div>
        );
    }
}

var store = Redux.createStore(reducer);

const mapStateToPropsU = (state) => {
    return { userList: state.users }
}

const mapDispatchToPropsU = (dispatch) => {
    return {
        addUser: (name) => {
            var id = store.getState().users.length+1
            dispatch({user: {id:id, name: name}, type: 'ADD_USER' })
        }
    };
}

const mapStateToPropsW = (state) => {
    return { widgetList: state.widgets }
}

const UserConnect = ReactRedux.connect(mapStateToPropsU, mapDispatchToPropsU)(User);

const WidgetConnect = ReactRedux.connect(mapStateToPropsW)(Widget);

const App = () => (
  <div>
    <UserConnect />
    <hr />
    <WidgetConnect />
  </div>
)

ReactDOM.render(
    <ReactRedux.Provider store={store}>
    <App />
    </ReactRedux.Provider>,
    document.getElementById('container'))
