const express=require('express');
const http=express();
const url=require('fs');
const port=7000;


http.set('view engine','ejs');
http.use(express.urlencoded({extended:true}));

///databases connect//
const get_accountDB=url.readFileSync('mongodb/account.json','utf-8');
const get_prgDb=url.readFileSync('mongodb/paragraf.json','utf-8');
const get_chat=url.readFileSync('mongodb/chat_db.json','utf-8')

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
http.get('/orang-lain/:user_id',function(request,respont){
    const call_allAccount=JSON.parse(get_accountDB);
    respont.render('orang-lain-views',{
        title:'orang lain',
        all_account:call_allAccount,
        account:account(request.params.user_id)[0]
    })
})

http.get('/setting/:account_id',function(request,respont){
    const get_id=request.params.account_id;
    const get_account=account(get_id);
    respont.render('setting-account',{
      title:'setting-account',
      account:get_account[0]
    }
    )
})
http.get('/others-content/:others_id/:user_id',function(request,respont){
    const get_id={
        user:request.params.user_id,
        others:request.params.others_id
    };

    
  
    const find={
        user_account:account(get_id.user),
        others_account:account(get_id.others),
        others_content:find_othersPrg(get_id.others,JSON.parse(get_prgDb)),
    }
    respont.render('others-content',{
        title:'kontent  dari'+find.others_account[0].username,
        user:find.user_account[0].account_id,
        others:find.others_account[0].account_id,
        othersName:find.others_account[0].username,
        othersLocation:find.others_account[0].location,
        others_content:find.others_content
    })
})

http.get('/others-chat/:target_ip/:user_ip',function(request,respont){
    const get_ip={
        user:request.params.user_ip,
        target:request.params.target_ip
    }
const getAccount={
    user:account(get_ip.user)[0],
    target:account(get_ip.target)[0]
}

 respont.render('chatapp',{
    title:'chat dengan '+getAccount.target.username,
    targetName:getAccount.target.username,
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

http.post('/searchAccount/:account_id',function(request,respont){
    const search_input=request.body.search_input;
    const get_account=Find_account(search_input,JSON.parse(get_accountDB));
    respont.render('orang-lain-views',{
        title:search_input+'menampilkan',
        all_account:get_account,
        account:account(request.params.account_id)[0]
    })
})
http.post('/sent-chat',function(request,respont){
    const chatData_input={
        chat_address:request.body.chat_address,
        user_address:request.body.userName,
        target_address:request.body.targetName,
        chat_value:request.body.chat_input
    }
    SENTCHATDATA(JSON.parse(get_chat),chatData_input)
console.log(JSON.parse(get_chat))



})
//data management system//
function accoundDb_Insert(account_data){
    const accountDb_url=JSON.parse(get_accountDB);
    accountDb_url.push(account_data);
    url.writeFileSync('mongodb/account.json',JSON.stringify(accountDb_url))

}
function account(id){
    const account_url=JSON.parse(get_accountDB)
    const find=account_url.filter(ip=>ip.account_id.includes(id))
    return find
}


function Insert_data(data,json){
   json.push(data);
   url.writeFileSync('mongodb/paragraf.json',JSON.stringify(json))
}

function SENTCHATDATA(json,chat_data){
    json.push(chat_data);
    url.writeFileSync('mongodb/chat_db.json',JSON.stringify(json))

}


function account(id){
    const account_url=JSON.parse(get_accountDB)
    const find=account_url.filter(ip=>ip.account_id.includes(id))
    return find
}
function get_paragrafAccount(input,prg_json){
const get_filter=prg_json.filter(flt=>flt.userId.includes(input));
return get_filter
}


function find_othersPrg(id,json){
    const prg_filter=json.filter(prg=>prg.userId.includes(id));
    return prg_filter
}

function gettingChatData(chat_address){
  const chat_url=JSON.parse(get_chat)
    const get_chatDatas=chat_url.filter(datas=>datas.chataddress.includes(chat_address));
     return get_chatDatas
}


// machine learning//
function find_paragraf(get,json){
    const data_filter=json.filter(datas=>datas.title.includes(get));
    return data_filter
}

function Find_account(input,json){
    const acount_filter=json.filter(account=> account.username.includes(input));
    return acount_filter
}



http.listen(port,function(){
    console.log('berhasil terkoneksi dengan:localhost:'+port+'/mulut.com')
})




