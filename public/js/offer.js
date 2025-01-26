const exploreServices = document.querySelector(".explore-services");
const serviceImages = document.querySelectorAll(".service img");

if (exploreServices && serviceImages.length > 0) {
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    window.addEventListener("scroll", () => {
        if (isInViewport(exploreServices)) {
            serviceImages.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add("show-service"); 
                }, index * 200); 
            });
        }
    });
}