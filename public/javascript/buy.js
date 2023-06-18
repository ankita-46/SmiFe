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

let selector = "cart";
let res = "#check"
for(let i=0;i<5;i++)
{
    let num = i;
    let text = num.toString();
    let finalselector = "#"+selector+text;
    let finalres = res+text;
    // console.log(finalselector);
    let element = document.querySelector(finalselector);
    element.addEventListener('click',async function(e){
        e.preventDefault();
        let checked = document.querySelector(finalres);
        let productname = checked.innerText;
        // console.log(productname);
        let resp =  await axios.post('/buy',{productname});
        console.log(resp);
    })
}