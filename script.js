(function () {
    const layer = document.createElement("div");
    layer.style.position = "fixed";
    layer.style.inset = "0";
    layer.style.pointerEvents = "none";
    layer.style.overflow = "hidden";
    layer.style.zIndex = "1";
    document.body.appendChild(layer);

    function createMinimalFlower() {
        const flower = document.createElement("div");
        const size = Math.random() * 8 + 10;

        // สีน้ำตาลเข้ม / น้ำตาลอ่อน
        const colors = ["#7a4a2e", "#c49a6c"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        flower.style.width = size + "px";
        flower.style.height = size + "px";
        flower.style.position = "absolute";
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.bottom = "-20px";
        flower.style.background = color;
        flower.style.opacity = color === "#7a4a2e" ? "0.5" : "0.6";
        flower.style.borderRadius = "50%";

        // เงาฟุ้งนุ่มตามสี
        flower.style.filter = color === "#7a4a2e"
            ? "drop-shadow(0 0 6px rgba(122,74,46,0.5))"
            : "drop-shadow(0 0 6px rgba(196,154,108,0.5))";

        // ดอกไม้ 4 กลีบ
        flower.style.boxShadow = `
            ${size}px 0 0 ${color},
            -${size}px 0 0 ${color},
            0 ${size}px 0 ${color},
            0 -${size}px 0 ${color}
        `;

        const duration = Math.random() * 10000 + 12000;
        const drift = Math.random() * 40 - 20;

        flower.animate(
            [
                { transform: "translate(0, 0) rotate(0deg)" },
                { transform: `translate(${drift}px, -120vh) rotate(180deg)` }
            ],
            {
                duration: duration,
                easing: "linear",
                iterations: 1
            }
        );

        layer.appendChild(flower);
        setTimeout(() => flower.remove(), duration);
    }

    setInterval(createMinimalFlower, 900);
})();
