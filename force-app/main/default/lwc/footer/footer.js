import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class Footer extends NavigationMixin(LightningElement) {
    navigateToCreateFeed() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/createfeed'  // replace with your actual URL
            }
        });
    }

    navigateToCreateBlog() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/createblog'  // replace with your actual URL
            }
        });
    }
}
