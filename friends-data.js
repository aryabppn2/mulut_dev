
function add_friendList(datas,userCondition,targetCondition,url){
    datas.filter(dat=>dat.account_id.includes(userCondition.userId))[0].friends_list.push(userCondition.targetData);
    datas.filter(fr=>fr.account_id.includes(targetCondition.target))[0].friends.push(targetCondition.user_data)
    
    url.writeFileSync('mongodb/account.json',JSON.stringify(datas))
}


function friends_find(name,datas){
    const friends=datas.filter(dat=>dat.user_name.includes(name))
    return friends
}



function Myfriends_find(name,datas){
    const get=datas.filter(data=>data.user_name.includes(name));

    return get
}

module.exports={add_friendList,friends_find,Myfriends_find}