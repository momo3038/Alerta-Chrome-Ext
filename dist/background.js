(()=>{"use strict";function e(e,t){r(""+e.userPreferences.AlertaUiUrl,t)}function t(t,n,o){o||e(t,n),r(t.userPreferences.AlertaUiUrl+"/alert/"+o,n)}function r(e,t){chrome.tabs.create({active:!0,url:e},(function(e){t&&chrome.notifications.clear(t),chrome.windows.update(e.windowId,{focused:!0})}))}var n,o={pollingState:{alertaFetchQuery:"",alerts:[]},userPreferences:{AlertaApiServerUrl:"http://localhost:9999/api",AlertaUiUrl:"http://localhost:9999",PersistentNotifications:!1,ShowNotifications:!0,AlertaApiSecret:"XXX",username:"John Doe",filterGroups:[],filterServices:[],playAudio:!1}},i=function(e){chrome.storage.local.set(e,(function(){Object.assign(n,e)}))},a=function(){return n};function l(){return new Promise((function(e,t){chrome.storage.local.get(null,(function(r){if(chrome.runtime.lastError)return t(chrome.runtime.lastError);e(r)}))}))}var c=function(){return(c=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},s=function(){chrome.alarms.onAlarm.addListener((function(){u(a())})),chrome.alarms.create("PollingAlerta",{delayInMinutes:.1,periodInMinutes:.2})},u=function(e){fetch(e.userPreferences.AlertaApiServerUrl+"/alerts?"+e.pollingState.alertaFetchQuery,{headers:{Authorization:"Key "+e.userPreferences.AlertaApiSecret}}).then((function(e){return e.json()})).then((function(t){return function(e,t){var r=e.alerts,n=r.filter((function(e){return!t.pollingState.alerts.map((function(e){return e.id})).includes(e.id)})),o=e.alerts.length;chrome.browserAction.setBadgeText({text:o.toString()}),chrome.browserAction.setBadgeBackgroundColor({color:o>0?"red":"green"}),function(e,t,r){if(e.userPreferences.ShowNotifications&&r.length>0){var n=t.alerts.length-e.pollingState.alertCount,o=1==r.length?(a=e,{id:"Alert_"+(i=r[0]).id,payload:{type:"basic",title:i.service[0]+" - "+i.event,message:i.value,iconUrl:"alert.png",requireInteraction:a.userPreferences.PersistentNotifications,isClickable:!0,buttons:[{title:"Ack"},{title:"View alert details"}]}}):function(e){return{id:"GoToAlertaHome",payload:{type:"list",title:e+" new alerts detected !",message:"Click to open Alerta",items:[],iconUrl:"alert.png",isClickable:!0,buttons:[{title:"Go to alerta"}]}}}(n);e.userPreferences.playAudio&&new Audio(chrome.runtime.getURL("bip.mp3")).play(),chrome.notifications.create(o.id,o.payload)}var i,a}(t,e,n),n.length>0&&i(c(c({},t),{pollingState:c(c({},t.pollingState),{alertCount:o,alerts:r})}))}(t,e)}))};chrome.runtime.onInstalled.addListener((function(){return new Promise((function(e,t){chrome.storage.local.set(o,(function(){if(chrome.runtime.lastError)return t(chrome.runtime.lastError);n=o,e()}))})).then(s)})),chrome.runtime.onStartup.addListener((function(){return l().then(s)})),chrome.storage.onChanged.addListener((function(e,t){"local"===t&&l().then((function(e){var t=e;Object.assign(n,t)}))})),chrome.browserAction.onClicked.addListener((function(){return e(a())})),chrome.notifications.onClicked.addListener((function(e){return t(a(),e,e.split("_").pop())})),chrome.notifications.onButtonClicked.addListener((function(r,n){return function(r,n,o){"GoToAlertaHome"==n?e(r,n):n.startsWith("Alert_")&&0==o?function(e,t,r){if(r){var n={status:"ack",text:e.userPreferences.username?e.userPreferences.username+": I'll take a look ...":""};fetch(e.userPreferences.AlertaApiServerUrl+"/alert/"+r+"/status",{method:"PUT",body:JSON.stringify(n),headers:{"Content-type":"application/json",Authorization:"Key "+e.userPreferences.AlertaApiSecret}}).then((function(e){return chrome.notifications.clear(t)}))}}(r,n,n.split("_").pop()):n.startsWith("Alert_")&&1==o&&t(r,n,n.split("_").pop())}(a(),r,n)}))})();