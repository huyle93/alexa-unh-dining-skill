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
import urllib.request
import requests
import datetime



#url_list = ['http://foodpro.unh.edu/shortmenu.asp?sName=University%20Of%20New%20Hampshire%20Hospitality%20Services&locationNum=80&locationName=Holloway%20Dining%20Hall&naFlag=1',
#            'http://foodpro.unh.edu/shortmenu.asp?sName=University%20Of%20New%20Hampshire%20Hospitality%20Services&locationNum=10&locationName=Stillings%20Dining%20Hall&naFlag=1',
#            'http://foodpro.unh.edu/shortmenu.asp?sName=University%20Of%20New%20Hampshire%20Hospitality%20Services&locationNum=30&locationName=Philbrook%20Dining%20Hall&naFlag=1']

# =================== Retrieval Source =========================
dining_hall = { "Philbrook":"30", "Stillings":"10", "Holloway":"80"}

now = datetime.datetime.now()
current_day = str(now.day)
current_month = str(now.month)
current_year = str(now.year)

url = 'http://foodpro.unh.edu/shortmenu.asp?sName=University+Of+New+Hampshire+Hospitality+Services&locationNum='+dining_hall["Philbrook"]+'&locationName=Holloway+Dining+Hall&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate='+current_month+'%2F'+current_day+'%2F'+current_year

print(url)
# =================== Retrieval Data =========================
#for url in url_list:
#    response = requests.get(url)
#    soup = BeautifulSoup(response.content, "html.parser")
#    table = soup.find("td")
#    list = []
#    for date in table.find_all("span", {"class":"shortmenutitledate"}):
#        list.append(date)
#        for menu in table.find_all("div", {"class":"shortmenuheader"}):
#            list.append(menu)
#            for recipes in table.find_all("div", {"class":"shortmenurecipes"}):
#                list.append(recipes)
#                for i in list:
#                    text = i.get_text()
#                    print(text)                             

# =================== Dump JSON =========================
    
    
    
 
        
    
 
            
        
 
    
            
                
                
            
            
            
            
            
           
            
       
      
       
       
       
      

    
        
    
    
