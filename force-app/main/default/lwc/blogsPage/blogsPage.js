import { LightningElement,track,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getBlogs from '@salesforce/apex/BlogController.getBlogs';
export default class BlogsPage extends NavigationMixin(LightningElement) {
    blogs;
    @track loggedInUserCookie = this.getCookie('loggedInUser');
    @wire(getBlogs)
    wiredBlogs({ error, data }) {
        if (data) {
            this.blogs = data.map(blog=>{
              return {
                ...blog, 
                Content__c : this.stripHTMLTags(blog.Content__c)};
            });
        } else if (error) {
            console.error('Error fetching blogs', error);
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

    openblog(event){
        const blogId = event.currentTarget.dataset.blogId; // Make sure to add data-feed-id attribute to your card

        // Navigate to the BlogDetail component on the /test page
        this[NavigationMixin.Navigate]({
          type: 'standard__webPage',
          attributes: {
            url: '/individualblog?blogId=' + blogId
          }
        });
      
    }
}