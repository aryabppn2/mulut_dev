const express=require('express');
const http=express();
const url=require('fs');
const port=7000;


http.set('view engine','ejs');
http.use(express.urlencoded({extended:true}));

///databases connect//
const get_accountDB=url.readFileSync('databases/account.json','utf-8');
const get_prgDb=url.readFileSync('databases/paragraf.json','utf-8');


//route config//
//get//
http.get('/mulut.com',function(req,res){
    res.render('beranda-first',{
        title:'beranda',
        paragraf:JSON.parse(get_prgDb)
    })
})
http.get('/login-page',function(req,res){
    res.render('login-page',{title:'login-page'})
})
http.get('/input/:id',function(request,respont){
    const get_id=request.params.id
    const account_id=account(get_id);
   respont.render('input-prg',{title:' input paragraf ',data:account_id[0]})
})


http.get('/sign-up-option',function(request,respont){
    respont.render('sign-up-page',{title:'sign-up'})
})

http.get('/first-page/:id',function(request,respont){
    const get_id=request.params.id;
    const get_account=account(get_id);
    
    respont.render('first-page',{
        data:get_account[0],
        paragraf:get_paragrafAccount(get_id,JSON.parse(get_prgDb))
    
    
    
    }    
        
        )
})

http.get('/beranda/:id',function(request,respont){
    const get_userId=request.params.id;
    
    respont.render('beranda',{
        title:'beranda',
        paragraf:JSON.parse(get_prgDb),
        account:account(get_userId)[0]
    })

})

http.get('/setting/:id',function(request,respont){
    const get_id=request.body.id;
    respont.render('setting-account',{
        title:'setting akun',
        old_account:account(get_id)[0]
    })
})


//post//

http.post('/sent-account-data',function(request,respont){
    const data_input={
        username:request.body.username_input,
        password:request.body.password_input,
        location:request.body.input_location,
        account_id:`${request.body.username_input}byId${request.body.password_input}`
    }
    accoundDb_Insert(data_input);
    respont.redirect('/login-page')

})
http.post('/get-account',function(request,respont){
    const requst_id={
        username:request.body.username_input,
        password:request.body.password_input
    };
    const get_id=`${requst_id.username}byId${requst_id.password}`
    const get_account=account(get_id)
    const get_paragraf=get_paragrafAccount(get_id,JSON.parse(get_prgDb))
    respont.render('first-page',{
        data:get_account[0],
        paragraf:get_paragraf
    
    }
    )

})

http.post('/post-prg',function(request,response){
    const input_prgdata={
        userId:request.body.user_id,
        userName:request.body.user_name,
        title:request.body.input_title,
        id_prg:`${request.body.input_title}BySend${request.body.user_id}`,
        prg:{
            _:request.body.input_prg,
            _1:request.body.input_prg1,
            _2:request.body.input_prg2,
            _3:request.body.input_prg3
        }
    }

   
   Insert_data(input_prgdata,JSON.parse(get_prgDb));

   response.render('first-page',{
    data:account(input_prgdata.userId)[0],
    paragraf:get_paragrafAccount(input_prgdata.userId,JSON.parse(get_prgDb))
    
}
) 
    
})



http.post('/search-data/:id',function(request,respont){
    const search_input=request.body.search_input;
    const findPrg=find_paragraf(search_input,JSON.parse(get_prgDb))
    respont.render('beranda',{
        title:search_input+'menamilkan',
        paragraf:findPrg,
        account:account(request.params.id)[0],

    })

})
http.post('/search-data',function(request,respont){
    const search_input=request.body.search_input;
    const findPrg=find_paragraf(search_input,JSON.parse(get_prgDb))
    respont.render('beranda',{
        title:search_input+'menamilkan',
        paragraf:findPrg,

    })
})

//data management system//
function accoundDb_Insert(account_data){
    const accountDb_url=JSON.parse(get_accountDB);
    accountDb_url.push(account_data);
    url.writeFileSync('databases/account.json',JSON.stringify(accountDb_url))

}
function account(id){
    const account_url=JSON.parse(get_accountDB)
    const find=account_url.filter(ip=>ip.account_id.includes(id))
    return find
}


function Insert_data(data,json){
   json.push(data);
   url.writeFileSync('databases/paragraf.json',JSON.stringify(json))
}

function get_paragrafAccount(input,prg_json){
const get_filter=prg_json.filter(flt=>flt.userId.includes(input));
return get_filter
}

function find_prgData(get,json){
    const prg_filter=json.filter(data=>data.id_prg)
    return prg_filter
}


// machine learning//
function find_paragraf(get,json){
    const data_filter=json.filter(datas=>datas.title.includes(get));
    return data_filter
}



http.listen(port,function(){
    console.log('berhasil terkoneksi dengan:localhost:'+port+'/mulut.com')
})




