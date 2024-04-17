


function accoundDb_Insert(account_data,json,url){
    json.push(account_data);
    url.writeFileSync('mongodb/account.json',JSON.stringify(json))

}
function account(json,id){
  const find=json.filter(ip=>ip.account_id.includes(id))
    return find
}


function Insert_data(data,json,url){
   json.push(data);
   url.writeFileSync('mongodb/paragraf.json',JSON.stringify(json))
}
function post_coment(data,json,url){
    json.push(data);
    url.writeFileSync('mongodb/coment.json',JSON.stringify(json))

}

function sent_chatData(json,data,url){
    json.push(data);
    url.writeFileSync('mongodb/chat_db.json',JSON.stringify(json))
}


function account(json,id){
   const find=json.filter(data=>data.account_id.includes(id))
   return find
}
function get_paragrafAccount(input,prg_json){
const get_filter=prg_json.filter(flt=>flt.userId.includes(input));
return get_filter
}

function getUpdate_location(json,account_id,new_data,url){
   const filter_data=json.filter(address => address.account_id !== account_id);
filter_data.push(new_data);

url.writeFileSync('mongodb/account.json',JSON.stringify(filter_data))


}



function qoutes(json,id){
    const datas_filter=json.filter(data=>data.id_prg.includes(id));
    return datas_filter
}

function find_coment(json,qoutes_name){
    const get_comentFilter=json.filter(datas=>datas.qoutes_id.includes(qoutes_name))
    return get_comentFilter
}


function find_othersPrg(id,json){
    const prg_filter=json.filter(prg=>prg.userId.includes(id));
    return prg_filter
}

function findChat(datas,chat_id){
    const data=datas.filter(data=>data.chatId.includes(chat_id));
    return data
}

function findChat_fromUser(json,address){
    const data_sent=json.filter(get=>get.user_id.includes(address));
    return data_sent
}
function findChat_toUser(json,address){
    const data_sent=json.filter(get=>get.target_id.includes(address));
    return data_sent
}

module.exports={accoundDb_Insert,account,getUpdate_location,Insert_data,get_paragrafAccount,find_othersPrg,qoutes,post_coment,
    find_coment,sent_chatData,findChat,findChat_toUser,findChat_fromUser}
