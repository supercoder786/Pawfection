import { LightningElement ,track,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getProfileRecord from '@salesforce/apex/ProfileController.getProfileRecord';
import getDoctorRecord from '@salesforce/apex/ProfileController.getDoctorRecord';
export default class Navbar extends NavigationMixin(LightningElement){
    @track loggedInUserCookie = this.getCookie('loggedInUser');
   rec='';
   pet='';
   doc='';
  //   role;
  //   username;
  //   connectedCallback(){
  //     if(loggedInUserCookie=='' && loggedInDoctorCookie !=''){
  //  this.role='doctor';
  //  this.username=this.loggedInDoctorCookie;
  //     }
  //     else{
  //       role='pet';
  //       this.username=this.loggedInUserCookie;
  //     }
  //   }
  connectedCallback(){
   this.profile();
   this.doctor();
   
  }
    @track isDropdownVisible = false;
   
       toggleDropdown() {
           this.isDropdownVisible = !this.isDropdownVisible; //boolean logic for visibility
       }
   
       handleLogout() {
         this.setCookie('loggedInUser','', 30);
        
       }
      profile(){
        getProfileRecord( {username: this.loggedInUserCookie })
        .then((result)=>{
           this.pet=result;
           console.log(this.pet);
           this.setRec();
        }) .catch((error) =>{
          console.error("Error Fetching Animal Info" + error);
      })
      }
     
      doctor(){
        getDoctorRecord( {username: this.loggedInUserCookie })
        .then((result)=>{
           this.doc=result;
           console.log(this.doc);
           this.setRec();
        }) .catch((error) =>{
          console.error("Error Fetching Animal Info" + error);
      })
      }
     
      setRec(){
        if(this.pet==''){
          this.rec=this.doc;
        }
        else{
          this.rec=this.pet;
        }
      }

       
       
    
    
       navigateToProfile(event){
   
         const userName = event.currentTarget.dataset.userId; // IMP -  add data-feed-id attribute to our card
   
       
         this[NavigationMixin.Navigate]({
           type: 'standard__webPage',
           attributes: {
             url: '/profile?username=' + userName
           }
         });
       
     }
   
       
       navigateToFeed(event){
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
       
        navigateToProfiles(event) {
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
       
         navigateToNews(event){
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
       
         
       
         navigateToChats(event) {
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
         
         navigateToBlogs(event){
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
       
         navigateToAi(event){
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
         navigateToTraining(event){
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

        navigateToHelp(event){
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
         navigateToMarketPlace(event){
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
        
         navigateToContactUs(event){
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


    setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = 'expires=' + date.toUTCString();
            document.cookie = name + '=' + value + ';' + expires + ';path=/';
        }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}