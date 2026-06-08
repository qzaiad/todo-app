(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const g=document.querySelector(".DarkThemeToggle"),k=document.querySelector(".App"),_=document.querySelector(".TaskList__list"),m=document.querySelector(".TaskSearchBar__input"),f=document.querySelector(".TaskSearchBar__button"),T=document.querySelector(".TaskList__link"),L=document.querySelector(".TaskList__list"),i="tasks",n="darkmode";let a;const u=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},y=t=>{let e=localStorage.getItem(t);return e?JSON.parse(e):[]},v=t=>`<li class="TaskList__taskContent${t.isCompleted?" TaskList__taskContent--isActive":""}">
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
</li>`,h=t=>{let e="";return t.forEach(r=>{e+=v(r)}),e},S=()=>{const t=document.querySelectorAll(".TaskList__deleteIcon");t==null||t.forEach((e,r)=>{e.onclick=c=>q(c,r)})},E=()=>{const t=document.querySelectorAll(".TaskList__checkbox");t==null||t.forEach((e,r)=>{e.onclick=c=>p(c,r),e.onkeydown=c=>(c.key==="Enter"&&p(c,r),!0)})},d=t=>{a=y(i),t&&a.push(t);let e=h(a);e||(e=`<li class="EmptyList">
<img class="EmptyList__img" src="./assets/icon-empty.svg" alt="list is empty" />
<p>Task list is empty</p>
</li>`),_.innerHTML=e,S(),E()},A=()=>{d(),localStorage.getItem(n)!==null&&k.classList.add("App--isDark"),f.onclick=D,T.onclick=C,g.onclick=()=>{k.classList.toggle("App--isDark")?localStorage.setItem(n,""):localStorage.removeItem(n)}},D=t=>{t.preventDefault();const e=m.value.trim();if(!e)return;d({value:e,isCompleted:!1}),u("tasks",a),m.value=""},b=()=>{u(i,a),d()},q=(t,e)=>{confirm(`Are you sure you want to delete take ${a[e].value}`)&&(a.splice(e,1),b())},p=(t,e)=>{a[e].isCompleted=!a[e].isCompleted,t.currentTarget.parentElement.classList.toggle("TaskList__taskContent--isActive"),u(i,a)},C=t=>{L.classList.toggle("TaskList__list--hideCompleted"),event.currentTarget.classList.toggle("TaskList__link--isActive")};A();
