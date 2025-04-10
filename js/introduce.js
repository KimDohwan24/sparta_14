// 마우스휠 애니메이션 변수
const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
let currentSection = 0;
let isAnimating = false;
// 스크롤바 변수
let bar;


window.onload = function () {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    bar = document.getElementsByClassName("bar-ing")[0];
};

function goSection(sectionIndex) {
    sectionIndex = Math.max(0, Math.min(sectionIndex, sections.length - 1));

    if (isAnimating || currentSection === sectionIndex) {
        return;
    }

    isAnimating = true;
    currentSection = sectionIndex;
    container.style.transform = `translateY(-${currentSection * 100}vh)`;

    let per = 100 * ((currentSection +1) /sections.length);
    bar.style.width = per + "%";

    setTimeout(()=> isAnimating = false, 500);
}

function changeSection(sectionIndex){
    currentSection = sectionIndex;
    let per = 100 * ((sectionIndex +1) /sections.length);

    bar.style.width = per + "%";
}

document.addEventListener('wheel', (e) =>{
    if(isAnimating) return;


    if(e.deltaY > 0){
        //휠다운
        goSection(currentSection + 1);
    } else {
        //휠업
        goSection(currentSection - 1);
    }
})