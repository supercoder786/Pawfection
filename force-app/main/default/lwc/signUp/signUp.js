import { LightningElement ,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import createPetRecord from '@salesforce/apex/LoginController.createPetRecord';
export default class SignUp extends NavigationMixin(LightningElement) {
    @track name = '';
    @track username = '';
    @track password = '';
    // @track image = '';
    @track bio='';
    @track fileData = {};
    @track showMessage = false;
    @track Message = '';
    @track Address='';

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleBioChange(event) {
        this.bio = event.target.value;
    }

    handleAddressChange(event){
   this.Address=event.target.value;
    }

    get isButtonDisabled() {
        return !(this.name && this.bio &&this.username && this.password && this.Address);
    }
    handleUsernameChange(event) {
        this.username = event.target.value;
        this.showMessage = false; // Hide the error message when the username changes
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
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
    get previewImage() {
        return `data:image/jpeg;base64,${this.fileData.base64}`;
    } 
    async handleSignUp() {
        const { base64, filename } = this.fileData;
        console.log("base64 value",base64);
        await createPetRecord({
                name: this.name,
                username: this.username,
                password: this.password,
                bio: this.bio,
                address :this.Address,
                base64: base64,
                 filename:filename
            }).then(result=>{
                if (result === 'Success') {
                    // Reset form fields after successful sign-up
                    console.table(result);
                    // this.Message = 'User Created Succesfully';
                    // this.showMessage = true;
                   // this.setCookie('loggedInUser', this.username, 30)
                    this[NavigationMixin.Navigate]({
                        type: 'standard__webPage',
                        attributes: {
                            url: '/'
                        }
                    });
                    // this.name = '';
                    // this.username = '';
                    // this.password = '';
                    // this.bio = '';
                    // this.fileData = {};
                    // this.Message = 'User Created Succesfully';
                    // this.showMessage = true;
                    // setTimeout(() => {
                    //     this.Message = 'User Created Succesfully';
                    //     this.showMessage = true;
                        
                    // }, 3000);

                } else if (result === 'Username already exists') {
                    this.Message = result;
                    this.showMessage = true;
                }


            }). catch (error => {
                // Handle error
                console.error('Error creating User:', error);
                // Optionally, show an error toast or perform any other error handling.
            }) ;
            // Handle error
           
        
    }
}