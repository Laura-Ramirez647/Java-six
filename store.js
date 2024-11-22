//store the items from the store
const itemsList = {
    "689145740844":{
        name: "JavaScript Textbook",
        price: "34.95",
    },
    "4549292070248":{
        name: "Photo Paper",
        price: "10.99",
    },
    "092265222983":{
        name: "First Aid Kit",
        price: "20.99",
    },
    "X002ELVL3J":{
        name: "Box of Pencils (50ct.)",
        price: "15.99",
    },
    "860004186236":{
        name: "N95 Face Masks",
        price: "15.99",
    },
    "036000214000":{
        name: "Kleenex",
        price: "3.99",
    },
    "8809568749985":{
        name: "Hand Sanitizer",
        price: "7.99",
    },
    "036500060480":{
        name: "Printer Paper",
        price: "9.99",
    },
    "085014561877":{
        name: "Brush Pens",
        price: "10.99",
    },
    "X0032YGP2T":{
        name: "Multiport Adapter",
        price: "25.99",
    },
    "9780134682334":{
        name: "iOS Programming Textbook",
        price: "119.99",
    },
    "718103230759":{
        name: "Spiral Notebook",
        price: "1.99",
    },
    "888462022224":{
        name: "iPad Mini",
        price: "599.99",
    },
}

//get the emements from HTML and store here.
const parentDiv = document.getElementById("parent");
const barcodeInput = document.getElementById("barcode");
const quantityInput = document.getElementById("quantity");
const button = document.getElementById("button");
const continer = document.getElementById("continer");

//create a continer div to store the information for each product.
let continerDiv = document.createElement("div");
continer.appendChild(continerDiv); //store the div in a big continer in HTML
continerDiv.className = "continerDiv"; //give a class name

let totalPrice = 0; //This will store the total price of all items.
let totalDisplayElement = null; // The element where total price will be shown. 
let checkoutButton = null; //store the checkout button.

//function to update and display the total price on the page.
function updateTotalDisplay (){
    
    //Check if the total display element doesn't exist yet and it will be created only once.
    if (!totalDisplayElement){

        totalDisplayElement = document.createElement("p"); //create a p Element.
        totalDisplayElement.className = " totalDisplay"; //Give a class name.
        continer.appendChild(totalDisplayElement); // store the totalDisplayElement in the continer.
    }

    totalDisplayElement.innerText = "Total: $" + totalPrice.toFixed(2); // Show total price with 2 decimal places. ToFixed(2) make that the numbers are show like $45.30. 
    updateCheckoutButton();//Ensure the buttonis only added once and update the check Button is necesary. 
    
}

//This function add the checkoutbutton to the page if it does not exist.
function updateCheckoutButton (){
    //Check if the checkout button doesn't exist yet and create it.
    if(!checkoutButton){
        checkoutButton = document.createElement("button"); //create a checkout button
        checkoutButton.className = "checkout-Button"; // add a class
        checkoutButton.innerText = "Checkout"; // set button text to checkout.
        continer.appendChild(checkoutButton); //Add the checkout button in the continer.

        checkoutButton.addEventListener("click", showGrandTotal); //show the grand total when clicked.
    }
}

// This function handles scanning an item by barcode and adding it to the cart.
function scanItem (){

    const barcode = barcodeInput.value.trim(); //get the barcode  from the input field. trim: remove the extra spaces. Value:permite access to the text inside of barcode input.
    let quantity = parseInt(quantityInput.value, 10); // Get the quantity as a number. parseInt:Converts a string into an whole number.
    let foundItem = checkIfItemInCart(barcodeInput.value); //Check if the item is already in the cart.

    //If item is already in the cart, update the quantity.
    if(foundItem){
        let quantityDisplay = foundItem.querySelector(".item-quantity"); // Find the element that show the quantity of the item in the cart.
        let oldQuantity = parseInt(quantityDisplay.innerText, 10); //Get the current quantity of this item and change it from text to a number.

        quantityDisplay.innerText = oldQuantity + quantity;//Add the new quantity to the old quantity and update it on the page.

        //Get the price of the item
        let itemPrice = parseFloat(foundItem.querySelector(".item-price").innerText.replace('$', ""));
        //Add that amount to the total price of all items.
        totalPrice += itemPrice * quantity // Multiply the price by the new quantity to get the total price for this item.
        
        //Update the toatl price on the page to show the new total.
        updateTotalDisplay();
    }

    // If the item is not in the cart but exist in the item list add it.
    else if(itemsList.hasOwnProperty(barcode)){
        const itemInfo = itemsList[barcode]; //Get the details of the item using the barcode. 
        

        let itemName = document.createElement("p"); //create a p element to show the item name.
        itemName.textContent = itemInfo.name; //set the name of the item to show on the page. 
        itemName.className = "item-name"; // give it a class name.

        let priceCont = document.createElement("p"); //create a p element to show the items price.
        priceCont.className = "item-price"; // give it a class name.
        priceCont.innerText = "$" + itemInfo.price; //Display the items price with a $.

        let quantityCont = document.createElement("p"); // create a p element to show the quantity of the same items that are added.
        quantityCont.className = "item-quantity"; // give the quantitycont a class name.
        quantityCont.textContent = quantityInput.value; // Set the quantity to what the user entered.


        let itemDiv = document.createElement("div"); // create a new div to hold the  item details (name,price a quantity.)
        itemDiv.className = "itemDiv"; // give it a class name 
        itemDiv.appendChild(itemName); // Add the item name to the item div.
        itemDiv.appendChild(priceCont); //Add the item price to the item div.
        itemDiv.appendChild(quantityCont); //Add the item quantity to the item div.

        continerDiv.appendChild(itemDiv); // Add the item div to the continer where all items are shown.
        parentDiv.style.height = "auto"; // make sure that parent div grow in height to fit all the items.

        
        totalPrice += parseFloat(itemInfo.price) + quantity; //Update the total price by adding the price of this item multiplied by the quantity.
        updateTotalDisplay();// Refresh the total price on the page.

        
    }
    //Clear the barcode and quantity input files for the next item.
    barcodeInput.value = ""; 
    quantityInput.value = "";
}

//
function checkIfItemInCart(barcode){
    let cartItems = document.getElementsByClassName("itemDiv"); // Get all the items that are already in the cart.

    //For Loop to go inside of each item in the cart.
    for(let i = 0; i < cartItems.length; i++){
        let scannedItemName = itemsList[barcode].name; // Get the name of the item that was scanned using its barcode.
        let currentItemName = cartItems[i].querySelector(".item-name"); // Get the name of the current item in the cart.

        //Check if the scanned item name matches the current item name in the cart.
        if(scannedItemName === currentItemName.innerText){
            
            return cartItems[i]; // If they match return the item div. 
        }
    }

    return null; // If not match is founded return null, that mean that the item is not found it.
}

// 
function showGrandTotal(){
    const taxRate = 9.25 / 100; //Set the tax rate to 9.25.
    const taxAmount = totalPrice * taxRate; // Calculate the amount of tax baseon the total price.
    const grandTotal = totalPrice + taxAmount; //Calculate the grand total . sum the total price + tax amount.

    let grandTotalElement = document.createElement("p"); //Create a p Element to show the grand total
    grandTotalElement.className = "grandTotal"; // give it a class name.
    //Set the text of the paragraph to display the grand total with tax included.
    grandTotalElement.innerText = "Your grand total (including tax, 9.25%) is $" + grandTotal.toFixed(2);
    
    //Add the grand total to the continer to show it on the page.
    continer.appendChild(grandTotalElement);
}

//When the button is clicked it wil trigger the scanItem function
button.addEventListener("click", scanItem);