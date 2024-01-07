import { LightningElement, track } from 'lwc';
import getAnimalInformationList from '@salesforce/apex/AnimalInformationController.getAnimalInformationList';
import { NavigationMixin } from 'lightning/navigation';
export default class HelpUsAnimalInformation extends NavigationMixin(LightningElement) {
    @track animalInfoList;

    connectedCallback(){
        this.getList();
    }

    getList(){
      getAnimalInformationList()
        .then((result) =>{
            this.animalInfoList = result;
        })
        .catch((error) =>{
            console.error("Error Fetching Animal Info" + error);
        })
    }

    navigateToPostInformation(event){
        const url = event.target.dataset.url;
        if (url) {
          this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
              url: url
            }
          });
        }
    }
}