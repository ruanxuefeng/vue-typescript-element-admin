(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-94ba36e6"],{"1be1":function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"f",(function(){return r})),a.d(t,"g",(function(){return o})),a.d(t,"a",(function(){return s})),a.d(t,"d",(function(){return c})),a.d(t,"e",(function(){return l})),a.d(t,"c",(function(){return u})),a.d(t,"h",(function(){return d}));a("7f7f");var n=a("f6cd");function i(e){return Object(n["a"])({url:"/role/list",method:"get",params:e})}function r(e){var t=e.name,a=e.memo;return Object(n["a"])({url:"/role/save",method:"post",data:{name:t,memo:a}})}function o(e){return Object(n["a"])({url:"/role/update",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/role/delete",method:"delete",params:{id:e}})}function c(){return Object(n["a"])({url:"/role/all",method:"get"})}function l(e){return Object(n["a"])({url:"/role/permissions",method:"get",params:{id:e}})}function u(){return Object(n["a"])({url:"/role/permission/tree",method:"get"})}function d(e,t){return Object(n["a"])({url:"/role/update/permissions",method:"post",data:{id:e,permissions:t}})}},2312:function(e,t,a){},"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},i=[],r=(a("c5f6"),a("d225")),o=a("b0b4"),s=a("308d"),c=a("6bb5"),l=a("4e2b"),u=a("9ab4"),d=a("60a3"),b=function(e,t,a,n){return e/=n/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)},p=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function f(e){document.documentElement.scrollTop=e,document.body.scrollTop=e}function m(){return document.documentElement.scrollTop||document.body.scrollTop}function g(e,t,a){var n=m(),i=e-n,r=20,o=0,s=void 0===t?500:t,c=function e(){o+=r;var t=b(o,n,i,s);f(t),o<s?p(e):a&&"function"===typeof a&&a()};c()}var h=function(e){function t(){return Object(r["a"])(this,t),Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(o["a"])(t,[{key:"handleSizeChange",value:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&g(0,800)}},{key:"handleCurrentChange",value:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&g(0,800)}},{key:"currentPage",get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},{key:"pageSize",get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}]),t}(d["c"]);Object(u["a"])([Object(d["b"])(Number)],h.prototype,"total",void 0),Object(u["a"])([Object(d["b"])(Number)],h.prototype,"page",void 0),Object(u["a"])([Object(d["b"])(Number)],h.prototype,"limit",void 0),Object(u["a"])([Object(d["b"])(Array)],h.prototype,"pageSizes",void 0),Object(u["a"])([Object(d["b"])(String)],h.prototype,"layout",void 0),Object(u["a"])([Object(d["b"])(Boolean)],h.prototype,"background",void 0),Object(u["a"])([Object(d["b"])(Boolean)],h.prototype,"autoScroll",void 0),Object(u["a"])([Object(d["b"])(Boolean)],h.prototype,"hidden",void 0),h=Object(u["a"])([d["a"]],h);var v=h,y=v,j=(a("6d39"),a("2877")),O=Object(j["a"])(y,n,i,!1,null,"6878ed5c",null);t["a"]=O.exports},"37f4":function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return r}));var n=a("5c96");function i(e,t){Object(n["Notification"])({title:e,message:t,type:"success",duration:2e3})}function r(e,t,a,i,r,o){n["MessageBox"].confirm(t,e,{confirmButtonText:a,cancelButtonText:i,type:"warning"}).then((function(){r&&r()})).catch((function(){o&&o()}))}},5154:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("d225"),i=function e(t,a){var i=t.required,r=void 0===i||i,o=t.trigger,s=void 0===o?"blur":o,c=t.message,l=void 0===c?"":c;Object(n["a"])(this,e),this.required=r,this.trigger=s,this.message=l,a&&(this.validator=a)}},"6c35":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{attrs:{shadow:"hover"}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-remove":e.removeTab},model:{value:e.activeTab,callback:function(t){e.activeTab=t},expression:"activeTab"}},[a("el-tab-pane",{attrs:{name:"list",closable:!1}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("svg-icon",{attrs:{"icon-class":"list"}}),e._v(" 角色列表")],1),a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"角色名称",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getList(t)}},model:{value:e.query.name,callback:function(t){e.$set(e.query,"name",t)},expression:"query.name"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.getList}},[e._v("搜索")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.data.tableLoading,expression:"data.tableLoading"}],staticStyle:{width:"100%"},attrs:{data:e.data.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"50"}}),a("el-table-column",{attrs:{label:"角色名称",prop:"name",width:"200px",align:e.data.commonAlign}}),a("el-table-column",{attrs:{label:"备注",prop:"memo",width:"450px",align:e.data.commonAlign}}),a("el-table-column",{attrs:{label:"创建人",width:"150px",align:e.data.commonAlign},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                        "+e._s(t.row.creatorName)+"\n                    ")]}}])}),a("el-table-column",{attrs:{label:"创建时间",prop:"createTime",width:"200px",align:e.data.commonAlign}}),a("el-table-column",{attrs:{label:"操作",align:e.data.commonAlign,"class-name":"small-padding fixed-width","min-width":"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button-group",[a("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.handleUpdate(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.openAssignPermissionsDialog(t.row)}}},[e._v("\n                                分配权限\n                            ")]),a("el-button",{attrs:{type:"danger"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("\n                                删除\n                            ")])],1)]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.query.total>e.query.pageSize,expression:"query.total > query.pageSize"}],attrs:{total:e.query.total,page:e.query.page,limit:e.query.pageSize,"page-sizes":e.data.pageSizes,layout:e.data.layout},on:{"update:page":function(t){return e.$set(e.query,"page",t)},"update:limit":function(t){return e.$set(e.query,"pageSize",t)},pagination:e.getList}})],1),a("el-tab-pane",{attrs:{name:"add",closable:!1}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("svg-icon",{attrs:{"icon-class":"add"}}),e._v(" 新增")],1),a("role-form",{attrs:{type:"ADD"},on:{"handle-update":e.saveHandle}})],1),e._l(e.tabs,(function(t,n){return a("el-tab-pane",{key:n,attrs:{name:t.name,closable:""}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("svg-icon",{attrs:{"icon-class":"edit"}}),e._v(" "+e._s(t.label))],1),a("role-form",{attrs:{obj:t.obj,type:"UPDATE"},on:{"handle-update":e.updateHandle}})],1)}))],2),a("el-dialog",{attrs:{visible:e.dialogAssignPermissionsVisible,title:"分配权限"},on:{"update:visible":function(t){e.dialogAssignPermissionsVisible=t}}},[a("el-tree",{ref:"tree",attrs:{props:{label:"name",children:"children"},data:e.permissionTree,"default-checked-keys":e.rolePermission,"node-key":"mark","show-checkbox":""}}),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogAssignPermissionsVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.assignPermissions}},[e._v("保存")])],1)],1)],1)},i=[],r=(a("7f7f"),a("d225")),o=a("b0b4"),s=a("308d"),c=a("6bb5"),l=a("4e2b"),u=a("9ab4"),d=a("60a3"),b=a("bc3a"),p=a.n(b),f=a("333d"),m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"dataForm",attrs:{rules:e.rules,model:e.obj,"label-position":e.data.labelPosition,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[a("el-input",{staticClass:"input",attrs:{placeholder:"角色名称",maxlength:"20"},model:{value:e.obj.name,callback:function(t){e.$set(e.obj,"name",t)},expression:"obj.name"}})],1),a("el-form-item",{attrs:{label:"备注",prop:"memo"}},[a("el-input",{staticClass:"input",attrs:{placeholder:"备注",rows:6,maxlength:"200",type:"textarea"},model:{value:e.obj.memo,callback:function(t){e.$set(e.obj,"memo",t)},expression:"obj.memo"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v(e._s(e.label))]),a("el-button",{on:{click:e.cancel}},[e._v("重置")])],1)],1)},g=[],h=a("8819"),v=function e(){Object(r["a"])(this,e),this.id="",this.name="",this.memo="",this.permissions=[]},y=a("bc1c"),j=a("5154"),O=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.data=new h["a"],e.rules={name:[new j["a"]({message:"请输入角色名称"})]},e}return Object(l["a"])(t,e),Object(o["a"])(t,[{key:"submit",value:function(){var e=this;this.$refs.dataForm.validate((function(t){t&&(e.$emit("handle-update",e.obj),e.type===y["a"].ADD&&e.$refs.dataForm.resetFields())}))}},{key:"cancel",value:function(){this.$refs.dataForm.resetFields()}},{key:"label",get:function(){switch(this.type){case y["a"].ADD:return"新增";case y["a"].UPDATE:return"修改"}}}]),t}(d["c"]);Object(u["a"])([Object(d["b"])({default:function(){return new v}})],O.prototype,"obj",void 0),Object(u["a"])([Object(d["b"])({required:!0})],O.prototype,"type",void 0),O=Object(u["a"])([d["a"]],O);var k=O,w=k,A=(a("e983"),a("2877")),S=Object(A["a"])(w,m,g,!1,null,"70e3dc76",null),T=S.exports,_=a("37f4"),x=function e(){Object(r["a"])(this,e),this.page=1,this.pageSize=20,this.total=0,this.name=""},P=a("1be1"),N=a("b997"),E=a("7f1d"),z=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.activeTab="list",e.data=new h["a"],e.query=new x,e.dialogAssignPermissionsVisible=!1,e.permissionTree=[],e.rolePermission=[],e.id="",e.tabs=[],e}return Object(l["a"])(t,e),Object(o["a"])(t,[{key:"created",value:function(){this.getList()}},{key:"getList",value:function(){var e=this;this.data.tableLoading=!0,Object(P["b"])(this.query).then((function(t){var a=t.data;e.data.list=a.rows,e.query.total=a.total,e.data.tableLoading=!1}))}},{key:"removeTab",value:function(e){this.activeTab===e&&(this.activeTab="list"),this.tabs=Object(N["b"])(this.tabs,e)}},{key:"saveHandle",value:function(e){var t=this;Object(P["f"])(e).then((function(e){t.editSuccess(e.data.message),t.activeTab="list"}))}},{key:"handleUpdate",value:function(e){var t=e.id,a=e.name,n=e.memo,i=this.tabs.filter((function(e){return e.name==="edit-".concat(t)}));if(0===i.length){var r={name:Object(N["a"])(t),label:"编辑-".concat(a),obj:{id:t,name:a,memo:n}};this.tabs.push(r),this.activeTab=r.name}else this.activeTab=i[0].name}},{key:"updateHandle",value:function(e){var t=this;Object(P["g"])(e).then((function(e){t.editSuccess(e.data.message),t.removeTab(t.activeTab),t.activeTab="list"}))}},{key:"editSuccess",value:function(e){Object(_["b"])("成功",e),this.data.dialogFormVisible=!1,this.getList()}},{key:"handleDelete",value:function(e){var t=this;Object(_["a"])("删除提示","".concat(e.name,"将要被删除"),"确定","取消",(function(){Object(P["a"])(e.id).then((function(e){Object(_["b"])("成功",e.data.message),t.getList()}))}))}},{key:"openAssignPermissionsDialog",value:function(e){var t=this;p.a.all([Object(P["c"])(),Object(P["e"])(e.id)]).then(p.a.spread((function(a,n){t.permissionTree=a.data,t.rolePermission=n.data,t.dialogAssignPermissionsVisible=!0,t.id=e.id})))}},{key:"assignPermissions",value:function(){var e=this;this.id&&Object(P["h"])(this.id,this.$refs.tree.getCheckedKeys()).then((function(t){Object(_["b"])("成功",t.data.message),E["a"].resetRouter(),e.dialogAssignPermissionsVisible=!1}))}}]),t}(d["c"]);z=Object(u["a"])([Object(d["a"])({components:{Pagination:f["a"],RoleForm:T}})],z);var q=z,I=q,$=Object(A["a"])(I,n,i,!1,null,"b195aa42",null);t["default"]=$.exports},"6d39":function(e,t,a){"use strict";var n=a("e4e7"),i=a.n(n);i.a},8819:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("d225"),i=function e(){Object(n["a"])(this,e),this.pageSizes=[10,20,30,50],this.layout="total, sizes, prev, pager, next, jumper",this.tableLoading=!1,this.dialogFormVisible=!1,this.dialogStatus="create",this.commonAlign="center",this.labelPosition="right"}},aa77:function(e,t,a){var n=a("5ca1"),i=a("be13"),r=a("79e5"),o=a("fdef"),s="["+o+"]",c="​",l=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),d=function(e,t,a){var i={},s=r((function(){return!!o[e]()||c[e]()!=c})),l=i[e]=s?t(b):o[e];a&&(i[a]=l),n(n.P+n.F*s,"String",i)},b=d.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(l,"")),2&t&&(e=e.replace(u,"")),e};e.exports=d},b997:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return i}));a("7f7f");function n(e){return"edit-".concat(e)}function i(e,t){return e.filter((function(e){return e.name!==t}))}},bc1c:function(e,t,a){"use strict";var n;a.d(t,"a",(function(){return n})),function(e){e["ADD"]="ADD",e["UPDATE"]="UPDATE"}(n||(n={}))},c5f6:function(e,t,a){"use strict";var n=a("7726"),i=a("69a8"),r=a("2d95"),o=a("5dbc"),s=a("6a99"),c=a("79e5"),l=a("9093").f,u=a("11e9").f,d=a("86cc").f,b=a("aa77").trim,p="Number",f=n[p],m=f,g=f.prototype,h=r(a("2aeb")(g))==p,v="trim"in String.prototype,y=function(e){var t=s(e,!1);if("string"==typeof t&&t.length>2){t=v?t.trim():b(t,3);var a,n,i,r=t.charCodeAt(0);if(43===r||45===r){if(a=t.charCodeAt(2),88===a||120===a)return NaN}else if(48===r){switch(t.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+t}for(var o,c=t.slice(2),l=0,u=c.length;l<u;l++)if(o=c.charCodeAt(l),o<48||o>i)return NaN;return parseInt(c,n)}}return+t};if(!f(" 0o1")||!f("0b1")||f("+0x1")){f=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof f&&(h?c((function(){g.valueOf.call(a)})):r(a)!=p)?o(new m(y(t)),a,f):y(t)};for(var j,O=a("9e1e")?l(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;O.length>k;k++)i(m,j=O[k])&&!i(f,j)&&d(f,j,u(m,j));f.prototype=g,g.constructor=f,a("2aba")(n,p,f)}},e4e7:function(e,t,a){},e983:function(e,t,a){"use strict";var n=a("2312"),i=a.n(n);i.a},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-94ba36e6.15006cda.js.map