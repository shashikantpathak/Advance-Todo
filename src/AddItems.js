import React, { Component } from 'react';
import DisplayList from './DisplayList';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel);
var rand=require('random-key');
export default class AddList extends Component{
  

  constructor () {
    super();
    this.state = { title: '',
     todos:
      [
        {title:'eggs', done:false, id:1},
        {title:'banana', done:false, id:2},
        {title:'bread', done:false, id:3}
      ] };
  }

  //key=localstorageitem name
  //value we want to save for the localstorage key
  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });

    localStorage.setItem(key, value);
  }

  handleDone(idToBeMarkedAsDone){
  var _todos=this.state.todos;
  var todo=_todos.filter((todo)=>{
    return todo.id===idToBeMarkedAsDone;
  })[0];
  todo.done=!todo.done;
  this.setState({
    todo:_todos
  });
  }

  handleDelete (idToBeDeleted) {
    var newTodos = this.state.todos.filter( (todo) => {
      return todo.id !== idToBeDeleted;
    } )
    alert("Are you sure want to delete");
    this.setState({ todos: newTodos });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  handleSubmit (event) {
    event.preventDefault();
    var title = this.state.title;
    var newTodos = this.state.todos.concat(
      {title:title,
        id:rand.generate(),
        done:false});

    this.setState({ title: '', todos: newTodos });
    localStorage.setItem('todos', JSON.stringify(newTodos));
    localStorage.setItem("title","");
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
 }

  handleChange (event) {
    var title = event.target.value;
 
    this.setState({ title: title });
  }

  handleClearCompleted(event){
    var newTodos=this.state.todos.filter((todo)=>{
      return !todo.done;
    });
    alert("are you sure want to delete");
    this.setState({
todos:newTodos
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  render () {
    return ( 
      <React.Fragment>
      <CssBaseline />
<AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit" alignitems= 'center'>
                    Take a Note of Your Routine Work
                </Typography>
            </Toolbar>
        </AppBar>
                 <div className="all">      
                   <div>      
              
              <div className="todo"> TODO-HOMEWORK </div>
                <button onClick={this.selectAll.bind(this)} onDoubleClick={this.deselectAll.bind(this)}>SelectALL </button>
                <form className="form" onSubmit={this.handleSubmit.bind(this)}>
              <div className="test">
                <input className="values" onChange={this.handleChange.bind(this)} value={this.state.title} />
               <button className="addtask" disabled={!this.state.title}>	
               Add Button
               </button>
               </div>
              <DisplayList className="displayList"
              handleDone={this.handleDone.bind(this)}
                handleDelete={this.handleDelete.bind(this)}
                todos={this.state.todos}  />
                </form>
                <footer className="footer">
                <div className="two">
                <div> 
                All:({this.state.todos.length})
               
                </div> |<div>
              Completed:({this.state.todos.filter((todo)=>
                {
                    return todo.done
                }).length})</div>
               |
               <div> Pending:({this.state.todos.filter((todo)=>
                {
                    return !todo.done
                }).length})</div>
               |
               </div>
                <button className="completed" onClick={this.handleClearCompleted.bind(this)}>Clear Completed</button>
               
                </footer>
                </div>
                </div>
</React.Fragment>

)
  }
  selectAll() {
      var final = this.state.todos;
      final.map(function (item) {
       return item.done = true;
  
      })
  
      this.setState({
        todos: final
      })
  
    }
    deselectAll(){
      var final1 = this.state.todos;
      final1.map(function (item) {
       return item.done = false;
  
      })
      this.setState({
        todos:final1
      })
    }

    
}