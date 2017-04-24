import React from "react";
import Controler from "../components/controler";
import "./panel.css";

class Panel extends React.Component {
   render() {
   	  const {x} = this.props;
      return (
         <div className="panel-block">            
         	{ this.props.children }
         </div>
      )
   }
}

export default Panel;