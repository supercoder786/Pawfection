import { LightningElement, wire,track } from 'lwc';
import getIndividualBlogs from '@salesforce/apex/BlogController.getIndividualBlogs';
import getIndividualFeeds from '@salesforce/apex/FeedController.getIndividualFeeds';
import getProfileRecord from '@salesforce/apex/ProfileController.getProfileRecord';
import { CurrentPageReference } from 'lightning/navigation';
export default class UserProfilePage extends LightningElement {
    @wire(CurrentPageReference) pageRef;
  @track loggedInUserCookie ;

  connectedCallback() {
    this.loggedInUserCookie= this.pageRef.state.username;
}

   rec;
  @wire(getProfileRecord,{ username: '$loggedInUserCookie' })
  wiredProfileRecord({ error, data }) {
    if (data) {
        this.rec = data;
        console.log(data.Picture__c);
    } else if (error) {
        console.error('Error fetching user:', error);
        this.rec = null;
    }
}

  blogs;
  
  @wire(getIndividualBlogs,{ username: '$loggedInUserCookie' })
  wiredIndividualBlogs({ error, data }) {
    if (data) {
        this.blogs = data;
    } else if (error) {
        console.error('Error fetching posts:', error);
        this.feeds = null;
    }
}



  showPostSection = true;
  showBlogSection = false;

  showPosts() {
    this.showPostSection = true;
    this.showBlogSection = false;
  }

  showBlogs() {
    this.showPostSection = false;
    this.showBlogSection = true;
  }

  feeds;

    @wire(getIndividualFeeds,{ username: '$loggedInUserCookie' })
    wiredIndividualFeeds({ error, data }) {
        if (data) {
            this.feeds = data.map(feed=>{
              return {
                ...feed, 
                Post_Content__c : this.stripHTMLTags(feed.Post_Content__c)};
            });
        } else if (error) {
            console.error('Error fetching posts:', error);
            this.feeds = null;
        }
    }


    stripHTMLTags(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.textContent || div.innerText || '';
}
getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
}