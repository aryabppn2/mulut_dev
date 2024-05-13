


function accoundDb_Insert(account_data,json,url){
    json.push(account_data);
    url.writeFileSync('mongodb/account.json',JSON.stringify(json))

}


function Insert_qoutesData(datas,data,url){
   datas.push(data);
   url.writeFileSync('mongodb/paragraf.json',JSON.stringify(datas))
}

function insert_annacoumentData(data,json,url){
    json.push(data);
    url.writeFileSync('mongodb/annacoument.json',JSON.stringify(json))
}
function post_comentAnnacoument(data,json,url){
    json.push(data);
    url.writeFileSync('mongodb/annacoumentComent_db.json',JSON.stringify(json))
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
function qoutes(json,id){
    const datas_filter=json.filter(data=>data.id_prg.includes(id));
    return datas_filter
}
function get_annacoumentData(json,id){
    const annacoument_select=json.filter(data=>data.annacoument_id.includes(id));
    return annacoument_select
}
function annacoumentComents(json,id){
    const annacoument_select=json.filter(datas=>datas.annacoument_id.includes(id));
    return annacoument_select
}



function get_qoutesAccount(userId,datas){
const get_filter=datas.filter(flt=>flt.userId.includes(userId));
return get_filter
}

function get_userAnnacoument(id,datas){
    const annacoument_filter=datas.filter(data=>data.user_id.includes(id))
    return annacoument_filter
}

function getUpdate_location(json,account_id,new_data,url){
   const filter_data=json.filter(address => address.account_id !== account_id);
filter_data.push(new_data);

url.writeFileSync('mongodb/account.json',JSON.stringify(filter_data))


}
function get_qoutesUpdate(json,new_qoutes,qoutes_id,url){
    const filter_json=json.filter(data=>data.id_prg !=qoutes_id)
    filter_json.push(new_qoutes)
    url.writeFileSync('mongodb/paragraf.json',JSON.stringify(filter_json))
}
function get_updateAnnacoument(json,data,data_id,url){
    const filter_data=json.filter(get_data=>get_data.annacoument_id !=data_id);
    filter_data.push(data);
    url.writeFileSync('mongodb/annacoument.json',JSON.stringify(filter_data))
}







 function delete_qoutes(json,qoutes_id,url){
    const filter_qoutes=json.filter(dat_id=>dat_id.qoutes_id !=qoutes_id);
    url.writeFileSync('mongodb/paragraf.json',JSON.stringify(filter_qoutes))
}
function DELETE_ANNACOUMENT(json,data_id,url){
      const datas=json.filter(data=>data.annacoument_id !=data_id);
      url.writeFileSync('mongodb/annacoument.json',JSON.stringify(datas))
}


function find_coment(json,qoutes_name){
    const get_comentFilter=json.filter(datas=>datas.qoutes_id.includes(qoutes_name))
    return get_comentFilter
}


function find_othersPrg(id,datas){
    const prg_filter=datas.filter(prg=>prg.userId.includes(id));
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

module.exports={accoundDb_Insert,account,getUpdate_location,Insert_qoutesData,insert_annacoumentData,get_qoutesAccount,get_userAnnacoument,delete_qoutes,find_othersPrg,qoutes,post_coment,
    find_coment,sent_chatData,findChat,findChat_toUser,findChat_fromUser,get_qoutesUpdate,get_annacoumentData,get_updateAnnacoument,DELETE_ANNACOUMENT,annacoumentComents,post_comentAnnacoument}
