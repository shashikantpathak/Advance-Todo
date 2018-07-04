import React,{Component} from 'react'
// import Nav from '../Nav'

const styles = {
  left : {
    width: '250px',
    height: '150px',
    border: '1px solid #DCDCDC',
    float: 'left'
  },
  right : {
    width: '250px',
    height: '150px',
    border: '1px solid #DCDCDC',
    float: 'left',
    marginLeft: '40px'
  },
  droppable : {
    margin: '0 auto',
    width: '50%',
    marginTop: '80px'
  },
  para : {
    marginRight: '11px',
    border: '1px solid #DCDCDC',
    padding: '12px 16px',
    borderRadius: '50%',
    width: '15px',
    float : 'left'
  }
}

class DragDrop extends Component {
    constructor(props){
        super(props)
        this.state = {
          items : [
            { no : 1, text : "This is text 1" },
            { no : 2, text : "This is text 2" },
            { no : 3, text : "This is text 3" },
            { no : 4, text : "This is text 4" }
          ],
          rightContainer : [],
          leftContainer : []
        }
    }
    
    onDragStart = (e,v) =>{
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData( "text/json", v )
    }
    
    allowDrop = ev =>{
        ev.preventDefault();
    }
    
    onDropLeft = e =>{
        e.preventDefault();
        const data = e.dataTransfer.getData("text/json");
        let {items} = this.state;
        items.push(data);
        this.setState({ items });
    }
    
    onDropRight = e =>{
        e.preventDefault();
        const data = e.dataTransfer.getData("text/json");
        let {rightContainer} = this.state;
        rightContainer.push(data);
        this.setState({ rightContainer });
    }

    render() {
        const {items, leftContainer, rightContainer} = this.state;

        return(
          <div>
              {/* <Nav /> */}
              <div style={{ marginTop: '35px' }}>
                    Draggable texts : <br />
                    
                    <div style={{ display : 'inline-block' }}>
                      {
                        items.map((item) =>{
                          return <p style={styles.para} draggable="true" 
                           onDragStart={ (e) => this.onDragStart(e, item.text) } 
                           onDragOver={this.allowDrop} onDrop={this.onDropLeft}
                           
                           >{item.no}</p>
                        })
                      }
                    </div>

              </div>

              <div style={styles.droppable}>
                <div style={styles.left} onDragOver={this.allowDrop} onDrop={this.onDropLeft}>Left Container
                  {
                    leftContainer.map( itm =>{
                      return <p>{itm}</p>
                    })
                  }
                </div>
                <div style={styles.right} onDragOver={this.allowDrop} onDrop={this.onDropRight}>Right Container
                  {
                    rightContainer.map( itm =>{
                      return <p>{itm}</p>
                    })
                  }
                </div>
              </div>
          </div>
        )
    }

}

export default DragDrop;