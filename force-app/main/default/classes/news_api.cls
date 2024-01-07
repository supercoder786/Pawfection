public with sharing class news_api {
 

    @AuraEnabled(cacheable=true)
    public static List<NewsItem> getNews(String category) {
        news_api__mdt metadataRecord = news_api__mdt.getInstance('news_api_credentials');
        String apiKey = metadataRecord.api_key__c;
        String apiUrl = metadataRecord.api_url__c;
        String api_Url = apiUrl + '?country=us&category=' + category + '&apiKey=' + apiKey;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(api_Url);
        request.setMethod('GET');

        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            NewsApiResponse apiResponse = (NewsApiResponse) JSON.deserialize(response.getBody(), NewsApiResponse.class);
            return apiResponse.articles;
        }
        return new List<NewsItem>();
    }

     @AuraEnabled(cacheable=true)
    public static List<NewsItem> getallNews() {
         news_api__mdt metadataRecord = news_api__mdt.getInstance('news_api_credentials');
        String apiKey = metadataRecord.api_key__c;
        String apiUrl = metadataRecord.api_url__c;
       
        String api_Url = apiUrl + '?country=us&apiKey=' + apiKey;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(api_Url);
        request.setMethod('GET');

        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            NewsApiResponse apiResponse = (NewsApiResponse) JSON.deserialize(response.getBody(), NewsApiResponse.class);
            return apiResponse.articles;
        }
        return new List<NewsItem>();
    }
    // Inner class to map the News API response
    public class NewsApiResponse {
        public List<NewsItem> articles;
    }

    // Inner class to represent a single news item
    public class NewsItem {
        @AuraEnabled
        public String title;
        @AuraEnabled
        public String description;
        @AuraEnabled
        public String url;
        
    }
}