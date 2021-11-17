(this.webpackJsonpnotepadapp=this.webpackJsonpnotepadapp||[]).push([[0],{238:function(e,t,n){},241:function(e,t,n){},246:function(e,t){},380:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(48),c=n.n(o),i=(n(238),n(24)),s=n(3),u=n(46),p=n.n(u),d=n(71),l=n(7),b=n(196),f=n(411),m=n(412),O=n(223),j=(n(240),n(413)),h=n(9),y={notes:[],sortMethod:"AZ",loading:!0,error:!1,form:{name:"",description:""}},v=function(e,t){switch(t.type){case"SET_NOTES":return Object(s.a)(Object(s.a)({},e),{},{notes:t.notes,loading:!1});case"ADD_NOTE":return Object(s.a)(Object(s.a)({},e),{},{notes:[t.note].concat(Object(i.a)(e.notes))});case"REMOVE_NOTE":var n=e.notes.filter((function(e){return e.id!==t.id}));return Object(s.a)(Object(s.a)({},e),{},{notes:n});case"UPDATE_NOTE":var a=e.notes.findIndex((function(e){return e.id===t.note.id})),r=Object(i.a)(e.notes);return-1!==a&&(r[a]=t.note),Object(s.a)(Object(s.a)({},e),{},{notes:r});case"RESET_FORM":return Object(s.a)(Object(s.a)({},e),{},{form:y.form});case"SET_INPUT":return Object(s.a)(Object(s.a)({},e),{},{form:Object(s.a)(Object(s.a)({},e.form),{},Object(h.a)({},t.name,t.value))});case"SORT":var o,c;return"AZ"===e.sortMethod?(o="ZA",c=e.notes.sort((function(e,t){return e.name>t.name?1:-1}))):(o="AZ",c=e.notes.sort((function(e,t){return e.name<t.name?1:-1}))),Object(s.a)(Object(s.a)({},e),{},{notes:c,sortMethod:o});case"ERROR":return Object(s.a)(Object(s.a)({},e),{},{loading:!1,error:!0});default:return Object(s.a)({},e)}},g=(n(241),n(25)),N=Object(j.a)(),x=function(){var e=Object(a.useReducer)(v,y),t=Object(l.a)(e,2),n=t[0],r=t[1],o=function(){var e=Object(d.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.graphql({query:"\n  query ListNotes(\n    $filter: ModelNoteFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        clientId\n        name\n        description\n        completed\n        createdAt\n        updatedAt\n      }\n      nextToken\n    }\n  }\n"});case 3:t=e.sent,r({type:"SET_NOTES",notes:t.data.listNotes.items}),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0),r({type:"ERROR"});case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),c=function(){var e=Object(d.a)(p.a.mark((function e(){var t,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((t=n.form).name&&t.description){e.next=3;break}return e.abrupt("return",alert("please enter a name and description"));case 3:return a=Object(s.a)(Object(s.a)({},t),{},{clientId:N,completed:!1,id:Object(j.a)()}),r({type:"ADD_NOTE",note:a}),r({type:"RESET_FORM"}),e.prev=6,e.next=9,b.a.graphql({query:"\n  mutation CreateNote(\n    $input: CreateNoteInput!\n    $condition: ModelNoteConditionInput\n  ) {\n    createNote(input: $input, condition: $condition) {\n      id\n      clientId\n      name\n      description\n      completed\n      createdAt\n      updatedAt\n    }\n  }\n",variables:{input:a}});case 9:console.log("successfully created note!"),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(6),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[6,12]])})));return function(){return e.apply(this,arguments)}}(),u=function(){var e=Object(d.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,e.prev=1,e.next=4,b.a.graphql({query:"\n  mutation DeleteNote(\n    $input: DeleteNoteInput!\n    $condition: ModelNoteConditionInput\n  ) {\n    deleteNote(input: $input, condition: $condition) {\n      id\n      clientId\n      name\n      description\n      completed\n      createdAt\n      updatedAt\n    }\n  }\n",variables:{input:{id:n}}});case 4:console.log("successfully deleted note!"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(d.a)(p.a.mark((function e(t){var a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.notes.findIndex((function(e){return e.id===t.id})),(r=Object(i.a)(n.notes))[a].completed=!t.completed,e.prev=3,e.next=6,b.a.graphql({query:"\n  mutation UpdateNote(\n    $input: UpdateNoteInput!\n    $condition: ModelNoteConditionInput\n  ) {\n    updateNote(input: $input, condition: $condition) {\n      id\n      clientId\n      name\n      description\n      completed\n      createdAt\n      updatedAt\n    }\n  }\n",variables:{input:{id:t.id,completed:r[a].completed}}});case 6:console.log("note successfully updated!"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(t){return e.apply(this,arguments)}}(),x=function(e){r({type:"SET_INPUT",name:e.target.name,value:e.target.value})};Object(a.useEffect)((function(){o();var e=b.a.graphql({query:"\n  subscription OnCreateNote {\n    onCreateNote {\n      id\n      clientId\n      name\n      description\n      completed\n      createdAt\n      updatedAt\n    }\n  }\n"}).subscribe({next:function(e){var t=e.value.data.onCreateNote;N!==t.clientId&&r({type:"ADD_NOTE",note:t})}}),t=b.a.graphql({query:"\n  subscription OnDeleteNote {\n    onDeleteNote {\n      id\n      clientId\n      name\n      description\n      completed\n      createdAt\n      updatedAt\n    }\n  }\n"}).subscribe({next:function(e){var t=e.value.data.onDeleteNote.id;r({type:"REMOVE_NOTE",id:t})}}),n=b.a.graphql({query:"\n  subscription OnUpdateNote {\n    onUpdateNote {\n      id\n      clientId\n      name\n      description\n      completed\n      createdAt\n      updatedAt\n    }\n  }\n"}).subscribe({next:function(e){var t=e.value.data.onUpdateNote;r({type:"UPDATE_NOTE",note:t})}});return function(){e.unsubscribe(),t.unsubscribe(),n.unsubscribe()}}),[]);var E={container:{padding:20},input:{marginBottom:10},item:{textAlign:"left"},p:{color:"#1890ff"}};return Object(g.jsxs)("div",{style:E.container,children:[Object(g.jsx)(m.a,{onChange:x,value:n.form.name,placeholder:"Note Name",name:"name",style:E.input}),Object(g.jsx)(m.a,{onChange:x,value:n.form.description,placeholder:"Note description",name:"description",style:E.input}),Object(g.jsx)(O.a,{onClick:c,type:"primary",children:"Create Note"}),Object(g.jsx)("hr",{}),Object(g.jsx)(O.a,{onClick:function(){r({type:"SORT"}),r({type:"UPDATE_NOTE "})},type:"primary",children:"Sort"}),Object(g.jsx)("hr",{}),Object(g.jsxs)("h2",{children:[n.notes.filter((function(e){return!0===e.completed})).length," completed / ",n.notes.length," total"]}),Object(g.jsx)("hr",{}),Object(g.jsx)(f.b,{loading:n.loading,dataSource:n.notes,renderItem:function(e){return Object(g.jsx)(f.b.Item,{style:E.item,actions:[Object(g.jsx)("p",{style:E.p,onClick:function(){return u(e)},children:"Delete"}),Object(g.jsx)("input",{type:"checkbox",checked:!!e.completed,onChange:function(){return h(e)}})],children:Object(g.jsx)(f.b.Item.Meta,{title:e.name,description:e.description})})}})]})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,415)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),o(e),c(e)}))},T={aws_project_region:"us-east-2",aws_appsync_graphqlEndpoint:"https://ewtan3pkmjgtjfijdlgyqc42sa.appsync-api.us-east-2.amazonaws.com/graphql",aws_appsync_region:"us-east-2",aws_appsync_authenticationType:"API_KEY",aws_appsync_apiKey:"da2-vn5gtwlypnaa7o2u4lpoqcgnze"};n(151).default.configure(T),c.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(x,{})}),document.getElementById("root")),E()}},[[380,1,2]]]);
//# sourceMappingURL=main.37971c3a.chunk.js.map