(function () {

    // -----------------------
    // 🌞 SUNLIGHT EFFECT
    // -----------------------
    const sun = document.createElement("div");
    sun.style.position = "fixed";
    sun.style.top = "-150px";
    sun.style.right = "-150px";
    sun.style.width = "500px";
    sun.style.height = "500px";
    sun.style.background = "radial-gradient(circle, rgba(255,220,170,0.35) 0%, rgba(255,220,170,0.15) 40%, transparent 70%)";
    sun.style.pointerEvents = "none";
    sun.style.zIndex = "-2";
    document.body.appendChild(sun);

    // -----------------------
    // 🍃 LAYERS
    // -----------------------
    const backLayer = document.createElement("div");
    const frontLayer = document.createElement("div");

    [backLayer, frontLayer].forEach(layer => {
        layer.style.position = "fixed";
        layer.style.inset = "0";
        layer.style.pointerEvents = "none";
        layer.style.overflow = "hidden";
        document.body.appendChild(layer);
    });

    backLayer.style.zIndex = "-1";
    backLayer.style.filter = "blur(6px)";
    frontLayer.style.zIndex = "0";

    // -----------------------
    // 🎨 COLORS (Brown-Beige Minimal)
    // -----------------------
    const leafColors = ["#6B4226", "#8B5E3C", "#A67B5B", "#C19A6B"];
    const flowerColors = ["#8B6F47", "#B08968", "#D4B996", "#A67B5B"];

    // -----------------------
    // 🍃 REALISTIC LEAF
    // -----------------------
    function createLeaf(layer, isBack = false) {

        const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const size = Math.random() * 30 + 25;

        leaf.setAttribute("width", size);
        leaf.setAttribute("height", size * 1.8);
        leaf.style.position = "absolute";
        leaf.style.left = Math.random() * 100 + "vw";
        leaf.style.bottom = "-80px";
        leaf.style.opacity = isBack ? "0.4" : "0.9";

        const color = leafColors[Math.floor(Math.random() * leafColors.length)];

        leaf.innerHTML = `
            <defs>
                <linearGradient id="grad${Math.random()}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${color}" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#4a2c1a" stop-opacity="0.9"/>
                </linearGradient>
            </defs>
            <path d="M${size/2} 0 
                     C ${size} ${size/3}, 
                       ${size} ${size}, 
                       ${size/2} ${size*1.8}
                     C 0 ${size}, 
                       0 ${size/3}, 
                       ${size/2} 0 Z" 
                  fill="${color}" />
            <line x1="${size/2}" y1="10" 
                  x2="${size/2}" y2="${size*1.7}" 
                  stroke="rgba(0,0,0,0.25)" 
                  stroke-width="1"/>
        `;

        const duration = Math.random() * 9000 + 12000;
        const drift = Math.random() * 100 - 50;
        const rotate = Math.random() * 720 - 360;

        leaf.animate(
            [
                { transform: "translate(0,0) rotate(0deg)" },
                { transform: `translate(${drift}px,-120vh) rotate(${rotate}deg)` }
            ],
            {
                duration: duration,
                easing: "ease-in-out",
                iterations: 1
            }
        );

        layer.appendChild(leaf);
        setTimeout(() => leaf.remove(), duration);
    }

    // -----------------------
    // 🌸 REALISTIC 5-PETAL FLOWER
    // -----------------------
    function createFlower() {

        const flower = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const size = Math.random() * 25 + 20;

        flower.setAttribute("width", size);
        flower.setAttribute("height", size);
        flower.style.position = "absolute";
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.bottom = "-70px";
        flower.style.opacity = "0.9";

        const petalColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];

        let petals = "";
        for (let i = 0; i < 5; i++) {
            const angle = (i * 72);
            petals += `
                <ellipse 
                    cx="${size/2}" 
                    cy="8" 
                    rx="${size/7}" 
                    ry="${size/3}" 
                    fill="${petalColor}"
                    transform="rotate(${angle} ${size/2} ${size/2})"
                />
            `;
        }

        flower.innerHTML = `
            ${petals}
            <circle cx="${size/2}" cy="${size/2}" r="${size/8}" fill="#5C4033"/>
        `;

        const duration = Math.random() * 10000 + 14000;
        const drift = Math.random() * 80 - 40;
        const rotate = Math.random() * 720 - 360;

        flower.animate(
            [
                { transform: "translate(0,0) rotate(0deg)", opacity: 0 },
                { transform: `translate(${drift}px,-120vh) rotate(${rotate}deg)`, opacity: 1 }
            ],
            {
                duration: duration,
                easing: "ease-in-out",
                iterations: 1
            }
        );

        frontLayer.appendChild(flower);
        setTimeout(() => flower.remove(), duration);
    }

    // -----------------------
    // 🌿 INTERVALS
    // -----------------------
    setInterval(() => createLeaf(backLayer, true), 1500);  // ใบไม้เบลอด้านหลัง
    setInterval(() => createLeaf(frontLayer, false), 1200); // ใบไม้ชัดด้านหน้า
    setInterval(createFlower, 2000); // ดอกไม้ 5 กลีบ

})();
