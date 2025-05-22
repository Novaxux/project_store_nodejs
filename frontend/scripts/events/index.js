import authRequest from "../authRequest.js";

const btnLogout = document.getElementById('logout');

btnLogout.addEventListener('click',async ()=>{
    await authRequest.logout()
    document.location.href="./login.html"
})