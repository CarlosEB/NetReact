class Component1 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.count1}</div>
    }
}


class Component2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.count2}</div>
    }
}

const reduce1 = (state, action) => {

    if (state == undefined) state = 0;

    if (action.type == "Add1")
    {
        var newState = state;
        return newState =+ 1;
    }
    return state;
}

const reduce2 = (state, action) => {

    if (state == undefined) state = 0;

    if (action.type == "Add2")
    {
        var newState = state;
        return newState = +1;
    }
    return state;
}

const combined = Redux.combineReducers({
    reduce1,
    reduce2
})

var store = Redux.createStore(combined);


const mapStateToProps1 = (state) => {
    return { count1: reduce1(state, { type: 'VOID' }) }
}

const mapStateToProps2 = (state) => {
    return { count2: reduce2(state, { type: 'VOID' }) }
}

const Comp1Connect = ReactRedux.connect(mapStateToProps1)(Component1);

const Comp2Connect = ReactRedux.connect(mapStateToProps2)(Component2);


const App = () => (
  <div>
    <Comp1Connect />
    <br />
    <Comp2Connect />
  </div>
)

ReactDOM.render
    (
    <ReactRedux.Provider store={store}>
    <App />
    </ReactRedux.Provider>,
document.getElementById('content'))

