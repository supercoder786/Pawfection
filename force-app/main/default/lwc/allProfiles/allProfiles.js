import { LightningElement ,track,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAllProfiles from '@salesforce/apex/ProfileController.getAllProfiles';
export default class AllProfiles extends NavigationMixin(LightningElement){
    @track users;
    @track error;
    @track loggedInUserCookie = this.getCookie('loggedInUser'); //getting the cookie stored in our browser
    
    @wire(getAllProfiles)
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
        const userName = event.currentTarget.dataset.userId; // IMP -  add data-feed-id attribute to our card    
        this[NavigationMixin.Navigate]({
          type: 'standard__webPage',
          attributes: {
            url: '/profile?username=' + userName
          }
        });
      
    }
}