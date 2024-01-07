public  with sharing class FeedController {
    
    @AuraEnabled(cacheable=true)
    public static List<Feed__c> getFeeds() {
        try{
            List<Feed__c> feeds= [SELECT Id, Name, Post_Content__c,Pic__c,Post_Image__c,CreatedDate,Creator__r.Name,Creator__r.Image__c FROM Feed__c ORDER BY CreatedDate DESC];            
            return feeds;
        }catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
       
    }
    
     @AuraEnabled(cacheable=true)
    public static List<Feed__c> getIndividualFeeds(String username) {
        //here i used nested queries because we only had a username saved in our cookies
        //By using it we can get creator name and then from creator name we can get only the feeds posted by that creator 
        try{
            return [SELECT Id, Name, Post_Content__c,Post_Image__c FROM Feed__c WHERE Creator__c = :[SELECT Name FROM Pet__c WHERE Username__c = :username]];
        }catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
     }
    
   
     @AuraEnabled
    public static String createFeedRecord(String feedContent, String base64, String filename,String username) {
        try {
            String imageLink = '<p><img src="data:image/jpeg;base64,' + base64 + '" alt="rtaImage.jpeg"></img></p>';
            Pet__c a=[SELECT Id,Name FROM Pet__c WHERE Username__c = :username LIMIT 1];
            Feed__c newFeed = new Feed__c();
            newFeed.Name =a.Name;
            newFeed.Post_Content__c = feedContent;
            newFeed.Post_Image__c = imageLink;       
            newFeed.Creator__c=a.Id;
            insert newFeed;
            return newFeed.Id;
        } catch (Exception ex) {
            throw new AuraHandledException('Error creating feed: ' + ex.getMessage());
        }
    }
}