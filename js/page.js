function fillCard(searchRes) {
    let goodId = searchRes.split("=")[1]

    fetch("../src/DataBase.json")
        .then(response => response.json())
        .then(function(jsonRes) {

            if (goodId == "wip"){
                let main = document.getElementById("main")
                main.innerHTML = `<main class="main">
                                      <div class="wip">
                                        <div class="wip__wrapper">
                                          <img src="img/work-in-progress.png">
                                        </div>
                                      </div>
                                    </main>`
                return
            }



            let name = document.getElementById("name")
            let main_img = document.getElementById("main_img")
            let actor = document.getElementById("actor")
            let quote = document.getElementById("quote")
            let appearance = document.getElementById("films")
            let content = document.getElementById("content")
            let gallery = document.getElementById('gallery')


            for (let i = 0; i < jsonRes.length; i++) {
                if (jsonRes[i]["id"] == Number(goodId)) {
                    name.textContent = jsonRes[i]["name"]
                    main_img.src = jsonRes[i]["main_image"]
                    actor.textContent = jsonRes[i]["actor"]
                    quote.textContent = jsonRes[i]["quote"]
                    actor.textContent = jsonRes[i]["actor"]
                    for(let film of jsonRes[i]["appearance"]){
                        let li = document.createElement('li')
                        li.classList.add("main__text-content")
                        li.textContent = film
                        appearance.appendChild(li)
                    }
                    for (let gallery_img  of jsonRes[i]["gallery"]){
                        let img = document.createElement('img')
                        img.classList.add("gallery__content")
                        img.src = gallery_img
                        gallery.appendChild(img)
                    }
                    for (let section of jsonRes[i]["content"]){
                        let section_name = document.createElement('p')
                        section_name.textContent = Object.keys(section)[0]
                        section_name.classList.add("main__subheader")
                        content.appendChild(section_name)
                        let section_content = document.createElement('p')
                        section_content.innerText = section[Object.keys(section)[0]]
                        section_content.classList.add("main__text-content")
                        content.appendChild(section_content)
                    }
                }
            }
        })
}



window.addEventListener('DOMContentLoaded',function (){
    fillCard(location.search)
})

