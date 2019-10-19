import React from 'react';
import '../css/contact.css';
import autherWx from '../images/autherWx.png';

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <div className="contactAuther">
                <img src={autherWx} alt=""/>
                <div className="foot"></div>
            </div>
        )
    }
}
export default Contact;