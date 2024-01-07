import { LightningElement,track } from 'lwc';
import createBlogRecord from '@salesforce/apex/BlogController.createBlogRecord';
export default class CreateBlogPage extends LightningElement {
    @track blogName = '';
    @track blogContent = '';
    @track fileData = {};
    @track loggedInUserCookie = this.getCookie('loggedInUser');

    handleBlogNameChange(event) {
        this.blogName = event.target.value;
    }

    handleBlogContentChange(event) {
        this.blogContent = event.target.value;
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

    async submitBlog() {
        const { base64, filename } = this.fileData;
        await createBlogRecord({ blogName: this.blogName , blogContent: this.blogContent, base64: base64, filename:filename,username: this.loggedInUserCookie})
            .then(result => {
                // Handle success
                console.log('Blog created successfully:', result);
                alert('Blog Created succesfully !!!');
                this.blogName = '';
                this.blogContent = '';
                this.fileData = {};
               
            })
            .catch(error => {
               
                console.error('Error creating Blog:', error);
                
            });
            
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}
