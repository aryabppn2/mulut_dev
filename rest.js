const express=require('express');
const http=express();
const url=require('fs');
const port=7000;
//configue file system//
const {accoundDb_Insert,account,Insert_data,get_paragrafAccount,
    find_othersPrg,qoutes,post_coment,find_coment,sent_chatData,findChat}=require('./crud.js')

const {find_paragraf,Find_account}=require('./machine.js')



http.set('view engine','ejs');
http.use(express.urlencoded({extended:true}));

///databases connect//
const get_accountDB=url.readFileSync('mongodb/account.json','utf-8');
const get_prgDb=url.readFileSync('mongodb/paragraf.json','utf-8');
const coment_db_url=url.readFileSync('mongodb/coment.json','utf-8');
const chatDB_url=url.readFileSync('mongodb/chat_db.json','utf-8')


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
    const account_id=account(JSON.parse(get_accountDB),get_id);
   respont.render('input-prg',{title:'tambah qoutes ',data:account_id[0]})
})


http.get('/sign-up-option',function(request,respont){
    respont.render('sign-up-page',{title:'sign-up'})
})

http.get('/first-page/:id',function(request,respont){
    const get_id=request.params.id;
    const get_account=account(JSON.parse(get_accountDB),get_id);
    
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
        account:account(JSON.parse(get_accountDB),get_userId)[0]
    })

})
http.get('/orang-lain/:user_id',function(request,respont){
    const call_allAccount=JSON.parse(get_accountDB);
    respont.render('orang-lain-views',{
        title:'orang lain',
        all_account:call_allAccount,
        account:account(JSON.parse(get_accountDB),request.params.user_id)[0]
    })
})

http.get('/setting/:account_id',function(request,respont){
    const get_id=request.params.account_id;
    const get_account=account(JSON.parse(get_accountDB),get_id);
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
        user_account:account(JSON.parse(get_accountDB),get_id.user),
        others_account:account(JSON.parse(get_accountDB),get_id.others),
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


http.get('/open-coment/:qoutes_id/:user_id',function(request,respont){
  const get_id={
    user:request.params.user_id,
    qoutes:request.params.qoutes_id
  };
  const find_data={
       account:account(JSON.parse(get_accountDB),get_id.user),
       qoutes:qoutes(JSON.parse(get_prgDb),get_id.qoutes),
  }
  const get_coment=find_coment(JSON.parse(coment_db_url),find_data.qoutes[0].id_prg)
  respont.render('prg-detail',{
   title:'membaca '+find_data.qoutes[0].qoutes_title,
   link_back:`/first-page/${find_data.account[0].account_id}`,
   qoutes_data:find_data.qoutes[0],
   user_data:find_data.account[0],
   post_method:'/post-coment',
   coments:get_coment
   



  })
})


http.get('/open-coment-beranda/:qoutes_id/:user_id',function(request,respont){
    const get_id={
        user:request.params.user_id,
        qoutes:request.params.qoutes_id
      };
      const find_data={
           account:account(JSON.parse(get_accountDB),get_id.user),
           qoutes:qoutes(JSON.parse(get_prgDb),get_id.qoutes)
      }
      const get_coment=find_coment(JSON.parse(coment_db_url),find_data.qoutes[0].id_prg)
      respont.render('prg-detail',{
       title:'membaca '+find_data.qoutes[0].qoutes_title,
       link_back:`/beranda/${find_data.account[0].account_id}`,
       qoutes_data:find_data.qoutes[0],
       user_data:find_data.account[0],
       post_method:`/post-coment-beranda/${get_id.user}/${get_id.qoutes}`,
       coments:get_coment
    
    
    
    
      })
    })


    http.get('/open-coment-others/:qoutes_id/:user_id/:others_id',function(request,respont){
        const get_id={
            user:request.params.user_id,
            qoutes:request.params.qoutes_id,
            others:request.params.others_id
          };
          const find_data={
               account:account(JSON.parse(get_accountDB),get_id.user),
               qoutes:qoutes(JSON.parse(get_prgDb),get_id.qoutes),
               others_account:account(JSON.parse(get_accountDB),get_id.others)
          }
          const get_coment=find_coment(JSON.parse(coment_db_url),find_data.qoutes[0].id_prg)
          respont.render('prg-detail',{
           title:'membaca '+find_data.qoutes[0].qoutes_title,
           link_back:`/others-content/${find_data.others_account[0].account_id}/${find_data.account[0].account_id}`,
           qoutes_data:find_data.qoutes[0],
           user_data:find_data.account[0],
            post_method:`/post-coment-others/${get_id.others}/${get_id.user}/${get_id.qoutes}`,
           coments:get_coment
    
        
        
          })
    })
   
http.get('/open-chat-system/:user_ip/:target_ip',function(request,respont){
    const get_ip={
        user:request.params.user_ip,
        target:request.params.target_ip
    };
    const get_account={
        user:account(JSON.parse(get_accountDB),get_ip.user),
        target:account(JSON.parse(get_accountDB),get_ip.target)
    }
   const chat_id={
    user:`chat_sent-${get_account.user}-to${get_account.target}`,
    target:`chat_sent-${get_account.target}-to${get_account.user}`
   }
respont.render('chat-system',{
    title:'chating dengan '+get_account.target[0].username,
    chat_room_system:`/chat-SentAt/${get_account.user[0].account_id}/${get_account.target[0].account_id}`,
    userName:get_account.user[0].username,
    targetName:get_account.target[0].username,
    userId:get_account.user[0].account_id,
    targetId:get_account.target[0].account_id,
    user_chat:findChat(JSON.parse(chatDB_url),chat_id.user),
    target_chat:findChat(JSON.parse(chatDB_url), chat_id.target),
    date:new Date(),

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
    accoundDb_Insert(data_input,JSON.parse(get_accountDB),url);
    respont.redirect('/login-page')

})
http.post('/get-account',function(request,respont){
    const requst_id={
        username:request.body.username_input,
        password:request.body.password_input
    };
    const get_id=`${requst_id.username}byId${requst_id.password}`
    const get_account=account( JSON.parse(get_accountDB),get_id)
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
        carry:{
            time:request.body.input_release_date,
            location:request.body.location
        },
        qoutes_title:request.body.input_qoutes_title,
        id_prg:`${request.body.input_qoutes_title}BySend${request.body.user_id}`,
        qoutes:request.body.input_qoutes
    }

   
   Insert_data(input_prgdata,JSON.parse(get_prgDb),url);

   response.redirect('/first-page/'+input_prgdata.userId)
    
})



http.post('/search-data/:id',function(request,respont){
    const search_input=request.body.search_input;
    const findPrg=find_paragraf(search_input,JSON.parse(get_prgDb))
    respont.render('beranda',{
        title:search_input+'menamilkan',
        paragraf:findPrg,
        account:account(JSON.parse(get_accountDB),request.params.id)[0],

    })

})
http.post('/search-get',function(request,respont){
    const input_search=request.body.search_input;
    const findPrg=find_paragraf(input_search,JSON.parse(get_prgDb))
    respont.render('beranda-first',{
        title:input_search+' menampilkan',
        paragraf:findPrg
    })
})

http.post('/searchAccount/:account_id',function(request,respont){
    const search_input=request.body.search_input;
    const get_account=Find_account(search_input,JSON.parse(get_accountDB));
    respont.render('orang-lain-views',{
        title:search_input+'menampilkan',
        all_account:get_account,
        account:account(JSON.parse(get_accountDB),request.params.account_id)[0]
    })
})

http.post('/search-data/',function(request,respont){
    const search_input=request.body.search_input;
    const findPrg=find_paragraf(search_input,JSON.parse(get_prgDb))
    respont.render('beranda',{
        title:search_input+'menamilkan',
        paragraf:findPrg,

    })
})

http.post('/post-coment',function(request,respont){
    const coment_input={
       username:request.body.username_input,
       userId:request.body.userId_input,
       qoutes_id:request.body.qoutesId_input,
       coment_Value:request.body.input_coment

    }
    post_coment(coment_input,JSON.parse(coment_db_url),url)
   

    respont.redirect(`/open-coment/${coment_input.qoutes_id}/${coment_input.userId}`)
  

})

http.post('/post-coment-beranda/:user_id/:qoutes_id',function(request,respont){
    const coment_input={
        username:request.body.username_input,
        userId:request.body.userId_input,
        qoutes_id:request.body.qoutesId_input,
        coment_Value:request.body.input_coment
 
     }
     post_coment(coment_input,JSON.parse(coment_db_url),url)    
 respont.redirect('/open-coment-beranda/'+coment_input.qoutes_id+'/'+coment_input.userId)
    
})

http.post('/post-coment-others/:others_id/:user_id/:qoutes_id',function(request,respont){
    const coment_input={
        username:request.body.username_input,
        userId:request.body.userId_input,
        qoutes_id:request.body.qoutesId_input,
        coment_Value:request.body.input_coment
 
     }
     post_coment(coment_input,JSON.parse(coment_db_url),url)
     respont.redirect('/open-coment-others/'+request.params.qoutes_id+'/'+request.params.user_id+'/'+request.params.others_id)
   
})

http.post('/chat-SentAt/:user_id/:target_id',function(request,respont){
    const get_id={
        user:request.params.user_id,
        target:request.params.target_id

    }
const chat_id=`chat_sent-${get_id.user}-to${get_id.target}`;
const chat_input={
    chatId:chat_id,
    user_name:request.body.input_userName,
    date:request.body.input_date,
    chat_value:request.body.input_chat_value
}

sent_chatData(JSON.parse(chatDB_url),chat_input,url)


})


http.listen(port,function(){
    console.log('berhasil terkoneksi dengan:localhost:'+port+'/mulut.com')
})




