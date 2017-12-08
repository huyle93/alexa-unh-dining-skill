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
import json
import pprint



#url_list = ["http://foodpro.unh.edu/shortmenu.asp?sName=University%20Of%20New%20Hampshire%20Hospitality%20Services&locationNum=80&locationName=Holloway%20Dining%20Hall&naFlag=1",
#            "http://foodpro.unh.edu/shortmenu.asp?sName=University%20Of%20New%20Hampshire%20Hospitality%20Services&locationNum=10&locationName=Stillings%20Dining%20Hall&naFlag=1",
#            "http://foodpro.unh.edu/shortmenu.asp?sName=University%20Of%20New%20Hampshire%20Hospitality%20Services&locationNum=30&locationName=Philbrook%20Dining%20Hall&naFlag=1"]

# =================== Retrieval Source =========================
dining_hall = { "Philbrook":"30", "Stillings":"10", "Holloway":"80"}

now = datetime.datetime.now() + datetime.timedelta(days=3)
current_day = str(now.day)
current_month = str(now.month)
current_year = str(now.year)

url = "http://foodpro.unh.edu/shortmenu.asp?sName=University+Of+New+Hampshire+Hospitality+Services&locationNum="+dining_hall["Stillings"]+"&locationName=Holloway+Dining+Hall&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate="+current_month+"%2F"+current_day+"%2F"+current_year

# =================== Retrieval Data =========================

#for url in url_list:
dictionary = {}
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")
table = soup.find("td")
title_list = []
menu_list = []
recipes_list = []
meal_list = []
cat_list = []
    
    
for date in table.find_all("span", {"class":"shortmenutitledate"}):
    title_list.append(date.get_text())
#    print(date.text)
    for menu in table.find_all("div", {"class":"shortmenuheader"}):
        menu_list.append(menu.get_text())
#        print(menu.text)
        for recipes in table.find_all("div", {"class":"shortmenurecipes"}):
            recipes_list.append(recipes.get_text())
            #print(recipes.text)
            for meal in table.find_all("div", {"class":"shortmenumeals"}):
                meal_list.append(meal.get_text())
#                print(meal.text)
                for cat in table.find_all("div", {"class":"shortmenucats"}):
                    cat_list.append(cat.get_text())
                    #print(cat.text)
                

            
         
dictionary = {"Date" : title_list, "Location" : menu_list,
              "Food" : recipes_list} 
for d, l in dictionary.items():
    print(d, l)
#print(dictionary)
#pprint.pprint(dictionary, width=1)



            

            
            
            
            
#                for i in list:
#                    text = i.get_text()
#                    print(text)                             



# =================== Dump JSON =========================
with open("Holloway.json", "w") as f:
     json.dump(dictionary, f)
    

    
    
 
        
    
 
            
        
 
    
            
                
                
            
            
            
            
            
           
            
       
      
       
       
       
      

    
        
    
    
