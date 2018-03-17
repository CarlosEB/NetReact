class Index extends React.Component {

    constructor() {
        super();
        this.state = { filtered: null, clients:[]};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(text, gender) {
        this.setState({
            filtered: this.state.clients.filter(
                (item) => {
                    return (item.name.last.toUpperCase().indexOf(text) != -1 ||
                            item.name.first.toUpperCase().indexOf(text) != -1) &&
                            (gender == 'ALL' ? true : item.gender.toUpperCase() == gender)
                })
        });
    }

    ajax_call() {
        $.get('https://api.randomuser.me/?results=50&nat=us', data => {
            var result = data.results.sort((a, b) => { return a.name.last.localeCompare(b.name.last); });
            this.setState({ filtered: null, clients: result });
        });
    }

    componentDidMount() { this.ajax_call(); }

    
    shouldComponentUpdate (nextProps, nextState) {
        console.log('Should update.')
        return true;
    }

    render() {
        
        return (
        <div>            
            <SearchName handleChange={this.handleChange} enabled={this.state.clients.length == 0}/>
            <Notice {...this.state} />
            <ClientList {...this.state} />
            <ModalUser />
        </div>);
    }
}

const Notice = (props) => {
   
    var showing = () => { return props.clients.length == 0 ? "Loading..." : `Showing ${props.filtered == null ? props.clients.length : props.filtered.length} of ${props.clients.length}` };
    
    return (
        <div className="row">
            <div className="col-md-12">{showing()}</div> 
            <hr /> 
        </div>)
}

class SearchName extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(this.refs.textSearh.value.toUpperCase(), this.refs.selectSearh.value.toUpperCase());
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <label>Search by Name:</label>
                    <input type="text" disabled={this.props.enabled} className="form-control" onChange={this.handleChange} ref="textSearh" maxLength="10" />
                </div>
                <div className="col-md-4">
                    <label>Gender:</label>
                    <select className="form-control" onChange={this.handleChange} disabled={this.props.enabled} ref="selectSearh">
                        <option>All</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="clearfix" />
                <hr />
            </div>            
            );
    }
}

class ClientList extends React.Component {
    constructor() {
        super();  
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log('ClientList - Should update.')
        return true;
    }

    handleClick(id) {

        var user = this.props.clients.filter( item => { return (item.id.value == id) })[0];
        $('#modalUser .modal-title').html((`${user.name.last}, ${user.name.first}`).toUpperCase())
        $('#modalUser .modal-body > p').html(ModalInfo(user))
        $('#modalUser').modal('show');
    }

    render() {
        
        let {filtered, clients} = this.props;
        
        var Clients = (filtered == null ? clients : filtered).map((result) => {
            return ContactInfo(result, this.handleClick);
        });

        return ( <div className="row">{Clients}</div> );
    }
}

const ContactInfo = (result, handleClick) => {
    var getAge = (dateString) => {
        return Math.abs(new Date(Date.now() - new Date(dateString).getTime()).getUTCFullYear() - 1970);
    };

    return (
    <div key={result.id.value} className="col-md-4">
        <div onClick={() => handleClick(result.id.value)} className={result.gender == 'male' ? 'client-container client-male' : 'client-container client-female'}>
            <div className="client-picture"><img src={result.picture.thumbnail} /></div>
            <div className="client-name">{result.name.last}, {result.name.first}</div>
            <div className="client-age"> { getAge(result.dob)}</div>
            <div className="client-city">{result.location.city}</div>
            <div className="client-address">{result.location.street}, {result.location.state}</div>
        </div>
    </div> );
}

const ModalInfo = (user) => {
    return `<div class='modal-info'><img src="${user.picture.large}" /><br />City: ${user.location.city}<br />Address: ${user.location.street}<br />email: ${user.email}<br/>Phone: ${user.phone}</div>`;
}

const ModalUser = () => 
    <div className="modal fade" id="modalUser" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">...</h4>
          </div>
          <div className="modal-body">
            <p>...</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>      
      </div>
    </div>

ReactDOM.render(<Index />, document.getElementById('container'));