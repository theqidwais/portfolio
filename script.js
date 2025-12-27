

let itemsShown = 0;
const itemsPerScroll = 4;
const grid = document.getElementById('portfolio-grid');
const loader = document.getElementById('loading-trigger');

function loadItems() {
    const nextBatch = projects.slice(itemsShown, itemsShown + itemsPerScroll);
    
    nextBatch.forEach(project => {
        const col = document.createElement('div');
        col.className = "col-12 col-sm-6 col-lg-3";
        col.innerHTML = `
            <div class="portfolio-item" onclick="openModal('${project.name}', '${project.description}', '${project.link}', '${project.image}')">
                <img src="${project.image}" alt="${project.name}">
                <div class="overlay">
                    <div class="campaign-name">${project.name}</div>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });

    itemsShown += nextBatch.length;
    if (itemsShown >= projects.length) loader.style.display = 'none';
}

function openModal(name, desc, link, image) {
    document.getElementById('modalTitle').innerText = name;
    document.getElementById('modalDescription').innerText = desc;
    document.getElementById('driveLink').href = link;
    document.getElementById('modalImage').src = image;
    
    const myModal = new bootstrap.Modal(document.getElementById('campaignModal'));
    myModal.show();
}

// Observer for infinite scrolling
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && itemsShown < projects.length) {
        setTimeout(loadItems, 400); // Small delay for visual feel
    }
}, { threshold: 0.1 });

observer.observe(loader);
loadItems(); // Initial Load



function loadItems() {
    const nextBatch = projects.slice(itemsShown, itemsShown + itemsPerScroll);

    nextBatch.forEach(project => {
        const col = document.createElement('div');
        col.className = "col-12 col-sm-6 col-lg-3";

        const item = document.createElement('div');
        item.className = "portfolio-item";

        item.addEventListener("click", () => {
            openModal(
                project.name,
                project.description,
                project.link,
                project.image
            );
        });

        item.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <div class="overlay">
                <div class="campaign-name">${project.name}</div>
            </div>
        `;

        col.appendChild(item);
        grid.appendChild(col);
    });

    itemsShown += nextBatch.length;
    if (itemsShown >= projects.length) loader.style.display = 'none';
}
