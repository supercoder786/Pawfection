public with sharing class LoginController {
      @AuraEnabled(cacheable=true)
    public static Boolean validatePetLogin(String username, String password) {
        try{
             List<Pet__c> pets = [SELECT Id FROM Pet__c WHERE Username__c = :username AND Password__c = :password LIMIT 1];
        if(pets.size()>0){
            return true;
        }
        return false;
        } catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
        
       
    }
    @AuraEnabled(cacheable=true)
    public static Boolean validateDoctorLogin(String username, String password) {
        try{
             List<Doctor__c> doctors =[SELECT Id FROM Doctor__c WHERE Username__c = :username AND Password__c = :password LIMIT 1];
        if(doctors.size()>0){
            return true;
        }
        return false;
        }
         catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
            
       
    }
    
     @AuraEnabled
    public static String createPetRecord(String name, String username, String password,String bio,String address,String base64, String filename) {
        List<Pet__c> existingPets = [SELECT Id FROM Pet__c WHERE Username__c = :username LIMIT 1];
        
        if (!existingPets.isEmpty()) {
            return 'Username already exists';
        } else {
            try{
             String imageLink = '<p><img src="data:image/jpeg;base64,' + base64 + '" alt="rtaImage.jpeg"></img></p>';          
            Pet__c pet = new Pet__c();            
            pet.Name = name;
            pet.Bio__c=bio;
            pet.Username__c = username;
            pet.Password__c = password;
            pet.Address__c=address;
            pet.Image__c=imageLink;           
            insert pet;
            return 'Success';
            }
            catch (Exception ex) {
            throw new AuraHandledException('Error creating user: ' + ex.getMessage());
        }
            
            
        }
    }
    
}