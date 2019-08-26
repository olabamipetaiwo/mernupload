let isEquivalent = require("../functions/functions")
// var config =require("./config/config");


// console.log(config);
// const localDb = config.localMongoURI;
// console.log(localDb);

var contacts = [
    {
        type: "personal",
        _id: "5d616745b72877776c94147e",
         name: "dami1", 
         email: "dami1@gmail.com",
         user: "5d5bebc10b75e61934ec19e8"
   }
];

var newc = [
    {
        type: "personal",
        _id: "5d616745b72877776c94147e",
         name: "dami1", 
         email: "dami1@gmail.com",
         user: "5d5bebc10b75e61934ec19e8"
   },
    {
        type: "professional",
        _id: "5d616732b72877776c94147d",
        name: "oreofewilliams",
        email: "oreofewilliams@gmail.com",
       user: "5d5bebc10b75e61934ec19e8"
   }
];

newc.map((c) => {
    // contacts.push(c);
    // if(contacts.includes(c)) {
    //     console.log("Item Exists",c)
    // }else {
    //     console.log("Item does not Exists:Add",c);
    // }
    // if (contacts.some(contact => contact == c)) {
    //     console.log("Item Exists",c)
    // }else {
    //     console.log("Item  does not Exists",c)
    // }
    // contacts.map((contact) => {
    //     let mainContact = contact;
    //     let mainC = c;
    //     if(Object.is(mainContact,mainC)) {
    //         console.log(typeof(mainContact)," Item Exists",typeof(mainC))
    //     }else {
    //         console.log(typeof(mainContact)," Item does not Exists",typeof(mainC))
    //     }
    // });

    contacts.map((contact) => {
            if(isEquivalent(contact,c)) {
                console.log(contact," Item Exists",c)
            }else {
                console.log(contact," Item does not Exists",c)
            }
        });
   
});
console.log("////////////////////////////////////////////////////////////");
