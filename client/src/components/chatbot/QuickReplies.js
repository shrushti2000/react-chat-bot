import React ,{Component} from 'react';
import QuickReply from './QuickReply'
class QuickReplies extends Component{
    constructor(props){
        super(props);
        this._handleClick=this._handleClick(this);
    
    }
    _handleClick(event,payload,text){
        this.props.replyClick(event,payload,text)
    }
    renderQuickReply(reply,i){
        return <QuickReply key={i} click={this._handleClick} reply={reply}></QuickReply>
    }
    renderQuickReplies(QuickReplies){
        if(QuickReplies){
            return QuickReplies.map((reply,i)=>{
                return this.renderQuickReplies(reply,i);
            })
        }else{
            return null;
        }
    }
    render(){
        return (
            <div className="col s12 m8 offset 16 offset-13">
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div className="row valign-wrapper">
                    <div className="col s2">
                <a class="btn-floating btn-large waves-effect waves-light red">{this.props.speaks}</a>
  
                </div>
                <div id="quick-replies" className="col s10">
                    {this.props.text && <p>
                        {this.props.text.stringValue}</p>}
                        {this.renderQuickReplies(this.props.payload)}
                </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default QuickReplies;