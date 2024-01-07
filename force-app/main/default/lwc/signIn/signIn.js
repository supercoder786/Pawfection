import { LightningElement,wire,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import validatePetLogin from '@salesforce/apex/LoginController.validatePetLogin';
import validateDoctorLogin from '@salesforce/apex/LoginController.validateDoctorLogin';
export default class SignIn extends NavigationMixin(LightningElement) {
    @track selectedLoginType='Pet';
    get loginOptions() {
        return [
            { label: 'Pet', value: 'Pet' },
            { label: 'Doctor', value: 'Doctor' }
        ];
    }
    
    handleLoginTypeChange(event) {
        this.selectedLoginType = event.detail.value;
       
    }

    
    @track username = '';
    @track password = '';
    
    
    get isButtonDisabled() {
        return !(this.username && this.password);
    }

   
    handleUsernameChange(event) {
        this.username = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }
    
    handleLogin(event) {
       
        event.preventDefault(); 
        if(this.selectedLoginType=='Pet'){
            validatePetLogin({ username: this.username, password: this.password })
            .then(result => {
                if (result) {

                    this.setCookie('loggedInUser', this.username, 30)
                    this[NavigationMixin.Navigate]({
                        type: 'standard__webPage',
                        attributes: {
                            url: '/'
                        }
                    });
                   
                    console.log('correct password');
                    
                } else {
                    alert('Oopsie...Wrong Password');
                    console.log('Incorrect password'); 
                }
            }
            
            )
            .catch(error => {
                // Handle any errors from the Apex method
                this.errorMessage = 'Error during login: ' + error.body.message;
            });
        }
        else{
            validateDoctorLogin({ username: this.username, password: this.password })
            .then(result => {
                if (result) {

                    this.setCookie('loggedInUser', this.username, 30)
                    this[NavigationMixin.Navigate]({
                        type: 'standard__webPage',
                        attributes: {
                            url: '/'
                        }
                    });
                   
                    console.log('correct password');
                    
                } else {
                    alert('Oopsie...Wrong Password');
                    console.log('Incorrect password'); 
                }
            }
            
            )
            .catch(error => {
                // Handle any errors from the Apex method
                this.errorMessage = 'Error during login: ' + error.body.message;
            });
        }
        
    }

    navigateToSignUp() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/signup'
            }
        });
    }
    
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }
  
   

}