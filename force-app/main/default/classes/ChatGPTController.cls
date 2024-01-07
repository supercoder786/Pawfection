public with sharing class ChatGPTController {
    private static API_Config__mdt getConfig() {
        return [SELECT API_Key__c, API_Endpoint__c FROM API_Config__mdt LIMIT 1];
    }
 
    @AuraEnabled(cacheable=true)
    public static String getChatGPTResult(String searchTerm) {
        String searchQueryEscape = searchTerm.trim();
		String r;
        try {
            API_Config__mdt config = getConfig();
            String apiKey = config.API_Key__c;
            String endpoint = config.API_Endpoint__c;
 
            HttpRequest request = new HttpRequest();
            request.setEndpoint(endpoint);
            request.setHeader('Authorization', 'Bearer ' + apiKey);
            request.setHeader('Content-Type', 'application/json');
 
            String reqBody = '{"model": "text-davinci-003", "prompt": "' + searchQueryEscape + '","max_tokens":400,"temperature":0,"stream":false, "top_p":1}';
            request.setBody(reqBody);
            request.setMethod('POST');
 
            Http http = new Http();
            HttpResponse resp = http.send(request);
 
            

 
                if (resp.getStatusCode() == 200) {
                    System.debug('Result: ' + resp.getBody());
                    r = resp.getBody();
                    return resp.getBody();
                }
 
        	} catch (Exception e) {
            	System.debug('An error occurred while processing the request: ' + e.getMessage());
        		}
		return r;        
    }
}