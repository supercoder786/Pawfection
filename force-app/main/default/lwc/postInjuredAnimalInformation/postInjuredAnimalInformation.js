import { LightningElement, track } from 'lwc';
import postAnimalInformation from '@salesforce/apex/AnimalInformationController.postAnimalInformation';
import { NavigationMixin } from 'lightning/navigation';
export default class PostInjuredAnimalInformation extends NavigationMixin(LightningElement){
     @track newAnimalInfo = ''; 
    @track newAddress = '';
    @track postSubject = '';
    @track fileData = {};

    handlePostSubjectChange(event) {
        this.postSubject = event.target.value;
    }

    handleNewAnimalInfoChange(event) {
        this.newAnimalInfo = event.target.value;
    }

    handleNewAddressChange(event) {
        this.newAddress = event.target.value;
    }

    handleFileChange(event) {
        
        const file = event.target.files[0];
        if (file && file.size <= 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(",")[1];
                this.fileData = { filename: file.name, base64: base64 };
            };
            reader.readAsDataURL(file);
        } else {
            this.fileData = {};
            event.target.value = null;
            alert('Please select an image file less than 1MB.');
        };

    }
    
    async postInfo(event) {

        const { base64, filename } = this.fileData;

        await postAnimalInformation({

            subject : this.postSubject,
            description : this.newAnimalInfo,
            address : this.newAddress,
            base64 : base64,
            filename : filename

        })
        .then((result) =>{

            alert('Thank You !!!, Animal Information Posted Successfully !!!');
            
            this.postSubject = '';
            this.newAnimalInfo = '';
            this.newAddress = '';
            this.fileData = {};


        })
        .catch((error) =>{
            alert("Sorry, Posting Animal Information Failed !!!")
            console.error("An error occured " + error);
        })
    }
}