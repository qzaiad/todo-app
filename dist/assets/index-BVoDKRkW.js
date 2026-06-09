(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const p=document.querySelector(".DarkThemeToggle"),g=document.querySelector(".App"),L=document.querySelector(".TaskList__list"),m=document.querySelector(".TaskSearchBar__input"),T=document.querySelector(".TaskSearchBar__button"),v=document.querySelector(".TaskList__link"),f=document.querySelector(".TaskList__list"),i="tasks",c="darkmode";let o;const d=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},y=t=>{let e=localStorage.getItem(t);return e?JSON.parse(e):[]},E=(t,e)=>`<li class="TaskList__taskContent${t.isCompleted?" TaskList__taskContent--isActive":""}"
            draggable="true" data-index="${e}"
         >
<div class='TaskList__dragHandle' title="drag to reorder">⠿</div>
<div class='TaskList__checkbox' tabindex="0" role="button">
  <img class='TaskList__checkboxImg' src="./assets/icon-checkmark.svg" alt="checkmark" />
</div>
<div class='TaskList__valueContent'>
  <p class='TaskList__value'>
    ${t.value}
  </p>
  <img src="./assets/icon-basket.svg"
        class='TaskList__deleteIcon'
        alt="basket-icon"
  />
</div>
</li>`,h=t=>{let e="";return t.forEach((s,a)=>{e+=E(s,a)}),e},u=t=>{o=y(i),t&&o.push(t);let e=h(o);e||(e=`<li class="EmptyList">
<img class="EmptyList__img" src="./assets/icon-empty.svg" alt="list is empty" />
<p>Task list is empty</p>
</li>`),L.innerHTML=e,I(),O(),b()},S=()=>{u(),localStorage.getItem(c)!==null&&g.classList.add("App--isDark"),T.onclick=C,v.onclick=D,p.onclick=()=>{g.classList.toggle("App--isDark")?localStorage.setItem(c,""):localStorage.removeItem(c)}},C=t=>{t.preventDefault();const e=m.value.trim();if(!e)return;u({value:e,isCompleted:!1}),d("tasks",o),m.value=""},k=()=>{d(i,o),u()},A=(t,e)=>{confirm(`Are you sure you want to delete take ${o[e].value}`)&&(o.splice(e,1),k())},_=(t,e)=>{if(o[e].isCompleted=!o[e].isCompleted,t.currentTarget.parentElement.classList.toggle("TaskList__taskContent--isActive"),o[e].isCompleted){const[s]=o.splice(e,1);o.push(s),k();return}d(i,o)},D=t=>{f.classList.toggle("TaskList__list--hideCompleted"),event.currentTarget.classList.toggle("TaskList__link--isActive")},I=()=>{const t=document.querySelectorAll(".TaskList__deleteIcon");t==null||t.forEach((e,s)=>{e.onclick=a=>A(a,s)})},O=()=>{const t=document.querySelectorAll(".TaskList__checkbox");t==null||t.forEach((e,s)=>{e.onclick=a=>_(a,s),e.onkeydown=a=>(a.key==="Enter"&&_(a,s),!0)})},b=()=>{const t=document.querySelectorAll(".TaskList__taskContent[draggable]");let e=null;t.forEach(s=>{s.addEventListener("dragstart",()=>{e=parseInt(s.dataset.index),s.classList.add("TaskList__taskContent--dragging")}),s.addEventListener("dragend",()=>{s.classList.remove("TaskList__taskContent--dragging"),document.querySelectorAll(".TaskList__taskContent").forEach(a=>a.classList.remove("TaskList__taskContent--dragOver"))}),s.addEventListener("dragover",a=>{a.preventDefault(),s.classList.add("TaskList__taskContent--dragOver")}),s.addEventListener("dragleave",()=>{s.classList.remove("TaskList__taskContent--dragOver")}),s.addEventListener("drop",()=>{const a=parseInt(s.dataset.index);if(e===null||e===a)return;const[r]=o.splice(e,1);o.splice(a,0,r),k()})})};S();
