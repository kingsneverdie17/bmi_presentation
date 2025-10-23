document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const slides = document.querySelectorAll('.slide');
    const interactiveBg = document.querySelector('.interactive-bg');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isScrolling = false;

    // Функція для керування видимістю фону
    function toggleBgVisibility(slideIndex) {
        if (slideIndex >= 3) { // Починаючи з 4-го слайда (індекс 3)
            interactiveBg.classList.add('hidden');
        } else {
            interactiveBg.classList.remove('hidden');
        }
    }

    // Прокрутка слайдів
    function scrollToSlide(slideIndex) {
        if (isScrolling) return;
        isScrolling = true;

        // Оновлюємо активний клас
        slides[currentSlide].classList.remove('active');
        slides[slideIndex].classList.add('active');

        // Рухаємо контейнер
        container.style.transform = `translateY(-${slideIndex * 100}vh)`;
        currentSlide = slideIndex;

        // Керуємо видимістю фону
        toggleBgVisibility(currentSlide);

        // Запобігаємо повторній прокрутці до завершення анімації
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Час трохи більший за transition-speed в CSS
    }

    // Слухач подій для прокрутки мишкою
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) { // Прокрутка вниз
            if (currentSlide < totalSlides - 1) {
                scrollToSlide(currentSlide + 1);
            }
        } else { // Прокрутка вгору
            if (currentSlide > 0) {
                scrollToSlide(currentSlide - 1);
            }
        }
    });

    // Слухач подій для клавіш
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            if (currentSlide < totalSlides - 1) {
                e.preventDefault(); // Запобігає прокрутці сторінки за замовчуванням
                scrollToSlide(currentSlide + 1);
            }
        } else if (e.key === 'ArrowUp') {
            if (currentSlide > 0) {
                e.preventDefault(); // Запобігає прокрутці сторінки за замовчуванням
                scrollToSlide(currentSlide - 1);
            }
        }
    });

    // Ініціалізація першого слайду та видимості фону
    slides[0].classList.add('active');
    toggleBgVisibility(0); // Перевіряємо видимість фону при завантаженні
});