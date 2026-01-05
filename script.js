const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.remove("opacity-0", "invisible", "translate-y-4");
            backToTop.classList.add("opacity-100", "visible", "translate-y-0");
        } else {
            backToTop.classList.add("opacity-0", "invisible", "translate-y-4");
            backToTop.classList.remove("opacity-100", "visible", "translate-y-0");
        }
    });

    const tabs = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.tab-content');
const tabItems = document.querySelectorAll('#tabs li');

tabItems.forEach(li => li.classList.add('group'));
tabItems[0].classList.remove('group');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('bg-[#0d6efd]'));
        panes.forEach(p => p.classList.add('hidden'));
        tabItems.forEach(li => li.classList.add('group'));
        tab.classList.add('bg-[#0d6efd]');
        document.getElementById(tab.dataset.tab).classList.remove('hidden');
        tabItems[index].classList.remove('group');
    });
});

const faqBtns = document.querySelectorAll('.faq-btn');

function closeAll() {
    document.querySelectorAll('.faq-content').forEach(content => {
        content.style.maxHeight = null;

        const btn = content.previousElementSibling;
        btn.classList.remove('active');
        btn.querySelector('.icon').classList.remove('rotate-180');
    });
}

faqBtns.forEach((btn, index) => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.icon');

    if (index === 0) {
        content.style.maxHeight = content.scrollHeight + 'px';
        btn.classList.add('active');
        icon.classList.add('rotate-180');
    }

    btn.addEventListener('click', () => {
        const isOpen = btn.classList.contains('active');

        closeAll();

        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            btn.classList.add('active');
            icon.classList.add('rotate-180');
        }
    });
});
    
const slider = document.getElementById("teamSlider");
const prevBtn = document.querySelector(".bi-chevron-left").parentElement;
const nextBtn = document.querySelector(".bi-chevron-right").parentElement;

let isMoving = false;

function cardWidth() {
    return slider.children[0].getBoundingClientRect().width;
}

function nextSlide() {
    if (isMoving) return;
    isMoving = true;

    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${cardWidth()}px)`;

    slider.addEventListener("transitionend", function handler() {
        slider.removeEventListener("transitionend", handler);
        slider.appendChild(slider.children[0]);
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
        isMoving = false;
    });
}

function prevSlide() {
    if (isMoving) return;
    isMoving = true;

    slider.insertBefore(
        slider.children[slider.children.length - 1],
        slider.children[0]
    );

    slider.style.transition = "none";
    slider.style.transform = `translateX(-${cardWidth()}px)`;

    requestAnimationFrame(() => {
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = "translateX(0)";
    });

    slider.addEventListener("transitionend", function handler() {
        slider.removeEventListener("transitionend", handler);
        isMoving = false;
    });
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

setInterval(nextSlide, 3500);

window.addEventListener("resize", () => {
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";
});
    
