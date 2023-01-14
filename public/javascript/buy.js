let one = document.getElementById("one");
let two = document.getElementById("two");
let three= document.getElementById("three");
let four = document.getElementById("four");
let five = document.getElementById("five");

let check0 = document.getElementById("check0");
let check1 = document.getElementById("check1");
let check2 = document.getElementById("check2");
let check3 = document.getElementById("check3");
let check4 = document.getElementById("check4");

if(check3.innerText=="")
{
    four.style.display="none";
}

if(check0.innerText=="")
{
    one.style.display="none";
}

if(check1.innerText=="")
{
    two.style.display="none";
}

if(check2.innerText=="")
{
    three.style.display="none";
}

if(check4.innerText=="")
{
    five.style.display="none";
}