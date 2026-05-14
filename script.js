// ==========================
// AUDIO
// ==========================
const bgm        = new Audio("audio/bgm.mp3");
const bunyiClick = new Audio("audio/click.mp3");
const bunyiBetul = new Audio("audio/betul.mp3");
const bunyiSalah = new Audio("audio/salah.mp3");

bgm.volume = 0.3;
bgm.loop   = true;

let soundAktif = false;

function toggleSound() {
    const btn   = document.getElementById("sound-button");
    const label = document.getElementById("sound-label");
    if (soundAktif) {
        playSound(bunyiClick);
        bgm.pause();
        soundAktif   = false;
        label.textContent = "Muzik";
    } else {
        bgm.play().catch(() => {});
        soundAktif   = true;
        label.textContent = "Senyap";
        playSound(bunyiClick);
    }
}

function playSound(audio) {
    if (!soundAktif) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
}

// ==========================
// SECTION SYSTEM
// ==========================
const semuaSection = document.querySelectorAll(".section");

function paparSection(id) {
    semuaSection.forEach(s => s.classList.remove("aktif"));
    const target = document.getElementById(id);
    target.classList.add("aktif");
    // Re-trigger fade animation
    const kotak = target.querySelector(".kotak, .fade-in");
    if (kotak) {
        kotak.classList.remove("fade-in");
        void kotak.offsetWidth;
        kotak.classList.add("fade-in");
    }
}

// ==========================
// GENDER SYSTEM
// ==========================
let genderDipilih = localStorage.getItem("gender") || "girl";

function pilihGender(gender) {
    playSound(bunyiClick);
    genderDipilih = gender;
    localStorage.setItem("gender", gender);
    updateCharacter();
    paparSection("home-section");
}

function updateCharacter() {
    const betul = document.getElementById("popup-betul-image");
    const salah = document.getElementById("popup-salah-image");
    if (genderDipilih === "boy") {
        betul.src = "assets/characters/boy_trophy.png";
        salah.src = "assets/characters/boy_wrong.png";
    } else {
        betul.src = "assets/characters/girl_trophy.png";
        salah.src = "assets/characters/girl_wrong.png";
    }
}

// ==========================
// QUIZ DATA — with situasi image path & explanations
// ==========================
const soalanKuiz = [
    {
        soalan:   "Sebelum melintas jalan, apa yang perlu dilakukan dahulu?",
        jawapan:  ["Berlari cepat", "Melihat kiri dan kanan", "Bermain di tepi jalan"],
        betul:    1,
        situasi:  "assets/situasi/situasi1.png",
        penerangan: [
            "Jangan berlari di jalan raya kerana kereta mungkin masih bergerak dan boleh menyebabkan kemalangan.",
            "Betul sekali! Sentiasa lihat kiri dan kanan supaya jalan selamat sebelum melintas.",
            "Jangan bermain di tepi jalan kerana ia sangat berbahaya dan boleh menyebabkan kemalangan."
        ]
    },
    {
        soalan:   "Apabila masih ada kereta bergerak di jalan, apa yang perlu dilakukan?",
        jawapan:  ["Tunggu sehingga kereta lalu", "Berlari melintas", "Duduk di jalan"],
        betul:    0,
        situasi:  "assets/situasi/situasi2.png",
        penerangan: [
            "Bagus! Tunggu sehingga jalan selamat sebelum melintas.",
            "Jangan berlari ketika ada kereta bergerak kerana sangat bahaya.",
            "Jalan raya bukan tempat untuk duduk kerana boleh menyebabkan kemalangan."
        ]
    },
    {
        soalan:   "Semasa melintas jalan bersama orang dewasa, apa yang perlu dilakukan?",
        jawapan:  ["Pegang tangan orang dewasa", "Berlari sendiri", "Bermain-main"],
        betul:    0,
        situasi:  "assets/situasi/situasi3.png",
        penerangan: [
            "Betul! Pegang tangan supaya lebih selamat ketika melintas.",
            "Jangan melintas sendiri tanpa berhati-hati kerana jalan raya berbahaya.",
            "Jangan bermain semasa melintas jalan kerana perlu fokus pada keselamatan."
        ]
    },
    {
        soalan:   "Di manakah tempat paling selamat untuk melintas jalan?",
        jawapan:  ["Tengah jalan", "Lintasan belang", "Belakang kereta"],
        betul:    1,
        situasi:  "assets/situasi/situasi4.png",
        penerangan: [
            "Tengah jalan sangat bahaya untuk melintas.",
            "Tepat sekali! Lintasan belang ialah tempat paling selamat untuk melintas.",
            "Jangan melintas di belakang kereta kerana sukar melihat jalan."
        ]
    },
    {
        soalan:   "Jika lampu isyarat pejalan kaki berwarna merah, apa yang perlu dilakukan?",
        jawapan:  ["Tunggu", "Berlari cepat", "Lompat ke jalan"],
        betul:    0,
        situasi:  "assets/situasi/situasi5.png",
        penerangan: [
            "Bagus! Tunggu sehingga lampu hijau sebelum melintas.",
            "Jangan berlari semasa lampu merah kerana kenderaan masih bergerak.",
            "Jangan melompat ke jalan kerana sangat berbahaya."
        ]
    },
    {
        soalan:   "Adakah selamat melintas jalan sambil bermain?",
        jawapan:  ["Ya", "Tidak", "Kadang-kadang"],
        betul:    1,
        situasi:  "assets/situasi/situasi6.png",
        penerangan: [
            "Salah. Bermain semasa melintas jalan boleh menyebabkan kemalangan.",
            "Betul! Fokus dan berhati-hati semasa melintas jalan.",
            "Jalan raya sentiasa bahaya, jadi jangan bermain ketika melintas."
        ]
    },
    {
        soalan:   "Jika jalan tidak dapat dilihat dengan jelas kerana ada kenderaan besar, apa yang perlu dilakukan?",
        jawapan:  ["Tunggu dan lihat dengan teliti", "Berlari laju", "Menyorok di belakang kenderaan"],
        betul:    0,
        situasi:  "assets/situasi/situasi7.png",
        penerangan: [
            "Bagus! Pastikan jalan benar-benar selamat sebelum melintas.",
            "Jangan berlari tanpa melihat jalan dengan jelas.",
            "Jangan berdiri di belakang kenderaan kerana pemandu mungkin tidak nampak."
        ]
    },
    {
        soalan:   "Apa yang perlu dilakukan sebelum melintas jalan?",
        jawapan:  ["Lihat kiri dan kanan", "Menari", "Melompat"],
        betul:    0,
        situasi:  "assets/situasi/situasi8.png",
        penerangan: [
            "Betul sekali! Ini membantu memastikan tiada kenderaan datang.",
            "Jalan raya bukan tempat bermain atau menari.",
            "Jangan melompat di jalan kerana boleh membahayakan diri."
        ]
    },
    {
        soalan:   "Adakah melintas jalan tanpa melihat kiri dan kanan itu betul?",
        jawapan:  ["Betul", "Salah", "Kadang-kadang"],
        betul:    1,
        situasi:  "assets/situasi/situasi9.png",
        penerangan: [
            "Salah. Kita mesti melihat kiri dan kanan dahulu.",
            "Tepat sekali! Keselamatan sangat penting semasa melintas.",
            "Walaupun jalan nampak kosong, tetap perlu melihat kiri dan kanan."
        ]
    },
    {
        soalan:   "Ketika melintas jalan, bagaimana kita perlu berjalan?",
        jawapan:  ["Dengan tenang dan berhati-hati", "Sambil bermain", "Sambil menolak kawan"],
        betul:    0,
        situasi:  "assets/situasi/situasi10.png",
        penerangan: [
            "Bagus! Berjalan dengan berhati-hati membantu mengelakkan kemalangan.",
            "Jangan bermain semasa melintas jalan.",
            "Menolak kawan boleh menyebabkan jatuh dan cedera."
        ]
    },
    {
        soalan:   "Apakah yang perlu digunakan untuk melintas jalan dengan selamat?",
        jawapan:  ["Lintasan belang", "Longkang", "Tempat letak kereta"],
        betul:    0,
        situasi:  "assets/situasi/situasi11.png",
        penerangan: [
            "Betul! Gunakan lintasan belang untuk keselamatan.",
            "Longkang bukan tempat untuk melintas jalan.",
            "Tempat letak kereta tidak selamat untuk melintas."
        ]
    },
    {
        soalan:   "Jika bola masuk ke jalan raya, apa yang perlu dilakukan?",
        jawapan:  ["Minta bantuan orang dewasa", "Kejar bola terus", "Duduk di tengah jalan"],
        betul:    0,
        situasi:  "assets/situasi/situasi12.png",
        penerangan: [
            "Bagus! Orang dewasa boleh membantu dengan lebih selamat.",
            "Jangan kejar bola ke jalan kerana kereta mungkin datang.",
            "Jalan raya sangat bahaya untuk duduk."
        ]
    },
    {
        soalan:   "Mengapa kita perlu melihat kiri dan kanan sebelum melintas jalan?",
        jawapan:  ["Untuk memastikan tiada kenderaan", "Untuk mencari kawan", "Untuk bermain"],
        betul:    0,
        situasi:  "assets/situasi/situasi13.png",
        penerangan: [
            "Betul sekali! Ini membantu kita melintas dengan selamat.",
            "Fokus utama ialah keselamatan, bukan bermain.",
            "Jalan raya bukan tempat bermain."
        ]
    },
    {
        soalan:   "Jika lampu isyarat pejalan kaki berwarna hijau, apa yang boleh dilakukan?",
        jawapan:  ["Melintas dengan berhati-hati", "Duduk di tepi jalan", "Bermain dahulu"],
        betul:    0,
        situasi:  "assets/situasi/situasi14.png",
        penerangan: [
            "Tepat sekali! Walaupun lampu hijau, tetap perlu berhati-hati.",
            "Lampu hijau bermaksud boleh melintas dengan selamat.",
            "Jangan bermain di kawasan jalan raya."
        ]
    },
    {
        soalan:   "Semasa melintas jalan bersama kawan, apa yang perlu dilakukan?",
        jawapan:  ["Berjalan dengan berhati-hati", "Berlari dan menjerit", "Bermain di tengah jalan"],
        betul:    0,
        situasi:  "assets/situasi/situasi15.png",
        penerangan: [
            "Bagus! Sentiasa utamakan keselamatan ketika melintas jalan.",
            "Jangan berlari atau menjerit kerana boleh mengganggu fokus.",
            "Tengah jalan sangat bahaya untuk bermain."
        ]
    }
];

// ==========================
// QUIZ VARIABLES
// ==========================
let nomborSoalan = 0;
let markah       = 0;
let rekodJawapan = [];
let sudahJawab   = false;

// ==========================
// PAPAR SOALAN
// ==========================
function paparSoalan() {
    sudahJawab = false;
    const q = soalanKuiz[nomborSoalan];

    document.getElementById("nombor-soalan").textContent =
        "Soalan " + (nomborSoalan + 1) + " / " + soalanKuiz.length;

    document.getElementById("soalan").textContent = q.soalan;

    // Load situasi image
    const img = document.getElementById("situasi-img");
    img.src   = q.situasi || "";
    img.style.display = q.situasi ? "block" : "none";

    // Reset answer buttons
    const pilihan = document.getElementsByClassName("pilihan");
    const labels  = ["A", "B", "C"];
    for (let i = 0; i < pilihan.length; i++) {
        pilihan[i].querySelector(".pilihan-teks").textContent = q.jawapan[i];
        pilihan[i].querySelector(".pilihan-label").textContent = labels[i];
        pilihan[i].classList.remove("betul", "salah");
        pilihan[i].disabled = false;
    }

    // Update progress bar
    const progress = ((nomborSoalan + 1) / soalanKuiz.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";

    // Kemaskini teks butang popup: soalan 15 → "Lihat Markah"
    const adaSoalanLagi = (nomborSoalan + 1) < soalanKuiz.length;
    const labelBtn = adaSoalanLagi ? "Soalan Seterusnya" : "Lihat Markah";
    const btnBetul = document.getElementById("btn-soalan-seterusnya-betul");
    const btnSalah = document.getElementById("btn-soalan-seterusnya-salah");
    if (btnBetul) btnBetul.textContent = labelBtn;
    if (btnSalah) btnSalah.textContent = labelBtn;
}

// ==========================
// SEMAK JAWAPAN
// ==========================
function semakJawapan(index) {
    if (sudahJawab) return;
    sudahJawab = true;
    playSound(bunyiClick);

    const betulIndex = soalanKuiz[nomborSoalan].betul;
    const pilihan    = document.getElementsByClassName("pilihan");

    for (let i = 0; i < pilihan.length; i++) {
        pilihan[i].disabled = true;
    }

    if (index === betulIndex) {
        pilihan[index].classList.add("betul");
        playSound(bunyiBetul);
        markah++;
        rekodJawapan[nomborSoalan] = "betul";
    } else {
        pilihan[index].classList.add("salah");
        pilihan[betulIndex].classList.add("betul");
        playSound(bunyiSalah);
        rekodJawapan[nomborSoalan] = "salah";
    }

    setTimeout(() => {
        const soalanSemasa = soalanKuiz[nomborSoalan];
        const penerangan   = soalanSemasa.penerangan ? soalanSemasa.penerangan[index] : "";

        if (index === betulIndex) {
            document.getElementById("popup-betul-penerangan").textContent = penerangan;
            document.getElementById("popup-betul").style.display = "flex";
        } else {
            document.getElementById("popup-salah-penerangan").textContent = penerangan;
            document.getElementById("popup-salah").style.display = "flex";
        }
    }, 450);
}

// ==========================
// QUIZ FLOW
// ==========================
function mulaKuizBaru() {
    playSound(bunyiClick);
    nomborSoalan = 0;
    markah       = 0;
    rekodJawapan = [];
    paparSection("quiz-section");
    paparSoalan();
}

function teruskanKuiz() {
    playSound(bunyiClick);
    mulaKuizBaru();
}

function tutupPopupBetul() {
    playSound(bunyiClick);
    document.getElementById("popup-betul").style.display = "none";
    soalanSeterusnya();
}

function teruskanSoalan() {
    playSound(bunyiClick);
    document.getElementById("popup-salah").style.display = "none";
    soalanSeterusnya();
}

function soalanSeterusnya() {
    nomborSoalan++;
    if (nomborSoalan < soalanKuiz.length) {
        paparSoalan();
    } else {
        paparResult();
    }
}

// ==========================
// RESULT — with ring animation
// ==========================
function paparResult() {
    const peratus = Math.round((markah / soalanKuiz.length) * 100);
    document.getElementById("markah-akhir").textContent = peratus + "%";

    let mesej = "";
    if (peratus === 100)     mesej = "Sempurna! Anda luar biasa!";
    else if (peratus >= 80)  mesej = "Tahniah! Prestasi yang bagus!";
    else if (peratus >= 60)  mesej = "Bagus! Cuba lagi untuk lebih baik!";
    else                     mesej = "Teruskan belajar! Anda boleh buat lebih baik!";

    document.getElementById("mesej").textContent = mesej;

    const salahCount = soalanKuiz.length - markah;
    document.getElementById("result-stats").innerHTML =
        "<span>Betul: <strong style='color:#52b788'>" + markah + "</strong></span>" +
        "<span>Salah: <strong style='color:#e63946'>" + salahCount + "</strong></span>";

    paparSection("result-section");

    // Animate ring — needs SVG gradient + dashoffset
    animateRing(peratus);
}

function animateRing(peratus) {
    // Inject gradient into SVG if not already
    const svg = document.querySelector(".result-ring");
    if (!svg.querySelector("defs")) {
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.innerHTML = `
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#FFD54F"/>
                <stop offset="100%" style="stop-color:#FF5722"/>
            </linearGradient>`;
        svg.prepend(defs);
    }

    const ring = document.getElementById("ring-fill");
    const circumference = 2 * Math.PI * 50; // r=50 → ~314
    ring.style.stroke = "url(#ringGrad)";
    const offset = circumference - (peratus / 100) * circumference;

    // Reset first
    ring.style.transition = "none";
    ring.style.strokeDashoffset = circumference;

    setTimeout(() => {
        ring.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)";
        ring.style.strokeDashoffset = offset;
    }, 200);
}

// ==========================
// NAVIGATION
// ==========================
function bukaPanduan() {
    playSound(bunyiClick);
    paparSection("panduan-section");
}

function bukaInfo() {
    playSound(bunyiClick);
    paparSection("info-section");
}

function bukaLukisan() {
    playSound(bunyiClick);
    paparSection("lukisan-section");
    initKanvas();
}

function bukaVideo() {
    playSound(bunyiClick);
    paparSection("video-section");
}

function kembaliHome() {
    playSound(bunyiClick);
    paparSection("home-section");
}



// Pause button: mute sound + return home
let quizSoundMuted = false;

function bukaPopupJeda() {
    playSound(bunyiClick);
    // Mute BGM
    bgm.pause();
    soundAktif = false;
    document.getElementById("sound-label").textContent = "Bunyi";
    quizSoundMuted = true;
    // Save progress
    simpanProgress();
    // Show popup
    document.getElementById("popup-jeda").style.display = "flex";
}

function sambungSemula() {
    playSound(bunyiClick);
    document.getElementById("popup-jeda").style.display = "none";
    // Resume audio
    bgm.play().catch(() => {});
    soundAktif = true;
    document.getElementById("sound-label").textContent = "Senyap";
    quizSoundMuted = false;
}

function jedaKembaliHome() {
    playSound(bunyiClick);
    document.getElementById("popup-jeda").style.display = "none";
    quizSoundMuted = false;
    kembaliHome();
}

// Sahkan keluar dari kuiz
function sahKeluar() {
    playSound(bunyiClick);
    if (confirm("Adakah anda pasti ingin keluar? Kemajuan kuiz semasa akan hilang.")) {
        nomborSoalan = 0;
        markah       = 0;
        rekodJawapan = [];
        document.getElementById("popup-betul").style.display = "none";
        document.getElementById("popup-salah").style.display = "none";
        document.getElementById("popup-jeda").style.display  = "none";
        paparSection("home-section");
    }
}

function kembaliHomePopup() {
    playSound(bunyiClick);
    document.getElementById("popup-betul").style.display = "none";
    document.getElementById("popup-salah").style.display = "none";
    kembaliHome();
}

function mainSemula() {
    playSound(bunyiClick);
    mulaKuizBaru();
}

// ==========================
// DRAWING / LUKISAN
// ==========================
let kanvas, ctx;
let melukis      = false;
let warnaLukis   = "#1a1a2e";
let saizBerus    = 8;
let alatSekarang = "pensel";
let undoTindanan = [];
let kanvasReady  = false;

function initKanvas() {
    if (kanvasReady) return;
    kanvas = document.getElementById("kanvas-lukis");
    ctx    = kanvas.getContext("2d");

    function setSize() {
        const w = kanvas.parentElement.clientWidth;
        const h = parseInt(getComputedStyle(kanvas).height) || 400;
        kanvas.width  = w;
        kanvas.height = h;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, kanvas.width, kanvas.height);
    }
    setSize();

    kanvas.addEventListener("mousedown",  mulaMelukis);
    kanvas.addEventListener("mousemove",  semasaMelukis);
    kanvas.addEventListener("mouseup",    hentiMelukis);
    kanvas.addEventListener("mouseleave", hentiMelukis);
    kanvas.addEventListener("touchstart", sentuhMula,  { passive: false });
    kanvas.addEventListener("touchmove",  sentuhGerak, { passive: false });
    kanvas.addEventListener("touchend",   sentuhHenti, { passive: false });

    kanvasReady = true;
    kemaskiniPreview();
}

function dapatPos(e) {
    const rect   = kanvas.getBoundingClientRect();
    const scaleX = kanvas.width  / rect.width;
    const scaleY = kanvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top)  * scaleY
    };
}

function dapatPosTouch(e) {
    return dapatPos(e.touches[0]);
}

function simpanUndo() {
    undoTindanan.push(kanvas.toDataURL());
    if (undoTindanan.length > 30) undoTindanan.shift();
}

function mulaLukisCtx(pos) {
    const saiz = alatSekarang === "pemadam" ? saizBerus * 3 : saizBerus;
    ctx.lineWidth   = saiz;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.strokeStyle = alatSekarang === "pemadam" ? "#ffffff" : warnaLukis;
    ctx.fillStyle   = alatSekarang === "pemadam" ? "#ffffff" : warnaLukis;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, saiz / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function sambungLukis(pos) {
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function mulaMelukis(e) {
    simpanUndo();
    melukis = true;
    mulaLukisCtx(dapatPos(e));
}

function semasaMelukis(e) {
    if (!melukis) return;
    sambungLukis(dapatPos(e));
}

function hentiMelukis() {
    melukis = false;
    ctx.beginPath();
}

function sentuhMula(e) {
    e.preventDefault();
    simpanUndo();
    melukis = true;
    mulaLukisCtx(dapatPosTouch(e));
}

function sentuhGerak(e) {
    e.preventDefault();
    if (!melukis) return;
    sambungLukis(dapatPosTouch(e));
}

function sentuhHenti(e) {
    e.preventDefault();
    melukis = false;
    ctx.beginPath();
}

// ==========================
// TOOLBAR CONTROLS
// ==========================
function pilihWarna(warna, el) {
    warnaLukis = warna;
    document.querySelectorAll(".warna-pilihan").forEach(w => w.classList.remove("aktif-warna"));
    el.classList.add("aktif-warna");
    document.getElementById("custom-color").value = warna;
    if (alatSekarang === "pemadam") pilihAlat("pensel", document.getElementById("btn-pensel"));
    kemaskiniPreview();
}

function pilihWarnaCustom(warna) {
    warnaLukis = warna;
    document.querySelectorAll(".warna-pilihan").forEach(w => w.classList.remove("aktif-warna"));
    if (alatSekarang === "pemadam") pilihAlat("pensel", document.getElementById("btn-pensel"));
    kemaskiniPreview();
}

function kemaskiniSaiz(nilai) {
    saizBerus = parseInt(nilai);
    document.getElementById("label-saiz").textContent = nilai + "px";
    kemaskiniPreview();
}

function kemaskiniPreview() {
    const bulat = document.getElementById("preview-bulat");
    if (!bulat) return;
    const saiz  = Math.min(alatSekarang === "pemadam" ? saizBerus * 3 : saizBerus, 40);
    bulat.style.width      = saiz + "px";
    bulat.style.height     = saiz + "px";
    bulat.style.background = alatSekarang === "pemadam" ? "#bdbdbd" : warnaLukis;
}

function pilihAlat(alat, el) {
    alatSekarang = alat;
    document.querySelectorAll(".alat-btn").forEach(b => {
        if (b.id === "btn-pensel" || b.id === "btn-pemadam") {
            b.classList.remove("aktif-alat");
        }
    });
    el.classList.add("aktif-alat");
    kemaskiniPreview();
}

function undoLukis() {
    if (!undoTindanan.length) return;
    const img = new Image();
    img.src = undoTindanan.pop();
    img.onload = () => {
        ctx.clearRect(0, 0, kanvas.width, kanvas.height);
        ctx.drawImage(img, 0, 0);
    };
}

function clearKanvas() {
    if (!ctx) return;
    simpanUndo();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, kanvas.width, kanvas.height);
}

// ==========================
// MUAT NAIK GAMBAR KE KANVAS
// ==========================
function muatNaikGambar(input) {
    if (!input.files || !input.files[0]) return;
    if (!kanvasReady) initKanvas();

    const fail = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            simpanUndo();
            // Lukis gambar mengisi kanvas sambil kekalkan nisbah aspek
            const scaleX = kanvas.width  / img.width;
            const scaleY = kanvas.height / img.height;
            const scale  = Math.min(scaleX, scaleY);
            const drawW  = img.width  * scale;
            const drawH  = img.height * scale;
            const offsetX = (kanvas.width  - drawW) / 2;
            const offsetY = (kanvas.height - drawH) / 2;

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, kanvas.width, kanvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(fail);
    // Reset input supaya fail yang sama boleh dipilih semula
    input.value = "";
}

// SAVE PNG — triggers download on device
function simpanLukisan() {
    if (!kanvas) return;
    const tarikh = new Date().toISOString().slice(0, 10);
    const link   = document.createElement("a");
    link.download = "lukisan-safely-" + tarikh + ".png";
    link.href     = kanvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ==========================
// INIT
// ==========================
window.addEventListener("load", () => {
    // Daftar Service Worker untuk PWA (offline support)
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js").catch(() => {});
    }

    const savedGender = localStorage.getItem("gender");
    if (savedGender) {
        genderDipilih = savedGender;
        updateCharacter();
        paparSection("home-section");
    }
    kemaskiniPreview();
});