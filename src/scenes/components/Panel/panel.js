import "./panel.css";
import React from "react";

class Panel extends React.Component {
   render() {
      return (
         <div className="panel-block">            
         	{ this.props.children }
         </div>
      )
   }
}

export default Panel;