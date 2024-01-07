import { LightningElement,track,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAllChats from '@salesforce/apex/ProfileController.getAllChats';
export default class AllChatsPage extends NavigationMixin(LightningElement) {
    @track users;
    @track error;
    @track loggedInUserCookie = this.getCookie('loggedInUser'); //getting the cookie stored in our browser
    @track selection='Doctor';
    @wire(getAllChats,{username :'$loggedInUserCookie',selection :'$selection'})
    wiredAllProfiles({ error, data }) {
    if (data) {
    this.users = data;
    this.error = undefined;
    } else if (error) {
    this.error = error;
    this.users = undefined;
    }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        
    }

    openprofile(event){
        const Name = event.currentTarget.dataset.userName; // IMP -  add data-feed-id attribute to our card

        
        this[NavigationMixin.Navigate]({
          type: 'standard__webPage',
          attributes: {
            url: '/individualchat?Name=' + Name
          }
        });
      
    }


    b1(){
      this.selection ='Doctor';
      const myDiv1 = this.template.querySelector('.button1');
      myDiv1.style.backgroundColor = 'lightblue';
      const myDiv2= this.template.querySelector('.button2');
      myDiv2.style.backgroundColor = 'white';
      
     
  }
  
  b2(){
      this.selection = 'Pet';
      const myDiv1 = this.template.querySelector('.button1');
      myDiv1.style.backgroundColor = 'white';
  
      const myDiv2= this.template.querySelector('.button2');
      myDiv2.style.backgroundColor = 'lightblue';
      
  }
}