import React from "react";
import '../css/mainHome.css';
import { Calendar } from 'antd';
import { Button, message} from 'antd';
import Content from '../components/Content';
import Lately from '../components/Lately';
import Admain from '../components/Admain';
import Contact from '../components/Contact';
import { Route,Link } from 'react-router-dom';
import axios from 'axios';


function onPanelChange(value, mode) {
    console.log(value, mode);
    };
const token = localStorage.getItem('token');
console.log(token)
class MainHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time:'正在刷新！！！',
            count:'10',
            val:'main',
            name:'',
            job:'',
            constellation:'',
            display:'',
        };
        var that = this;
        setInterval(function(){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var day = date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            //获取时间
            var hour = "00" + date.getHours();
            hour = hour.substr(hour.length - 2);
            var minute = "00" + date.getMinutes();
            minute = minute.substr(minute.length - 2);
            var second = "00" + date.getSeconds();
            second = second.substr(second.length - 2);
            //获取当前星期
            var week = date.getDay();
            switch (week) {
                case 1: week = "星期一 "; break;
                case 2: week = "星期二 "; break;
                case 3: week = "星期三 "; break;
                case 4: week = "星期四 "; break;
                case 5: week = "星期五 "; break;
                case 6: week = "星期六 "; break;
                case 0: week = "星期日 "; break;
                default: week = ""; break;
            }
            //输入的内容
            var newtime = year + "年" + month + "月" + day+"日"+" "+ week+ " " + hour+":"+minute+":"+second+" ";
            //  console.log(newtime)
             that.setState({time:newtime}) ;
        }, 1000);  //每1000毫秒更新一次
    }
    add = ()=>{
        this.setState({count:this.state.count-0+1})
    }
    changeRouter = (e)=>{
        // console.log(e.target.className)
        this.setState({val:e.target.className})
        // console.log(this.state.val)   
    }
    houtai = (e)=>{
        var that = this;
        console.log(e.target.className)
        if(e.target.className == 'postman'){
            if(token == 'false'){
                // e.target.style.display = 'none';
                // message.info('需超级管理员权限')
                that.setState({display:'#JavaScript'})
                alert('需超级管理员权限')
                return;
            }
            else if(token == 'true'){
                that.setState({display:'http://47.99.98.134:8030'})
            }
        }
    }
    componentWillMount=()=>{
    console.log(666)
    var that = this;
    axios.post('http://47.99.98.134:8030/findUsers',{username:'15882004659'}).then(function(res){
        console.log(res.data.message)
        if(res.data.code == '1'){
            that.setState({name:res.data.message.name,job:res.data.message.job,constellation:res.data.message.constellation})
        }
    }).catch(function(error){
        console.log(error)
    })
};

    render(){
        return(
            <div className="mainhome">
                <div className="stars"></div>
                <div className="header">
                    <h3>同人博客</h3>
                    <div className="nave">
                        <div className="left">
                            <ul onClick={(e)=>{this.changeRouter(e)}}>
                                <Link to={'/homeTower/main'}><li className="main">首页</li></Link>
                                <Link to={'/homeTower/lately'}><li className="lately">所有动态</li></Link>
                                <Link to={'/homeTower/contact'}><li className="contact">联系</li></Link>
                                <Link to={'/homeTower/admain'}><li className="admain">管理</li></Link>
                            </ul>
                        </div>
                        <div className="right">
                            <ul onClick={this.houtai}>
                                <li>随笔-0</li>
                                <li>文章-1</li>
                                {/* <Link to={'/homeTower/login'}><li>管理员</li></Link> */}
                                <a href={this.state.display}><li className="postman">管理员</li></a>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="leftSide">
                    <div className="top">
                        <h5>韩川</h5>
                        <div style={{ width: 300, border: '1px solid black', borderRadius: 4,margin: "3% 0 0 2%",background:'#9999' }}>
                            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                        </div>
                        <ul>
                            <li>昵称：{this.state.name}</li>
                            <li>职业：{this.state.job}</li>
                            <li>星座：{this.state.constellation}</li>
                            <li>关注：{this.state.count}</li>
                            <li><Button type="primary" onClick={this.add}>+关注</Button></li>
                        </ul>
                    </div>
                    <span>当前时间:{this.state.time}</span>
                </div>
                <div className='contents'>
                    <Route exact path='/homeTower/main' component={Content}/>  
                    <Route exact path='/homeTower/lately' component={Lately}/>  
                    <Route exact path='/homeTower/contact' component={Contact}/>    
                    <Route exact path='/homeTower/admain' component={Admain}/> 
                </div>
            </div>
        )
    }
}
export default MainHome;