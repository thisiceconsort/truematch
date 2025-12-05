const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const header = document.querySelector("header");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

navbarLinks.forEach((link) => {
    link.addEventListener("click", () => menuOpenButton.click());
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


let swiper = new Swiper(".slider-wrapper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

const FLW_PUBLIC_KEY = "FLWPUBK-55e5d0e754e7da9baacac6e2cb4e04ac-X";

const LOCAL_PAYMENT_COUNTRIES = {
  "NG": "NGN",
  "GH": "GHS",
  "KE": "KES",
  "UG": "UGX",
  "RW": "RWF",
  "TZ": "TZS",
  "ZA": "ZAR",
  "MW": "MWK",
  "SN": "XOF",
  "CI": "XOF",
  "BJ": "XOF",
  "BF": "XOF",
  "TG": "XOF",
  "ML": "XOF",
  "NE": "XOF",
  "CM": "XAF",
  "GA": "XAF",
  "CG": "XAF",
  "TD": "XAF",
  "CF": "XAF",
  "EG": "EGP",
  "ET": "ETB",
  "ZM": "ZMW",
  "SL": "SLL",
  "ZW": "USD",
  "GB": "GBP",
  "EU": "EUR",
  "US": "USD",
  "CA": "USD",
  "AE": "USD",
  "IN": "USD",
  "BR": "USD",
  "MX": "USD",
  "SA": "USD"
};

const IMPACT_DESCRIPTIONS = {
    100: "for feeding 100+ people in danger zones.",
    200: "for helping 50 people relocate to a safer zone.",
    340: "for building a 5-room apartment for displaced people.",
    custom: "for strengthening our mission to provide safety, help, and advocacy."
};

async function detectCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country_code || "US";
  } catch (err) {
    return "US";
  }
}

async function convertCurrency(targetCurrency, amountUSD) {
  if (targetCurrency === "USD" || targetCurrency === undefined) return amountUSD;

  const url = "https://v6.exchangerate-api.com/v6/4d1f46bc3bc3eab4eb35eb66/latest/USD"; 

  try {
      const res = await fetch(url);
      const data = await res.json();
  
      if (data.conversion_rates && data.conversion_rates[targetCurrency]) {
          return Math.ceil(amountUSD * data.conversion_rates[targetCurrency]);
      }
  } catch (error) {
      console.error("Currency conversion failed:", error);
  }
  
  return amountUSD;
}

function renderThankYou(amountUSD) {
    const container = document.getElementById('donation-container');
    const impactText = IMPACT_DESCRIPTIONS[amountUSD] || IMPACT_DESCRIPTIONS.custom;
    
    const thankYouHTML = `
        <div class="thank-you-message">
            <h3>Thank You, Our Hero! <i class="fa-solid fa-hand-holding-heart"></i></h3>
            <p>Your incredible donation means **life and safety** for vulnerable LGBTQIA+ individuals in Africa.</p>
            <span class="impact-summary">Your contribution is ${impactText}</span>
            <p class="max-donation-note">
                Remember: There is no maximum on compassion. More donations strengthen our mission, enabling more emergency transfers and safe futures.
            </p>
            <button type="button" class="donate-again-button" onclick="window.location.reload();">
                Donate Again <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    container.innerHTML = thankYouHTML;
}


async function donate(amountUSD) {
  const MIN_AMOUNT = 1;
  const MAX_AMOUNT = 340;

  if (amountUSD < MIN_AMOUNT || amountUSD > MAX_AMOUNT) {
      alert(`The donation amount must be between $${MIN_AMOUNT} and $${MAX_AMOUNT}.`);
      return;
  }
  
  const country = await detectCountry();

  let localCurrency = LOCAL_PAYMENT_COUNTRIES[country] || "USD";
  let isLocalSupported = LOCAL_PAYMENT_COUNTRIES[country] !== undefined;

  const convertedAmount = await convertCurrency(localCurrency, amountUSD);
  
  document.querySelector('.donate-submit-button').disabled = true;

  FlutterwaveCheckout({
    public_key: FLW_PUBLIC_KEY,
    tx_ref: "donation-" + Date.now(),
    amount: Number(convertedAmount.toFixed(2)),
    currency: localCurrency,
    payment_options: isLocalSupported
      ? "ussd,banktransfer,card,account"
      : "card",

    customer: {
      email: "team.milaaje@gmail.com",
      name: "Anonymous"
    },

    customizations: {
      title: "Milaaje Donation",
      description: "Support our life-saving mission in Africa",
      logo: ""
    },
    callback: function (data) {
        document.querySelector('.donate-submit-button').disabled = false;
        if (data.status === 'successful' || data.tx_ref) {
            renderThankYou(amountUSD);
            document.getElementById('donate').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Payment failed or was canceled.");
        }
    },
    onclose: function() {
         document.querySelector('.donate-submit-button').disabled = false;
    }
  });
}

const amountButtons = document.querySelectorAll('.amount-button');
const customAmountInput = document.getElementById('custom-amount');
const donationForm = document.getElementById('donation-form');
const MIN_AMOUNT_UI = 1;
const MAX_AMOUNT_UI = 340;
const PRESET_AMOUNTS = [100, 200, 340];
const ROUNDING_TOLERANCE = 10;

let selectedAmount = 100;

function getClosestPresetAmount(amount) {
    for (const preset of PRESET_AMOUNTS) {
        if (Math.abs(amount - preset) <= ROUNDING_TOLERANCE) {
            return preset;
        }
    }
    return null;
}

function setAmount(amount, button = null) {
    selectedAmount = amount;
    
    amountButtons.forEach(btn => btn.classList.remove('selected'));
    
    if (button) {
        button.classList.add('selected');
        customAmountInput.value = '';
    }
}

function initializeDonationFormListeners() {
     setAmount(100, document.querySelector('.amount-button[data-amount="100"]'));

    amountButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const amount = parseFloat(e.currentTarget.getAttribute('data-amount'));
            setAmount(amount, e.currentTarget);
        });
    });

    customAmountInput.addEventListener('input', () => {
        const amount = parseFloat(customAmountInput.value);
        
        amountButtons.forEach(btn => btn.classList.remove('selected'));

        if (amount >= MIN_AMOUNT_UI && amount <= MAX_AMOUNT_UI) {
            selectedAmount = amount;
        } else if (customAmountInput.value === '') {
            selectedAmount = 100;
        }
    });
    
    donationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const customValue = parseFloat(customAmountInput.value);
        let finalAmount;
        let amountToDisplay;

        if (customValue > 0) {
            if (customValue < MIN_AMOUNT_UI || customValue > MAX_AMOUNT_UI) {
                alert(`Please enter a valid amount between $${MIN_AMOUNT_UI} and $${MAX_AMOUNT_UI}.`);
                return;
            }
            
            const roundedPreset = getClosestPresetAmount(customValue);
            
            if (roundedPreset) {
                finalAmount = customValue;
                amountToDisplay = roundedPreset;
            } else {
                finalAmount = customValue;
                amountToDisplay = customValue;
            }
        } else {
            finalAmount = selectedAmount;
            amountToDisplay = selectedAmount;
        }
        
        if (finalAmount < MIN_AMOUNT_UI || finalAmount > MAX_AMOUNT_UI) {
             alert(`An internal error occurred: The final amount is outside the accepted range.`);
            return;
        }

        await donate(finalAmount, amountToDisplay);
    });
}

initializeDonationFormListeners();

const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzK-sicxYB-HO3jp49pH9---4q58oSQM77sXr1ySiSlp-j_zTDQgVyZgpy0NF3_vhM/exec"; 

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');
const submitButton = contactForm.querySelector('.submit-button');

async function submitContactFormToSheet(e) {
    e.preventDefault();
    
    if (GAS_WEB_APP_URL.includes("YOUR_DEPLOYED")) {
        alert("ERROR: Please replace 'YOUR_DEPLOYED_GOOGLE_APPS_SCRIPT_URL_HERE' in the JavaScript code with your actual Apps Script deployment URL.");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const formData = new FormData(contactForm);
    
    formData.set('timestamp', new Date().toLocaleString());

    try {
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        
        contactMessage.textContent = "Thank you for your request. We will be in touch shortly.";
        contactMessage.style.color = 'var(--primary-color)';
        contactMessage.style.display = 'block';
        contactForm.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        contactMessage.textContent = "An error occurred. Please try again or contact us directly.";
        contactMessage.style.color = 'red';
        contactMessage.style.display = 'block';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Request Information';
        
        setTimeout(() => {
            contactMessage.style.display = 'none';
        }, 5000);
    }
}

contactForm.addEventListener('submit', submitContactFormToSheet);
