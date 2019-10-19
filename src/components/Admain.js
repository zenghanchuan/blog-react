import React from 'react';
import '../css/admain.css';
import { Button, message} from 'antd';
import axios from 'axios';

class Admain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        };
    }
    handleUsername =(e)=>{
        this.setState({username:e.target.value});
      }
      handlePassword =(e)=>{
        this.setState({password:e.target.value});
      }
      submit = ()=>{
          var that = this;
          console.log(this.state.username,this.state.password)
          if(that.state.username != ''){
                axios.post('http://118.24.116.33:8030/findUsers',{username:that.state.username}).then(function(res){
                console.log(res)
                if(res.data.code == '2'){
                    alert('该账号未注册')
                    that.setState({username:''});
                }
                else if(res.data.code == '1'){
                    if(res.data.message.password == that.state.password){
                        alert('登录成功')
                        localStorage.setItem('token',true)
                    }
                    else{
                        message.info('密码错误')
                    }
                }
            }).catch(function(err){
                console.log(err)
            })
            
          }
          
      }
    render(){
        return(
            <div className="admin">
                <div className="tourist">
                    <input type="text" onChange={this.handleUsername} value={this.state.username} maxLength={11} placeholder="账号"/>
                    <input type="password" onChange={this.handlePassword} value={this.state.password} placeholder="密码" maxLength={8}/>
                    <Button type="primary" onClick={this.submit}>确认</Button>
                </div>
            </div>
        )
    }
}
export default Admain;