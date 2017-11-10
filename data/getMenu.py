# -*- coding: utf-8 -*-
"""
Created on Sun Nov  5 16:30:20 2017

@author: sudar
"""

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct  9 16:39:11 2017

"""

from bs4 import BeautifulSoup
import urllib.request, urllib.error, urllib.parse
import requests


url_list = ["http://foodpro.unh.edu/shortmenu.asp?sName=University%20Of%20New%20Hampshire%20Hospitality%20Services&locationNum=80&locationName=Holloway%20Dining%20Hall&naFlag=1", 
            "http://foodpro.unh.edu/shortmenu.asp?sName=University%20Of%20New%20Hampshire%20Hospitality%20Services&locationNum=10&locationName=Stillings%20Dining%20Hall&naFlag=1", 
            "http://foodpro.unh.edu/shortmenu.asp?sName=University%20Of%20New%20Hampshire%20Hospitality%20Services&locationNum=30&locationName=Philbrook%20Dining%20Hall&naFlag=1" ]
for url in url_list:
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
   
for record in soup.find_all("div", {"class":"shortmenurecipes"}):
    print(record)
    
    
        
       
        


 #       list_of_hours.append(getdata)
 #   mylist.append(list_of_hours)
#print(mylist, "\n")

        
        
    
 
            
        
 
    
            
                
                
            
            
            
            
            
           
            
       
      
       
       
       
       
        #hoursdata =hoursdata+","+data.text
        
        #hoursdatasave = hoursdatasave + "\n" + hoursdata[1:]

    

    
        
    
    




    


    




    
    
    
    
    
    
    
    
    
    
    
    
    
    


    
    
    


    


    





