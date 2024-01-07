import { LightningElement ,track,wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getChatMessages from '@salesforce/apex/ChatController.getChatMessages';
import saveChatMessage from '@salesforce/apex/ChatController.saveChatMessage';
import getProfileRecord from '@salesforce/apex/ProfileController.getProfileRecord';
import getDoctorProfileRecord from '@salesforce/apex/ProfileController.getDoctorProfileRecord';


import { refreshApex } from '@salesforce/apex';
export default class ChatComponent extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @track message = '';
    @track myName = ''; 
    rec='';
    pet='';
    dog='';
    @track loggedInUserCookie = this.getCookie('loggedInUser'); // Sender's ID
    @track OtherChatName ='' ;
    @track chatMessages=[];
    @track wiredchatMessages;
    @track subscription = null; 
    intervalId
    connectedCallback() {
        this.OtherChatName = this.pageRef.state.Name;
          console.log('userName: ' + this.userName);
          this.getCurrentUserName();
          this.intervalId = setInterval(() => {
  
              refreshApex(this.wiredchatMessages);
              this.scrollToBottom();
  
          }, 1000);
           
       }
       handleMessageChange(event) {
        this.message = event.target.value;
    }

    getCurrentUserName() {
         getProfileRecord({ username: this.loggedInUserCookie }) // Use 'this' to reference class properties
            .then(result => {
                this.pet = result;
                this.setRec();
            console.log('userName: ' + this.myName)
            })
            .catch(error => {
                console.error(error);
            });    

            getDoctorProfileRecord({ username: this.loggedInUserCookie }) // Use 'this' to reference class properties
            .then(result => {
                this.doc = result;
                this.setRec();
            console.log('userName: ' + this.myName)
            })
            .catch(error => {
                console.error(error);
            });    

          
    }

    setRec(){
        if(this.pet==''){
          this.rec=this.doc;
          this.myName=this.rec.Name
        }
        else{
          this.rec=this.pet;
          this.myName=this.rec.Name
        }
      }
 
send(){
    this.handleSend();
}
    async handleSend() {
         
        await saveChatMessage({ 
        message: this.message, 
        senderId: this.myName, 
        receiverId: this.OtherChatName  // Use the passed parameter
    }).then(result => {
        console.log('Message sent successfully');
        this.message = '' ;
    }).catch(error => {
        console.error('Error sending message', error);
    });

  
 
}




@wire(getChatMessages,{ otheruserName: '$OtherChatName', myuserName: '$myName' })
wiredChatMessages(result) {
    this.wiredchatMessages = result;
  if (result.data) {
   
      this.chatMessages =  this.process(result.data);
      this.error=undefined;
      this.scrollToBottom();
  } else if (result.error) {
      console.error('Error fetching user:', result.error);
      this.chatMessages = null;
  }
}

process(messages){
    console.log('Inside Process Function');
    return messages.map(msg => {
        return{
            ... msg,
            messageClass : msg.Sender__c == this.myName? 'sender-message' : 'receiver-message'
        }
    })
   }

   scrollToBottom() {
    // Scroll to the bottom of the chat container
    const chatContainer = this.template.querySelector('.container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

getCookie(name) {
const value = `; ${document.cookie}`;
const parts = value.split(`; ${name}=`);
if (parts.length === 2) return parts.pop().split(';').shift();
}

  
}
