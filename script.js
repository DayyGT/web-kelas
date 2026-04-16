const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let hue = 0; // Untuk warna pelangi

const mouse = {
    x: null,
    y: null,
    radius: 120
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    hue += 5;// Warna berubah saat mouse gerak
});

// Efek saat klik: Partikel menjauh lebih kuat
window.addEventListener('mousedown', () => {
    mouse.radius = 300;
});
window.addEventListener('mouseup', () => {
    mouse.radius = 120;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 2;
        this.color = 'rgba(255,255,255,0)'; // Set ke transparan total
    }

    draw() {
        // Jika ingin benar-benar bersih, kosongkan isi fungsi draw ini.
        // Dengan mengosongkan ini, browser tidak akan memproses gambar titik-titik sama sekali.
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            // Logika interaksi tetap jalan di sini
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                this.x -= (this.x - this.baseX) / 15;
            }
            if (this.y !== this.baseY) {
                this.y -= (this.y - this.baseY) / 15;
            }
        }
    }
}

function init() {
    particlesArray = [];
    // Rapatkan jarak partikel agar lebih detail (ubah 25 jadi 20)
    for (let y = 0; y < canvas.height; y += 25) {
        for (let x = 0; x < canvas.width; x += 25) {
            particlesArray.push(new Particle(x, y));
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Garis hanya muncul jika jarak antar partikel sangat dekat
            if (distance < 25) { 
                opacityValue = 1 - (distance / 25);
                ctx.strokeStyle = `rgba(255,255,255,${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Panggil connect() di dalam fungsi animate()
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    connect(); // Tambahkan ini agar ada efek visual yang tersisa
    requestAnimationFrame(animate);
}

// Ambil elemen input dan semua kartu murid
const searchInput = document.querySelector('.search-box input');
const studentCards = document.querySelectorAll('.student-card');

searchInput.addEventListener('input', function () {
    const filter = searchInput.value.toLowerCase(); // Ambil teks input (kecilkan semua huruf)

    studentCards.forEach(card => {
        // Ambil nama dari tag h3 di dalam setiap card
        const name = card.querySelector('h3').textContent.toLowerCase();

        if (name.includes(filter)) {
            card.style.display = ""; // Tampilkan jika cocok
            card.style.animation = "fadeIn 0.5s ease"; // Tambahkan efek muncul halus
        } else {
            card.style.display = "none"; // Sembunyikan jika tidak cocok
        }
    });
});

// Tambahkan animasi sederhana saat hasil muncul
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);

// 1. DATA FOTO
const photoList = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7nn-WAf9vo5CphMm9XuSS8S2ol5zk81JHA&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCHcPl5ByWvHErZcaAc2EQqJk9WiUH-ESuQ&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKS8yxc357hU4Tp0ElAtVNC6J5wmRSSFgLQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1-a9A37WJtFqgAA78ILP6L3Dl2fMOr8JQWytdldVkA&s', 
    'https://www.smagiki3sby.sch.id/upload/picture/80532386WhatsAppImage2025-07-29at12.31.01.jpeg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRETM60-JKemnr2rQnqhgJL-hDUWB7gbKc2b7-K-f&s',
    // ... tambah foto lainnya di sini ...
];

let activeIndex = 0;

// --- LOGIKA PAGINATION ---
let currentPage = 1;
const photosPerPage = 10; // Maksimal 10 foto per halaman

// 2. RENDER GRID (Halaman Utama dengan Pagination)
function initGallery() {
    const grid = document.getElementById('galleryGrid');
    const paginationContainer = document.getElementById('pagination');
    if (!grid) return;

    // Hitung index awal dan akhir foto yang ditampilkan
    const startIndex = (currentPage - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    const currentPhotos = photoList.slice(startIndex, endIndex);

    // Render Grid
    grid.innerHTML = currentPhotos.map((src, i) => {
        const actualIndex = startIndex + i; // Index asli di array photoList
        return `
            <div class="gallery-item" onclick="openSlider(${actualIndex})">
                <img src="${src}" style="width:100%; height:100%; object-fit:cover;" loading="lazy">
            </div>
        `;
    }).join('');

    renderPaginationControls();
}

// Navigasi Angka 1, 2, < >
function renderPaginationControls() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(photoList.length / photosPerPage);
    let html = '';

    // Tombol Prev <
    html += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})"><</button>`;

    // Logika Pintar: Hanya tampilkan beberapa angka di HP
    const isMobile = window.innerWidth <= 600;
    const maxVisible = isMobile ? 3 : 7; // Di HP tampil 3, di Laptop tampil 7
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        html += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }

    // Tombol Next >
    html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">></button>`;

    paginationContainer.innerHTML = html;
}

// Tambahkan listener agar saat layar di-resize (dari miring ke tegak), angka nyesuain
window.addEventListener('resize', renderPaginationControls);

function changePage(page) {
    currentPage = page;
    initGallery();
    // Scroll balik ke atas gallery biar enak
    document.getElementById('galleryGrid').scrollIntoView({ behavior: 'smooth' });
}

// 3. OPEN SLIDER
function openSlider(index) {
    activeIndex = index;
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
    updateView();
}

// 4. UPDATE VIEW
function updateView() {
    const img = document.getElementById('lbImage');
    const counter = document.getElementById('lbCounter');
    
    img.src = photoList[activeIndex];
    counter.innerText = `${activeIndex + 1} / ${photoList.length}`;
    
    renderThumbs();
}

// 5. RENDER THUMBNAILS
function renderThumbs() {
    const thumbBox = document.getElementById('lbThumbnails');
    if (!thumbBox) return;

    thumbBox.innerHTML = photoList.map((src, i) => `
        <div class="lb-thumbnail-item ${i === activeIndex ? 'active' : ''}" 
             onclick="changeImage(${i})">
            <img src="${src}">
        </div>
    `).join('');

    const activeThumb = thumbBox.querySelector('.active');
    if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
}

function changeImage(index) {
    activeIndex = index;
    updateView();
}

// 6. NAVIGASI LIGHTBOX
document.getElementById('lbNextBtn').onclick = (e) => {
    e.stopPropagation();
    activeIndex = (activeIndex + 1) % photoList.length;
    updateView();
};

document.getElementById('lbPrevBtn').onclick = (e) => {
    e.stopPropagation();
    activeIndex = (activeIndex - 1 + photoList.length) % photoList.length;
    updateView();
};

// 7. CLOSE / EXIT
const closeSlider = () => {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto'; 
};

document.getElementById('lbCloseBtn').onclick = closeSlider;
document.querySelector('.lightbox-bg').onclick = closeSlider;

// 8. MOBILE MENU (HAMBURGER)
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu');
    const navList = document.querySelector('.navbar ul');

    if (menuBtn) {
        menuBtn.onclick = () => {
            navList.classList.toggle('active');
            menuBtn.classList.toggle('is-active');
        };
    }
    
    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.onclick = () => {
            navList.classList.remove('active');
            menuBtn.classList.remove('is-active');
        };
    });

    initGallery(); // Inisialisasi awal
});

// Jalankan Support Keyboard
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === "Escape") closeSlider();
        if (e.key === "ArrowRight") document.getElementById('lbNextBtn').click();
        if (e.key === "ArrowLeft") document.getElementById('lbPrevBtn').click();
    }
});