public with sharing class AnimalInformationController {
 @AuraEnabled(cacheable=true)
    public static List<Animal_Information__c> getAnimalInformationList(){
        try{
            return [SELECT Id, Name, Description__c, Address__c, Image__c FROM Animal_Information__c];
        }
        catch(Exception ex){
            throw new AuraHandledException('Error fetching animal info' + ex.getMessage());
        }
    }
    
    @AuraEnabled
    public static String postAnimalInformation(String subject, String description, String address, String base64, String filename){

        try{
            String imageLink = '<p><img src="data:image/jpeg;base64,' + base64 + '" alt="rtaImage.jpeg"></img></p>';

            Animal_Information__c newPost = new Animal_Information__c();
            newPost.Name = subject;
            newPost.Description__c = description;
            newPost.Address__c = address;
            newPost.Image__c = imageLink;

            insert newPost;
            return newPost.Id;
        }
        catch(Exception e){
            throw new AuraHandledException('Error creating post' + e.getMessage());
        }
    }
}