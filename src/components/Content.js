import React from "react";
import '../css/content.css';
import { Icon } from 'antd';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { Modal, Button, message} from 'antd';

const token = localStorage.getItem('token');
console.log(token)
class Content extends React.Component{
    constructor(props){
        super(props);
        this.state={
            inputvalue:'',
            inputname:'',
            fabulous:10,
            dataVal:[],
            commentVal:[],
            articleId:'',
        };
    }
    state = {
        likes: 0,
        dislikes: 0,
        action: null,
        visible: false,
      };
      like = () => {
        this.setState({
          likes: 1,
          dislikes: 0,
          action: 'liked',
        });
      };
    
      dislike = () => {
        this.setState({
          likes: 0,
          dislikes: 1,
          action: 'disliked',
        });
      };
     //设置inputValue
     handleInputChange=(e)=>{
        this.setState({
            inputvalue:e.target.value
        });
    }
    //留言者名字
    handleName =(e)=>{
      this.setState({
        inputname:e.target.value
    });
    }
   //设置textareaValue
    handleTextareaChange=(e)=>{
        this.setState({
            textareavalue:e.target.value
        })
    }
    addFabulous = ()=>{
        this.setState({fabulous:this.state.fabulous-0+1})
    }
    save = () => {
      var that = this;
      if(that.state.inputvalue){
        this.setState({visible: true,});
      }
      else{
        // message.info('评论内容不能为空')
        alert('评论内容不能为空')
      }
      
    };
    remove = (e)=>{
      var that = this;
      console.log(token)
      if(token == 'false'){
        alert('没有删除权限,点击管理登录')
      }
      else if(token == 'true'){
        console.log(that.state.commentVal[e.target.name]._id)
        axios.post('http://47.99.98.134:8030/remvoeComment',{id:that.state.commentVal[e.target.name]._id}).then(function(res){
          console.log(res)
          if(res.data.code == '1'){
            // message.info('成功删除'+ that.state.commentVal[e.target.name].name + '的评论');
            alert('成功删除该评论')
          }
        }).catch(function(err){
          console.log(err)
        })
      }
    }
    handleOk = e => {
      var that = this;
      console.log(e)
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
      var nowTime = year + "-" + month + "-" + day      
      console.log(nowTime)
      console.log(that.state.inputvalue)
      if(that.state.inputvalue){
        axios.post('http://47.99.98.134:8030/saveComment',{name:that.state.inputname,content:that.state.inputvalue,data:nowTime,article:that.state.articleId}).then(function(res){
        console.log(res)
        if(res.data.code == '1'){
          message.info('评论成功了哈!');
        }
        }).catch(function(err){
          console.log(err)
        })
      }
      this.setState({visible: false,});
    };
  
    handleCancel = e => {
      console.log(e)
      this.setState({
        visible: false,
      });
    };
    componentWillMount = ()=>{
      console.log(789)
      var that = this;
      axios.post('http://47.99.98.134:8030/findDynamic',{username:'15882004659'}).then(function(res){
        var index = (res.data.message.length)-1;
        if(res.data.code == '1'){
          that.state.dataVal.push((res.data.message)[index])
          that.setState({articleId:(res.data.message)[index]._id})
          axios.post('http://47.99.98.134:8030/findComment',{article:that.state.articleId}).then(function(res){
            console.log(res)
            if(res.data.code == '1'){
              that.setState({commentVal:res.data.message})
            }
          }).catch(function(err){
            console.log(err)
          })
        }
      }).catch(function(err){
        console.log(err)
      })
      // axios.post('http://47.99.98.134:8030/findComment',{article:that.state.articleId}).then(function(res){
      //   console.log(res)
      //   if(res.data.code == '1'){
      //     that.setState({commentVal:res.data.message})
      //   }
      // }).catch(function(err){
      //   console.log(err)
      // })
    }
    render(){
        const { likes, dislikes, action } = this.state;
        const actions = [
            <span>
              <Tooltip title="Like">
                <Icon
                  type="like"
                  theme={action === 'liked' ? 'filled' : 'outlined'}
                  onClick={this.like}
                />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
            </span>,
            <span>
              <Tooltip title="Dislike">
                <Icon
                  type="dislike"
                  theme={action == 'disliked' ? 'filled' : 'outlined'}
                  onClick={this.dislike}
                />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
            </span>,
            <span>Reply to</span>,
          ];
          let stuLi=this.state.dataVal.map((stu,i)=>{
            return <li key={i}>
                      <h5>标题：{stu.type}</h5>
                      <span>发布时间:{stu.data}</span>
                <textarea onChange={this.handleTextareaChange} disabled value={stu.simpleC} placeholder="文章主要内容"/>
                <div className="footer">
                    <div className="evaluate" onClick={this.addFabulous}>
                        <Icon type="heart" theme="twoTone" twoToneColor="red" style={{ fontSize: '24px', color: '#08c' }} />
                        <i>点赞数：{this.state.fabulous}</i>
                    </div>
                </div>
                        <p>评论区</p>
                        <input type="text" onChange={this.handleInputChange} name="" value={this.state.inputvalue} placeholder="您可以留下您想对博主说的话。。"/>
                        <Button type="primary" onClick={this.save}>保存</Button>
                        <div>
                          <Modal
                            title="取个名字"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                          >
                            <input type="text" onChange={this.handleName} name="" value={this.state.inputname} placeholder="留个名字吧。"/>
                          </Modal>
                        </div>
                    </li>
          });
          let comments=this.state.commentVal.map((com,j)=>{
            return <li key={j}>
                        <Comment
                            actions={actions}
                            author={com.name}
                            avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                            }
                            content={
                            <p>{com.content}</p>
                            }
                            datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{com.data}</span>
                            </Tooltip>
                            }
                        />
                        <Button type="danger" name={j} onClick={this.remove}>删除</Button>
                    </li>
          })
        return(
            <div className="article">
                <ul>{stuLi}</ul>
                <div className="comment">
                       <ul>{comments}</ul> 
                    </div>
                    <div className="sdsd">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        </div>
            </div>
        )
    }
}
export default Content;