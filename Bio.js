let matchProfilesPerPage = 5; // Number of match profiles to load per click
let currentMatchProfileIndex = 0;
let isLoadingMatchProfiles = false;

// Dummy Data for Match Profiles
const matchProfilesData = [
    { id: 'mp1', images: [ 'https://picsum.photos/400/300?random=10', 'https://picsum.photos/400/300?random=11', 'https://picsum.photos/400/300?random=12' ], name: 'Alex Johnson', age: 28, role: 'Top', country: 'Nigeria', city: 'Lagos', phone: '+2348011223344', email: 'alex.j@example.com' },
    { id: 'mp2', images: [ 'https://picsum.photos/400/300?random=20', 'https://picsum.photos/400/300?random=21' ], name: 'Benjamin Cole', age: 32, role: 'Versatile', country: 'South Africa', city: 'Cape Town', phone: '+27712233445', email: 'ben.c@example.com' },
    { id: 'mp3', images: [ 'https://picsum.photos/400/300?random=30', 'https://picsum.photos/400/300?random=31', 'https://picsum.photos/400/300?random=32', 'https://picsum.photos/400/300?random=33' ], name: 'Chris Green', age: 25, role: 'Bottom', country: 'Ghana', city: 'Accra', phone: '+233203344556', email: 'chris.g@example.com' },
    { id: 'mp4', images: [ 'https://picsum.photos/400/300?random=40' ], name: 'Daniel White', age: 30, role: 'Top', country: 'United States', city: 'New York', phone: '+12123344556', email: 'dan.w@example.com' },
    { id: 'mp5', images: [ 'https://picsum.photos/400/300?random=50', 'https://picsum.photos/400/300?random=51', ], name: 'Ethan Black', age: 29, role: 'Versatile', country: 'United Kingdom', city: 'London', phone: '+447712345678', email: 'ethan.b@example.com' },
    { id: 'mp6', images: [ 'https://picsum.photos/400/300?random=60', 'https://picsum.photos/400/300?random=61', 'https://picsum.photos/400/300?random=62' ], name: 'Frank Ocean', age: 28, role: 'Top', country: 'Nigeria', city: 'Abuja', phone: '+2348077665544', email: 'frank.o@example.com' },
    { id: 'mp7', images: [ 'https://picsum.photos/400/300?random=70', 'https://picsum.photos/400/300?random=71' ], name: 'Grace Kelly', age: 32, role: 'Versatile', country: 'Cameroon', city: 'Douala', phone: '+237678901234', email: 'grace.k@example.com' },
    { id: 'mp8', images: [ 'https://picsum.photos/400/300?random=80', 'https://picsum.photos/400/300?random=81', 'https://picsum.photos/400/300?random=82', 'https://picsum.photos/400/300?random=83' ], name: 'Harry Styles', age: 25, role: 'Bottom', country: 'Senegal', city: 'Dakar', phone: '+221771122334', email: 'harry.s@example.com' },
    { id: 'mp9', images: [ 'https://picsum.photos/400/300?random=90' ], name: 'Ivy Queen', age: 30, role: 'Top', country: 'United States', city: 'Los Angeles', phone: '+13109988776', email: 'ivy.q@example.com' },
    { id: 'mp10', images: [ 'https://picsum.photos/400/300?random=100', 'https://picsum.photos/400/300?random=101', ], name: 'Jack Sparrow', age: 29, role: 'Versatile', country: 'Ghana', city: 'Kumasi', phone: '+233543322110', email: 'jack.s@example.com' },
    { id: 'mp11', images: [ 'https://picsum.photos/400/300?random=110', 'https://picsum.photos/400/300?random=111', 'https://picsum.photos/400/300?random=112' ], name: 'Kenny G', age: 28, role: 'Top', country: 'Nigeria', city: 'Port Harcourt', phone: '+2347066554433', email: 'kenny.g@example.com' },
    { id: 'mp12', images: [ 'https://picsum.photos/400/300?random=120', 'https://picsum.photos/400/300?random=121' ], name: 'Liam Neeson', age: 32, role: 'Versatile', country: 'South Africa', city: 'Johannesburg', phone: '+27654433221', email: 'liam.n@example.com' },
    { id: 'mp13', images: [ 'https://picsum.photos/400/300?random=130', 'https://picsum.photos/400/300?random=131', 'https://picsum.photos/400/300?random=132', 'https://picsum.photos/400/300?random=133' ], name: 'Mariah Carey', age: 25, role: 'Bottom', country: 'Ivory Coast', city: 'Abidjan', phone: '+225077665544', email: 'mariah.c@example.com' },
    { id: 'mp14', images: [ 'https://picsum.photos/400/300?random=140' ], name: 'Nigel Owens', age: 30, role: 'Top', country: 'United Kingdom', city: 'Cardiff', phone: '+447890123456', email: 'nigel.o@example.com' },
    { id: 'mp15', images: [ 'https://picsum.photos/400/300?random=150', 'https://picsum.photos/400/300?random=151', ], name: 'Olivia Rodrigo', age: 29, role: 'Versatile', country: 'Uganda', city: 'Kampala', phone: '+256701234567', email: 'olivia.r@example.com' }
];

function showMatchDisplayModal() {
    document.getElementById('matchDisplayModal').style.display = 'flex';
    document.getElementById('openMatchmakerFormBtn').style.display = 'flex'; // Show the plus button
    currentMatchProfileIndex = 0; // Reset index for fresh load
    document.getElementById('matchProfilesContainer').innerHTML = ''; // Clear previous profiles
    renderMatchProfiles(0, matchProfilesPerPage, matchProfilesData);
    updateLoadMoreMatchesButtonVisibility();
}

function hideMatchDisplayModal() {
    document.getElementById('matchDisplayModal').style.display = 'none';
    document.getElementById('openMatchmakerFormBtn').style.display = 'none'; // Hide the plus button
    currentMatchProfileIndex = 0; // Reset index
}

function renderMatchProfiles(startIndex, count, profilesArray) {
    const container = document.getElementById('matchProfilesContainer');
    const profilesToDisplay = profilesArray.slice(startIndex, startIndex + count);

    profilesToDisplay.forEach(profile => {
        const card = document.createElement('div');
        card.classList.add('match-profile-card');

        const imagesHtml = profile.images.map(imgSrc => `<img src="${imgSrc}" alt="${profile.name}">`).join('');

        card.innerHTML = `
            <div class="profile-images">
                ${imagesHtml}
            </div>
            <div class="profile-details">
                <p><strong>Name:</strong> ${profile.name}</p>
                <p><strong>Age:</strong> ${profile.age}</p>
                <p><strong>Role:</strong> ${profile.role}</p>
                <p><strong>Country:</strong> ${profile.country}</p>
                <p><strong>City:</strong> ${profile.city}</p>
                <p><strong>Phone:</strong> ${profile.phone}</p>
            </div>
        `;
        container.appendChild(card);
    });

    currentMatchProfileIndex = startIndex + profilesToDisplay.length;
    updateLoadMoreMatchesButtonVisibility();
}

function loadMoreMatchProfiles() {
    const loadMoreBtn = document.getElementById('loadMoreMatchesBtn');
    loadMoreBtn.style.display = 'none';
    isLoadingMatchProfiles = true;
    setTimeout(() => {
        renderMatchProfiles(currentMatchProfileIndex, matchProfilesPerPage, matchProfilesData);
        isLoadingMatchProfiles = false;
    }, 500); // Simulate network delay
}

function updateLoadMoreMatchesButtonVisibility() {
    const loadMoreBtn = document.getElementById('loadMoreMatchesBtn');
    const remainingProfiles = matchProfilesData.length - currentMatchProfileIndex;
    if (remainingProfiles > 0) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

function showMatchmakerFormViaPlus() {
    hideMatchDisplayModal(); // Hide the match display
    showMatchmakerModal(); // Show the form
}

function showMatchmakerModal(message = '', isError = false) {
    document.getElementById('matchmakerModal').style.display = 'flex';
    const msgElem = document.getElementById('matchmakerMessage');
    msgElem.textContent = message;
    msgElem.className = 'message ' + (isError ? 'error' : '');

    // Pre-fill email and phone if user is logged in
    if (currentUserData) {
        document.getElementById('matchEmail').value = currentUserData.email || '';
        document.getElementById('matchPhone').value = currentUserData.phone || '';
        document.getElementById('matchCountry').value = currentUserData.country || '';
        document.getElementById('matchRealName').value = currentUserData.name || '';
    }
}

function hideMatchmakerModal() {
    document.getElementById('matchmakerModal').style.display = 'none';
    document.getElementById('matchmakerForm').reset(); // Clear form
    document.getElementById('matchmakerMessage').textContent = ''; // Clear message
    document.querySelectorAll('#matchmakerForm .invalid').forEach(el => el.classList.remove('invalid')); // Clear validation styles
}

function validateMatchmakerForm() {
    const form = document.getElementById('matchmakerForm');
    let isValid = true;
    const fields = [
        'matchRealName', 'matchAge', 'matchrole',
        'matchCountry', 'matchCity', 'matchPhone', 'matchEmail'
    ];

    fields.forEach(id => {
        const input = document.getElementById(id);
        if (!input.value || (input.type === 'email' && !/\S+@\S+\.\S/.test(input.value)) || (input.type === 'number' && parseInt(input.value) < 18)) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });
    return isValid;
}

// Function to simulate successful bio submission
function simulateMatchmakerSuccess(realName, age, role, country, city, phone, email) {
    // Send data to Formspree
    const formData = new FormData();
    formData.append('real_name', realName);
    formData.append('age', age);
    formData.append('role', role);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('phone', phone);
    formData.append('email', email);

    fetch(FORMSPREE_MATCHMAKER_URL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Payment successful! Your bio is under review and will be displayed shortly.');
        } else {
            alert('Payment successful, but bio submission failed. Please contact support with your payment details.');
        }
        hideMatchmakerModal(); // Always hide modal after payment attempt (success or fail to submit bio)
    })
    .catch(error => {
        console.error('Error submitting matchmaker data to Formspree:', error);
        alert('Payment successful, but there was an issue with bio submission. Please contact support.');
        hideMatchmakerModal();
    });
}
