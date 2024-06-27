const express=require('express');
const http=express();
const url=require('fs');
const port=7000;
//configue local file system//
const {accoundDb_Insert,account,getUpdate_location,Insert_qoutesData,insert_annacoumentData,get_qoutesAccount,get_userAnnacoument,delete_qoutes,
    find_othersPrg,get_annacoumentData,qoutes,get_updateAnnacoument,
    DELETE_ANNACOUMENT}=require('./crud.js')    

const {find_paragraf,get_annacouments,Find_account,get_chatListSearch}=require('./machine.js')
const {logo_design}=require('./logo.js')
const {add_friendList,friends_find,Myfriends_find}= require('./friends-data.js')
const {post_comentAnnacoument,ann_coment}=require('./coment-data.js')
const {sent_chatData,get_chattingData,remove_chats}=require('./chat-management.js')



http.set('view engine','ejs');
http.use(express.urlencoded({extended:true}));
http.use( express.static('public') );

///databases connect//
const get_accountDB=url.readFileSync('mongodb/account.json','utf-8');
const get_prgDb=url.readFileSync('mongodb/paragraf.json','utf-8');
const anncoument_db=url.readFileSync('mongodb/annacoument.json','utf-8');

//get//
http.get('/mulut.com',function(req,res){
    res.render('beranda-first',{
        title:'beranda',
        paragraf:JSON.parse(get_prgDb),
        annacouments:JSON.parse(anncoument_db),
        logo:logo_design
    })
})
http.get('/login-page',function(req,res){
    res.render('login-page',{
        title:'login-page',
        username:'masukan username',
        password:'masukan pasword',
        logo:logo_design
    }
    )
})
http.get('/input/:id',function(request,respont){
    const get_id=request.params.id
    const time=new Date()
   respont.render('input-data',{
    page:'add-qoutes',
    logo:logo_design,
    title:'tambah qoutes ',
    data:account(JSON.parse(get_accountDB),get_id)[0],

    hours:time.getHours(),
    minutes:time.getMinutes(),

})
})


http.get('/sign-up-option',function(request,respont){
    respont.render('sign-up-page',{title:'sign-up',logo:logo_design})
})

http.get('/first-page/:id',function(request,respont){
    const get_id=request.params.id;
    const get_account=account(JSON.parse(get_accountDB),get_id);
    
    respont.render('first-page',{
        logo:logo_design,
        data:get_account[0],
        paragraf:get_qoutesAccount(get_id,JSON.parse(get_prgDb)),
        annacoument_user:get_userAnnacoument(get_id,JSON.parse(anncoument_db))
    
    
    
    }    
        
        )
})
http.get('/open-qoutes/:qoutes_id/:user_id',function(input,output){
    const id={
        user:input.params.user_id,
        qoutes:input.params.qoutes_id
    }
    const data={
        user:account(JSON.parse(get_accountDB),id.user)[0],
        qoutes:qoutes(JSON.parse(get_prgDb),id.qoutes)[0]
    }

    output.render('qoutes-detail',{
        page:'first-page',
        username:data.user.username,
        userId:id.user,
        qoutes_id:id.qoutes,
        data:data.qoutes
    })
})
http.get('/open-qoutes-beranda/:user_id/:qoutes_id',function(input,output){
    const id={
        user:input.params.user_id,
        qoutes:input.params.qoutes_id
    }
    const data={
        user:account(JSON.parse(get_accountDB),id.user)[0],
        qoutes:qoutes(JSON.parse(get_prgDb),id.qoutes)[0]
    }

    output.render('qoutes-detail',{
        page:'beranda',
        username:data.user.username,
        userId:id.user,
        qoutes_id:id.qoutes,
        data:data.qoutes
    })
})

http.get('/beranda/:id',function(request,respont){
    const get_userId=request.params.id;
    
    respont.render('beranda',{
        page:"semua",
        logo:logo_design,
        title:'beranda',
        paragraf:JSON.parse(get_prgDb),
        annacouments:JSON.parse(anncoument_db),
        account:account(JSON.parse(get_accountDB),get_userId)[0]
    })

})

http.get('/qoutes-navigation/:user_id',function(request,respont){
    const get_id=request.params.user_id;
    const get_account=account(JSON.parse(get_accountDB),get_id)[0]
    respont.render('beranda',{
        page:"qoutes",
        paragraf:JSON.parse(get_prgDb),
        account:get_account
    })
})
http.get('/annacoument-navigation/:user_id',function(request,respont){
    const get_id=request.params.user_id;
    const get_data=account(JSON.parse(get_accountDB),get_id)
    
respont.render('beranda',{
    page:"ann",
    title:'pengumuman',
    account:get_data[0],
    annacouments:JSON.parse(anncoument_db)
    
})

})



http.get('/orang-lain/:user_id',function(request,respont){
    const call_allAccount=JSON.parse(get_accountDB);
    respont.render('beranda',{
        page:'orang-lain',
        logo:logo_design,
        title:'orang lain',
        all_account:call_allAccount,
        account:account(JSON.parse(get_accountDB),request.params.user_id)[0]
    })
})

http.get('/setting/:account_id',function(request,respont){
    const get_id=request.params.account_id;
    const get_account=account(JSON.parse(get_accountDB),get_id);
    respont.render('setting-account',{
     logo:logo_design,
      title:'setting-account',
      account:get_account[0]
    }
    )
})
http.get('/add-annacoument-page/:user_id',function(request,respont){
    const get_id=request.params.user_id;
    const get_account=account(JSON.parse(get_accountDB),get_id);
    respont.render('input-data',{
        page:"add-ann",
        title:'tambah pengumuman',
        username:get_account[0].username,
        user_id:get_account[0].account_id
    })
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
        others_annacoument:get_userAnnacoument(get_id.others,JSON.parse(anncoument_db))
    }
    respont.render('others-content',{
        title:'kontent  dari'+find.others_account[0].username,
        user:find.user_account[0].account_id,
        others:find.others_account[0].account_id,
        userName:find.user_account[0].username,
        othersName:find.others_account[0].username,
        othersLocation:find.others_account[0].location,
        others_content:find.others_content,
        others_annacouments:find.others_annacoument
    })
})
http.get('/friends-list/:user_id',function(input,output){
    const user_id=input.params.user_id;
    const user_account=account(JSON.parse(get_accountDB),user_id)

    output.render('friends-page',{
        title:'kenalan',
        friends:user_account[0].friends_list,
        username:user_account[0].username,
        userId:user_account[0].account_id,
    })
})
http.get('/friends/:user_id',function(input,output){
    const user_id=input.params.user_id;
    const user_account=account(JSON.parse(get_accountDB),user_id)

    output.render('friends-page',{
        title:'dikenal',
        friends:user_account[0].friends,
        username:user_account[0].username,
        userId:user_account[0].account_id,
    })
})






http.get('/delete-qoutes/:qoutes_id/:user_id',function(request,respont){
    const get_id={
        user:request.params.user_id,
        qoutes:request.params.qoutes_id
    }

    delete_qoutes(JSON.parse(get_prgDb),get_id.qoutes,url)

    respont.redirect('/first-page/'+get_id.user)
})
http.get('/delete-annacoument/:user_id/:annacoument_id',function(request,respont){
   const get_id={
    user:request.params.user_id,
    annacoument:request.params.annacoument_id
   }
   DELETE_ANNACOUMENT(JSON.parse(anncoument_db),get_id.annacoument,url);
   respont.redirect('/first-page/'+get_id.user)
})






http.get('/open-user-annacoument/:user_id/:annacoument_id',function(input,output){
    const get_id={
         user:input.params.user_id,
         annacoument:input.params.annacoument_id
    }
    const get_data={
        user:account(JSON.parse(get_accountDB),get_id.user),
        annacoument:get_annacoumentData(JSON.parse(anncoument_db),get_id.annacoument),

    }
   
    output.render('annacoument-interface-user',{
        title:'melihat :'+get_data.annacoument[0].annacoument_title,
        user_id:get_data.user[0].account_id,
        username:get_data.user[0].username,
        annacoument:get_data.annacoument[0],
        coments:ann_coment(get_id.annacoument,JSON.parse(anncoument_db))
    })
    
})

   
http.get('/open-annacoument/:user_id/:annacoument_id',function(request,respont){
    const get_id={
        user:request.params.user_id,
        annacoument:request.params.annacoument_id
    }
    const get_data={
        user:account(JSON.parse(get_accountDB),get_id.user),
        annacoument:get_annacoumentData(JSON.parse(anncoument_db),get_id.annacoument)[0]
    }
   if(get_data.annacoument.user_id==get_id.user){
    respont.render('annacoument-interface-user',{
        title:'melihat '+get_data.annacoument.annacoument_title,
        user_id:get_data.user[0].account_id,
        username:get_data.user[0].username,
        annacoument:get_data.annacoument,
        coments:ann_coment(get_id.annacoument,JSON.parse(anncoument_db))
    })
   }
   else{
    respont.render('annacoument-detail',{
        title:'melihat :'+get_data.annacoument.annacoument_title,
        user_id:get_id.user,
        username:get_data.user[0].username,
        annacoument:get_data.annacoument,
        link_back:'beranda/'+get_id.user,
        coments:ann_coment(get_id.annacoument,JSON.parse(anncoument_db))

    })
   }
})

http.get('/open-annacoument/:user_id/:target_id/:annacoument_id',function(input,output){
    const get_id={
        user:input.params.user_id,
        target:input.params.target_id,
        annacoument:input.params.annacoument_id

    }
    const get_data={
        user:account(JSON.parse(get_accountDB),get_id.user),
        target:account(JSON.parse(get_accountDB),get_id.target),
        annacoument:get_annacoumentData(JSON.parse(anncoument_db),get_id.annacoument)
    }
    output.render('annacoument-detail',{
        title:'melihat :'+get_data.annacoument[0].annacoument_title,
        user_id:get_id.user,
        username:get_data.user[0].username,
        annacoument:get_data.annacoument[0],
        link_back:'others-content/'+get_id.target+'/'+get_id.user,
        coments:ann_coment(get_id.annacoument,JSON.parse(anncoument_db))

    })
})


http.get('/open-chat-system/:user_ip/:target_ip',function(input,output){
   const id={
       user:input.params.user_ip,
       target:input.params.target_ip
   }
   const get_Useraccount=account(JSON.parse(get_accountDB),id.user);
   const getTagetAccount=account(JSON.parse(get_accountDB),id.target)
   const chat_room=`chat_room:${id.user}To${id.target}`
   output.render('chat-system',{
    title:'chatting '+getTagetAccount[0].username,
    username:get_Useraccount[0].username,
    user_id:id.user,
   targetname:getTagetAccount[0].username,
   target_id:id.target,
   date: new Date(),
   chat_room:chat_room,
   chats:get_chattingData(get_Useraccount[0].chat_list,chat_room)
  })

})



http.get('/list-chat-open/:user_ip',function(input,output){
    const get_id=input.params.user_ip;
    const get_account=account(JSON.parse(get_accountDB),get_id)[0];

  output.render('list-chat',{
    title:'pesan masuk',
    chats:get_account.chat_list,
    user_id:get_account.account_id,
    username:get_account.username,
    chats:get_account.chat_list
})


})

http.get('/delete-chats/:user_id',function(input,output){
    const get_id=input.params.user_id;
    remove_chats(
        get_id,
        JSON.parse(get_accountDB),
        url
    )
    output.redirect('/list-chat-open/'+get_id)
})



//post//

http.post('/sent-account-data',function(request,respont){
    const data_input={
        username:request.body.username_input,
        password:request.body.password_input,
        location:request.body.input_location,
        account_id:`${request.body.username_input}byId${request.body.password_input}`,
        friends:[],
        friends_list:[],
        chat_list:[]
       
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
    const get_account=account(JSON.parse(get_accountDB),get_id)
    const get_paragraf=get_qoutesAccount(get_id,JSON.parse(get_prgDb));
    const get_annacouments=get_userAnnacoument(get_id,JSON.parse(anncoument_db))
    if(requst_id.username==""){
        respont.render('login-page',{
            title:'login-page:error',
            username:'username harus diisi',
            password:'masukan password'        
       
    
    })


    }
else if(requst_id.password==""){
    respont.render('login-page',{
        title:'login-page:error',
        username:'masukan username',
        password:' password haris diIsi'
    
   

})
}

else{
    respont.render('first-page',{
        data:get_account[0],
        paragraf:get_paragraf,
        annacoument_user:get_annacouments

    
   

})
}


}
)

http.post('/post-qoutes',function(input,output){
    
    const get_data={
        username:input.body.input_username,
        userId:input.body.input_userId,
        qoutes_value:input.body.input_qoutes,
        qoutes_id:input.body.input_qoutes+'ById-'+input.body.input_userId,
        carry:{
            hours:input.body.input_hours,
            minutes:input.body.input_minutes,
            location:input.body.input_location
        },
        color:input.body.input_signColor,
        bgcolor:input.body.input_background
    }
    const get_userAccount= account(JSON.parse(get_accountDB),get_data.userId)
    Insert_qoutesData(JSON.parse(get_prgDb),get_data,url)
    output.redirect('/first-page/'+get_userAccount[0].account_id)
})


http.post('/update-data/:user_id',function(request,respont){
    const data=account(JSON.parse(get_accountDB),request.params.user_id)
    const get={
        account_id:request.params.user_id,
        username:request.body.username,
        password:request.body.password,
        location:request.body.location_update_input,
        friends_list:data[0].friends_list,
        friends:data[0].friends,
        chat_list:data[0].chat_list
        
    }
    getUpdate_location(JSON.parse(get_accountDB),get.account_id,get,url);
    respont.redirect('/first-page/'+get.account_id)
})



http.post('/post-annacoument',function(request,respont){
    const data_get={
        username:request.body.input_username,
        user_id:request.body.input_userId,
        annacoument_title:request.body.input_title,
        annacoument_id:`annacoument_${request.body.input_title}ById${request.body.input_username}`,
        carry:{
            date:request.body.input_date,
            time:request.body.input_time,
             place:request.body.input_location,
        },
        annacoument_value:request.body.input_annacoumentValue,
        coments:[]
    }
    insert_annacoumentData(data_get,JSON.parse(anncoument_db),url)
    respont.redirect('/first-page/'+data_get.user_id)
})

http.post('/annacoument-update',function(input,output){
    const get_data={
        username:input.body.input_username,
        user_id:input.body.input_userId,
        annacoument_title:input.body.input_annacoumentTitle,
        annacoument_id:input.body.input_annacoumentId,
        annacoument_value:input.body.new_annacoument_value,
        carry:{
            date:input.body.new_date,
            time:input.body.new_time,
            place:input.body.new_place
        },
        coments:[]
    }
    get_updateAnnacoument(JSON.parse(anncoument_db),get_data,get_data.annacoument_id,url)
    output.redirect('/open-user-annacoument/'+get_data.user_id+'/'+get_data.annacoument_id)
})




   



//search data//

http.post('/search-data/:id',function(request,respont){
    const search_input=request.body.search_input;
    const findPrg=find_paragraf(search_input,JSON.parse(get_prgDb));
    const find_annacoument=get_annacouments(search_input,JSON.parse(anncoument_db))
    respont.render('beranda',{
        page:"semua",
        title:search_input+'menamilkan',
        paragraf:findPrg,
        annacouments:find_annacoument,
        account:account(JSON.parse(get_accountDB),request.params.id)[0],

    })

})
http.post('/search-get',function(request,respont){
    const input_search=request.body.search_input;
    const findPrg=find_paragraf(input_search,JSON.parse(get_prgDb));
    const annacouments_find=get_annacouments(input_search,JSON.parse(anncoument_db))
    respont.render('beranda-first',{
        title:input_search+' menampilkan',
        paragraf:findPrg,
        annacouments:annacouments_find
    })
})

http.post('/searchAccount/:account_id',function(request,respont){
    const search_input=request.body.search_input;
    const get_account=Find_account(search_input,JSON.parse(get_accountDB));
    respont.render('beranda',{
        page:"orang-lain",
        title:search_input+'menampilkan',
        all_account:get_account,
        account:account(JSON.parse(get_accountDB),request.params.account_id)[0]
    })
})


http.post('/search_qoutes_input/:user_id',function(input,output){
    const get={
        user_id:input.params.user_id,
        search_input:input.body.search_input
    }
    const get_qoutes=find_paragraf(get.search_input,JSON.parse(get_prgDb))
   output.render('beranda',{
    page:"qoutes",
     title:get.search_input+' menampilkan',
     paragraf:get_qoutes,
     account:account(JSON.parse(get_accountDB),get.user_id)[0]
     
   })


})

http.post('/search-annacouments/:user_id',function(input,output){
    const get={
        user_id:input.params.user_id,
        search_input:input.body.search_annacoument_input
    }
    const get_annacoument=get_annacouments(get.search_input,JSON.parse(anncoument_db))
    output.render('beranda',{
        page:"ann",
        title:get.search_input +' menampilkan',
        annacouments:get_annacoument,
        account:account(JSON.parse(get_accountDB),get.user_id)[0]
    })
})


// post coment//


http.post('/post-annacoument-coment',function(request,respont){
    const id={
        user:request.body.userId_input,
        ann:request.body.annacoumentId_input
    }
    const data={
        username:request.body.username_input,
        coment_Value:request.body.input_coment
    }
    post_comentAnnacoument(id.ann,JSON.parse(anncoument_db),data,url);
    respont.redirect('/open-user-annacoument/'+id.user+'/'+id.ann)
})
http.post('/post-annacoument-coment-beranda',function(request,respont){
    const id={
        user:request.body.userId_input,
        ann:request.body.annacoumentId_input
    }
    const data={
        username:request.body.username_input,
        coment_Value:request.body.input_coment
    }
    post_comentAnnacoument(id.ann,JSON.parse(anncoument_db),data,url);
   respont.redirect('/open-annacoument/'+id.user+'/'+id.ann)
})

http.post('/sent-chat',function(input,output){
    const id={
       user:input.body.input_userId,
       target:input.body.input_targetId
    }
    const data={
        user:account(JSON.parse(get_accountDB),id.user),
        target:account(JSON.parse(get_accountDB),id.target)
    }
    const  input_chatUser={
        chat_room:`chat_room:${id.user}To${id.target}`,
        name:input.body.get_username,
        user_id:id.user,
        chat_value:input.body.input_chat_text,
        chat_time:input.body.time_get,
        targetname:data.target[0].username,
        target_id:id.target
        
    }
    const  input_chatTarget={
        chat_room:`chat_room:${id.target}To${id.user}`,
        name:input.body.get_username,
        user_id:id.user,
        chat_value:input.body.input_chat_text,
        chat_time:input.body.time_get
    }
    sent_chatData(
     JSON.parse(get_accountDB),
     {
        username:data.user[0].username,
        user_id:id.user,
        data:input_chatUser  
     },
     {
        username:data.target[0].username,
        user_id:id.target,
        data:input_chatTarget
     },
     url


    )
    output.redirect(`/open-chat-system/${id.user}/${id.target}`)
})

http.post('/search-chat-list',function(input,output){
    const data={
        user_id:input.body.user_id,
        search:input.body.input_search
    }
    const acc=account(JSON.parse(get_accountDB),data.user_id)[0]
    output.render('list-chat',{
        title:'pesan masuk',
        chats:get_chatListSearch(acc.chat_list,data.search),
        user_id:acc.account_id,
        username:acc.username
    })
    
    
})

http.post('/get-friends-data',function(input,output){
    const get_id={
        user:input.body.get_userId,
        target:input.body.get_targetId
    }
    const  data={
        user:account(JSON.parse(get_accountDB),get_id.user),
        target:account(JSON.parse(get_accountDB),get_id.target)
    }
    add_friendList(
    JSON.parse(get_accountDB),
    {
        userId:get_id.user,
        targetData:{
            user_id:data.target[0].account_id,
            user_name:data.target[0].username
        }
    },
    {
        target:get_id.target,
        user_data:{
            user_id:data.user[0].account_id,
            user_name:data.user[0].username
        }
    },
    url


    )
    output.redirect('/others-content/'+get_id.target+'/'+get_id.user)

})
http.post('/search-friends',function(input,output){
    const get={
        user_id:input.body.user_id,
        search_input:input.body.input_search
    }
    const user_account=account(JSON.parse(get_accountDB),get.user_id)
    output.render('friends-page',{
        title:'menampilkan :'+get.search_input,
        friends:friends_find(get.search_input,user_account[0].friends_list),
        username:user_account[0].username,
        userId:user_account[0].account_id
    })
})
http.post('/search-myfriends',function(input,output){
   const get={
     user_id:input.body.user_id,
     search:input.body.input_search
   }
   const get_data=account(JSON.parse(get_accountDB),get.user_id)[0];
   output.render('friends',{
    title:'menampilkan :'+get.search,
    friends:Myfriends_find(get.search,get_data.friends),
    username:get_data .username,
    userId:get_data.account_id

   })
})




http.listen(port,function(){
    console.log('berhasil terkoneksi dengan:localhost:'+port+'/mulut.com')
})




