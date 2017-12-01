var data = {
    "hoco": {
        "Breakfast": ["Apple Cinn Overnight Oatmeal", "Assorted Danish", "Assorted Muffins", "Baked Eggs", "Choc Raspberry Stuffed French Toast", "Hard Cooked Eggs", "Holloway Omelet Bar", "Hot Oatmeal", "Scrambled Eggs", "Smoked Bacon", "Sweet Potato Tots", "Waffle Bar"],
        "Lunch": ["Beef Noodle Soup", "Chicken Veg with Rice Soup", "Lobster Bisque", "Pasta E Fagioli Soup", "Holloway Salad Bar", "Yogurt Bar", "Deli Bar", "Pesto Mayonnaise", "Thin & Trim Deli Chicken", "Cheeseburger (no roll)", "Fryless Shoestring Fries", "Grilled Beef Frankfurter", "Grilled Chicken", "Hamburger (no roll)", "Mini Pollock Nuggets", "Turkey Burger (no roll)", "Veggie Burger (no roll)", "Wasabi Ginger Salmon Slider", "Cheese Pizza", "Chef's Choice Pizza", "Mediterranean Pizza", "Monkey Bread", "Brown Rice", "Jasmine Rice", "Noodle Bowl Bar", "Stir Fry Bar", "Chocolate Raspberry Bar", "M & M Cookies", "Peanut Butter Cookie", "Plain Brownies", "Baked Sweet Potato", "Steamed Broccoli Florets", "Vegetable Stew", "White Bean & Escarole Soup", "Asparagus & Portobello Pasta", "Au Jus", "Chef's Choice", "French Dip Sandwich", "Gemelli", "Harvest Salad with Pecans", "House-made Alfredo Sauce", "Marinara Sauce", "Pesto Sauce", "Roasted Root Vegetables", "Saigon Chicken & Veggies", "Steamed Broccoli Florets", "Whole Wheat Pasta", "Steak Sub Ba"],
        "Dinner": ["Beef Noodle Soup", "Chicken Veg with Rice Soup", "Lobster Bisque", "Pasta E Fagioli Soup", "Holloway Salad Bar", "Yogurt Bar", "Burrito Bar", "Oven-Grilled Cod", "Roasted Potato Medley", "Steamed Green Beans", "Cheese Pizza", "Chef's Choice Pizza", "Mediterranean Pizza", "Monkey Bread", "Brown Rice", "Jasmine Rice", "Noodle Bowl Bar", "Stir Fry Bar", "Salted Caramel Cake", "Southern Banana Pudding", "Brazilian Rice", "Seasoned Baby Carrots", "Tofu Broccoli Casserole", "White Bean & Escarole Soup", "Chicken Scarpariello", "Farfalle", "Harvest Salad with Pecans", "House-made Alfredo Sauce", "London Broil", "Marinara Sauce", "Pesto Sauce", "Pesto Tortellini", "Roasted Root Vegetables", "Steamed Broccoli Florets", "Swiss Mashed", "Whole Wheat Pasta", "Steak Sub Bar"]
    }
};

foodname_slot = "Beef Noodle"

var array_item_hoco = data.hoco
Array.prototype.findReg = function(match) {
    var reg = new RegExp(match);

    return this.filter(function(item){
        return typeof item == 'string' && item.match(reg);
    });
	}
var i, len, text
var lenObj = Object.keys(array_item_hoco)
//loop through object's key
timeHasFood = []
for (i = 0; i < lenObj.length; i++) {
	//console.log(lenObj[i]);
  time.push(lenObj[i])
  //console.log(array_item_hoco.lenObj[i])
}
console.log(timeHasFood)
//loop through object's key's value

/*function getFoodTime(foodname_slot, array_item) {
	hasFoodOn = []
	if (array_item.Breakfast.findReg(foodname_slot) == foodname_slot) {
  	hasFoodOn.push(Object.keys(array_item)[0])
  }
  if (array_item.Lunch.findReg(foodname_slot) == foodname_slot) {
  	hasFoodOn.push(Object.keys(array_item)[1])
  }
  if (array_item.Dinner.findReg(foodname_slot) == foodname_slot) {
    hasFoodOn.push(Object.keys(array_item)[2])
    }
  return hasFoodOn
}*/

//var time = getFoodTime(foodname_slot, array_item_hoco)
//console.log("has food in hoco at "+ time)
//console.log(foodMatch)