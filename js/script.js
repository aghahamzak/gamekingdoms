const header=document.getElementById("site-header");
const menu=document.querySelector(".menu");
const menuToggle=document.querySelector(".menu-toggle");

if(menuToggle){
  menuToggle.addEventListener("click",()=>{
    const open=menu.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded",open?"true":"false");
    const icon=menuToggle.querySelector("i");
    if(icon){icon.classList.toggle("fa-bars",!open);icon.classList.toggle("fa-xmark",open);}
  });
}

document.querySelectorAll(".menu a").forEach(link=>{
  link.addEventListener("click",()=>{
    if(menu){menu.classList.remove("show");}
    if(menuToggle){
      menuToggle.setAttribute("aria-expanded","false");
      const icon=menuToggle.querySelector("i");
      if(icon){icon.classList.add("fa-bars");icon.classList.remove("fa-xmark");}
    }
  });
});

window.addEventListener("scroll",()=>{
  if(header) header.classList.toggle("scrolled",window.scrollY>40);
});

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".menu a[href^='#']")];
function setActive(){
  if(!sections.length)return;
  let current=sections[0].id;
  sections.forEach(section=>{
    if(window.scrollY>=section.offsetTop-180) current=section.id;
  });
  navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
}
window.addEventListener("scroll",setActive,{passive:true});
setActive();

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click",e=>{
    const target=document.querySelector(anchor.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
  });
});

const reveal=document.querySelectorAll(".glass-panel,.game-card,.capability,.policy-section,.policy-intro,.policy-contact-card");
if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("in-view");observer.unobserve(entry.target);}
    });
  },{threshold:.08});
  reveal.forEach(el=>observer.observe(el));
}

document.querySelectorAll(".policy-nav a").forEach(link=>{
  link.addEventListener("click",()=>{
    document.querySelectorAll(".policy-nav a").forEach(a=>a.classList.remove("active"));
    link.classList.add("active");
  });
});
