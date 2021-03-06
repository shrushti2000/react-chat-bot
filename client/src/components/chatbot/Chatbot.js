import React,{Component} from 'react'
import Message from './Message';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';
import Card from './Card';
import QuickReplies from './QuickReplies';
const cookies=new Cookies();
class Chatbot extends Component{
    messagesEnd;
    constructor(props){
       
        super(props);
        this._handleInputKeyPress=this._handleInputKeyPress.bind(this);
       this._handleQuickReplyPayload=this._handleQuickReplyPayload.bind(this);
        this.state={
            messages:[]
        }
        if(cookies.get('userID')===undefined){
        cookies.set('userID',uuid(),{path:'/'});
        }
        console.log(cookies.get('userID'));
    }
    async df_text_query(text){
        let says={
            speaks:'me',
            msg:{
                text:{
                    text:text
                }
            }
        }
        this.setState({messages:[...this.state.messages,says]})
        const res=await axios.post('/api/df_text_query',{text,userID:cookies.get('userID')})
        for(let msg of  res.data.fulfillmentMessages){
          console.log(JSON.stringify(msg));
            let  says={
                speaks:'bot',
                msg:msg
            }
            this.setState({messages:[...this.state.messages,says]})
        }
    }
    async df_event_query(event){
        const res=await axios.post('/api/df_event_query',{event,userID:cookies.get('userID')})
        for(let msg of  res.data.fulfillmentMessages){
           let  says={
                speaks:'bot',
                msg:msg
            }
            this.setState({messages:[...this.state.messages,says]})
        } 
    }
     componentDidMount(){
        this.df_event_query('Welcome');
    }
    componentDidUpdate(){
        this.messagesEnd.scrollIntoView({behaviour:"smooth"})
        //this.talkInput.focus();
    }
    _handleQuickReplyPayload(event,payload,text){
        event.preventDefault();
        event.stopPropogation()
        this.df_text_query(text);
    }

    renderCards(cards){
        return cards.map((card,i)=><Card key={i} payload={card.structValue}/>)
    }
    renderOneMessage(message,i){
        if(message.msg && message.msg.text && message.msg.text.text ){
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>
        }else if(message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards){
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow:"hidden"}}>
                    <div className="col s2">
                <a class="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
  
                </div>
                <div style={{overflow:'auto', overflow:'scroll'}}>
                    <div style={{height:300,width:message.msg.payload.fields.cards.listValue.values.length * 270 }}>
                        {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                    </div>

                </div>
                    </div>
                </div>
            </div>
        }else if(
            message.msg && 
            message.msg.payload &&
            message.msg.payload.fields &&
            message.msg.payload.fields.quick_replies
        ){
            return <QuickReplies 
            text={message.msg.payload.fields.text ? message.msg.payload.fields.text:null}
            key={i}
            replyClick={this._handleQuickReplyPayload}
            speaks={message.speaks}
            payload={message.msg.payload.fields.quick_replies.listValue.values}
            ></QuickReplies>
        }
    }
    renderMessages(stateMessages){
        if(stateMessages){
            return stateMessages.map((message,i)=>{
              return this.renderOneMessage(message,i);
             })
        }else{
            return null;
        }
    }
    _handleInputKeyPress(e){
        if(e.key==='Enter'){
            this.df_text_query(e.target.value);
            e.target.value='';
        }
    }
    render(){
        return(
            <div style={{height:400,width:400,position:'absolute',bottom:0,right:0, float:'right', border:"1px solid red"}}>
            <nav>
                <div className="nav-wrapper">
                    <a className="brand-logo">ChatBot</a>
                </div>
            </nav>
            <div id="chatbot" style={{height:'100%',width:'100%' ,overflow:'auto'}}>
                <h2>Chatbot</h2>
                {this.renderMessages(this.state.messages)}
              <div ref={(el)=>{this.messagesEnd = el;}} style={{float:'left',clear:"both"}}></div>
             </div>
              <div className="col s2">
                <input style={{margin:0,paddingLeft:'1%' ,paddingRight:'1%' ,width:'98%'}} type="text" placeholder="type a message" onKeyPress={this._handleInputKeyPress}/>
            </div>
           </div>
           )
    }
    
}
export default Chatbot;