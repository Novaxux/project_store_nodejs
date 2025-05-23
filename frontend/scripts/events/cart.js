document.addEventListener('DOMContentLoaded',()=>{
    try{
        const username = localStorage.getItem('user')
        console.log(username);
        const cart = localStorage.getItem('cart_'+username);
        console.log(cart);
    }catch(error){
        console.log(error)
    }
})