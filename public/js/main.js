document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.querySelector(".back-to-top");
    const links = document.querySelectorAll(".link");
    const menus = document.querySelectorAll(".menu");
    const logo = document.querySelector(".logo");
    const favourite = document.querySelector(".item-tool-favourite i");
    const controlindicators = document.querySelectorAll(".control-indicator");
    const scheduletours = document.querySelectorAll(".property-book-type div");
    const inequirytype = document.querySelectorAll(".enquiry-type .submenu .submenu-item");

    if (favourite) {
        favourite.addEventListener("click", () => {
            favourite.classList.toggle("liked");
        });
    }

    function toggleBackToTop() {
        if (window.scrollY >= 400) {
            backToTop.classList.remove("animate__zoomOut");
            backToTop.style.opacity = "1";
            backToTop.style.visibility = "visible";
            backToTop.classList.add("animate__zoomIn");
        } else {
            backToTop.classList.remove("animate__zoomIn");
            backToTop.style.opacity = "0";
            backToTop.style.visibility = "hidden";
            backToTop.classList.add("animate__zoomOut");
        }
    }

    if (backToTop) {
        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop);
        backToTop.addEventListener('click', () => {
            scrollToTop();
        });
    }

    controlindicators.forEach(control => {
        control.addEventListener('click', () => {
            controlindicators.forEach(t => t.classList.remove('active'));
            control.classList.add("active");
        });
    });

    scheduletours.forEach(control => {
        control.addEventListener('click', () => {
            scheduletours.forEach(t => t.classList.remove('active'));
            control.classList.add("active");
        });
    });

    if (logo) {
        logo.addEventListener("click", () => {
            window.location.href = "/";
        });
    }

    links.forEach(link => {
        link.addEventListener("click", (el) => {
            el.preventDefault();
        });
    });

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    
        const scrolledElement = document.querySelector(".scrolled");
        if (scrolledElement) {
            scrolledElement.classList.remove("animate__animated", "animate__slideInDown");
        }
    }
    

    menus.forEach(menu => {
        menu.addEventListener("mouseover", (event) => {
            const elementId = event.target.id;
            const submenu = menu.querySelector(".submenu");

            if (submenu) {
                submenu.style.display = 'block';

                const submenulinks = submenu.querySelectorAll('.submenu-link');
                submenulinks.forEach(sublink => {
                    sublink.addEventListener("click", (el) => {
                        el.preventDefault();
                        const linkDiv = menu.querySelector('.link');

                        if (linkDiv) {
                            linkDiv.innerText = sublink.textContent;
                        } else {
                            console.error(`.link element not found in menu with ID: ${menu.id}`);
                        }

                        submenu.style.display = 'none';
                    });
                });
            }
        });
    });
    

    document.addEventListener('scroll', handleScroll);

    function handleScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) { 
            if (!header.classList.contains('scrolled')) { 
                header.classList.add('scrolled', 'animate__animated', 'animate__slideInDown');
                header.style.animationDuration = "0.4s";
                document.querySelector(".logo-container").style.display = "flex";
                document.querySelector(".logo-container").style.justifyContent = "start";
                if(document.querySelector(".search-form")) {
                    document.querySelector(".search-form").style.marginTop = "0.2rem";
                }
            }
        } else {
            if (header.classList.contains('scrolled')) { 
                header.classList.remove('scrolled', 'animate__animated', 'animate__slideInDown');
                header.style.animationDuration = "";
                if(document.querySelector(".search-form")) {
                    document.querySelector(".search-form").style.marginTop = "";
                }
            }
        }
    }

    

    handleScroll();



    function appearcity() {
        const citySelect = document.querySelector(".city-select");
        citySelect.classList.add("animate__animated", "animate__zoomIn");
        citySelect.style.setProperty("--animate-duration", "0.8s");
        document.querySelector("#state-list").style.marginRight = "1.1rem";
        citySelect.style.display = "block";
    }

    function appearzip() {
        const zipSelect = document.querySelector("#zip-container");
        zipSelect.classList.add("animate__animated", "animate__zoomIn");
        zipSelect.style.setProperty("--animate-duration", "0.8s");
        zipSelect.style.display = "block";
        document.querySelector("#zip-container input").style.marginTop = "0.8rem";
        document.querySelector("#zip-container label").style.fontWeight = "550";
        document.querySelector("#zip-container label").style.marginLeft = "0.5rem";
    }

    document.querySelectorAll('.bio-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
          const bio = toggle.nextElementSibling; // Select the .developer-bio div
          const icon = toggle.querySelector('i');
      
          // Toggle active class for bio and rotated class for icon
          bio.classList.toggle('active');
          icon.classList.toggle('rotated');
        });
      });
      
    

    // Initialize the main Swiper
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        speed: 900,
        effect: 'slide',
    });

    // Initialize the featured card Swiper
    var newswiper = new Swiper(".featured-card-container", {
        spaceBetween: 1,
        slidesPerView: 4,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        speed: 900,
        effect: 'slide',
    });

    // Select elements
    const searchForm = document.querySelector(".search-form");
    const searchInput = document.querySelector("#search-query");
    const autocompleteContainer = document.querySelector(".autocomplete-container");
    const list = document.querySelectorAll(".autocomplete-item");

    // Handle input event for search
    if(searchInput) {
        searchInput.addEventListener("input", function() {
            if (searchInput.value.length > 0) {
                searchForm.classList.add("shifted");
                document.querySelector(".search-input-container").style.borderRadius = "2.5rem";
    
                // Apply fade-in-left animation one by one
                list.forEach((item, index) => {
                    item.classList.remove("animate__fadeInLeft");
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.classList.add("animate__animated", "animate__fadeInLeft");
                });
                autocompleteContainer.classList.add("animate__animated", "animate__zoomIn", "show");
            } else {
                resetSearchForm();
            }
        });
    }
    
    // Handle click event outside the search form or autocomplete container
    document.addEventListener("click", function(event) {
        try {
            if(searchForm && autocompleteContainer) {
                if (!searchForm.contains(event.target) && !autocompleteContainer.contains(event.target)) {
                    resetSearchForm();
                }
            }
        } catch (error) {
            console.error("Error handling click event:", error.message);
        }
    });
    

    // Function to reset the search form and autocomplete container
    function resetSearchForm() {
        searchForm.classList.remove("shifted");
        document.querySelector(".search-input-container").style.borderRadius = "";
        autocompleteContainer.classList.remove("animate__animated", "animate__zoomIn", "show");

        list.forEach(item => {
            item.classList.remove("animate__animated", "animate__fadeInLeft");
            item.style.animationDelay = "";
        });
    }



    if(document.querySelector(".search-form")) {
        //city and states list 
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", "TzFsYmJUODc5UGk2ZlpXTW94ZmpHUkg0N0VNQWV6Rnplb2pjME8yYw==");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        const stateOptions = document.getElementById("state-options");
        const cityOptions = document.getElementById("city-options");

        // Fetch states and populate the states dropdown
        fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
        .then(response => response.json())
        .then(states => {
            // Sort states alphabetically by name
            states.sort((a, b) => a.name.localeCompare(b.name));

            states.forEach(state => {
            const li = document.createElement("li");
            li.textContent = state.name;
            li.dataset.stateCode = state.iso2; 
                li.addEventListener("click", () => {
                    document.getElementById("state-select").value = state.name;
                    loadCities(state.iso2);
                    stateOptions.parentElement.style.display = "none";
                    appearcity();
                    showlist();
                });
                if(stateOptions) {
                    stateOptions.appendChild(li);
                }
            
            });
        })
        .catch(error => console.log("Error fetching states:", error));


        function loadCities(stateCode) {
        cityOptions.innerHTML = "";
        fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`, requestOptions)
            .then(response => response.json())
            .then(cities => {
                cities.forEach(city => {
                    const li = document.createElement("li");
                    li.textContent = city.name;
                        li.addEventListener("click", () => {
                        document.getElementById("city-select").value = city.name;
                        cityOptions.parentElement.style.display = "none"; 
                        appearzip();
                        showlist();
                        });
                    cityOptions.appendChild(li);
                });
            })
            .catch(error => console.log("Error fetching cities:", error));
        }

        function showlist() {
            const list = document.querySelectorAll(".dropdown-list");
            list.forEach(item => {
                item.style.display = "flex";
            });
        }

        // Filter the list based on the search input
        window.filterList = function (searchBox, listClass) {
            const filter = searchBox.value.toLowerCase();
            const list = document.querySelector(`.${listClass} ul`).children;
            for (let item of list) {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(filter) ? "" : "none";
            }
        };
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        const title = link.getAttribute('title');
        link.setAttribute('data-title', title);
        link.removeAttribute('title');
    });

    inequirytype.forEach(item => {
        console.log(item);
        item.addEventListener("click", () => {
            console.log(item.dataset.value);
        });
    });
});
