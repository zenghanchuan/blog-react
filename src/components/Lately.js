import React from 'react';
import '../css/lately.css';
import { Modal } from 'antd';
import axios from 'axios';

class Lately extends React.Component{
    constructor(props){
        super(props);
        this.state={
            textareavalue:'假如我年少有为不自卑',
            latelyVal:[],
            indexVal:'',
        };
    }
    state = { visible: false };
    changeRouter = (e)=>{
        var that = this;
        console.log(e.target)
        if(e.target.parentNode.nodeName === 'LI' || e.target.nodeName === 'LI'){
            if(e.target.nodeName == 'SPAN' || e.target.nodeName == 'H6' || e.target.nodeName=='P'){
                console.log(e.target.parentNode.tabIndex)
                that.setState({indexVal:that.state.latelyVal[e.target.parentNode.tabIndex].simpleC})
            }
            else if(e.target.nodeName == 'LI'){
                console.log(e.target.tabIndex)
                that.setState({indexVal:that.state.latelyVal[e.target.tabIndex].simpleC})
            }
        }
        this.setState({
            visible: true,
          });
    }
    // showModal = () => {
    //     this.setState({
    //       visible: true,
    //     });
    //   };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      componentWillMount =()=>{
        var that = this;
      axios.post('http://47.99.98.134:8030/findDynamic',{username:'15882004659'}).then(function(res){
        console.log(res)
        if(res.data.code == '1'){
          that.setState({latelyVal:res.data.message})
        }
      }).catch(function(err){
        console.log(err)
      })
      }
    render(){
        let lately=this.state.latelyVal.map((lat,i)=>{
            return <li key={i} tabIndex={i}>
                            <h6>标题：{lat.type}</h6>
                            <p>{lat.simpleC}</p>
                            <span>{lat.data}</span>
                    </li>
          });
        return(
            <div className="allArticle">
                <div className="articleList">
                    <ul onClick={(e)=>{this.changeRouter(e)}}>{lately}</ul>
                    <Modal
                        title="文章详情"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                        <textarea value={this.state.indexVal} disabled></textarea>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default Lately;