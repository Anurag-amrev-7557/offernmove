document.addEventListener('DOMContentLoaded', (event) => {
    const menus = document.querySelectorAll(".menu");
    const enquirytypeinput = document.querySelectorAll("#form-type .submenu .submenu-item .submenu-link");
    const typeError = document.querySelector("#type-error");
    const firstname = document.querySelector(".firstname");
    const lastname = document.querySelector(".lastname");
    const email = document.querySelector(".enquiry-email");
    const phone = document.querySelector(".enquiry-phone");
    const emailotp = document.querySelector(".enquiry-email-otp");
    const phoneotp = document.querySelector(".enquiry-phone-otp");
    const locationinput = document.querySelectorAll("#locaton-input .submenu .submenu-item .submenu-link");
    const serviceinput = document.querySelectorAll("#repair-input .submenu .submenu-item .submenu-link");
    const zip = document.querySelector(".enquiry-zip");
    const submitEnquiry = document.querySelector(".enquiry-submit");
    const firstnameError = document.querySelector("#first-name-error");
    const lastnameError = document.querySelector("#last-name-error");
    const emailError = document.querySelector("#email-error");
    const phoneError = document.querySelector("#phone-error");
    const emailotpError = document.querySelector("#email-otp-error");
    const phoneotpError = document.querySelector("#phone-otp-error");
    const termsError = document.querySelector("#terms-error");
    const priceError = document.querySelector("#price-error");
    const sizeError = document.querySelector("#size-error");
    const bhkError = document.querySelector("#bhk-error");
    const areaError = document.querySelector("#area-error");
    const servicesError = document.querySelector("#services-error");
    const terms = document.querySelector("#agreement");



    event.preventDefault();

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

    const handleSendOTP = async (email) => {
        try {
            const url = "/auth/sendOtp";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }), 
            });
    
            const data = await response.json(); 

            if (data.success && data.otp) {
                storedOTP = data.otp;
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error("Error while sending OTP:", err);
            return false;
        }
    };

    const formData = {
        enquiry_type: '',
        form_first_name: '',
        form_last_name: '',
        form_email: '',
        form_email_otp: '',
        form_phone: '',
        form_phone_otp: '',
        enquiry_location: '',
        form_zip: '',
        form_services: '',
        form_price: '',
        form_size: '',
        form_bhk: '',
        form_area: '',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        formData[name] = value;
    };

    function change(e) {
        if(e) {
            e.addEventListener('change', handleChange);
        }
    }

    change(firstname);
    change(lastname);
    change(email);
    change(emailotp);
    change(phone);
    change(phoneotp);
    change(zip);

    let selectedRole = '';
    let animationTriggered = false; 

    enquirytypeinput.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            selectedRole = event.target.getAttribute('value');
            formData.enquiry_type = selectedRole;

            function getChange() {
                const enquiryProperty = document.querySelector(".enquiry-property");
                const enquiryRepair = document.querySelector(".repair-enquiry");

                if (selectedRole === "interior") {
                    if (enquiryProperty) {
                        enquiryProperty.classList.remove("animate__zoomIn");
                        enquiryProperty.classList.add("animate__zoomOut");
                        setTimeout(() => {
                            enquiryProperty.style.display = "none";
                        }, 300);
                    }
                } else if (selectedRole === "purchase" || selectedRole === "rent" || selectedRole === "shifting") {
                    if (enquiryProperty) {
                        if(enquiryRepair.style.display == "flex") {
                            enquiryRepair.classList.remove("animate__zoomIn");
                            enquiryRepair.classList.add("animate__zoomOut");
                            setTimeout(() => {
                                enquiryRepair.style.display = "none";
                            }, 300);
                        }
                        enquiryProperty.classList.remove("animate__zoomOut");
                        enquiryProperty.classList.add("animate__zoomIn");
                        enquiryProperty.style.display = "flex";
                        
            
                        if (animationTriggered) {
                            enquiryProperty.classList.add("animate__zoomIn");
                        } else {
                            enquiryProperty.classList.remove("animate__zoomIn");
                        }
                    }
                }

                if (selectedRole === "interior" || selectedRole === "repair") {
                    animationTriggered = true;
                }

                if(selectedRole == "repair") {
                    if (enquiryProperty) {
                        enquiryProperty.classList.remove("animate__zoomIn");
                        enquiryProperty.classList.add("animate__zoomOut");
                        setTimeout(() => {
                            enquiryProperty.style.display = "none";
                        }, 300);

                        enquiryRepair.classList.remove("animate__zoomOut");
                        enquiryRepair.classList.add("animate__zoomIn");
                        enquiryRepair.style.display = "flex";

                    }
                }
            }

            getChange();
        });
    });


    let selectedLocation = '';
    locationinput.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            selectedLocation = event.target.getAttribute('value');
            formData.enquiry_location = selectedLocation;
        });
    });

    let selectedService = '';
    serviceinput.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            selectedService = event.target.getAttribute('value');
            formData.form_services = selectedService;
        });
    });



    function validateForm() {

        let isValid = true;
    
        typeError.textContent = "",
        firstnameError.textContent = "";
        lastnameError.textContent = "";
        emailError.textContent = "";
        emailotpError.textContent = "";
        phoneError.textContent = "";
        phoneotpError.textContent = ""; 
        termsError.textContent = "";
        priceError.textContent = "";
        sizeError.textContent = "";
        bhkError.textContent = "";
        areaError.textContent = "";
        servicesError.textContent = "";
    
        // Validate Type
        if (!formData.enquiry_type) {
            typeError.textContent = "Required";
            isValid = false;
        } else {
            typeError.textContent = ""; 
        }
    
        // Validate Email with a regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            emailError.textContent = "Required";
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            emailError.textContent = "Enter a valid email address";
            isValid = false;
        }

        // Validate Phone
        if(!formData.form_phone) {
            phoneError.textContent = "Required";
            isValid = false;
        } else {
            phoneError.textContent = "";
        }

        // Validate First Name
        if(!formData.form_first_name) {
            firstnameError.textContent = "Required";
            isValid = false;
        } else {
            firstnameError.textContent = "";
        }

        // Validate Last Name
        if(!formData.form_last_name) {
            lastnameError.textContent = "Required";
            isValid = false;
        } else {
            lastnameError.textContent = "";
        }
        

        // Validate Email OTP
        if(!formData.form_email_otp) {
            emailotpError.textContent = "Required";
            isValid = false;
        } else {
            emailotpError.textContent = "";
        }


        // Validate Phone OTP
        if(!formData.form_phone_otp) {
            phoneotpError.textContent = "Required";
            isValid = false;
        } else {
            phoneotpError.textContent = "";
        }

        // Validate Terms
        if(!terms.checked) {
            termsError.style.textAlign = "start";
            termsError.textContent = "Please accept the terms and conditions."
            isValid = false;
        } else {
            termsError.textContent = "";
        }


        // Validate Services
        if(selectedRole == "repair") {
            if(!formData.form_services) {
                servicesError.textContent = "Required";
                isValid = false;
            } else {
                servicesError.textContent = "";
            }
        } else {
            if(!formData.form_price) {
                priceError.textContent = "Required";
                isValid = false;
            }

            if(!formData.form_size) {
                sizeError.textContent = "Required";
                isValid = false;
            }

            if(!formData.form_bhk) {
                bhkError.textContent = "Required";
                isValid = false;
            }

            if(!formData.form_area) {
                areaError.textContent = "Required";
                isValid = false;
            }

            
        }

        return isValid;
    }


    submitEnquiry.addEventListener("click", (e) => {
        e.preventDefault();


        validateForm();
    });

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
        li.dataset.stateCode = state.iso2; // Store state code for fetching cities
            li.addEventListener("click", () => {
                document.getElementById("state-select").value = state.name;
                loadCities(state.iso2); // Load cities based on selected state
                stateOptions.parentElement.style.display = "none"; // Hide dropdown
            });
        stateOptions.appendChild(li);
        });
    })
    .catch(error => console.log("Error fetching states:", error));


    // Load cities for the selected state
    function loadCities(stateCode) {
    cityOptions.innerHTML = ""; // Clear existing cities
    fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`, requestOptions)
        .then(response => response.json())
        .then(cities => {
            cities.forEach(city => {
                const li = document.createElement("li");
                li.textContent = city.name;
                    li.addEventListener("click", () => {
                    document.getElementById("city-select").value = city.name;
                    cityOptions.parentElement.style.display = "none"; // Hide dropdown
                    });
                cityOptions.appendChild(li);
            });
        })
        .catch(error => console.log("Error fetching cities:", error));
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
});
