document.getElementById("explore1").addEventListener("click",()=>{
  
    document.getElementsByClassName("homepage")[0].style.display="none"
    document.getElementsByClassName("sort_container")[0].style.display="flex"
    document.getElementsByClassName("footer")[0].style.display="none"

})
document.getElementById("explore2").addEventListener("click",()=>{
  
    document.getElementsByClassName("homepage")[0].style.display="none"
    document.getElementsByClassName("pathcontainer")[0].style.display="flex"
    document.getElementsByClassName("footer")[0].style.display="none"

})
document.getElementById("explore3").addEventListener("click",()=>{
  
    document.getElementsByClassName("homepage")[0].style.display="none"
    document.getElementsByClassName("container")[0].style.display="block"
    document.getElementsByClassName("footer")[0].style.display="none"

})


// for go back to home 
document.getElementById("home_sort").addEventListener("click",()=>{
    document.getElementsByClassName("homepage")[0].style.display="block"
    document.getElementsByClassName("sort_container")[0].style.display="none"
    document.getElementsByClassName("footer")[0].style.display="flex"
    
})
document.getElementById("home_path").addEventListener("click",()=>{
    document.getElementsByClassName("homepage")[0].style.display="block"
    document.getElementsByClassName("pathcontainer")[0].style.display="none"
    document.getElementsByClassName("footer")[0].style.display="flex"
})
document.getElementById("home_hanoi").addEventListener("click",()=>{
    document.getElementsByClassName("homepage")[0].style.display="block"
    document.getElementsByClassName("container")[0].style.display="none"
    document.getElementsByClassName("footer")[0].style.display="flex"
})