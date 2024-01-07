import { LightningElement,track,wire } from 'lwc';
import getChatGPTResult from '@salesforce/apex/ChatGPTController.getChatGPTResult';

export default class PawGpt extends LightningElement {
    // for-header-animation
    @track animatedString = '';
    string = " 🤖 Hello I'm Brownie, your AI-Animal-BOT";
    str = this.string.split("");
    running;

    connectedCallback() {
        this.animate();
    }

    animate() {
        this.running = setTimeout(() => {
            if (this.str.length > 0) {
                this.animatedString += this.str.shift();
                this.animate();
            } else {
                clearTimeout(this.running);
            }
        }, 90);
    }
// end-header-animation
@track searchChatResult = '';
@track showSpinner = false;

@track request = '';


handlechange(event){
    this.request = event.target.value;
}

handleresponse (){
    
    this.showSpinner = true;
    //console.log(this.request);
    

    getChatGPTResult({searchTerm : this.request})
    .then(result => {
        this.showSpinner = false;
        try {
            let response = JSON.parse(result);
            if (response.choices.length > 0) {
                this.searchChatResult = response.choices[0].text;
            } else {
                this.searchChatResult = 'No valid response found.';
            }
        } catch (error) {
            console.error( error);
            this.searchChatResult = 'Error parsing JSON.';
        }
    })
    .catch(error => {
        this.showSpinner = false;
        console.error('--error---', error);
    });


    



}
}