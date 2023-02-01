window.addEventListener('DOMContentLoaded',function (){
    const slider_track = document.getElementById('slider-track')
    const previous = document.getElementById('previous')
    const next = document.getElementById('next')
    const slide = document.querySelector('.slide')

    let shift = slide.offsetWidth
    window.onresize = () => {
        shift = slide.offsetWidth
    }

    let images = Array.from(slider_track.querySelectorAll('.slide'))

    previous.onclick = function (e){
        previous.style.pointerEvents = "none"
        slider_track.insertBefore(images[images.length-1], slider_track.firstChild);
        slider_track.style.transitionDuration = "0ms"
        slider_track.style.translate = `${-shift}px`
        setTimeout(()=>previous.style.pointerEvents = "visible",300)
        setTimeout(function (){
            slider_track.removeChild(slider_track.children[images.length-1])
            slider_track.style.transitionDuration = "200ms"
            slider_track.style.translate = "0px";

        },10)
        images=images.splice(-1).concat(images);
    }

    next.onclick = function (){
        next.style.pointerEvents = "none"
        let temp = images[0].cloneNode(true);
        slider_track.appendChild(temp)
        slider_track.style.transitionDuration = "200ms"
        slider_track.style.translate = `${-shift}px`
        setTimeout(function (){
            slider_track.removeChild(slider_track.children[0])
            slider_track.style.transitionDuration = "0ms"
            slider_track.style.translate = "0px";
            next.style.pointerEvents = "visible"
        },300)

        images=images.splice(1).concat(images);
    }
})

