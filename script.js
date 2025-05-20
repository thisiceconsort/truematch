// Map of valid codes and profile URLs
const validUsers = {
  '0001': 'https://t.me/Ice_consort',
  '6609': 'https://example.com/profile/celi-bajami',
  '8421': 'https://example.com/profile/james-smith',
  '3098': 'https://example.com/profile/manuel-fernandez',
  '2745': 'https://example.com/profile/leo-williams'
  // Add more code: profile link pairs here
}; 

function verifyCode() {
  const input = document.getElementById('codeInput').value.trim(); 
  const resultBox = document.getElementById('result'); 

  if (input.length !== 4 || !/^\d{4}$/.test(input)) {
    resultBox.style.display = 'block'; 
    resultBox.className = 'result fail'; 
    resultBox.innerHTML = 'Please enter a valid 4-digit code.'; 
    return; 
  }

  if (validUsers.hasOwnProperty(input)) {
    const profileLink = validUsers[input]; 
    resultBox.style.display = 'block'; 
    resultBox.className = 'result success'; 
    resultBox.innerHTML =
      `<strong>Verified!</strong> This person is a member of the boyhood truematch community.<br/>` +
    `<a href="${profileLink}" target="_blank" rel="noopener noreferrer">Chat with them now on telegram</a>`; 
  } else {
    resultBox.style.display = 'block'; 
    resultBox.className = 'result fail'; 
    resultBox.textContent = 'Fake Account. This person is not part of the boyhood TrueMatch community.'; 
  }
}

const form = document.getElementById('requestForm'); 

function openModal(id) {
  document.getElementById(id).style.display = "block"; 
}

function closeModal(id) {
  document.getElementById(id).style.display = "none"; 
}

// Optional: Close modal when clicking outside of it
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal'); 
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }); 
}

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const homepage = document.getElementById('homepage');

  const splashShown = sessionStorage.getItem('splashShown');

  if (!splashShown) {
    // Show splash screen for 1.5s then fade out
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.remove();
        homepage.style.display = 'block';
      }, 600); // Allow fade-out transition to complete
    }, 2400);

    sessionStorage.setItem('splashShown', 'true');
  } else {
    // Skip splash screen
    splash.remove();
    homepage.style.display = 'block';
  }
}); 

const formAction = "https://formspree.io/f/xovdrlby"; 
const selarUrl = "https://selar.com/53ea77"; 
const thankYouHTML = `
  <h2>Thank you for your payment!</h2>
  <p>You're now verified. 
Click the button below to join the club.</p>
  <a href="https://t.me/+SH0obsiO2z1mYzg0" target="_blank">
    <button style="padding:10px 20px; margin-top:10px;">Join the Club</button>
  </a>
`; 

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent normal form submit

  // store form values temporarily
  const formData = new FormData(form);
  const tempData = {};
  formData.forEach((value, key) => {
    tempData[key] = value;
  });
  sessionStorage.setItem("verificationFormData", JSON.stringify(tempData));

  // redirect to Selar payment with redirect URL
  const redirectUrl = window.location.href.split("?")[0] + "?status=success";
  const fullSelarUrl = selarUrl + "?redirect_url=" + encodeURIComponent(redirectUrl);
  window.location.href = fullSelarUrl; 
});

// On redirect back, auto-submit if payment succeeded
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("status") === "success") {
    const savedData = sessionStorage.getItem("verificationFormData");
    if (savedData) {
      const data = JSON.parse(savedData);
      sessionStorage.removeItem("verificationFormData");

      // create a new form to submit to Formspree
      const postForm = document.createElement("form");
      postForm.method = "POST"; 
      postForm.action = formAction; 
      for (const key in data) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        postForm.appendChild(input);
      }
      document.body.appendChild(postForm); 
      postForm.submit();

      // hide the original form and show thank you
      document.getElementById("requestForm").innerHTML = thankYouHTML; 
    }
  }
});
