function post_comentAnnacoument(id,datas,data,url){
    datas.filter(get=>get.annacoument_id.includes(id))[0].coments.push(data);
    url.writeFileSync('mongodb/annacoument.json',JSON.stringify(datas))

}

function ann_coment(id,datas){
    const get_filter=datas.filter(dat=>dat.annacoument_id.includes(id))
    return get_filter[0].coments
}




module.exports={post_comentAnnacoument,ann_coment}