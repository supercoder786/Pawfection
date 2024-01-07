import { LightningElement, track } from 'lwc';
import createFeedRecord from '@salesforce/apex/FeedController.createFeedRecord';

export default class CreateFeedPage extends LightningElement {
    @track feedName = '';
    @track feedContent = '';
    @track fileData = {};
    @track loggedInUserCookie = this.getCookie('loggedInUser');
    
    get previewImage() {
        return `data:image/jpeg;base64,${this.fileData.base64}`;
    }  
    
    handleFeedNameChange(event) {
        this.feedName = event.target.value;
        
    }

    handleFeedChange(event) {
        this.feedContent = event.target.value;
    }

    openfileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = () => {
         const base64 = reader.result.split(",")[1];
         this.fileData = { filename: file.name, base64: base64 };
        };
        reader.readAsDataURL(file);
    }
      

    async createFeed() {
        const { base64, filename } = this.fileData;
        await createFeedRecord({ feedContent: this.feedContent, base64: base64, filename:filename, username:this.loggedInUserCookie})
            .then(result => {
                // Handle success
                console.log('Feed created successfully:', result);
                alert('Feed Created succesfully !!!')
                this.feedName = '';
                this.feedContent = '';
                this.fileData = {};
                // Optionally, show a success toast or perform any other UI updates.
            })
            .catch(error => {
                // Handle error
                console.error('Error creating feed:', error);
                // Optionally, show an error toast or perform any other error handling.
            });
    }
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}