const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const refreshButton = document.getElementById('refresh-button');
const userNameElement = document.querySelector('.logo');
const aboutTextElement = document.querySelector('#about .about-text p');
const profileImage = document.querySelector('.profile-image');

const contactEmailElement = document.querySelector('.contact-item a[href^="mailto:"]');
const contactAddressElement = document.querySelector('.contact-item a.address-link');
const contactPhoneElement = document.querySelector('.contact-item a[href^="tel:"]');

// Hamburger menü működése
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Felhasználó frissítése gomb
refreshButton.addEventListener('click', async () => {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];

        // Frissítés a névhez és a profiképhez
        userNameElement.textContent = `${user.name.first} ${user.name.last}`;
        aboutTextElement.textContent = `Üdvözlöm! Az én nevem ${user.name.first} ${user.name.last}, első éves energetikai mérnök hallgató. Érdeklődöm a megújuló energiaforrások és az energiarendszerek optimalizálása iránt, emellett folyamatosan fejlesztem műszaki és projektmenedzsment készségeimet. Nyitott vagyok új kihívásokra és projektekre, ahol innovatív ötletekkel támogathatom a csapatmunkát.`;
        profileImage.src = user.picture.large;

        // Frissítés a kapcsolati adatokhoz
        contactEmailElement.href = `mailto:${user.email}`;
        contactEmailElement.textContent = user.email;
        contactAddressElement.textContent = user.location.street.name + ', ' + user.location.city;
        contactAddressElement.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(user.location.street.name + ', ' + user.location.city)}`;
        contactPhoneElement.href = `tel:${user.phone}`;
        contactPhoneElement.textContent = user.phone;

    } catch (error) {
        console.error('Hiba a felhasználói adatok frissítésekor:', error);
    }
});
