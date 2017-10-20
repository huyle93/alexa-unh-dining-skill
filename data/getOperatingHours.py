#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct  9 16:39:11 2017

@author: Huy
"""

from bs4 import BeautifulSoup
import urllib.request, urllib.error, urllib.parse
import time

def make_soup(url):
        link = urllib.request.urlopen(url)
        soupdata = BeautifulSoup(link, "html.parser")
        return soupdata
soup = make_soup("https://www.unh.edu/dining/regular-hours-operation")


   
for record in soup.find_all("tr"):
    #list_of_hours=[]
    for hour in record.find_all(["th","td"]):
        day = record.text
        hour_list = "\n" + hour.text
        dining = day + hour_list
        
    print(dining)


 #       list_of_hours.append(getdata)
 #   mylist.append(list_of_hours)
#print(mylist, "\n")

        
        
    
 
            
        
 
    
            
                
                
            
            
            
            
            
           
            
       
      
       
       
       
       
        #hoursdata =hoursdata+","+data.text
        
        #hoursdatasave = hoursdatasave + "\n" + hoursdata[1:]

    

    
        
    
    




    


    




    
    
    
    
    
    
    
    
    
    
    
    
    
    


    
    
    


    


    





