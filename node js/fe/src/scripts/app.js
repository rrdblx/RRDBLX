const homeTpl = require('./views/home.html')
const positionTpl = require('./views/position.html')
const positionAddTpl = require('./views/position.add.html')
const positionUpdateTpl = require('./views/position.update.html')
const userinfoTpl = require('./views/userinfo.html')
//用户是否登录过
verifySignin()


$('.sidebar-menu li[link]').on('click',function(){
  
  
  
  
  
  
  
  
  
  
  let map = new Map()
  map.set('home.html',homeTpl)
  map.set('position.html',positionTpl)
  
  $('.content').html(map.get($(this).attr('link')))
  if($(this).attr('link')==='position.html'){
     renderTable()
  }

   $(this).addClass('active').siblings().removeClass('active')
  })
  
$('.content').on('click','#addbtn',function(){
  $('.content').html(positionAddTpl)
})

$('.content').on('click','.pos-edit',function(){
  //从数据库里将id为当前职位的信息取出来，回填给表格
  let posid = $(this).attr('posid')
  $.ajax({
    url:'/api/position/' + posid,
    success:(result)=>{
      
      let html= template.render(positionUpdateTpl, {
        data:result.data
      })
      $('.content').html(html)
    }
  })
  
})

$('.content').on('click','#possubmit',function(){
//   let from = $(this).attr('from')
//   let url = from === 'add' ? '/api/position/save' : '/api/position/update'
  
//  let data = $('#possave').serialize()
  

// $.ajax({
//     url,
//     type:'POST',
//     data,
//     success:(result) =>{
//       if(result.ret){
//         renderTable()
//       }else{
//         alert('失败了～')
//       }
//     }
//  })
  let  option ={
    "resetForm":true,
    "dataType":'json',
    "success":(result,stats)=>{
      if(result.ret){
          renderTable()
      }else{
          alert('失败了～')
      }
            
    }
  }
  $('#possave').ajaxSubmit(option)
})
$('.content').on('click','.pos-remove',function(){
  let posid = $(this).attr('posid')
  $.ajax({
    url:'/api/position/remove',
    type:'DELETE',
    data:{
      id:posid
    },
    success:(result) =>{
      if(result.ret){
        renderTable()
      }else{
        alert('失败了～')
      }
    }
 })
})
$('.content').on('click', '#possearch', function(){
  let keywords = $('.keywords').val()
  $.ajax({
    url: '/api/position/search',
    type: 'POST',
    data: {
      keywords
    },
    success: (result) => {
      if (result.ret) {
        let html = template.render(positionTpl, {
          data: result.data
        })
  
        $('.content').html(html)
      } else {
        alert('失败了~')
      }
    }
  })
})
$('.content').on('click','#posback',function(){
  renderTable()
})

function renderTable(){
  $('.content').html(positionTpl)
  let token = localStorage.getItem('token')
  $.ajax({
    url:'/api/position/find',
    dataType:'JSON',
    headers:{
       'X-Access-Token':token
    },
    success:(result)=>{
      if(result.ret){
        let html = template.render(positionTpl,{
        data: result.data
        })
        $('.content').html(html)
      }else{
        $('.sidebar-menu li[link="home.html"]').click()
      }
    }  
    
  })
}
     
  //       let trs =  result.data.map((value,index)=>{
  //        return `
  //        <tr>
  //        <td>${index+1}</td>
  //        <td><img width="50" height="50" src="https://www.lgstatic.com/i/image3/M00/12/AF/CgpOIFpu7ROAU0UaAAAvwWv_H_w082.jpg" alt=""></td>
  //        <td>${value.companyName}</td>
  //        <td>${value.positionName}</td>
  //        <td>${value.city}</td>
  //        <td>${value.createTime}</td>
  //        <td>${value.salary}</td>
  //        <td>
  //          <button class="btn btn-sm btn-primary pos-edit" posid="{{$value._id}}"><span class="fa fa-edit"></span> 修改</button>
  //          <button class="btn btn-sm btn-danger pos-remove" posid="{{$value._id}}" filename="{{$value.companyLogo}}"><span class="fa fa-remove"></span> 删除</button>
  //        </td>
  //      </tr>
  //        `
         
  //       }).join()
         
  
// renderTable()


//用户登录注册
const greeting = 'hello'
const isSignin = false
renderTpl({greeting,isSignin})
$('#click-btn').off('click').on('click',(e)=>{
  if($(e.target).attr('id')==='btn-signup'){
    $('#user-submit').off('click').on('click',async()=>{
       let { username, password}={
         username:$('#username').val(),
         password:$('#password').val()
       }

       let result = await sign({username,password},'signup')
       
         alert(result.data)
         $('#username').val('')
      $('#password').val('')
       
     })
   }else{
     $('#user-submit').off('click').on('click',async()=>{
       let {username, password}={
         username:$('#username').val(),
         password:$('#password').val()
       }
       let result = await sign({username,password},'signin')
       if(result.ret){
         //将token保存到localstorage
        localStorage.setItem('token',result.data.token)
        
        renderTpl({
          greeting:'您好，'+result.data.username,
          isSignin:true
        })
        $('#username').val('')
        $('#password').val('')
        
        //用户注销
   $('#user-signout').off('click').on('click',function(){
    localStorage.removeItem('token')
    renderTpl({
      greeting:'',
      isSignin:false
    })
  })
        
      }
      
      })
   }
  
})
//用户登录认证
function verifySignin(){
  let token = localStorage.getItem('token')
  $.ajax({
    url:'/api/users/issignin',
    type:'POST',
    headers:{
      'X-Access-Token':token
    },
    success(result){
      if(result.ret){
        renderTpl({
          greeting:'您好,'+ result.data.username,
          isSignin:true
        })
      }
      
    }
  })
}





function sign (data,uri){
  return $.ajax({
    url:'/api/users/' + uri,
    type:'post',
    data,
    success:result => result
  })
}

function renderTpl({greeting, isSignin}){
  let html = template.render(userinfoTpl,{
    greeting, isSignin
  })
  $('.user-menu').html(html)

}


