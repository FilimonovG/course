window.addEventListener('DOMContentLoaded', function (){

    const anchor = document.getElementById('top-anchor')

    window.addEventListener('scroll', function (){
        console.log(window.innerWidth)
        if(window.innerWidth > 992){
            if (scrollY>200) {
                anchor.style.display = "block"
                if(window.getComputedStyle(anchor).getPropertyValue("display") === "block"){
                    anchor.classList.add('_active')
                }
            } else {
                anchor.classList.remove('_active')
                if (window.getComputedStyle(anchor).getPropertyValue("opacity") === "0"){
                    anchor.style.display = "none"
                }
            }
        }else {
            anchor.style.display = "none"
        }
    })


    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })


    const search_btn = document.getElementById("search-img")
    const search_field = document.getElementById("search-field")
    search_field.disabled = true
    search_field.textContent = ""

    search_btn.onclick = function (){
        search_field.classList.toggle('_search-field-toggle')
        search_btn.classList.toggle('_img-toggle')
        if(search_field.disabled){
            search_field.disabled = false
            document.querySelector(".search-result").style.display = "block"
        }else {
            search_field.disabled = true
            document.querySelector(".search-result").style.display = "none"
        }


    }

    document.querySelectorAll('.drop-down').forEach(function (menu){
        menu.addEventListener('touchend', function (){
            const drop = document.querySelector('.drop-down__content')
            if (drop.style.display === "flex"){
                drop.style.display = "none"
            }else{
                drop.style.display = "flex"

            }
        })
    })


    search();


})

function burgerMenu(){
    console.log('a')
    document.querySelector('.header__content').classList.toggle('toggle-menu')
    document.body.classList.toggle("lock")
}

function searchEngine(goodText) {
    let search_result = document.querySelector(".search-result");

    fetch("../src/DataBase.json")
        .then(response => response.json())
        .then(function(jsonRes) {
            let resultMas = [];
            for (let i = 0; i < jsonRes.length; i++) {
                if(jsonRes[i]["id"] !== "wip"){
                    if (jsonRes[i]["name"].toLowerCase().includes(goodText)) {
                        resultMas.push(jsonRes[i])
                    }
                }
            }

            let str = "";
            for (let i = 0; i < resultMas.length; i++) {
                str += `<a class="search-item" href="character.html?id=${resultMas[i]["id"]}">
                             <img src="${resultMas[i]["main_image"]}"  height="100px" class="search-img">
                              <span>${resultMas[i]["name"]}</span>
                        </a>`
            }
            search_result.innerHTML = str;
            if (document.getElementById("search-field").value.trim() === ""){
                search_result.innerHTML = "";

            }
        })
}

function search() {
    let searchObj = document.getElementById("search-field")
    searchObj.addEventListener("input", function () {
        searchEngine(searchObj.value.toLowerCase())
    })
}
