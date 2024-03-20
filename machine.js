function find_paragraf(get,json){
    const data_filter=json.filter(datas=>datas.qoutes_title.includes(get));
    
    return data_filter
}

function Find_account(input,json){
    const acount_filter=json.filter(account=> account.username.includes(input));
    return acount_filter
}


module.exports={find_paragraf,Find_account}