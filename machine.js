function find_paragraf(get,json){
    const data_filter=json.filter(datas=>datas.qoutes_value.includes(get));
    
    return data_filter
}
function get_annacouments(input,datas){
    const annacoument_filter=datas.filter(data_title=>data_title.annacoument_title.includes(input))
    return annacoument_filter
}


function Find_account(input,json){
    const acount_filter=json.filter(account=> account.username.includes(input));
    return acount_filter
}


module.exports={find_paragraf,get_annacouments,Find_account}