// Three.js Particle Background
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Black particles for white background
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x000000,
    transparent: true,
    opacity: 0.5
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

let pMouseX = 0;
let pMouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    pMouseX = (e.clientX - windowHalfX);
    pMouseY = (e.clientY - windowHalfY);
});

const clock = new THREE.Clock();
let frameCount = 0;

function animateParticles() {
    requestAnimationFrame(animateParticles);
    const elapsedTime = clock.getElapsedTime();
    frameCount++;

    // Smooth mouse tracking with lerp
    targetX += (pMouseX * 0.001 - targetX) * 0.05;
    targetY += (pMouseY * 0.001 - targetY) * 0.05;

    particlesMesh.rotation.y += 0.001 + (targetX - particlesMesh.rotation.y) * 0.05;
    particlesMesh.rotation.x += 0.0005 + (targetY - particlesMesh.rotation.x) * 0.05;

    // Only update wave every 2 frames for performance
    if (frameCount % 2 === 0) {
        const positions = particlesGeometry.attributes.position.array;
        for(let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            const x = positions[i3];
            positions[i3 + 1] += Math.sin(elapsedTime + x) * 0.002;
        }
        particlesGeometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
}
animateParticles();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
const tl = gsap.timeline();
tl.from('.subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
  .from('.main-heading', { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
  .from('.role', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .from('.desc', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .from('.scroll-indicator', { opacity: 0, duration: 1 }, '-=0.2');

// Smooth Section Titles Scaling on Scroll
gsap.utils.toArray('.scale-title').forEach(title => {
    gsap.fromTo(title, {
        scale: 0.5,
        opacity: 0,
        "--line-scale": 0,
        x: () => (title.parentElement.offsetWidth / 2) - ((title.offsetWidth * 0.5) / 2)
    }, {
        scale: 1,
        opacity: 1,
        "--line-scale": 1,
        x: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: title.parentElement,
            start: "top 95%",
            end: "top 40%",
            scrub: 1,
            invalidateOnRefresh: true
        }
    });
});

// Dynamic Timeline Line and Dot Scrub
window.addEventListener('load', () => {
    const tLine = document.getElementById('t-line');
    const sDot = document.getElementById('s-dot');
    const tItems = document.querySelectorAll('.timeline-item');
    
    if(tItems.length > 0) {
        const firstItem = tItems[0];
        const lastItem = tItems[tItems.length - 1];
        
        const startY = firstItem.offsetTop + (firstItem.offsetHeight / 2);
        const endY = lastItem.offsetTop + (lastItem.offsetHeight / 2);
        
        tLine.style.top = startY + "px";
        tLine.style.height = (endY - startY) + "px";
        
        sDot.style.top = startY + "px";
        
        gsap.to(sDot, {
            top: endY + "px",
            ease: "none",
            scrollTrigger: {
                trigger: firstItem,
                start: "center center",
                endTrigger: lastItem,
                end: "center center",
                scrub: true
            }
        });
    }
});


// General reveal for cards
gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
    gsap.fromTo(elem, 
        { y: 50, opacity: 0 }, 
        {
            y: 0, 
            opacity: 1, 
            ease: 'power2.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 95%',
                end: 'top 60%',
                scrub: 1
            }
        }
    );
});


// ── Certification Modal ──
const certModal    = document.getElementById('cert-modal');
const modalImg     = document.getElementById('modal-img');
const modalTitle   = document.getElementById('modal-title');
const modalProvider= document.getElementById('modal-provider');
const modalSkills  = document.getElementById('modal-skills');
const modalVerify  = document.getElementById('modal-verify-btn');
const modalClose   = document.getElementById('cert-modal-close');

document.querySelectorAll('.cert-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
        // Prevent the hover window from interfering
        if (e.target.closest('.cert-hover-window')) return;

        modalImg.src      = card.dataset.img || '';
        modalTitle.textContent    = card.dataset.title || '';
        modalProvider.textContent = card.dataset.provider || '';
        modalSkills.textContent   = card.dataset.skills || '';
        modalVerify.href  = card.dataset.verifyUrl || '#';

        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeCertModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', function(e) {
    if (e.target === certModal) closeCertModal();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeCertModal();
});
