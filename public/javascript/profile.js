let link = document.querySelector('#company');
let target = link.getAttribute('value');
if(target.length==0){
    let rest = document.querySelector('#address_hide_helper')
    rest.style.display = "none";
    let rest1 = document.querySelector('#gonna_be_none')
    rest.style.display = "none";
}
let element1 = document.querySelector('#span1');
let element2 = document.querySelector('#span2');
let element3 = document.querySelector('#span3');
let button1 = document.querySelector('#button1');
element1.addEventListener("click", function(){ 
    button1.classList.remove("submit-button1");
    const collection = document.getElementsByClassName("part1");
    for (let i = 0; i < collection.length; i++) {
        collection[i].removeAttribute("disabled");
    }
});
let button2 = document.querySelector('#button2');
element2.addEventListener("click", function(){ 
    button2.classList.remove("submit-button1");
    const collection = document.getElementsByClassName("part2");
    for (let i = 0; i < collection.length; i++) {
        collection[i].removeAttribute("disabled");
    }
});
let button3 = document.querySelector('#button3');
element3.addEventListener("click", function(){ 
    const collection = document.getElementsByClassName("part3");
    for (let i = 0; i < collection.length; i++) {
        collection[i].removeAttribute("disabled");
    }
    button3.classList.remove("submit-button1");
});
let genderselector = document.querySelector('#gender_selector');
let gender = genderselector.getAttribute('value');
if(gender==="male"){
    document.getElementById("male").checked = true;
    document.getElementById("female").checked = false;
}
else if(gender==="female"){
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = true;
}
let element4 = document.querySelector('#chps1');
let element5 = document.querySelector('#password-change1');
element4.addEventListener("click",function(){
    element4.style.display = "none";
    element5.style.display = "block";
})