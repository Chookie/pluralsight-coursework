var Card = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var that = this;
    $.get('https://api.github.com/users/' + this.props.login, function(data) {
      that.setState(data);
    });
  },
  render: function() {
    return (
      <div>
        <img src={this.state.avatar_url} width="80"/>
        <h3>{this.state.name}</h3>
        <hr/>
      </div>
    )
  }
});

var Form = React.createClass( {
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = this.refs.login;
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function() {
    return (
      // ref is react attribute to allow getting element from the dom
      // to read and write values from it.
      <form onSubmit={this.handleSubmit}>
        <input placeholder='github login' ref='login'/>
        <button>Add</button>
      </form>
    );
  }
});

// Define a component:
var Main = React.createClass({
  getInitialState: function() {
    return {logins: []};
  },
  addCard: function(loginToAdd) {
    this.setState({logins: this.state.logins.concat(loginToAdd)});
  },
  render: function() {
    var cards = this.state.logins.map( function(login) {
      return (<Card login={login} />);
    });
    return (
      <div>
        <Form addCard={this.addCard} />
        {cards}
      </div>
    );
  }
});

// Render a component to the browser:
ReactDOM.render(
  <Main />, // What to render (an instance of the Main component)
  document.getElementById('container') // Where to render it
);

// If nothing appears in the browser, check the dev-tools console for errors.
