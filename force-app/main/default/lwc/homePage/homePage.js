import { LightningElement,track ,wire} from 'lwc';
import getFeeds from '@salesforce/apex/FeedController.getFeeds';
export default class HomePage extends LightningElement {
    feeds;

    @track loggedInUserCookie = this.getCookie('loggedInUser');

    
    @wire(getFeeds)
    wiredFeeds({ error, data }) {
        if (data) {
            this.feeds =data;
            console.log(this.feeds);
       
        } else if (error) {
            console.error('Error fetching posts:', error);
            this.feeds = null;
        }
    }

    



    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}