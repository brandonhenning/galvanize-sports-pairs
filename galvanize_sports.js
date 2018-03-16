var data = require("./objects");
var inventory = data.inventory;
var shoppingCart = data.shoppingCart;


function findItemInShoppingCartById(itemId) {
    return shoppingCart.filter((item) => {
        return item.itemId === itemId
    })[0]
}

function findItemInInventoryById(itemId) {
    return inventory.filter((item) => {
        return item.id === itemId
    })[0]
}

function addItem(itemId, quantity){
    if (quantity > findItemInInventoryById(itemId).quantityAvailable) {
        quantity = findItemInInventoryById(itemId).quantityAvailable
    }
    findItemInShoppingCartById(itemId).quantity += quantity
    findItemInInventoryById(itemId).quantityAvailable -= quantity
}

function removeItem(itemId, quantity){
    if (quantity > findItemInShoppingCartById(itemId).quantity) {
        quantity = findItemInShoppingCartById(itemId).quantity
    }
    findItemInShoppingCartById(itemId).quantity -= quantity
    findItemInInventoryById(itemId).quantityAvailable += quantity
}

function getCheckoutSubtotal(){
    var checkoutSubtotal = 0.00;
    shoppingCart.forEach((item) => {
        let itemSub = findItemInInventoryById(item.itemId)
        checkoutSubtotal += (itemSub.price * item.quantity)
    })
    return checkoutSubtotal;
}

function getTax(subtotal, rate){
    var tax = 0.00;
    tax += (subtotal * rate)
    return tax;
}

function getCheckoutTotal(){
    var TAX_RATE = 0.078;
    var checkoutTotal = 0.00;
    let subtotal = getCheckoutSubtotal()
    checkoutTotal += (subtotal * TAX_RATE)
    checkoutTotal += subtotal
    return checkoutTotal.toFixed(2);
}


module.exports = {
    inventory,
    shoppingCart,
    addItem,
    removeItem,
    getCheckoutSubtotal,
    getTax,
    getCheckoutTotal,
    findItemInShoppingCartById,
    findItemInInventoryById
}
