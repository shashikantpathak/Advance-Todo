import React, { Component } from 'react';


export default class DisplayItem extends Component {

    constructor() {
        super();
        this.state = {
            editing: false,
            alert: null
        };
    }
 
    componentDidMount() {
        this.setState({
            changedText: this.props.todo.title
        });
    }

    handleEditing(event) {
        this.setState({
            editing: true,
            changedText: this.props.todo.title
        });
    }
// to let edit the input set the keyCoded to 13
    handleEditingDone(event) {
        if (event.keyCode === 13) {
            this.setState({
                editing: false
            });
           
        }
    }
// edit the todo method
    handleEditingChange(event) {
        var _changedText = event.target.value;
        this.setState({
            changedText: _changedText
        });
        localStorage.setItem("changedText", JSON.stringify(_changedText));
    }

    render() {
        var changedText = this.state.changedText;
        var todo = this.props.todo;
        var viewStyle = {};
        var editStyle = {};
//         define styling on click event for editing 
        if (this.state.editing) {
            viewStyle.display = 'none';
            editStyle.paddingLeft='240px';
        } else {
            editStyle.display = 'none';
        }

        return (
            <li className={todo.done ? 'done' : ''}>
                <li className="change">
                    <div className="style" style={viewStyle} onDoubleClick={this.handleEditing.bind(this)}>
                        <div >
                            <input className="checkbox"
                                type="checkbox" style={{
                                    fontSize: 'x-large'
                                }}
                                checked={todo.done}
                                onChange={this.props.handleDone.bind(null, todo.id)} />
//                                     display all the todo here
                            <label className="todoItems">{changedText}</label>
                        </div>
                        <a className="delete" href='a' onClick={this.props.handleDelete.bind(null, todo.id)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                        </a>

                

                    </div>
// invoke the input for editing todo on double click
                    <input type="text" className="displayitem"
                        onKeyDown={this.handleEditingDone.bind(this)}
                        onChange={this.handleEditingChange.bind(this)}
                        style={editStyle}
                        value={this.state.changedText} />
                </li>
            </li>
        )
    }

}
