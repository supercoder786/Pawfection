public with sharing class ChatController {
   @AuraEnabled(cacheable=true)
    public static List<Chat__c> getChatMessages(String otheruserName, String myuserName) {
        try{
             List<Chat__c> messages = new List<Chat__c>();
       
        messages = [SELECT Id, Message__c, Sender__c, Receiver__c FROM Chat__c WHERE (Sender__c = :otheruserName AND Receiver__c = :myuserName) OR (Sender__c = :myuserName AND Receiver__c = :otheruserName) ORDER BY CreatedDate];
        
        return messages;
        }catch (Exception e) {
            throw new AuraHandledException('Error saving chat message: ' + e.getMessage());
        }
       
    }
    
    @AuraEnabled
    public static Boolean saveChatMessage(String message, String senderId, String receiverId) {
        
        try {  
            
            Chat__c chatMessage = new Chat__c();
            chatMessage.Message__c = message;
            chatMessage.Sender__c = senderId;
            chatMessage.Receiver__c = receiverId;
            chatMessage.Name = 'Chat between ' + senderId + ' and ' + receiverId; 
    
            insert chatMessage;
            
            return true;
        } catch (Exception e) {
            throw new AuraHandledException('Error saving chat message: ' + e.getMessage());
        }
    }
}