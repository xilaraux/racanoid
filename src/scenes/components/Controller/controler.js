import React from "react";
import "./users.css";

class Controller extends React.Component {
   render() {
   		const shift = {transform: `translateX(${this.props.shift}px`};

      return (
         <div id="paddle" className="user-block" style={shift} >
         </div>
      )
   }
}


export default Controller;