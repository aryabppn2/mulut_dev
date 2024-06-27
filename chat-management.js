
function sent_chatData(account_datas,user_condition,target_condition,url){
    account_datas.filter(acc=>acc.account_id.includes(user_condition.user_id))[0].chat_list.push(user_condition.data)
    account_datas.filter(acc=>acc.account_id.includes(target_condition.user_id))[0].chat_list.push(target_condition.data);

    url.writeFileSync('mongodb/account.json',JSON.stringify(account_datas))
}

function get_chattingData(datas,room){
    const chat=datas.filter(get=>get.chat_room.includes(room));
    return chat
}

function remove_chats(id,datas,url){
    datas.filter(user=>user.account_id.includes(id))[0].chat_list.length =0;
    url.writeFileSync('mongodb/account.json',JSON.stringify(datas))
}








module.exports={sent_chatData,get_chattingData,remove_chats}