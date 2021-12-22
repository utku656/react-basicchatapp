import axios from 'axios';

const token = 'Bearer k3DqhmyEmsLKbswJOLe6UylQ9R5X2SES';
const BASE_URL ='https://assignment.bunq.com/api'
const getUsersFromServer = () => 
  axios.get(BASE_URL+'/user', {
      headers: {
        'Authorization': token,
        'Accept': 'application/json'
      }
    });
const getUserById = (userId) => 
  axios.get(BASE_URL+'/user/'+userId, {
      headers: {
        'Authorization': token,
        'Accept': 'application/json'
      }
    });
const createOneToOneConversation = (id,userIds) => 
  axios.post(BASE_URL+'/user/'+id+'/conversation',userIds, {
      headers: {
        'Authorization': token,
        'Accept': 'application/json'
      }
    });
const createOneToManyConversation = (id,userIds,name) => 
  axios.post(BASE_URL+'/user/'+id+'/conversation', {
      headers: {
        'Authorization': token,
        'Accept': 'application/json'
      },body:{
          "user_ids": userIds,
          "name": name
      }
    });
const getConversationList = (id) => 
  axios.get(BASE_URL+'/user/'+id+'/conversation', {
      headers: {
        'Authorization': token,
        'Accept': 'application/json'
      }
    });
const getConversationRead = (firstId,conversationId) => 
  axios.get(BASE_URL+'/user/'+firstId+'/conversation/'+conversationId, {
      headers: {
        'Authorization': token,
        'Accept': 'application/json'
      }
    });
const createMessage = (firstId,conversationId,message) => 
  axios.post(BASE_URL+'/user/' +firstId+'/conversation/'+conversationId+'/message',message ,{
      headers: {
        'Authorization': token,
        'Accept': 'application/json'
      }
    });
const getMessageListing = (firstId,conversationId) => 
  axios.get(BASE_URL+'/user/' +firstId+'/conversation/'+conversationId+'/message', {
      headers: {
        'Authorization': token,
        'Accept': 'application/json'
      }
    });
  export{
      getUsersFromServer,
      getUserById,
      createOneToOneConversation,
      createOneToManyConversation,
      getConversationList,
      getConversationRead,
      createMessage,
      getMessageListing
    };