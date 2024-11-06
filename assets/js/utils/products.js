import { fetchInternalData } from "./fetch.js"

export const getInventory = async () => {

    let inventory = fetchInternalData("assets/js/json/inventory.json", "inventory");
    return inventory;
}

export const getStockOfProductOrderedBySize = async (productId) => {

    let inventory = await getInventory();

    for (const product of inventory) {
        if (product.productId === productId) {
            return product.sizes;
        }
    };


}

export const isInStock = async (productId, itemData) => {

    let stock = await getStockOfProductOrderedBySize(productId);

    //check if item is currently in stock
    for (let stockBySizeArray of stock) {

        //change size code into size letter
        let sizeLetter;

        switch (stockBySizeArray.size) {
            case 1:
                sizeLetter = "XS";
            break;

            case 2:
                sizeLetter = "S";
            break;

            case 3:
                sizeLetter = "L";
            break;

            case 4:
                sizeLetter = "XL";
            break;
        }

        if (itemData.size === sizeLetter) {

            for (let item of stockBySizeArray.stock){

                if (itemData.color === item.color) {

                    return item.in_stock;
                }   
            };
        }
    }

    return false;
}

//find product by category and name (name separated with "-" instead of blank spaces)
export const findProductByCategoryAndName = async(category, name) => {

    //fetch product data
    let products = await fetchInternalData("assets/js/json/products-list.json", "products");

    //check if any of the categories or the name matches 
    return products.find((product) => {
        return product.categories.some(productCategory => productCategory === category) 
            && product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ /g, '-') === name;
    });
    //(normalize first to wipe special characters -> change to lowercase version -> replace the spaces with "-")
}