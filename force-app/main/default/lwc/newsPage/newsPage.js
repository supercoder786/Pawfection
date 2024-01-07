import { LightningElement, track, wire } from 'lwc';
import getNews from '@salesforce/apex/news_api.getNews';
import getallNews from '@salesforce/apex/news_api.getallNews';
export default class NewsPage extends LightningElement {
    @track selectedCategory='science';
    @track newsData;
    @track error;
    @track loggedInUserCookie = this.getCookie('loggedInUser');
    maxCardsToShow = 10;

   
    connectedCallback() {
        this.fetchAllNewsData();
    }

    // Fetch news data when the tab is changed
    handleCategoryClick(event) {
        this.selectedCategory = event.target.dataset.category;
        this.fetchNewsData();
    }

    handleallcategoryClick(event){
      this.fetchAllNewsData();
  }

  fetchAllNewsData(){
    
      getallNews()
        .then((data) => {
          this.newsData = data.slice(0, this.maxCardsToShow);
        })
        .catch((error) => {
          console.error(error);
        });
  }

    
    fetchNewsData() {
        const category = this.selectedCategory;
        getNews({ category })
          .then((data) => {
            this.newsData = data.slice(0, this.maxCardsToShow);
          })
          .catch((error) => {
            console.error(error);
          });
    }
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
  }
}