


function accoundDb_Insert(account_data,json,url){
    json.push(account_data);
    url.writeFileSync('mongodb/account.json',JSON.stringify(json))

}
function account(json,id){
    json.filter(ip=>ip.account_id.includes(id))
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



function account(json,id){
    const find=json.filter(ip=>ip.account_id.includes(id))
    return find
}
function get_paragrafAccount(input,prg_json){
const get_filter=prg_json.filter(flt=>flt.userId.includes(input));
return get_filter
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





module.exports={accoundDb_Insert,account,Insert_data,get_paragrafAccount,find_othersPrg,qoutes,post_coment,find_coment}
