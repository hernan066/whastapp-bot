const { List } = require("whatsapp-web.js");

const initializeOrder = (step)=>{
    
    const productsList = new List(
        "Here's our list of products at 50% off",
        "View all products",
        [
          {
            title: "Products list",
            rows: [
              { id: "apple", title: "Apple" },
              { id: "mango", title: "Mango" },
              { id: "banana", title: "Banana" },
            ],
          },
        ],
        "Please select a product"
      );
      client.sendMessage(myGroup.id._serialized, productsList);
}

module.exports = {initializeOrder}