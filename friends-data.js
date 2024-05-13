
function add_friendList(user_id,datas,target_data,url){
    datas.filter(target_data=>target_data.account_id.includes(user_id))[0].friends_list.push(target_data);

    url.writeFileSync('mongodb/account.json',JSON.stringify(datas))
}


function friends_find(name,datas){
    const friends=datas.filter(dat=>dat.target_name.includes(name))
    return friends
}

module.exports={add_friendList,friends_find}