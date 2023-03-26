let length = document.querySelector('#length').innerText;
document.querySelector('#length').style.display = "none";
for (let i = 0; i < length; i++) {
    let priceelement = '#idprice';
    let ele = '#check';
    let count = '#count';
    let cart = '#cart';
    let id = '#id';
    let num = i;
    let text = num.toString();
    ele = ele + text;
    cart = cart + text;
    id = id + text;
    count = count + text;
    priceelement = priceelement+text;
    let pricetorberemoved = document.querySelector(priceelement).innerText;
    pricetorberemoved = pricetorberemoved.replace('₹ ','');
    let price = Number(pricetorberemoved);
    let idele = document.querySelector(id);
    let productid = idele.innerText;
    idele.style.display = 'none';
    let rem = document.querySelector(cart);
    let counter = document.querySelector(count).innerText;
    counter = counter.replace('Number of products : ', '');
    counter = Number(counter);
    rem.addEventListener('click', async function () {
        let element = document.querySelector(ele);
        let productname = element.innerText;
        let totprice = document.querySelector('#totalpric').innerText;
        let totalprice = Number(totprice);
        if (counter > 1) {
            counter = counter - 1;
            counter = counter.toString();
            let viewto = 'Number of products : ' + counter;
            document.querySelector(count).innerText = viewto;
            totalprice = totalprice-price;
            let string1 = totalprice.toString();
            document.querySelector('#totalpric').innerText=string1;
        }
        let resp = await axios.post('/removefromcart', { productname, productid });
        if (counter <= 1) {
            location.reload();
        }
    });
}
