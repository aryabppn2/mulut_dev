const url=require('fs');

// databases connec//
const connec_db=url.readFileSync('mongodb/account.json','utf-8');




const get_data=JSON.parse(connec_db);


const filter=get_data.filter(data=>data.username.includes("Maktiek"))[0]



console.log(filter)



