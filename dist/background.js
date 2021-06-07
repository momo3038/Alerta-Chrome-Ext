(()=>{"use strict";var e=function(){return(e=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},t={pollingState:{alertaFetchQuery:""},userPreferences:{AlertaApiServerUrl:"http://localhost:9999/api",AlertaUiUrl:"http://localhost:9999",PersistentNotifications:!1,ShowNotifications:!0,AlertaApiSecret:"XXX",username:"John Doe",filterGroups:[],filterServices:[],playAudio:!1}};chrome.browserAction.onClicked.addListener((function(){return n()})),chrome.runtime.onInstalled.addListener((function(){chrome.storage.sync.set(t),chrome.alarms.create("PollingAlerta",{delayInMinutes:.1,periodInMinutes:.2})})),chrome.storage.onChanged.addListener((function(e,r){i().then((function(e){if("sync"===r){var n=e;Object.assign(t,n)}}))}));var r=i().then((function(e){var r;Object.assign(t,e),r=t,chrome.alarms.onAlarm.addListener((function(){fetch(r.userPreferences.AlertaApiServerUrl+"/alerts?"+r.pollingState.alertaFetchQuery,{headers:{Authorization:"Key "+t.userPreferences.AlertaApiSecret}}).then((function(e){return e.json()})).then(a)}))}));function n(e){var r=""+t.userPreferences.AlertaUiUrl;chrome.tabs.create({active:!0,url:r},(function(t){e&&chrome.notifications.clear(e),chrome.windows.update(t.windowId,{focused:!0})}))}function o(e,r){r||n(e);var o=t.userPreferences.AlertaUiUrl+"/alert/"+r;chrome.tabs.create({active:!0,url:o},(function(t){chrome.notifications.clear(e),chrome.windows.update(t.windowId,{focused:!0})}))}function i(){return new Promise((function(e,t){chrome.storage.sync.get(null,(function(r){if(chrome.runtime.lastError)return t(chrome.runtime.lastError);e(r)}))}))}function a(t){var r=t.alerts.length;chrome.browserAction.setBadgeText({text:r.toString()}),chrome.browserAction.setBadgeBackgroundColor({color:r>0?"red":"green"}),chrome.storage.sync.get(null,(function(n){var o=n;if(o.userPreferences.ShowNotifications&&null!=o.pollingState.alertCount&&o.pollingState.alertCount<r&&function(e,t,r){var n=t-e.pollingState.alertCount,o=1==n?function(e,t){var r=e.alerts[0];return{id:"Alert_"+r.id,payload:{type:"basic",title:r.service[0]+" - "+r.event,message:r.value,iconUrl:"alert.png",requireInteraction:t.userPreferences.PersistentNotifications,isClickable:!0,buttons:[{title:"Ack"},{title:"View alert details"}]}}}(r,e):function(e){return{id:"GoToAlertaHome",payload:{type:"list",title:e+" new alerts detected !",message:"Click to open Alerta",items:[],iconUrl:"alert.png",isClickable:!0,buttons:[{title:"Go to alerta"}]}}}(n);e.userPreferences.playAudio&&new Audio(chrome.runtime.getURL("bip.mp3")).play(),chrome.notifications.create(o.id,o.payload)}(o,r,t),null==o.pollingState.alertCount||o.pollingState.alertCount!=r){var i=e(e({},o),{pollingState:e(e({},o.pollingState),{alertCount:r})});chrome.storage.sync.set(i)}}))}chrome.browserAction.onClicked.addListener((function(e){return t=void 0,n=void 0,i=function(){return function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}(this,(function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,r];case 1:case 2:return e.sent(),[3,3];case 3:return[2]}}))},new((o=void 0)||(o=Promise))((function(e,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function c(e){try{l(i.throw(e))}catch(e){r(e)}}function l(t){var r;t.done?e(t.value):(r=t.value,r instanceof o?r:new o((function(e){e(r)}))).then(a,c)}l((i=i.apply(t,n||[])).next())}));var t,n,o,i})),chrome.notifications.onClicked.addListener((function(e){o(e,e.split("_").pop())})),chrome.notifications.onButtonClicked.addListener((function(e,r){"GoToAlertaHome"==e?n(e):e.startsWith("Alert_")&&0==r?function(e,r){if(r){var n={status:"ack",text:t.userPreferences.username?t.userPreferences.username+" : I'll take a look ...":""};fetch(t.userPreferences.AlertaApiServerUrl+"/alert/"+r+"/status",{method:"PUT",body:JSON.stringify(n),headers:{"Content-type":"application/json",Authorization:"Key "+t.userPreferences.AlertaApiSecret}}).then((function(t){return chrome.notifications.clear(e)}))}}(e,e.split("_").pop()):e.startsWith("Alert_")&&1==r&&o(e,e.split("_").pop())}))})();