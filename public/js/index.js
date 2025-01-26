document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('#myRange');
    const output = document.querySelector('.PB-range-slidervalue');
    const logo = document.querySelector(".logo");
    const picker = document.querySelector("duet-date-picker");
    const createlisting = document.querySelector(".createListing");
    const newlisting = document.querySelector(".newListing");
    const newlistingPara = document.querySelector(".newListing a");
    const accountRoute = document.querySelector('#account-route');
    const popupInput = document.querySelector('.popup input');
    const popupWindow = document.querySelector('.popup-window');
    const popupbutton = document.querySelectorAll(".popup-window ul button");


    document.querySelectorAll('.faq-heading').forEach((heading) => {
        heading.addEventListener('click', () => {
            const parent = heading.parentElement;
            parent.classList.toggle('open');
            const content = parent.querySelector('.faq-content');
            
            if (parent.classList.contains('open')) {
                content.style.padding = "2rem";
                content.style.paddingTop = "0";
                content.style.maxHeight = content.scrollHeight + 'px';
                heading.style.borderBottomLeftRadius = "0";
                heading.style.borderBottomRightRadius = "0";
                heading.style.backgroundColor = "#e3e3e3";
            } else {
                content.style.maxHeight = null;
                setTimeout(() => {
                    content.style.padding = "";
                }, 340);
                content.style.paddingTop = "";
                heading.style.borderBottomLeftRadius = "";
                heading.style.borderBottomRightRadius = "";
                heading.style.backgroundColor = "";
            }
        });
    });
    

    if (accountRoute && popupInput && popupWindow) {
        const togglePopup = (isVisible) => {
            popupInput.checked = isVisible;
            popupWindow.style.visibility = isVisible ? 'visible' : 'hidden';
            popupWindow.style.opacity = isVisible ? '1' : '0';
            popupWindow.style.transform = isVisible ? 'scale(var(--nav-active-scale))' : '';
        };
    
        accountRoute.addEventListener('click', (event) => {
            event.stopPropagation();
            togglePopup(true);
        });
    
        document.addEventListener('click', (event) => {
            const isClickInside = accountRoute.contains(event.target) || popupWindow.contains(event.target);
    
            if (!isClickInside && popupInput.checked) {
                togglePopup(false);
            }
        });
    
        popupWindow.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        popupbutton.forEach((button) => {
            button.addEventListener('click', () => {
                togglePopup(false); 
            });
        });
    }
    

    if (window.location.pathname == "/") {
        createlisting.addEventListener("mouseover", () => {
            newlisting.style.borderTopLeftRadius = "0";  
            newlisting.style.borderBottomLeftRadius = "0";
            newlisting.style.transform = "scaleX(1.018) scaleY(1.205) translateY(0.3px)";
            newlistingPara.style.transform = "scaleX(0.982) scaleY(0.865)";
            newlistingPara.style.color = "#f3f4f6";
        });

        createlisting.addEventListener("mouseout", () => {
            newlisting.style.borderTopLeftRadius = ""; 
            newlisting.style.borderBottomLeftRadius = ""; 
            newlisting.style.transform = "";  
            newlistingPara.style.transform = "";
            newlistingPara.style.color = "#f3f4f6";
        });
    } else {
        createlisting.addEventListener("mouseover", () => {
            newlistingPara.style.color = "#f3f4f6";
        });

        createlisting.addEventListener("mouseout", () => {
            newlistingPara.style.color = "#f3f4f6";
        });
    }
    

    const listingView = document.querySelector('.listing-view');
    if(listingView) {
        listingView.classList.add('list-view');
    }

    if(document.querySelector(".view1") && document.querySelector(".view2")) {
        document.querySelector('.view1').addEventListener('click', function() {
            const listingView = document.querySelector('.listing-view');
            listingView.classList.add('list-view');  
            document.querySelector(".view2").style.backgroundColor = "transparent";
            document.querySelector(".view1").style.backgroundColor = "rgba(143, 214, 249, 0.5)";
        });

        document.querySelector('.view2').addEventListener('click', function() {
            document.querySelector('.listing-view').classList.remove('list-view');
            document.querySelector(".view1").style.backgroundColor = "transparent";
            document.querySelector(".view2").style.backgroundColor = "rgba(143, 214, 249, 0.5)";
        });
    }

    function getVals() {
        let parent = this.parentNode;
        let slides = parent.getElementsByTagName('input');
        let slide1 = parseFloat(slides[0].value);
        let slide2 = parseFloat(slides[1].value); 
        if (slide1 > slide2) {
          let tmp = slide2;
          slide2 = slide1;
          slide1 = tmp;
        }
        let displayElement = parent.getElementsByClassName('rangeValues')[0];
        displayElement.innerHTML = '₹' + slide1 + ' - ₹' + slide2;
    }
    window.onload = function () {
        let sliderSections = document.getElementsByClassName('range-slider');
        for (let x = 0; x < sliderSections.length; x++) {
            let sliders = sliderSections[x].getElementsByTagName('input');
            for (let y = 0; y < sliders.length; y++) {
                if (sliders[y].type === 'range') {
                    sliders[y].oninput = getVals; 
                    sliders[y].oninput();
                }
            }
        }
    };

    const btnFeaturesList = document.querySelector('.btn-features-list');
    const featuresList = document.querySelector('.features-list');

    if(featuresList && btnFeaturesList) {
       btnFeaturesList.addEventListener('click', function() {
        featuresList.classList.toggle('show');
        }); 
    }
    

    logo.addEventListener("click", () => {
        window.location.href = "/";
    });

    let map;
    let marker;
    let geocoder;
    let googleMapsLoaded = false;

    function loadGoogleMaps(apiKey, libraries) {
        if (!googleMapsLoaded) {
            googleMapsLoaded = true;

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}&callback=initMap`;
            script.async = true;  
            script.defer = true;
            document.head.appendChild(script);

        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadGoogleMaps('AIzaSyC_llNpxD6yGesuX31DW-2fg0ZMWpC50iA', ['places', 'drawing', 'marker', 'geocoding']);
    });

    async function initMap() {
        const mapElement = document.getElementById("map");
        if (!mapElement) {
            return; 
        }
        const position = getCurrentLocation();
        geocoder = new google.maps.Geocoder();

        const { Map } = await google.maps.importLibrary("maps");
        
        map = new Map(document.getElementById("map"), {
            zoom: 13,
            center: position,
            mapId: "DEMO_MAP_ID",
            scrollwheel: true,
        });  
        

        marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: position,
            title: "Default Location",
        });

        const input = document.getElementById("location-input");
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo("bounds", map);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            map.setCenter(place.geometry.location);
            map.setZoom(17);
            marker.position = place.geometry.location;
        });
    }

    function getCurrentLocation() {
        const defaultLocation = { lat: 28.6139, lng: 77.2090 };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
        
                    map.setCenter(location);
                    if (marker) {
                        marker.setPosition = location; 
                    } else {
                        marker = new google.maps.marker.AdvancedMarkerElement({ 
                            position: location,
                            map: map,
                        });
                    }
                    map.setZoom(15);
                    geocodeLatLng(location);
                },
                () => {
                    handleGeolocationError(defaultLocation);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            handleGeolocationError(defaultLocation);
        }
        
        function handleGeolocationError(defaultLocation) {
            map.setCenter(defaultLocation);
            if (marker) {
                marker.setPosition = defaultLocation;
            } else {
                marker = new google.maps.marker.AdvancedMarkerElement({
                    position: defaultLocation,
                    map: map,
                });
            }
            map.setZoom(12);
            geocodeLatLng(defaultLocation);
        }        
    }

    function geocodeLatLng(latlng) {
        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    document.getElementById('location-input').value = results[0].formatted_address;
                } else {
                    alert("No results found");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }

    if(document.getElementById("detect-location-btn")) {
        document.getElementById("detect-location-btn").addEventListener("click", getCurrentLocation);
    }

    initMap();

    if(slider && output) {
       slider.addEventListener("input", () => {
        output.innerHTML = slider.value;  
        });

        output.innerHTML = slider.value; 
    }

    
    if(picker) {
        picker.addEventListener("duetChange", function(event) {
            output.innerHTML = event.detail.valueAsDate
        });
    }

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".accordion-title .material-symbols-outlined");
    
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('expanded');
                icon.classList.remove('rotate'); 
            } else {
                document.querySelectorAll('.accordion-content').forEach(c => {
                    c.style.maxHeight = null;
                    c.classList.remove('expanded');
                });
                document.querySelectorAll('.materials-symbols-outlined').forEach(i => {
                    i.classList.remove('rotate'); 
                });
    
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('expanded');
                icon.classList.add('rotate'); 
            }
    
            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelectorAll('.block-title-wrap').forEach(title => {
        title.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".material-symbols-outlined");
    
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('expanded');
                icon.classList.remove('rotate'); 
            } else {
                document.querySelectorAll('.accordion-content').forEach(c => {
                    c.style.maxHeight = null;
                    c.classList.remove('expanded');
                });
                document.querySelectorAll('.materials-symbols-outlined').forEach(i => {
                    i.classList.remove('rotate'); 
                });
    
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('expanded');
                icon.classList.add('rotate'); 
            }
    
            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
            this.classList.add('active');
        });
    });

    if(document.querySelector('.description-container')) {
        document.querySelector('.description-container').click();
    }

    document.addEventListener('click', function(event) {
        const popup = document.querySelector('.popup');
        const popupInput = document.querySelector('.popup input');
 
        if (popup && popupInput && !popup.contains(event.target)) {
            popupInput.checked = false; 
        }
    }); 
    
    document.querySelectorAll("#login, #signup").forEach(element => {
        element.addEventListener("click", () => {
            document.querySelector(".popup input").checked = false;
        })
    });

    document.querySelector("#signup").addEventListener("click", () => {
        document.querySelector("#login-go").addEventListener("click", () => {
            Swal.close();
            document.querySelector("#login").click();
        });
    });

    if(document.querySelector("#login-go")) {
        document.querySelector("#login-go").addEventListener("click", () => {
            document.querySelector("#signup-go").addEventListener("click", () => {
                Swal.close();
                document.querySelector("#signup").click();
            });
        });
    }

    
    

    if(document.querySelector("#apartment")) {
        const apartmentParent = document.querySelector("#apartment").parentElement;
        const residentSection = document.querySelector("#resident");
        const sharedSection = document.querySelector("#shared");
        const residentLinks = residentSection.querySelectorAll("a");

        apartmentParent.addEventListener("click", () => {
            residentSection.style.display = "flex";
            sharedSection.style.display = "none";
    
            residentLinks.forEach((item) => {
                if (!item.dataset.listenerAdded) {
                    item.addEventListener("click", (e) => {
                        e.preventDefault();
                    });
                    item.dataset.listenerAdded = true; 
                }
            });
        });
    
    
    
        const rentalParent = document.querySelector("#rental").parentElement;
        const suboptionsLink = document.querySelector("#suboptions .link");
    
        rentalParent.addEventListener("click", () => {
            sharedSection.style.display = "flex";
            residentSection.style.display = "none";
    
            const sharedLinks = sharedSection.querySelectorAll("a");
            sharedLinks.forEach((item) => {
                item.addEventListener("click", (e) => {
                    e.preventDefault();
                    suboptionsLink.textContent = item.getAttribute("data-value") || item.textContent;
                });
            });
        });
    }
    

    

    




    if(document.querySelector(".search-form")) {
        //Landing Page search form code

        const searchSubmit = document.querySelector(".search-btn");
        // const topicInput = document.querySelectorAll("#topic-input .submenu .submenu-item .submenu-link");
        // const sizeInput = document.querySelectorAll("#search-size-input .submenu .submenu-item .submenu-link");
        // const priceInput = document.querySelectorAll("#search-price-input .submenu .submenu-item .submenu-link");
        // const zipInput = document.querySelector("#zip");
        const queryInput = document.querySelector("#search-query");

        const formData = {
            // search_topic: "",
            // search_state: "",
            // search_city: "",
            // search_zip: "",
            // search_size: "",
            // search_price: "",
            search_query: "",
        };

        // function checkLocationDynamic(parentSelector, formDataKey) {
        //     document.querySelector(parentSelector).addEventListener("click", (event) => {
        //         if (event.target.tagName === "LI") { 
        //             event.preventDefault();
        //             formData[formDataKey] = event.target.innerHTML.trim();
        //         }
        //     });
        // }
        
        // function checkChanges(target, formDataKey) {
        //     target.addEventListener('change', (event) => {
        //         event.preventDefault();
        //         formData[formDataKey] = event.target.value;
        //     });
        // }
        

        // zipInput.addEventListener("change", () => {
        //     formData.search_zip = zipInput.value;
        // })
        
        // checkChanges(queryInput, 'search_query');
        // checkChanges(sizeInput, 'search_size');
        // checkChanges(priceInput, 'search_price');

        // checkLocationDynamic("#state-options", 'search_state');
        // checkLocationDynamic("#city-options", 'search_city');

        
        

        function validateForm() {

            let isValid = true;

            // Validate Query
            if (!formData.search_query) {
                document.querySelector("#search-query").style.border = "1px solid red";
                document.querySelector("#search-query").classList.add("animate__animated", "animate__shakeX");
                isValid = false;
            } else {
                document.querySelector("#search-query").style.border = "";
            }
        
            // Validate Topic
            // if (!formData.search_topic) {
            //     document.querySelector("#topic-input").style.border = "1px solid red";
            //     document.querySelector("#topic-input").classList.add("animate__animated", "animate__shakeX");
            //     isValid = false;
            // } else {
            //     document.querySelector("#topic-input").style.border = "";
            // }

            // Validate State 
            // if (!formData.search_state) {
            //     document.querySelector("#state-select").style.border = "1px solid red";
            //     document.querySelector("#state-select").classList.add("animate__animated", "animate__shakeX");
            //     isValid = false;
            // } else {
            //     document.querySelector("#state-select").style.border = "";
            // }   

            // Validate City
            // if(!formData.search_city) {
            //     document.querySelector("#city-select").style.border = "1px solid red";
            //     document.querySelector("#city-select").classList.add("animate__animated", "animate__shakeX");
            //     isValid = false;
            // } else {
            //     document.querySelector("#city-select").style.border = "";
            // }

            // Validate Zip
            // if (!formData.search_zip) {
            //     document.querySelector("#zip").style.border = "1px solid red";
            //     document.querySelector("#zip").classList.add("animate__animated", "animate__shakeX");
            //     isValid = false;
            // } else {
            //     document.querySelector("#zip").style.border = "";
            // }

            // Validate Size
            // if (!formData.search_size) {
            //     document.querySelector("#search-size-input").style.border = "1px solid red";
            //     document.querySelector("#search-size-input").classList.add("animate__animated", "animate__shakeX");
            //     isValid = false;
            // } else {
            //     document.querySelector("#search-size-input").style.border = "";
            // }

            // Validate Price
            // if (!formData.search_price) {
            //     document.querySelector("#search-price-input").style.border = "1px solid red";
            //     document.querySelector("#search-price-input").classList.add("animate__animated", "animate__shakeX");
            //     isValid = false;
            // } else {
            //     document.querySelector("#search-price-input").style.border = "";
            // }

            return isValid;
        }
        

        searchSubmit.addEventListener("click", (e) => {
            if(!validateForm()) {
                e.preventDefault();
            }
        });
    }
    
});