public class ThemeParkController {
    
    @AuraEnabled
    public static List<Ride__c> getAllRidesInitially(){
        return [SELECT ride_name__c, ride_picture__c, restrictions__c, level__c, description__c
                FROM Ride__c];
    }
    
    @AuraEnabled
    public static List<Ride__c> getRides(Date visitingDate, String level){
        
        return [SELECT ride_name__c, ride_picture__c, restrictions__c, level__c, description__c
                FROM Ride__c
                WHERE level__c like :level
                AND Scheduled_Repair_Date__c != :visitingDate
               ];
    }
    
    @AuraEnabled 
    public static List<Package__c> getPackages(Date VisitingDate, String level){
        
        return [SELECT name__c, level__c, cost__c, no_of_rides__c
                FROM Package__c
                WHERE level__c like :level
               ORDER BY cost__c];
    }
    
    @AuraEnabled
    public static List<String> getRideInfo(Id packageId,  Date visitingDate){
        
        List<PackageRideJO__c> rideList = [SELECT ride__r.ride_name__c FROM packageridejo__c WHERE package__c = :packageId
                                           AND  ride__r.Scheduled_Repair_Date__c != :visitingDate];
        List<String> nameList = new List<String>();
        for(PackageRideJO__c jo: rideList){
            nameList.add(jo.ride__r.ride_name__c);
        }
        
        return nameList;
    }
    
    @AuraEnabled
    public static List<String> getPackageInfo(Id rideId){
        List<PackageRideJO__c> packageList = [SELECT package__r.name__c FROM packageridejo__c WHERE ride__c = :rideId];
        List<String> nameList = new List<String>();
        for(PackageRideJO__c jo: packageList){
            nameList.add(jo.package__r.name__c);
        }
        
        return nameList;
    }
    
    @AuraEnabled
    public static Id verifyUser(String email, String passkey){
        
        List<Contact> verifiedCustomerList = [SELECT Id, FirstName, LastName, Phone, Email FROM Contact WHERE Email= :email AND Passkey__c = :passkey];
        System.debug(verifiedCustomerList.get(0).Id);
        return verifiedCustomerList.get(0).Id;
    }
  
    
    @AuraEnabled
    public static List<Package__c> getFilteredPackages(Integer priceLimit, Integer rideLimit, String level){
        
        return [SELECT name__c, level__c, cost__c, no_of_rides__c
                				   FROM Package__c
                                   WHERE level__c like :level 
                				   AND no_of_rides__c <= :rideLimit		
                				   AND cost__c <= :priceLimit
                				   ORDER BY cost__c	
                                  ];
    }
    
    @AuraEnabled
    public static List<Ticket__c> getTicketHistory(Id customerId){
        
        return [SELECT Id, Name_on_Ticket__c, No_of_Tickets__c, Visiting_Date__c, Name_on_Card__c, Card_Number__c, Total_Price__c, Contact__r.Name,Package__r.Name__c
               FROM Ticket__c
               WHERE Contact__r.Id = :customerId];
    }
   
}