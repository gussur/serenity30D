const imagesData = [
    { id: 'aisle_1', title: 'Aisle & Hallway', room: 'living', category: 'Living Room' },
    { id: 'bed_room_1_1', title: 'Bed Room 1 (Main View)', room: 'bedroom', category: 'Bed Room' },
    { id: 'bed_room_1_2', title: 'Bed Room 1 (Side View)', room: 'bedroom', category: 'Bed Room' },
    { id: 'bed_room_2_1(1)', title: 'Bed Room 2 (Desk View)', room: 'bedroom', category: 'Bed Room' },
    { id: 'bed_room_2_1', title: 'Bed Room 2 (Full View)', room: 'bedroom', category: 'Bed Room' },
    { id: 'dining_room_1', title: 'Dining Room', room: 'kitchen', category: 'Kitchen & Dining' },
    { id: 'kitchen_1', title: 'Modern Kitchen', room: 'kitchen', category: 'Kitchen & Dining' },
    { id: 'lift_1', title: 'Private Elevator Lobby', room: 'living', category: 'Living Room' },
    { id: 'living_room_1', title: 'Living Room & Piano', room: 'living', category: 'Living Room' },
    { id: 'living_room_2', title: 'Living Room Lounge', room: 'living', category: 'Living Room' },
    { id: 'living_room_3', title: 'Living Room TV View', room: 'living', category: 'Living Room' },
    { id: 'maid_room_1', title: 'Maid Room', room: 'patio', category: 'Patio & Maid' },
    { id: 'main_bath_room_1', title: 'Master Bathroom Vanity', room: 'bathroom', category: 'Bath Room' },
    { id: 'main_bath_room_2', title: 'Master Bathroom Bathtub', room: 'bathroom', category: 'Bath Room' },
    { id: 'main_bed_room_1', title: 'Master Bedroom (Night View)', room: 'bedroom', category: 'Bed Room' },
    { id: 'main_bed_room_2', title: 'Master Bedroom (Window View)', room: 'bedroom', category: 'Bed Room' },
    { id: 'main_bed_room_3', title: 'Master Bedroom (Balcony View)', room: 'bedroom', category: 'Bed Room' },
    { id: 'patio_1', title: 'Outdoor Patio & Balcony', room: 'patio', category: 'Patio & Maid' }
];

let mainSwiper = null;

document.addEventListener('DOMContentLoaded', () => {
    renderSwiperCards('all');
    renderRoomGrid('all');
    initSwiper();
    initFilterBtns();
});

function initSwiper() {
    mainSwiper = new Swiper('.main-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 24,
        grabCursor: true,
        centeredSlides: false,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1400: { slidesPerView: 3, spaceBetween: 28 }
        }
    });
}

function renderSwiperCards(filter) {
    const wrapper = document.getElementById('swiperWrapper');
    wrapper.innerHTML = '';

    const filtered = filter === 'all' ? imagesData : imagesData.filter(item => item.room === filter);

    filtered.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        const imgWebp = `images/${item.id}.webp`;
        const imgJpg = `images/${item.id}.jpg`;

        slide.innerHTML = `
            <div class="room-card" onclick="openModal('${imgJpg}', '${item.title}')">
                <div class="card-image-wrapper">
                    <img src="${imgWebp}" alt="${item.title}" class="card-img" loading="lazy" onerror="this.src='${imgJpg}'">
                    <div class="card-overlay">
                        <span class="zoom-icon">🔍 Tap / Klik Fullscreen</span>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${item.title}</h3>
                    <span class="room-tag">${item.category}</span>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
    });

    if (mainSwiper) {
        mainSwiper.update();
        mainSwiper.slideTo(0);
    }
}

function renderRoomGrid(filter) {
    const grid = document.getElementById('roomGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? imagesData : imagesData.filter(item => item.room === filter);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'grid-card';

        const imgWebp = `images/${item.id}.webp`;
        const imgJpg = `images/${item.id}.jpg`;

        card.innerHTML = `
            <div class="room-card" onclick="openModal('${imgJpg}', '${item.title}')">
                <div class="card-image-wrapper">
                    <img src="${imgWebp}" alt="${item.title}" class="card-img" loading="lazy" onerror="this.src='${imgJpg}'">
                    <div class="card-overlay">
                        <span class="zoom-icon">🔍 Fullscreen</span>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${item.title}</h3>
                    <span class="room-tag">${item.category}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initFilterBtns() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderSwiperCards(filter);
            renderRoomGrid(filter);
        });
    });
}

// Modal functions
function openModal(imgSrc, title) {
    const modal = document.getElementById('imageModal');
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalCaption').innerText = title;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('imageModal').classList.remove('active');
}
