(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f2915bf2"],{"1be1":function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"f",(function(){return r})),a.d(t,"g",(function(){return o})),a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"e",(function(){return u})),a.d(t,"c",(function(){return c})),a.d(t,"h",(function(){return d}));a("7f7f");var n=a("f6cd");function i(e){return Object(n["a"])({url:"/role/list",method:"get",params:e})}function r(e){var t=e.name,a=e.memo;return Object(n["a"])({url:"/role/save",method:"post",data:{name:t,memo:a}})}function o(e){return Object(n["a"])({url:"/role/update",method:"post",data:e})}function l(e){return Object(n["a"])({url:"/role/delete",method:"delete",params:{id:e}})}function s(){return Object(n["a"])({url:"/role/all",method:"get"})}function u(e){return Object(n["a"])({url:"/role/permissions",method:"get",params:{id:e}})}function c(){return Object(n["a"])({url:"/role/permission/tree",method:"get"})}function d(e,t){return Object(n["a"])({url:"/role/update/permissions",method:"post",data:{id:e,permissions:t}})}},"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},i=[],r=(a("c5f6"),a("d225")),o=a("b0b4"),l=a("308d"),s=a("6bb5"),u=a("4e2b"),c=a("9ab4"),d=a("60a3"),p=function(e,t,a,n){return e/=n/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)},b=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function m(e){document.documentElement.scrollTop=e,document.body.scrollTop=e}function f(){return document.documentElement.scrollTop||document.body.scrollTop}function h(e,t,a){var n=f(),i=e-n,r=20,o=0,l=void 0===t?500:t,s=function e(){o+=r;var t=p(o,n,i,l);m(t),o<l?b(e):a&&"function"===typeof a&&a()};s()}var g=function(e){function t(){return Object(r["a"])(this,t),Object(l["a"])(this,Object(s["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(o["a"])(t,[{key:"handleSizeChange",value:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&h(0,800)}},{key:"handleCurrentChange",value:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&h(0,800)}},{key:"currentPage",get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},{key:"pageSize",get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}]),t}(d["c"]);Object(c["a"])([Object(d["b"])(Number)],g.prototype,"total",void 0),Object(c["a"])([Object(d["b"])(Number)],g.prototype,"page",void 0),Object(c["a"])([Object(d["b"])(Number)],g.prototype,"limit",void 0),Object(c["a"])([Object(d["b"])(Array)],g.prototype,"pageSizes",void 0),Object(c["a"])([Object(d["b"])(String)],g.prototype,"layout",void 0),Object(c["a"])([Object(d["b"])(Boolean)],g.prototype,"background",void 0),Object(c["a"])([Object(d["b"])(Boolean)],g.prototype,"autoScroll",void 0),Object(c["a"])([Object(d["b"])(Boolean)],g.prototype,"hidden",void 0),g=Object(c["a"])([d["a"]],g);var v=g,y=v,j=(a("6d39"),a("2877")),O=Object(j["a"])(y,n,i,!1,null,"6878ed5c",null);t["a"]=O.exports},"37f4":function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return r}));var n=a("5c96");function i(e,t){Object(n["Notification"])({title:e,message:t,type:"success",duration:2e3})}function r(e,t,a,i,r,o){n["MessageBox"].confirm(t,e,{confirmButtonText:a,cancelButtonText:i,type:"warning"}).then((function(){r&&r()})).catch((function(){o&&o()}))}},"505a":function(e,t,a){},5154:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("d225"),i=function e(t,a){var i=t.required,r=void 0===i||i,o=t.trigger,l=void 0===o?"blur":o,s=t.message,u=void 0===s?"":s;Object(n["a"])(this,e),this.required=r,this.trigger=l,this.message=u,a&&(this.validator=a)}},"6d39":function(e,t,a){"use strict";var n=a("e4e7"),i=a.n(n);i.a},8819:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("d225"),i=function e(){Object(n["a"])(this,e),this.pageSizes=[10,20,30,50],this.layout="total, sizes, prev, pager, next, jumper",this.tableLoading=!1,this.dialogFormVisible=!1,this.dialogStatus="create",this.commonAlign="center",this.labelPosition="right"}},aa77:function(e,t,a){var n=a("5ca1"),i=a("be13"),r=a("79e5"),o=a("fdef"),l="["+o+"]",s="​",u=RegExp("^"+l+l+"*"),c=RegExp(l+l+"*$"),d=function(e,t,a){var i={},l=r((function(){return!!o[e]()||s[e]()!=s})),u=i[e]=l?t(p):o[e];a&&(i[a]=u),n(n.P+n.F*l,"String",i)},p=d.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(u,"")),2&t&&(e=e.replace(c,"")),e};e.exports=d},b997:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return i}));a("7f7f");function n(e){return"edit-".concat(e)}function i(e,t){return e.filter((function(e){return e.name!==t}))}},bc1c:function(e,t,a){"use strict";var n;a.d(t,"a",(function(){return n})),function(e){e["ADD"]="ADD",e["UPDATE"]="UPDATE"}(n||(n={}))},c0a1:function(e,t,a){"use strict";var n=a("505a"),i=a.n(n);i.a},c5f6:function(e,t,a){"use strict";var n=a("7726"),i=a("69a8"),r=a("2d95"),o=a("5dbc"),l=a("6a99"),s=a("79e5"),u=a("9093").f,c=a("11e9").f,d=a("86cc").f,p=a("aa77").trim,b="Number",m=n[b],f=m,h=m.prototype,g=r(a("2aeb")(h))==b,v="trim"in String.prototype,y=function(e){var t=l(e,!1);if("string"==typeof t&&t.length>2){t=v?t.trim():p(t,3);var a,n,i,r=t.charCodeAt(0);if(43===r||45===r){if(a=t.charCodeAt(2),88===a||120===a)return NaN}else if(48===r){switch(t.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+t}for(var o,s=t.slice(2),u=0,c=s.length;u<c;u++)if(o=s.charCodeAt(u),o<48||o>i)return NaN;return parseInt(s,n)}}return+t};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof m&&(g?s((function(){h.valueOf.call(a)})):r(a)!=b)?o(new f(y(t)),a,m):y(t)};for(var j,O=a("9e1e")?u(f):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;O.length>k;k++)i(f,j=O[k])&&!i(m,j)&&d(m,j,c(f,j));m.prototype=h,h.constructor=m,a("2aba")(n,b,m)}},e382:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{attrs:{shadow:"hover"}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-remove":e.removeTab},model:{value:e.activeTab,callback:function(t){e.activeTab=t},expression:"activeTab"}},[a("el-tab-pane",{attrs:{name:"list",closable:!1}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("svg-icon",{attrs:{"icon-class":"list"}}),e._v(" 用户列表")],1),a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"姓名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getList(t)}},model:{value:e.query.name,callback:function(t){e.$set(e.query,"name",t)},expression:"query.name"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:"邮箱",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getList(t)}},model:{value:e.query.email,callback:function(t){e.$set(e.query,"email",t)},expression:"query.email"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:"用户名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.query.username,callback:function(t){e.$set(e.query,"username",t)},expression:"query.username"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.getList}},[e._v("搜索")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.data.tableLoading,expression:"data.tableLoading"}],attrs:{data:e.data.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"50"}}),a("el-table-column",{attrs:{label:"头像",prop:"avatar",width:"100px",align:e.data.commonAlign},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{width:"40px",height:"40px","border-radius":"10px"},attrs:{src:e.row.avatar+"?d="+(new Date).getTime(),alt:"头像"}})]}}])}),a("el-table-column",{attrs:{label:"用户名",prop:"username",width:"200px",align:e.data.commonAlign}}),a("el-table-column",{attrs:{label:"姓名",prop:"name",width:"200px",align:e.data.commonAlign}}),a("el-table-column",{attrs:{label:"邮箱",prop:"email",width:"300px",align:e.data.commonAlign}}),a("el-table-column",{attrs:{label:"性别",prop:"gender",width:"100px",align:e.data.commonAlign},scopedSlots:e._u([{key:"default",fn:function(t){return["男"===t.row.gender?a("el-tag",{attrs:{type:"success"}},[e._v("男")]):a("el-tag",{attrs:{type:"warning"}},[e._v("女")])]}}])}),a("el-table-column",{attrs:{label:"创建人",width:"150px",align:e.data.commonAlign},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                        "+e._s(t.row["creatorName"])+"\n                    ")]}}])}),a("el-table-column",{attrs:{label:"创建时间",prop:"createTime",width:"200px",align:e.data.commonAlign}}),a("el-table-column",{attrs:{label:"操作",align:e.data.commonAlign,"min-width":"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button-group",[a("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.handleUpdate(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.openUpdateRoleDialog(t.row)}}},[e._v("分配角色")]),a("el-button",{attrs:{type:"danger"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")])],1)]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.query.total>e.query.pageSize,expression:"query.total > query.pageSize"}],attrs:{total:e.query.total,page:e.query.page,limit:e.query.pageSize},on:{"update:page":function(t){return e.$set(e.query,"page",t)},"update:limit":function(t){return e.$set(e.query,"pageSize",t)},pagination:e.getList}})],1),a("el-tab-pane",{attrs:{name:"add",closable:!1}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("svg-icon",{attrs:{"icon-class":"add"}}),e._v(" 新增")],1),a("user-form",{attrs:{type:"ADD"},on:{"handle-update":e.saveHandle}})],1),e._l(e.tabs,(function(t,n){return a("el-tab-pane",{key:n,attrs:{name:t.name,closable:""}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("svg-icon",{attrs:{"icon-class":"edit"}}),e._v(" "+e._s(t.label))],1),a("user-form",{attrs:{obj:t.obj,type:"UPDATE"},on:{"handle-update":e.updateHandle}})],1)}))],2),a("el-dialog",{attrs:{visible:e.dialogUpdateRoleVisible,title:"编辑角色"},on:{"update:visible":function(t){e.dialogUpdateRoleVisible=t}}},[a("el-transfer",{attrs:{"filter-method":e.filterRole,data:e.roles,props:{key:"id",label:"name"},titles:["待选角色","已选角色"],filterable:"","filter-placeholder":"请输入角色名称"},model:{value:e.userRole.roleIdList,callback:function(t){e.$set(e.userRole,"roleIdList",t)},expression:"userRole.roleIdList"}}),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogUpdateRoleVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.updateRole}},[e._v("保存")])],1)],1)],1)},i=[],r=(a("7f7f"),a("d225")),o=a("b0b4"),l=a("308d"),s=a("6bb5"),u=a("4e2b"),c=a("9ab4"),d=a("60a3"),p=a("bc3a"),b=a.n(p),m=a("333d"),f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"dataForm",attrs:{rules:e.rules,model:e.obj,"label-position":e.data.labelPosition,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{staticClass:"input",attrs:{placeholder:"用户名",maxlength:"64"},model:{value:e.obj.username,callback:function(t){e.$set(e.obj,"username",t)},expression:"obj.username"}})],1),a("el-form-item",{attrs:{label:"姓名",prop:"name"}},[a("el-input",{staticClass:"input",attrs:{placeholder:"姓名",maxlength:"20"},model:{value:e.obj.name,callback:function(t){e.$set(e.obj,"name",t)},expression:"obj.name"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{staticClass:"input",attrs:{placeholder:"邮箱",rows:6,maxlength:"128"},model:{value:e.obj.email,callback:function(t){e.$set(e.obj,"email",t)},expression:"obj.email"}})],1),a("el-form-item",{attrs:{label:"性别",prop:"gender"}},[a("el-radio-group",{model:{value:e.obj.gender,callback:function(t){e.$set(e.obj,"gender",t)},expression:"obj.gender"}},[a("el-radio-button",{attrs:{label:"男"}}),a("el-radio-button",{attrs:{label:"女"}})],1)],1),a("el-form-item",{attrs:{label:"头像",prop:"avatar"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{"show-file-list":!1,"auto-upload":!1,"on-change":e.avatarChange,action:"https://jsonplaceholder.typicode.com/posts/"}},[e.obj.avatar?a("img",{staticClass:"avatar",attrs:{src:e.obj.avatar,alt:""}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v(e._s(e.label))]),a("el-button",{on:{click:e.cancel}},[e._v("重置")])],1)],1)},h=[],g=function e(){Object(r["a"])(this,e),this.id="",this.name="",this.username="",this.email="",this.gender="男",this.avatar="",this.roleIdList=[]},v=a("5d52"),y=a("5154"),j=a("8819"),O=a("f6cd");function k(e){return Object(O["a"])({url:"/user/list",method:"get",params:e})}function w(e){return Object(O["a"])({url:"/user/save",method:"post",data:e})}function x(e){return Object(O["a"])({url:"/user/update",method:"post",data:e})}function _(e){return Object(O["a"])({url:"/user/delete",method:"delete",params:{id:e}})}function S(e,t){return Object(O["a"])({url:"/user/isUsernameExist",method:"get",params:{id:e,username:t}})}function T(e){return Object(O["a"])({url:"/user/roleIdList",method:"get",params:{id:e}})}function A(e){return Object(O["a"])({url:"/user/updateRole",method:"post",data:e})}var E,L=a("bc1c"),I=E=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(l["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.data=new j["a"],e.rules={name:[{required:!0,trigger:"blur",message:"请输入姓名"}],username:[new y["a"]({message:"用户名不能为空"}),new y["a"]({},e.validateUsername)],email:[new y["a"]({message:"邮箱不能为空"}),new y["a"]({},E.validateEmail)]},e}return Object(u["a"])(t,e),Object(o["a"])(t,[{key:"created",value:function(){console.info(this.type)}},{key:"validateUsername",value:function(e,t,a){S(this.obj.id,t).then((function(e){e.data.isExist?a(new Error("用户名已存在")):a()}))}},{key:"avatarChange",value:function(e){this.img=e.raw,this.obj.avatar=URL.createObjectURL(e.raw)}},{key:"createFormData",value:function(){var e=new FormData;return e.append("id",this.obj.id),e.append("name",this.obj.name),e.append("username",this.obj.username),e.append("email",this.obj.email),e.append("gender",this.obj.gender),e.append("avatar",this.obj.avatar),this.img&&e.append("img",this.img),e}},{key:"submit",value:function(){var e=this;this.$refs.dataForm.validate((function(t){t&&(e.$emit("handle-update",e.createFormData()),e.type===L["a"].ADD&&e.$refs.dataForm.resetFields())}))}},{key:"cancel",value:function(){this.$refs.dataForm.resetFields()}},{key:"label",get:function(){switch(this.type){case L["a"].ADD:return"新增";case L["a"].UPDATE:return"修改"}}}],[{key:"validateEmail",value:function(e,t,a){Object(v["b"])(t)?a():a(new Error("邮箱格式不正确"))}}]),t}(d["c"]);Object(c["a"])([Object(d["b"])({default:function(){return new g}})],I.prototype,"obj",void 0),Object(c["a"])([Object(d["b"])({required:!0})],I.prototype,"type",void 0),I=E=Object(c["a"])([d["a"]],I);var q=I,R=q,N=(a("c0a1"),a("2877")),$=Object(N["a"])(R,f,h,!1,null,"5af7dd7c",null),C=$.exports,D=a("1be1"),U=a("37f4"),z=function e(){Object(r["a"])(this,e),this.page=1,this.pageSize=20,this.total=0,this.name="",this.username="",this.email=""},F=a("b997"),P=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(l["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.activeTab="list",e.query=new z,e.data=new j["a"],e.roles=[],e.userRole={id:"",roleIdList:[]},e.dialogUpdateRoleVisible=!1,e.tabs=[],e}return Object(u["a"])(t,e),Object(o["a"])(t,[{key:"created",value:function(){this.getList()}},{key:"search",value:function(){this.query.page=1,this.getList()}},{key:"getList",value:function(){var e=this;this.data.tableLoading=!0,k(this.query).then((function(t){var a=t.data;e.data.list=a.rows,e.query.total=a.total,e.data.tableLoading=!1}))}},{key:"saveHandle",value:function(e){var t=this;w(e).then((function(e){t.editSuccess(e.data.message),t.activeTab="list"}))}},{key:"handleUpdate",value:function(e){var t=e.id,a=e.name,n=e.username,i=e.email,r=e.gender,o=e.avatar,l=e.roleIdList,s=this.tabs.filter((function(e){return e.name==="edit-".concat(t)}));if(0===s.length){var u={name:Object(F["a"])(t),label:"编辑-".concat(a),obj:{id:t,name:a,username:n,email:i,gender:r,avatar:o,roleIdList:l}};this.tabs.push(u),this.activeTab=u.name}else this.activeTab=s[0].name}},{key:"updateHandle",value:function(e){var t=this;x(e).then((function(e){t.editSuccess(e.data.message),t.removeTab(t.activeTab),t.activeTab="list"}))}},{key:"removeTab",value:function(e){this.activeTab===e&&(this.activeTab="list"),this.tabs=Object(F["b"])(this.tabs,e)}},{key:"editSuccess",value:function(e){Object(U["b"])("成功",e),this.data.dialogFormVisible=!1,this.getList()}},{key:"handleDelete",value:function(e){var t=this,a=this;Object(U["a"])("删除提示","".concat(e.name,"将会被删除"),"确定","取消",(function(){_(e.id).then((function(n){Object(U["b"])("成功",n.data.message),a.tabs=Object(F["b"])(t.tabs,Object(F["a"])(e.id)),a.getList()}))}))}},{key:"filterRole",value:function(e,t){if(t.name)return t.name.indexOf(e)>-1}},{key:"openUpdateRoleDialog",value:function(e){var t=this;b.a.all([Object(D["d"])(),T(e.id)]).then(b.a.spread((function(a,n){t.roles=a.data,t.userRole={roleIdList:n.data,id:e.id},t.dialogUpdateRoleVisible=!0})))}},{key:"updateRole",value:function(){var e=this;A(this.userRole).then((function(t){Object(U["b"])("成功",t.data.message),e.dialogUpdateRoleVisible=!1,e.getList(),e.userRole={id:"",roleIdList:[]}}))}}]),t}(d["c"]);P=Object(c["a"])([Object(d["a"])({components:{Pagination:m["a"],UserForm:C}})],P);var V=P,B=V,M=Object(N["a"])(B,n,i,!1,null,"79af435c",null);t["default"]=M.exports},e4e7:function(e,t,a){},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-f2915bf2.f29e4ee5.js.map