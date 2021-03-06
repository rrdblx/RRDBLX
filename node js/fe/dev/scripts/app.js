/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const homeTpl = __webpack_require__(/*! ./views/home.html */ \"./src/scripts/views/home.html\")\nconst positionTpl = __webpack_require__(/*! ./views/position.html */ \"./src/scripts/views/position.html\")\nconst positionAddTpl = __webpack_require__(/*! ./views/position.add.html */ \"./src/scripts/views/position.add.html\")\nconst positionUpdateTpl = __webpack_require__(/*! ./views/position.update.html */ \"./src/scripts/views/position.update.html\")\nconst userinfoTpl = __webpack_require__(/*! ./views/userinfo.html */ \"./src/scripts/views/userinfo.html\")\n//用户是否登录过\nverifySignin()\n\n\n$('.sidebar-menu li[link]').on('click',function(){\n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  let map = new Map()\n  map.set('home.html',homeTpl)\n  map.set('position.html',positionTpl)\n  \n  $('.content').html(map.get($(this).attr('link')))\n  if($(this).attr('link')==='position.html'){\n     renderTable()\n  }\n\n   $(this).addClass('active').siblings().removeClass('active')\n  })\n  \n$('.content').on('click','#addbtn',function(){\n  $('.content').html(positionAddTpl)\n})\n\n$('.content').on('click','.pos-edit',function(){\n  //从数据库里将id为当前职位的信息取出来，回填给表格\n  let posid = $(this).attr('posid')\n  $.ajax({\n    url:'/api/position/' + posid,\n    success:(result)=>{\n      \n      let html= template.render(positionUpdateTpl, {\n        data:result.data\n      })\n      $('.content').html(html)\n    }\n  })\n  \n})\n\n$('.content').on('click','#possubmit',function(){\n//   let from = $(this).attr('from')\n//   let url = from === 'add' ? '/api/position/save' : '/api/position/update'\n  \n//  let data = $('#possave').serialize()\n  \n\n// $.ajax({\n//     url,\n//     type:'POST',\n//     data,\n//     success:(result) =>{\n//       if(result.ret){\n//         renderTable()\n//       }else{\n//         alert('失败了～')\n//       }\n//     }\n//  })\n  let  option ={\n    \"resetForm\":true,\n    \"dataType\":'json',\n    \"success\":(result,stats)=>{\n      if(result.ret){\n          renderTable()\n      }else{\n          alert('失败了～')\n      }\n            \n    }\n  }\n  $('#possave').ajaxSubmit(option)\n})\n$('.content').on('click','.pos-remove',function(){\n  let posid = $(this).attr('posid')\n  $.ajax({\n    url:'/api/position/remove',\n    type:'DELETE',\n    data:{\n      id:posid\n    },\n    success:(result) =>{\n      if(result.ret){\n        renderTable()\n      }else{\n        alert('失败了～')\n      }\n    }\n })\n})\n$('.content').on('click', '#possearch', function(){\n  let keywords = $('.keywords').val()\n  $.ajax({\n    url: '/api/position/search',\n    type: 'POST',\n    data: {\n      keywords\n    },\n    success: (result) => {\n      if (result.ret) {\n        let html = template.render(positionTpl, {\n          data: result.data\n        })\n  \n        $('.content').html(html)\n      } else {\n        alert('失败了~')\n      }\n    }\n  })\n})\n$('.content').on('click','#posback',function(){\n  renderTable()\n})\n\nfunction renderTable(){\n  $('.content').html(positionTpl)\n  let token = localStorage.getItem('token')\n  $.ajax({\n    url:'/api/position/find',\n    dataType:'JSON',\n    headers:{\n       'X-Access-Token':token\n    },\n    success:(result)=>{\n      if(result.ret){\n        let html = template.render(positionTpl,{\n        data: result.data\n        })\n        $('.content').html(html)\n      }else{\n        $('.sidebar-menu li[link=\"home.html\"]').click()\n      }\n    }  \n    \n  })\n}\n     \n  //       let trs =  result.data.map((value,index)=>{\n  //        return `\n  //        <tr>\n  //        <td>${index+1}</td>\n  //        <td><img width=\"50\" height=\"50\" src=\"https://www.lgstatic.com/i/image3/M00/12/AF/CgpOIFpu7ROAU0UaAAAvwWv_H_w082.jpg\" alt=\"\"></td>\n  //        <td>${value.companyName}</td>\n  //        <td>${value.positionName}</td>\n  //        <td>${value.city}</td>\n  //        <td>${value.createTime}</td>\n  //        <td>${value.salary}</td>\n  //        <td>\n  //          <button class=\"btn btn-sm btn-primary pos-edit\" posid=\"{{$value._id}}\"><span class=\"fa fa-edit\"></span> 修改</button>\n  //          <button class=\"btn btn-sm btn-danger pos-remove\" posid=\"{{$value._id}}\" filename=\"{{$value.companyLogo}}\"><span class=\"fa fa-remove\"></span> 删除</button>\n  //        </td>\n  //      </tr>\n  //        `\n         \n  //       }).join()\n         \n  \n// renderTable()\n\n\n//用户登录注册\nconst greeting = 'hello'\nconst isSignin = false\nrenderTpl({greeting,isSignin})\n$('#click-btn').off('click').on('click',(e)=>{\n  if($(e.target).attr('id')==='btn-signup'){\n    $('#user-submit').off('click').on('click',async()=>{\n       let { username, password}={\n         username:$('#username').val(),\n         password:$('#password').val()\n       }\n\n       let result = await sign({username,password},'signup')\n       \n         alert(result.data)\n         $('#username').val('')\n      $('#password').val('')\n       \n     })\n   }else{\n     $('#user-submit').off('click').on('click',async()=>{\n       let {username, password}={\n         username:$('#username').val(),\n         password:$('#password').val()\n       }\n       let result = await sign({username,password},'signin')\n       if(result.ret){\n         //将token保存到localstorage\n        localStorage.setItem('token',result.data.token)\n        \n        renderTpl({\n          greeting:'您好，'+result.data.username,\n          isSignin:true\n        })\n        $('#username').val('')\n        $('#password').val('')\n        \n        //用户注销\n   $('#user-signout').off('click').on('click',function(){\n    localStorage.removeItem('token')\n    renderTpl({\n      greeting:'',\n      isSignin:false\n    })\n  })\n        \n      }\n      \n      })\n   }\n  \n})\n//用户登录认证\nfunction verifySignin(){\n  let token = localStorage.getItem('token')\n  $.ajax({\n    url:'/api/users/issignin',\n    type:'POST',\n    headers:{\n      'X-Access-Token':token\n    },\n    success(result){\n      if(result.ret){\n        renderTpl({\n          greeting:'您好,'+ result.data.username,\n          isSignin:true\n        })\n      }\n      \n    }\n  })\n}\n\n\n\n\n\nfunction sign (data,uri){\n  return $.ajax({\n    url:'/api/users/' + uri,\n    type:'post',\n    data,\n    success:result => result\n  })\n}\n\nfunction renderTpl({greeting, isSignin}){\n  let html = template.render(userinfoTpl,{\n    greeting, isSignin\n  })\n  $('.user-menu').html(html)\n\n}\n\n\n\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/views/home.html":
/*!*************************************!*\
  !*** ./src/scripts/views/home.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>    欢迎光临拉勾网管理系统!    <img src=\\\".././static/images/h1.png\\\" alt=\\\"\\\"></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/home.html?");

/***/ }),

/***/ "./src/scripts/views/position.add.html":
/*!*********************************************!*\
  !*** ./src/scripts/views/position.add.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">  <div class=\\\"box-header with-border\\\">    <h3 class=\\\"box-title\\\">职位添加</h3>  </div>  <!-- /.box-header -->  <!-- form start -->  <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position/save\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">    <div class=\\\"box-body\\\">      <div class=\\\"form-group\\\">        <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>        <div class=\\\"col-sm-10\\\">          <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\"></textarea>        </div>      </div>    </div>    <!-- /.box-body -->    <div class=\\\"box-footer\\\">      <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>      <button type=\\\"button\\\" from=\\\"add\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>    </div>    <!-- /.box-footer -->  </form></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.add.html?");

/***/ }),

/***/ "./src/scripts/views/position.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/position.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box\\\">  <div class=\\\"box-header with-border\\\">    <h3 class=\\\"box-title\\\">       <button id=\\\"addbtn\\\" class=\\\"btn btn-block btn-success\\\"><span class=\\\"fa fa-plus\\\"></span> 添加</button>    </h3>    <div class=\\\"box-tools\\\">      <div class=\\\"input-group input-group-sm\\\" style=\\\"width: 150px;\\\">        <input type=\\\"text\\\" value=\\\"\\\" name=\\\"pos_search\\\" class=\\\"form-control pull-right keywords\\\" placeholder=\\\"搜索\\\">        <div class=\\\"input-group-btn\\\">          <button type=\\\"button\\\" id=\\\"possearch\\\" class=\\\"btn btn-default\\\"><i class=\\\"fa fa-search\\\"></i></button>        </div>      </div>    </div>  </div>  <!-- /.box-header -->  <div class=\\\"box-body\\\">    <table  class=\\\"table table-bordered\\\">      <tr id=\\\"pos_first_tr\\\">        <th style=\\\"width: 10px\\\">#</th>        <th>公司Logo</th>        <th>公司名称</th>        <th>职位名称</th>        <th>工作地点</th>        <th>发布时间</th>        <th>岗位薪资</th>        <th style=\\\"width: 140px\\\">操作</th>      </tr>      {{each data}}        <tr>          <td>{{$index+1}}</td>          <td><img width=\\\"50\\\" height=\\\"50\\\" src=\\\"http://localhost:3000/uploads/{{$value.companyLogo}}\\\" alt=\\\"\\\"></td>          <td>{{$value.companyName}}</td>          <td>{{$value.positionName}}</td>          <td>{{$value.city}}</td>          <td>{{$value.createTime}}</td>          <td>{{$value.salary}}</td>          <td>            <button class=\\\"btn btn-sm btn-primary pos-edit\\\" posid=\\\"{{$value._id}}\\\"><span class=\\\"fa fa-edit\\\"></span> 修改</button>            <button class=\\\"btn btn-sm btn-danger pos-remove\\\" posid=\\\"{{$value._id}}\\\" filename=\\\"{{$value.companyLogo}}\\\"><span class=\\\"fa fa-remove\\\"></span> 删除</button>          </td>        </tr>        {{/each}}                <!-- <tr>          <td colspan=\\\"8\\\">暂无记录。</td>        </tr> -->    </table>  </div>  </div><!-- /.box -->\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.html?");

/***/ }),

/***/ "./src/scripts/views/position.update.html":
/*!************************************************!*\
  !*** ./src/scripts/views/position.update.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">    <div class=\\\"box-header with-border\\\">      <h3 class=\\\"box-title\\\">职位修改</h3>    </div>    <!-- /.box-header -->    <!-- form start -->    <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">      <div class=\\\"box-body\\\">        <div class=\\\"form-group\\\">          <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" value=\\\"{{data.companyName}}\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" value=\\\"{{data.positionName}}\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" value=\\\"{{data.city}}\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" value=\\\"{{data.salary}}\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" value=\\\"{{data.type}}\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" value=\\\"{{data.experience}}\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" value=\\\"{{data.degree}}\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>            <div class=\\\"col-sm-10\\\">            <textarea rows=\\\"8\\\" cols=\\\"80\\\"  name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\">{{data.description}}</textarea>          </div>        </div>      </div>      <!-- /.box-body -->      <div class=\\\"box-footer\\\">        <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>        <button type=\\\"button\\\" from=\\\"update\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>      </div>      <!-- /.box-footer -->      <input type=\\\"hidden\\\" name=\\\"id\\\" value=\\\"{{data._id}}\\\">    </form>  </div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.update.html?");

/***/ }),

/***/ "./src/scripts/views/userinfo.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/userinfo.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!-- User Account Menu -->  <!-- Menu Toggle Button -->  <a href=\\\"#\\\" class=\\\"dropdown-toggle\\\" data-toggle=\\\"dropdown\\\">    <!-- The user image in the navbar-->    {{if isSignin}}    <img src=\\\"/static/images/user2-160x160.jpg\\\" class=\\\"user-image\\\" alt=\\\"User Image\\\">    <!-- hidden-xs hides the username on small devices so only the image appears. -->    <span class=\\\"hidden-xs\\\">{{greeting}}</span>    {{else}}    <div id=\\\"click-btn\\\">      <span id=\\\"btn-signin\\\">登录</span>      <span id=\\\"btn-signup\\\">注册</span>    </div>    {{/if}}  </a>  <ul class=\\\"dropdown-menu\\\">    <!-- The user image in the menu -->    {{if !isSignin}}    <li class=\\\"user-header\\\" id=\\\"user-header\\\">      <form role=\\\"form\\\">        <div class=\\\"box-body\\\">          <div class=\\\"form-group user\\\">            <label for=\\\"exampleInputEmail1\\\">用户名：</label>            <input type=\\\"text\\\" class=\\\"form-control\\\" id=\\\"username\\\" placeholder=\\\"请输入用户名\\\">          </div>          <div class=\\\"form-group\\\">            <label for=\\\"exampleInputPassword1\\\">密码：</label>            <input type=\\\"password\\\" class=\\\"form-control\\\" id=\\\"password\\\" placeholder=\\\"请输入密码\\\">          </div>        </div>      </form>    </li>    {{else}}    <li class=\\\"user-header\\\">      <img src=\\\"/static/images/user2-160x160.jpg\\\" class=\\\"img-circle\\\" alt=\\\"User Image\\\">    </li>    {{/if}}    <!-- Menu Footer-->    <li class=\\\"user-footer\\\">      <div class=\\\"pull-left\\\">        <a href=\\\"javascript:void(0)\\\" class=\\\"btn btn-default btn-flat\\\">关闭</a>      </div>      {{if !isSignin}}      <div class=\\\"pull-right\\\">        <a href=\\\"javascript:void(0)\\\" id=\\\"user-submit\\\" class=\\\"btn btn-default btn-flat\\\">提交</a>      </div>      {{else}}      <div class=\\\"pull-right\\\">        <a href=\\\"javascript:void(0)\\\" id=\\\"user-signout\\\" class=\\\"btn btn-default btn-flat\\\">退出</a>      </div>      {{/if}}    </li>  </ul>\"\n\n//# sourceURL=webpack:///./src/scripts/views/userinfo.html?");

/***/ })

/******/ });