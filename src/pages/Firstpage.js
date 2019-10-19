import React from 'react';
import '../css/firstpage.css';
import arro from '../images/arro.png';
import {Link} from 'react-router-dom';
class Firstpage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    fast(){
        console.log(111)
    };
    componentWillMount = ()=>{
        localStorage.setItem('token',false)
    }
    render(){
        return(
            <div className="firstmain">
                <div className="myname">
                    <p>Hermes</p> 
                    <span>This is my blog!!! </span>
                </div>
                <Link to="/homeTower"><div className="arrow" onClick={this.fast}><img src={arro} alt="logo" /></div></Link>
                <div className="container">
                    <div className="cube">
                        <div className="plane-front">学习使我快乐</div>
                        <div className="plane-back">帅气</div>
                        <div className="plane-left">阳光</div>
                        <div className="plane-right">文艺</div>
                        <div className="plane-top">睿智</div>
                        <div className="plane-bottom">专一</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Firstpage;