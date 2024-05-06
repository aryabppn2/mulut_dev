function add_friends(datas,user_id,friends_data,url){
    datas.filter(user_data=>user_data.account_id.includes(user_id))[0].friends.push(friends_data)

    url.writeFileSync('mongodb/account.json',JSON.stringify(datas))

}
function add_friendList(datas,target_id,user_data,url){
    datas.filter(target_data=>target_data.account_id.includes(target_id))[0].friends_list.push(user_data);

    url.writeFileSync('mongodb/account.json',JSON.stringify(datas))
}




module.exports={add_friends,add_friendList}