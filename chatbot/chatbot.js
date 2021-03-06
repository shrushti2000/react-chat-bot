'use strict'
const dialogflow=require('dialogflow');
const structjson=require('./structjson')

const config=require('../config/keys');
const projectID = config.googleProjectID;
const credentials={
    client_email:config.googleClientEmail,
    private_key:config.googlePrivateKey
}
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
const sessionClient=new dialogflow.SessionsClient({projectID,credentials});
const sessionPath=sessionClient.sessionPath(config.googleProjectID,config.dialogFlowSessionID);

module.exports={
    textQuery:async function(text,userID,parameters={}){
        const sessionPath=sessionClient.sessionPath(projectID,sessionId + userID)
    let self=module.exports;
    const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: text,
            // The language used by the client (en-US)
            languageCode: config.dialogFlowSessionLanguageCode,
          },
        },
        queryParams:{
            payload:{
                data:parameters
            }
        }
    };
    let responses = await sessionClient.detectIntent(request);
    responses=await self.handleAction(responses) 
    return responses;
},

    eventQuery:async function(event,userID,parameters={}){
        let sessionPath=sessionClient.sessionPath(projectID,sessionId + userID)
   
        let self=module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
              event: {
                name:event,
                parameters:structjson.jsonToStructProto(parameters),
                //parameters: struct.encode(parameters),
                languageCode:config.dialogFlowSessionLanguageCode,
                
            },
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses=await self.handleAction(responses) 
        return responses;
   
},
handleAction:function(responses){
    return responses;
}
    
}