import React, { Component } from 'react';
import DisplayItem from './DisplayItem';
import Dragula from 'react-dragula';

export default class DisplayList extends Component {

    render () {
        return  <ul ref={this.dragulaDecorator} >
                  { this.props.todos.map((todo, i) => {
                      return  (  <DisplayItem
                      key={todo.id}
                      handleDelete={this.props.handleDelete.bind(null,todo.id)}
                      handleDone={this.props.handleDone}
                      todo={todo}/>

                      )
                   
                  }) }
                </ul>
      }

      dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
          let options = { };
          Dragula([componentBackingInstance], options);
        }
      };
    
    }

// DisplayList.protoTypes={

//     todos:React.PropTypes.array.isRequired,
//     handleDone:React.PropTypes.func.isRequired,
//     handleDelete:React.PropTypes.func.isRequired

// }
