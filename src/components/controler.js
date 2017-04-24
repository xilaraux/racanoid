import React from "react";
import "./users.css";

class Controler extends React.Component {
   render() {
   		const shift = {left: this.props.shift + "px"};

      return (
         <div className="user-block" style={shift} >
         </div>
      )
   }
}


export default Controler;