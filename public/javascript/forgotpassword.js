document.getElementById("message").style.color="red";
setTimeout(() => {
    document.querySelector('#message').style.display="none";
}, 2000);
function verify(){
    var password = document.getElementById("pass").value;
    var confirmPassword = document.getElementById("confirmpass").value;
    if(password!=confirmPassword)
    {
        document.getElementById("message").style.display="block";
        document.getElementById("message").innerHTML="<p style='color: red;'>Password is not matching</p>";
    }
    else
    {
        document.getElementById("message").innerHTML="";
        document.getElementById("message").style.display="none";
    }
}