public with sharing class BlogController {
    @AuraEnabled(cacheable=true)
    public static List<Blog__c>  getBlogs() {
        try{
        return [SELECT Id, Name,Content__c,Blog_Image__c,CreatedDate FROM Blog__c ORDER BY CreatedDate DESC];
        }catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    
     @AuraEnabled(cacheable=true)
    public static Blog__c getSingleblog(String blogId){
        try {
            return [SELECT Id,Name, Content__c,Author__c,Blog_Image__c FROM Blog__c WHERE Id =: blogId LIMIT 1 ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
     @AuraEnabled(cacheable=true)
    public static Pet__c getName(String recId){
         try {
            return [SELECT Id, Name FROM Pet__c WHERE Id =: recId LIMIT 1 ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
    
    
    
     @AuraEnabled(cacheable=true)
    public static List<Blog__c>  getIndividualBlogs(String username) {
        return [SELECT Id, Name,Content__c,Blog_Image__c,CreatedDate FROM Blog__c WHERE Author__c = :[SELECT Name FROM Pet__c WHERE Username__c = :username]];
    }

    @AuraEnabled
    public static String createBlogRecord(String blogName,String blogContent, String base64, String filename,String username) {
        try {
            String imageLink = '<p><img src="data:image/jpeg;base64,' + base64 + '" alt="rtaImage.jpeg"></img></p>';
            Pet__c a=[SELECT Id,Name FROM Pet__c WHERE Username__c = :username LIMIT 1];
            Blog__c newBlog = new Blog__c();
            newBlog.Name = blogName;
            newBlog.Content__c = blogContent;
            newBlog.Blog_Image__c = imageLink;
            newBlog.Author__c=a.Id;
            insert newBlog;
            return newBlog.Id;
        } catch (Exception ex) {
            throw new AuraHandledException('Error creating Blog: ' + ex.getMessage());
        }
    }
}