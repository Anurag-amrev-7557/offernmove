document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#signup').addEventListener("click", function(event) {
        event.preventDefault();

        Swal.fire({

            showClass: {
                popup: `
                  animate__animated
                  animate__zoomIn
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__zoomOut
                `
              },

            html: ` 
                <i class="fa-solid fa-xmark"></i>
                <form class="form_container">
                <div class="title_container">
                    <p class="title">Register your Account</p>
                    <span class="subtitle">Get started with our app, just create an account and enjoy the experience.</span>
                </div>
                <span class="error-message animate__animated" id="accountexist_error" style="font-size: 0.8rem; width: 85%; color: red; font-weight: 550; transition: all 0.3s ease; position: absolute; top: 8.35rem;"></span>
                <br>
                
                <div class="input_container">
                    <label class="input_label" for="email_field">Email</label>
                    <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                        <path stroke-linejoin="round" stroke-width="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                        </svg>
                    <input placeholder="name@mail.com" title="Email" name="email" type="text" class="input_field" id="email_field" required>
                    <span class="error-message" id="email_error" style="font-size: 0.7rem; color: red; font-weight: 550; transition: all 0.3s ease;"></span>
                </div>

                <div class="input_container">
                    <label class="input_label" for="phone_field">Phone</label>
                    <span class="material-symbols-outlined">call</span>
                    <input placeholder="+91 XXXXXXXXXX" title="Phone" name="phone" type="text" class="input_field" id="phone_field" required>
                    <span class="error-message" id="phone_error" style="font-size: 0.7rem; color: red; font-weight: 550; transition: all 0.3s ease;"></span>
                </div>
                
                <div class="input_container">
                    <label class="input_label" for="password_field">Password</label>
                    <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                        <path fill="#141B34" d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"></path>
                        </svg>
                    <input placeholder="Password" title="Password" name="password" type="password" class="input_field" id="password_field" required>
                    <i class="fa-regular fa-eye" id="togglePassword"></i>
                    <span class="error-message" id="password_error" style="font-size: 0.7rem; color: red; font-weight: 550; transition: all 0.3s ease;"></span>
                </div>
                <div class="terms-acceptance">
                    <div class="term1">
                        <div class="content">
                            <label class="checkBox">
                                <input type="checkbox" id="ch1" required>
                                <div class="transition"></div>
                            </label>
                        </div>
                        <label for="ch1" style="cursor: pointer; color: rgba(0,0,0,1);">By using the website, you accept the <a href="/terms" id="termsconditions">Terms and Conditions</a></label>
                    </div>
                    <span class="error-message" id="check_error" style="font-size: 0.7rem; color: red; font-weight: 550; transition: all 0.3s ease;"></span>
                </div>
                <button title="Sign Up" type="submit" class="sign-up_btn">
                    <div class="dot-container">
                        <div class="dot first-dot"></div>
                        <div class="dot second-dot"></div>
                        <div class="dot third-dot"></div>
                    </div>
                    <span>Register</span>
                </button>

                <div class="separator">
                    <hr class="line">
                    <span style="display: flex; width: 20%;">or</span>
                    <hr class="line">
                </div>
                <div class="brand-container">
                    <button title="Sign In" type="submit" class="sign-in_ggl g-signin2">
                        <svg xml:space="preserve" style="enable-background:new 0 0 512 512;" viewBox="0 0 512 512" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="20" version="1.1">
                            <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                                c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                                C103.821,274.792,107.225,292.797,113.47,309.408z" style="fill:#FBBB00;"></path>
                            <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                                c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                                c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style="fill:#518EF8;"></path>
                            <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                                c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                                c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style="fill:#28B446;"></path>
                            <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                                c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
                                C318.115,0,375.068,22.126,419.404,58.936z" style="fill:#F14336;"></path>
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                    <button title="Sign In" type="submit" class="sign-in_apl">
                            <svg preserveAspectRatio="xMidYMid" version="1.1" viewBox="0 0 256 315" height="20px" width="16px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path fill="#ffffff" d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249"></path>
                                </g>
                            </svg>
                        <span>Continue with Apple</span>
                    </button>
                </div>
                <div class="login-redirect">
                    <span>Already have an account? &nbsp;<span id="login-go">Login</span></span>
                </div>
                </form>
            `,

            showConfirmButton: false, 
            didOpen: () => {
                document.querySelector('.fa-xmark').addEventListener('click', function() {
                    Swal.close(); 
                });

                document.querySelectorAll(".submenu-item").forEach(item => {
                    item.addEventListener("mouseenter", () => {
                        item.style.borderRadius = "1.2rem";
                    })
                });
            
                document.querySelectorAll(".submenu-item").forEach(item => {
                    item.addEventListener("mouseout", () => {
                        item.style.borderRadius = "0rem";
                    })
                });
            },
            willOpen: () => {
                // Input Fields
                // const roleInput = document.querySelectorAll('#role_field .submenu .submenu-item .submenu-link');
                const emailInput = document.getElementById('email_field');
                const phoneInput = document.getElementById('phone_field');
                const passwordInput = document.getElementById('password_field');
                const form = document.querySelector(".form_container");
                const register = document.querySelector(".sign-up_btn");
                const terms = document.getElementById("ch1");
                const menus = document.querySelectorAll(".menu");
                const googleSignIn = document.querySelector(".g-signin2");

                // Error Messages
                // const roleError = document.getElementById("role_error");
                const emailError = document.getElementById("email_error");
                const phoneError = document.getElementById("phone_error");
                const passwordError = document.getElementById("password_error");
                const termsError = document.getElementById("check_error");
                const accountexistError = document.getElementById("accountexist_error");
                const togglePassword = document.querySelector('#togglePassword');
                const password = document.querySelector('#password_field');

                togglePassword.addEventListener('click', () => {
                    // Toggle password visibility
                    const isPassword = password.getAttribute('type') === 'password';
                    password.setAttribute('type', isPassword ? 'text' : 'password');

                    // Toggle icon class
                    togglePassword.classList.toggle("fa-eye", !isPassword);
                    togglePassword.classList.toggle("fa-eye-slash", isPassword);
                });

                menus.forEach(menu => {
                    menu.addEventListener("mouseover", () => {
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
                

                const isStrongPassword = (password) => {
                    const minLength = 6;
                    const hasUpperCase = /[A-Z]/.test(password);
                    const hasLowerCase = /[a-z]/.test(password);
                    const hasNumber = /\d/.test(password);
                    const hasSpecialChar = /[@$!%*?&#]/.test(password);
                    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
                };

                function validateForm() {

                    let isValid = true;
                
                    // roleError.textContent = "";
                    emailError.textContent = "";
                    phoneError.textContent = "";
                    passwordError.textContent = "";
                    // otpError.textContent = "";
                
                    // Validate Role
                    // if (!formData.role) {
                    //     roleError.textContent = "Required";
                    //     isValid = false;
                    // } else {
                    //     roleError.textContent = "";
                    // }

                    // Validate Phone
                    if(!formData.phone) {
                        phoneError.textContent = "Required";
                        isValid = false;
                    } else {
                        phoneError.textContent = "";
                    }
                
                    // Validate Email with a regex
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailInput.value.trim()) {
                        emailError.textContent = "Required";
                        isValid = false;
                    } else if (!emailPattern.test(emailInput.value)) {
                        emailError.textContent = "Enter a valid email address";
                        isValid = false;
                    }
                
                    // Validate Password
                    if (!passwordInput.value.trim()) {
                        passwordError.textContent = "Required";
                        isValid = false;
                    } else if (!isStrongPassword(passwordInput.value.trim())) {
                        passwordError.style.textAlign = "start";
                        passwordError.textContent = "Password must be at least 6 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.";
                        isValid = false;
                    } else 

                    // Validate Terms
                    if(!terms.checked) {
                        termsError.style.textAlign = "start";
                        termsError.textContent = "Please accept the terms and conditions.";
                        isValid = false;
                    } else {
                        termsError.textContent = "";
                    }

                    return isValid;
                }
                
                const loader = () => {
                    const registerSpan = document.querySelector(".sign-up_btn span");
                    if (registerSpan) {
                        registerSpan.textContent = "";
                    }

                    const dotContainer = document.querySelector(".dot-container");
                    if (dotContainer) {
                        dotContainer.style.display = "flex";
                    }
                }

                // let selectedRole = "";

                const formData = {
                    // role: '',
                    phone: '',
                    email: '',
                    otp: '',
                    password: '',
                };
                
                const handleChange = (e) => {
                    const { name, value } = e.target;
                    formData[name] = value;
                };
                  
                // roleInput.forEach(item => {
                //     item.addEventListener('click', (event) => {
                //         event.preventDefault();
                //         selectedRole = event.target.getAttribute('value');
                //         formData.role = selectedRole;
                //     });
                // });

                let storedOTP = null;

                const verifyOTP = (otp) => {

                    const otpError = document.getElementById("otp_error");

                    if(otp === storedOTP) {
                        otpError.style.color = "green";
                        otpError.textContent = "OTP verified successfully";
                        return true;
                    } else {
                        otpError.style.color = "red";
                        otpError.textContent = "Invalid OTP. Please try again!";
                        return false;
                    }
                };
                
                const handleVerification = () => {
                    Swal.fire({

                        showClass: {
                            popup: `
                              animate__animated
                              animate__zoomIn
                            `
                          },
                          hideClass: {
                            popup: `
                              animate__animated
                              animate__zoomOut
                            `
                          },

                        html: ` 
                            <i class="fa-solid fa-xmark" onclick="Swal.close()" style="cursor: pointer; float: right;"></i>
                            <div class="otp-container">
                                <h4>Verification Code</h4>
                                <p>We have sent the verification code to your given email address.</p>
                                <form action="#">
                                    <div class="input-otp">
                                        <input type="text" id="otp1" class='otp-value' maxlength="1" />
                                        <input type="text" id="otp2" class='otp-value' maxlength="1" />
                                        <input type="text" id="otp3" class='otp-value' maxlength="1" />
                                        <input type="text" id="otp4" class='otp-value' maxlength="1" />
                                    </div>
                                    <span id="resendcode">Resend OTP</span>
                                    <span class="error-message animate__animated" id="otp_error" style="font-size: 0.7rem; color: red; font-weight: 550; transition: all 0.3s ease;"></span>
                                    <button id="verifyOtp" style="z-index: 10000000;">Verify OTP</button>
                                </form>
                            </div>
                        `,
                        showConfirmButton: false,
                        didOpen: () => {
                            document.querySelector('.fa-xmark').addEventListener('click', function() {
                                Swal.close(); 
                            });
                        },

                        willOpen: () => {
                            const resendCodeBtn = document.getElementById('resendcode');
                            handleSendOTP(formData.email);

                            const otp1 = document.getElementById("otp1");
                            otp1.focus();

                            document.querySelectorAll(".otp-value").forEach(item => {
                                const currentId = item.id;

                                const getNextId = (current) => {
                                    const idNumber = parseInt(current.replace("otp", ""), 10);
                                    if(idNumber < 4 && idNumber > 0) {
                                        return `otp${idNumber + 1}`;
                                    }
                                    return null;
                                }; 

                                const getPreviousId = (current) => {
                                    const idNumber = parseInt(current.replace("otp", ""), 10);
                                    if(idNumber <= 4 && idNumber > 0) {
                                        return `otp${idNumber - 1}`;
                                    }
                                    return null;
                                }

                                const nextId = getNextId(currentId);
                                const nextElement = document.querySelector(`#${nextId}`);
                                item.addEventListener("input", () => {
                                    if (!/^\d*$/.test(item.value)) {
                                        item.value = ""; 
                                    }

                                    if(item.value.length >= 1) {
                                        if(nextElement) {
                                            nextElement.focus();
                                        }
                                    }
                                });

                                const previousId = getPreviousId(currentId);
                                const previousElement = document.querySelector(`#${previousId}`);
                                item.addEventListener('keydown', (event) => {
                                    if(event.key === "Backspace" && document.querySelector(`#${currentId}`).value === "") {
                                        addOTP();
                                        if(previousElement) {
                                            previousElement.focus();
                                        }
                                    }
                                });
                            });

                            function addOTP () {
                                formData.otp = "";
                                document.querySelectorAll(".otp-value").forEach(item => {
                                    formData.otp += item.value;
                                });
                            }

                            document.querySelectorAll(".otp-value").forEach(input => {
                                input.addEventListener("input", () => {
                                    addOTP(); 
                                    
                                    const allFilled = [...document.querySelectorAll(".otp-value")].every(input => input.value !== "");
                                    
                                    if (allFilled) {
                                        const isVerify = verifyOTP(formData.otp);
                                        if (isVerify) {
                                            loader();
                                            setTimeout(() => {
                                                Swal.close();
                                            }, 600);
                                            window.location.reload();
                                            backendSignup();
                                        } else {
                                            otpError.style.color = "red";
                                            otpError.textContent = "Invalid OTP. Please try again!";
                                            return false;
                                        }
                                    }
                                });
                            });

                            document.querySelector("#verifyOtp").addEventListener("click", (e) => {
                                e.preventDefault();
                                formData.otp = "";
                                addOTP();
                                const isVerify = verifyOTP(formData.otp);
                                if(isVerify) {
                                    loader();
                                    setTimeout(() => {
                                        Swal.close();
                                    }, 600);
                                    window.location.reload();
                                    backendSignup();
                                } else {
                                    otpError.style.color = "red";
                                    otpError.textContent = "Invalid OTP. Please try again!";
                                    return false;
                                }
                            });

                            resendCodeBtn.addEventListener('click', () => {
                                handleSendOTP(formData.email);
                                resendCodeBtn.textContent = "Resend Otp";
                            });
                        }
                    });
                };
                

                const handleSendOTP = async (email) => {
                    const otpError = document.getElementById("otp_error");

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
                            otpError.style.color = "green";
                            otpError.classList.add("animate__zoomIn");
                            otpError.textContent = "OTP sent to email successfully";
                            return true;
                        } else {
                            otpError.style.color = "red";
                            return false;
                        }
                    } catch (err) {
                        console.error("Error while sending OTP:", err);
                        return false;
                    }
                };

                const checkUserExists = async () => {
                    try {
                        const url = "/auth/check-user"; 
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email: formData.email }), 
                        });
                
                        const data = await response.json(); 
                        if (data.exists) {
                            accountexistError.classList.add("animated__zoomIn");
                            accountexistError.textContent = "An account already exists for this email address. You can login.";
                            return true; 
                        }
                        return false; 
                    } catch (err) {
                        console.error("Error checking user existence:", err); 
                        return false; 
                    }
                };
                
                const backendSignup = async () => {
                    try {
                        const url = "/auth/signup";
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formData),
                        });
            
                        const data = await response.json(); 
                        if (data.success) {
                            return true;
                                
                        } else {
                            accountexistError.textContent = "An account already exists for this email address. You can login";
                            accountexistError.classList.toggle("shake");
                            return false;
                        }
                    } catch (err) {
                        console.error("Error during signup:", err); 
                        return false;
                    }
                };

                const handleSignUp = async () => {
                    const isValid = validateForm(); 
                    if (isValid) { 
                        const userExists = await checkUserExists();
                        
                        if(!userExists) {
                            handleVerification();
                        }
                    }
                };    

                // roleInput.addEventListener('change', handleChange);
                emailInput.addEventListener('change', handleChange);
                phoneInput.addEventListener('change', handleChange);
                passwordInput.addEventListener('change', handleChange);
                form.addEventListener("submit", handleSignUp);
                register.addEventListener("click", (e) => {
                    e.preventDefault();
                    handleSignUp(); 
                });

                googleSignIn.addEventListener('click', (e) => {
                    e.preventDefault();
                })
            },
        });
    });
});




{/* <div class="input_container">
    <label class="input_label" for="role_field">Role</label>
    <i class="fa-regular fa-user" style="position: absolute; top: 2rem; left: 0.9rem; z-index: 40000; transform: scale(0.94);"></i>
    <div class="menu" title="Role" id="role_field" name="role">
        <div class="item">
            <a class="link" id="role">
                <span> I'm a </span>
                <svg viewBox="0 0 360 360" xml:space="preserve">
                    <g id="SVGRepo_iconCarrier">
                        <path
                            id="XMLID_225_"
                            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                        ></path>
                    </g>
                </svg>
            </a>
            <div class="submenu">
                <div class="submenu-item">
                    <a href="#" class="submenu-link" value="homeseeker" name="role">Home Seeker</a>
                </div>
                <div class="submenu-item">
                    <a href="#" class="submenu-link" value="landlord" name="role">Landlord</a>
                </div>
                <div class="submenu-item">
                    <a href="#" class="submenu-link" value="builder" name="role">Builder</a>
                </div>
            </div>
        </div>
    </div>
    <span class="error-message" id="role_error" style="font-size: 0.7rem; color: red; font-weight: 550; transition: all 0.3s ease;"></span>
</div> */}