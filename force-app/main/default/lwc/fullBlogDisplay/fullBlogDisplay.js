import { LightningElement,api, wire,track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getSingleblog from '@salesforce/apex/BlogController.getSingleblog';
import getName from '@salesforce/apex/BlogController.getName';
export default class FullBlogDisplay extends LightningElement {
    
    @wire(CurrentPageReference) pageRef;
    blogdata;
    connectedCallback() {
        const blogId = this.pageRef.state.blogId;
        if (blogId) {
            this.loadBlogData(blogId);
            
        }
    }
   
    loadBlogData(blogId) {
        getSingleblog({ blogId: blogId })
            .then(result => {
                this.blogdata = result;
                console.log(result);
                this.loadAuthorData(this.blogdata.Author__c);
            })
            .catch(error => {
                console.error('Error fetching blog data:', error);
                this.blogdata = null;
            });
           
    }
    rec;
    loadAuthorData(Id) {
        getName({ recId: Id })
            .then(result => {
                this.rec = result;
                console.log(result);
            })
            .catch(error => {
                console.error('Error fetching blog data:', error);
                this.rec = null;
            });
           
    }

}