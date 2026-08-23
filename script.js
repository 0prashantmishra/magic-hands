// =========================================================
// magichands_MINAKSHI — site interactions
// =========================================================

// ---- 1. CONFIG --------------------------------------------------
// Replace with the real WhatsApp business number: country code
// first, no "+", no spaces, no leading zero. e.g. India number
// +91 98765 43210  ->  "919876543210"
const WHATSAPP_NUMBER = "916200594098"; // TODO: replace with the real number

function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

// ---- 2. DEMO PRODUCT DATA ----------------------------------------
// Swap image URLs, names, prices and descriptions for the real
// catalogue whenever it's ready — every card, badge and WhatsApp
// message is generated from this data, so nothing else needs to change.
const frameProducts = [
  {
    badge: "Best seller",
    name: "Wedding Garland Keepsake Frame",
    size: "Small · 6x6 in",
    price: "₹1,499",
    priceNote: "starting",
    desc: "A compact frame for a section of your varmala or a single strand — perfect for a shelf or bedside table.",
    img: "./img/g1.jpg",
  },
  {
    badge: "Most popular",
    name: "Full Varmala Preservation Frame",
    size: "small",
    price: "₹2,999",
    priceNote: "starting",
    desc: "Room for a full wedding garland, arranged in a flowing layout with pressed petals around the edges.",
    img: "./img/g2.jpg",
  },
  {
    badge: "Statement piece",
    name: "Grand Wedding Memory Frame",
    size: "Large · 16x20 in",
    price: "₹3,499",
    priceNote: "starting",
    desc: "A wall centrepiece — both garlands, invitation card details and dried florals composed together.",
    img: "./img/g3.jpg",
  },
  {
    badge: "Customer favourite",
    name: "Baby Curl & First Lock Frame",
    size: "Small ",
    price: "₹2,499",
    priceNote: "starting",
    desc: "Preserve your baby's first haircut curl along with a tiny photo or nameplate, set in clear resin.",
    img: "./img/baby.jpg",
  },
  {
    badge: "New",
    name: "Bridal Bouquet Preservation Frame",
    size: "Medium · 10x12 in",
    price: "₹2,499",
    priceNote: "starting",
    desc: "Your bouquet, pressed and set in a soft arc composition — a lasting piece from the biggest day.",
    img: "./img/b2.jpg",
  },
  {
    badge: "Fully custom",
    name: "Anniversary Memory Box Frame",
    size: "Custom size",
    price: "On request",
    priceNote: "",
    desc: "Tickets, dried flowers, rings-box ribbon, handwritten notes — tell me the story and I'll design the layout.",
    img: "./img/mg.jpg",
  },
];

const rakhiProducts = [
  {
    badge: "Bestseller",
    name: "Classic Round Resin Rakhi",
    size: "One size",
    price: "₹129",
    priceNote: "each",
    desc: "resin that touches your heart!.",
    img: "./img/r4.jpg",
  },
  {
    badge: "Customisable",
    name: "Initial Charm Rakhi",
    size: "One size",
    price: "₹149",
    priceNote: "each",
    desc: "Add your brother's initial in a resin charm alongside pressed florals.",
    img: "./img/r2.jpg",
  },
  {
    badge: "Set of 2",
    name: "Rakhi + Lumba Set",
    size: "Set of 2",
    price: "₹249",
    priceNote: "per set",
    desc: "A matching rakhi and lumba rakhi pair, coordinated in colour and florals.",
    img: "./img/r1.jpg",
  },
  {
    badge: "Premium",
    name: "Photo Charm Resin Rakhi",
    size: "One size",
    price: "₹199",
    priceNote: "each",
    desc: "A tiny printed photo sealed in a resin charm, framed with dried flowers.",
    img: "./img/r3.jpg",
  },
];

// ---- 3. RENDER PRODUCT CARDS -------------------------------------
function productCardHTML(p, variant) {
  const cardClass =
    variant === "rakhi"
      ? "am-card am-rakhi-card am-reveal"
      : "am-card am-reveal";
  const colClass = variant === "rakhi" ? "col-6" : "col-md-6 col-lg-4";
  const waMessage = `Hi Minakshi! I'd like to order: ${p.name} (${p.size}). Could you share more details and confirm the price?`;

  return `
    <div class="${colClass}">
      <div class="${cardClass}">
        <div class="am-card-img-wrap">
          <img src="${p.img}" alt="Demo image: ${p.name}" loading="lazy">
          <span class="am-card-badge">${p.badge}</span>
        </div>
        <div class="am-card-body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="am-card-meta">
            <span class="am-card-price">${p.price}${p.priceNote ? ` <small>${p.priceNote}</small>` : ""}</span>
            <span class="am-card-size">${p.size}</span>
          </div>
          <button type="button" class="am-card-order-btn am-wa-link" data-wa-message="${waMessage.replace(/"/g, "&quot;")}">
            <i class="bi bi-whatsapp"></i> Order on WhatsApp
          </button>
        </div>
      </div>
    </div>`;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const rakhiGrid = document.getElementById("rakhiGrid");

  if (grid) {
    grid.innerHTML = frameProducts
      .map((p) => productCardHTML(p, "frame"))
      .join("");
  }
  if (rakhiGrid) {
    rakhiGrid.innerHTML = rakhiProducts
      .map((p) => productCardHTML(p, "rakhi"))
      .join("");
  }
}

// ---- 4. WHATSAPP LINK WIRING -------------------------------------
// Any element with class "am-wa-link" and a data-wa-message attribute
// (including ones injected above) opens WhatsApp with that message.
// Delegated on the document so it also covers dynamically rendered cards.
function wireWhatsAppLinks() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".am-wa-link");
    if (!trigger) return;
    e.preventDefault();
    const message = trigger.getAttribute("data-wa-message") || "Hi Minakshi!";
    window.open(buildWhatsAppLink(message), "_blank", "noopener");
  });
}

// ---- 5. CUSTOM ORDER FORM -> WHATSAPP ----------------------------
function wireOrderForm() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("ofName").value.trim();
    const city = document.getElementById("ofCity").value.trim();
    const type = document.getElementById("ofType").value;
    const size = document.getElementById("ofSize").value;
    const notes = document.getElementById("ofNotes").value.trim();

    if (!name) {
      document.getElementById("ofName").focus();
      return;
    }

    const lines = [
      `Hi Minakshi! I'd like to place a custom order.`,
      `Name: ${name}`,
      city ? `City: ${city}` : null,
      `Item: ${type}`,
      `Size: ${size}`,
      notes ? `Details: ${notes}` : null,
    ].filter(Boolean);

    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener");
  });
}

// ---- 6. NAVBAR SHADOW ON SCROLL ----------------------------------
function wireNavbarScroll() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      nav.style.boxShadow = "0 8px 24px -16px rgba(31,58,46,0.35)";
    } else {
      nav.style.boxShadow = "none";
    }
  });
}

// ---- 7. SCROLL REVEAL (signature "resin setting" effect) --------
function wireScrollReveal() {
  const revealables = document.querySelectorAll(
    ".am-card, .am-process-card, .am-review-card, .am-order-form",
  );
  revealables.forEach((el) => el.classList.add("am-reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("am-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealables.forEach((el) => observer.observe(el));
}

// ---- 8. MISC: footer year + footer phone display -----------------
function fillFooterMeta() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const phoneEl = document.getElementById("footerPhone");
  if (phoneEl && WHATSAPP_NUMBER && WHATSAPP_NUMBER !== "910000000000") {
    // Format "919876543210" as "+91 98765 43210" for display
    const cc = WHATSAPP_NUMBER.slice(0, 2);
    const rest = WHATSAPP_NUMBER.slice(2);
    phoneEl.textContent = `+${cc} ${rest.slice(0, 5)} ${rest.slice(5)}`;
  }
}

// ---- 9. INIT -------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  wireWhatsAppLinks();
  wireOrderForm();
  wireNavbarScroll();
  wireScrollReveal();
  fillFooterMeta();
});
