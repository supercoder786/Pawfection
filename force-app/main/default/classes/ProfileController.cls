public with sharing class ProfileController {
    @AuraEnabled(cacheable=true)
    public static Pet__c getProfileRecord(String username){
        try{
            return [SELECT Id,Name,Username__c,Image__c FROM Pet__c WHERE Username__c = :username LIMIT 1];
        }catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
        
    }
     @AuraEnabled(cacheable=true)
     public static Doctor__c getDoctorProfileRecord(String username){
         try{
        return [SELECT Id,Name,Username__c,Image__c FROM Doctor__c WHERE Username__c = :username LIMIT 1];
         }catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static Doctor__c getDoctorRecord(String username){
        try{
        return [SELECT Id,Name,Username__c,Image__c FROM Doctor__c WHERE Username__c = :username LIMIT 1];
        }catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
    }
     @AuraEnabled(cacheable=true)
    public static List<Pet__c> getAllProfiles(){
        try{
        return [SELECT Id,Name,Username__c,Image__c FROM Pet__c ];
        }catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Object> getAllChats(String username,String selection){
        try{
        if(selection=='Doctor'){
            return [SELECT Id,Name,Username__c,Image__c,Desciption__c FROM Doctor__c];
        }
        else{
             return [SELECT Id,Name,Username__c,Image__c FROM Pet__c WHERE Username__c !=:username];
       
        }
        }catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
    }
}