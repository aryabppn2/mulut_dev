const express=require('express');
const http=express();
const url=require('fs');
const port=7000;
//configue local file system//
const {accoundDb_Insert,account,getUpdate_location,Insert_qoutesData,insert_annacoumentData,get_qoutesAccount,get_userAnnacoument,delete_qoutes,
    find_othersPrg,sent_chatData,
    findChat,findChat_fromUser,findChat_toUser,get_annacoumentData,qoutes,get_updateAnnacoument,
    DELETE_ANNACOUMENT}=require('./crud.js')    

const {find_paragraf,get_annacouments,Find_account}=require('./machine.js')
const {logo_design}=require('./logo.js')
const {add_friendList,friends_find,Myfriends_find}= require('./friends-data.js')
const {post_comentAnnacoument,ann_coment}=require('./coment-data.js')




http.set('view engine','ejs');
http.use(express.urlencoded({extended:true}));

///databases connect//
const get_accountDB=url.readFileSync('mongodb/account.json','utf-8');
const get_prgDb=url.readFileSync('mongodb/paragraf.json','utf-8');
const chatDB_url=url.readFileSync('mongodb/chat_db.json','utf-8');
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
   respont.render('input-prg',{
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



http.get('/beranda/:id',function(request,respont){
    const get_userId=request.params.id;
    
    respont.render('beranda',{
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
    respont.render('qoutes-page',{
        paragraf:JSON.parse(get_prgDb),
        account:get_account
    })
})
http.get('/annacoument-navigation/:user_id',function(request,respont){
    const get_id=request.params.user_id;
    const get_data=account(JSON.parse(get_accountDB),get_id)
    
respont.render('annacoument-page',{
    title:'pengumuman',
    account:get_data[0],
    annacouments:JSON.parse(anncoument_db)
    
})

})

http.get('/orang-lain/:user_id',function(request,respont){
    const call_allAccount=JSON.parse(get_accountDB);
    respont.render('orang-lain-views',{
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
    respont.render('annacoument',{
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

    output.render('friends',{
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
        annacoument:get_annacoumentData(JSON.parse(anncoument_db),get_id.annacoument)
    }
    respont.render('annacoument-detail',{
        title:'melihat :'+get_data.annacoument[0].annacoument_title,
        user_id:get_id.user,
        username:get_data.user[0].username,
        annacoument:get_data.annacoument[0],
        link_back:'beranda/'+get_id.user,
        coments:ann_coment(get_id.annacoument,JSON.parse(anncoument_db))

    })
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
    user:`chat_sent-${get_ip.user}-to${get_ip.target}`,
    target:`chat_sent-${get_ip.target}-to${get_ip.user}`
   } 
  
respont.render('chat-system',{
    title:'chating dengan '+get_account.target[0].username,
    chat_room_system:`/chat-SentAt/${get_account.user[0].account_id}/${get_account.target[0].account_id}`,
    userName:get_account.user[0].username,
    targetName:get_account.target[0].username,
    userId:get_account.user[0].account_id,
    targetId:get_account.target[0].account_id,
    user_chat:findChat(JSON.parse(chatDB_url),chat_id.user),
    target_chat:findChat(JSON.parse(chatDB_url),chat_id.target),
    date:new Date(),

})


})
http.get('/list-chat-open/:user_ip',function(request,respont){
    const get_ip=request.params.user_ip;
    const get_account=account(JSON.parse(get_accountDB),get_ip);
    const get_chatList={
        to_user:findChat_toUser(JSON.parse(chatDB_url),get_account[0].account_id),
        fromUser:findChat_fromUser(JSON.parse(chatDB_url),get_account[0].account_id)
    }
   respont.render('list-chat',{
    title:'daftar chat',
    user_id:get_account[0].account_id,
    username:get_account[0].username,
    target_list:get_chatList.to_user,
    user_list: get_chatList.fromUser

   })
})


//post//

http.post('/sent-account-data',function(request,respont){
    const data_input={
        username:request.body.username_input,
        password:request.body.password_input,
        location:request.body.input_location,
        account_id:`${request.body.username_input}byId${request.body.password_input}`,
        friends:[],
        friends_list:[]
       
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
        friends_list:data[0].friends_list
        
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
    respont.render('orang-lain-views',{
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
   output.render('qoutes-page',{
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
    output.render('annacoument-page',{
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

http.post('/chat-SentAt/:user_id/:target_id',function(request,respont){
    const get_id={
        user:request.params.user_id,
        target:request.params.target_id

    }
const chat_id=`chat_sent-${get_id.user}-to${get_id.target}`;
const chat_input={
    chatId:chat_id,
    user_name:request.body.input_userName,
    target_name:request.body.input_targetName,
    user_id:request.params.user_id,
    target_id:request.params.target_id,
    date:request.body.input_date,
    chat_value:request.body.input_chat_value
}

sent_chatData(JSON.parse(chatDB_url),chat_input,url)
respont.redirect(`/open-chat-system/${get_id.user}/${get_id.target}`)

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




