const signIn=document.querySelector('.sign-in')
const signUp=document.querySelector('.sign-up')
signIn.addEventListener('click',()=>{
    window.location.replace('/signin')
})
signUp.addEventListener('click',()=>{
    window.location.replace('/signup')
})