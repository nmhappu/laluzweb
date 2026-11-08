/* =========================================================
   EDIT YOUR DETAILS HERE — this is the only place you need to change.
   Leave a value as "" to keep showing its TODO placeholder.
   ========================================================= */
const CONFIG = {
  // Phone in international format, digits only, e.g. "919876543210"
  phone: "917907551379",
  // WhatsApp number in the same format (often the same as phone)
  whatsapp: "",
  // Shown on the page under "visit"
  address: "",
  // Google Maps share link, e.g. "https://maps.app.goo.gl/xxxx"
  mapsUrl: "",
  // Instagram username (without @) and YouTube channel link
  instagram: "laluzgarage",
  youtube: "https://youtube.com/@laluzgarage",
  // Brands sold at Prince Traders, e.g. ["Brand A", "Brand B"]
  brands: [],
  // Photos placed in the /assets folder, e.g. { src: "assets/showroom.jpg", alt: "Prince Traders showroom" }
  photos: [],
};

/* ---------- Do not edit below unless you want to change behaviour ---------- */
(function () {
  const $ = (s) => document.querySelector(s);
  const setText = (field, value) => {
    const el = $(`[data-field="${field}"]`);
    if (!el) return;
    if (value) el.textContent = value;
    else el.classList.add("todo");
  };
  const pretty = (n) => (n ? "+" + n.replace(/^(\d{2})(\d{5})(\d+)$/, "$1 $2 $3") : "");

  setText("phoneLabel", pretty(CONFIG.phone));
  setText("whatsappLabel", pretty(CONFIG.whatsapp));
  setText("address", CONFIG.address);
  setText("instagramLabel", CONFIG.instagram && "@" + CONFIG.instagram);
  setText("youtubeLabel", CONFIG.youtube && "@" + CONFIG.youtube.split("@").pop());
  setText("brands", CONFIG.brands.join(" · "));

  const link = (name, href) => {
    const el = $(`[data-link="${name}"]`);
    if (!el) return;
    if (href) {
      el.href = href;
      if (name !== "phone") el.target = "_blank";
    } else {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
    }
  };
  link("phone", CONFIG.phone && `tel:+${CONFIG.phone}`);
  link("whatsapp", CONFIG.whatsapp && `https://wa.me/${CONFIG.whatsapp}`);
  link("maps", CONFIG.mapsUrl);
  link("instagram", CONFIG.instagram && `https://instagram.com/${CONFIG.instagram}`);
  link("youtube", CONFIG.youtube);

  // Gallery
  const gallery = $("[data-gallery]");
  if (gallery) {
    if (CONFIG.photos.length) {
      CONFIG.photos.forEach(({ src, alt }) => {
        const img = new Image();
        img.src = src;
        img.alt = alt || "";
        img.loading = "lazy";
        img.decoding = "async";
        gallery.appendChild(img);
      });
    } else {
      ["showroom", "garage", "workbench", "event"].forEach((label) => {
        const d = document.createElement("div");
        d.className = "ph";
        d.textContent = `photo: ${label}`;
        d.setAttribute("aria-hidden", "true");
        gallery.appendChild(d);
      });
    }
  }

  // Year
  const y = $("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // Theme toggle (remembered per browser)
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (_) {}
  $("[data-theme-toggle]")?.addEventListener("click", () => {
    const isLight =
      root.dataset.theme === "light" ||
      (!root.dataset.theme && matchMedia("(prefers-color-scheme: light)").matches);
    root.dataset.theme = isLight ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (_) {}
  });
})();
