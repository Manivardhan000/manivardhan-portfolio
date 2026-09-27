/* =========================================================
   MANIVARDHAN KANKANALA — PORTFOLIO SCRIPT
   ========================================================= */


/* =========================================================
   1. THEME TOGGLE
   ========================================================= */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  if (themeBtn) {
    themeBtn.textContent = "☾";
  }
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");

    localStorage.setItem(
      "portfolio-theme",
      isDark ? "dark" : "light"
    );

    themeBtn.textContent =
      isDark ? "☾" : "☼";

  });
}


/* =========================================================
   2. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =========================================================
   3. CURSOR GLOW
   ========================================================= */

const cursorGlow =
  document.querySelector(".cursor-glow");


if (cursorGlow) {

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;


  window.addEventListener(
    "mousemove",
    (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

    }
  );


  function animateCursor() {

    currentX +=
      (mouseX - currentX) * 0.12;

    currentY +=
      (mouseY - currentY) * 0.12;


    cursorGlow.style.left =
      `${currentX}px`;

    cursorGlow.style.top =
      `${currentY}px`;


    requestAnimationFrame(
      animateCursor
    );

  }


  animateCursor();

}


/* =========================================================
   4. NAVIGATION — SMOOTH SCROLL
   ========================================================= */

const navLinks =
  document.querySelectorAll(
    '.nav a[href^="#"]'
  );


navLinks.forEach((link) => {

  link.addEventListener(
    "click",
    (event) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

});


/* =========================================================
   5. ACTIVE NAVIGATION LINK
   ========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }


        const currentId =
          entry.target.getAttribute("id");


        navLinks.forEach((link) => {

          link.classList.remove(
            "active"
          );


          if (
            link.getAttribute("href") ===
            `#${currentId}`
          ) {

            link.classList.add(
              "active"
            );

          }

        });

      });

    },
    {
      threshold: 0.35
    }
  );


sections.forEach((section) => {

  sectionObserver.observe(section);

});


/* =========================================================
   6. PROFILE IMAGE LOADING EFFECT
   ========================================================= */

const profileImage =
  document.querySelector(
    ".profile-image-wrap img"
  );


if (profileImage) {

  profileImage.style.opacity = "0";

  profileImage.style.transition =
    "opacity .6s ease, transform .5s ease";


  if (profileImage.complete) {

    profileImage.style.opacity = "1";

  } else {

    profileImage.addEventListener(
      "load",
      () => {

        profileImage.style.opacity = "1";

      }
    );

  }

}


/* =========================================================
   7. PROJECT CARD MICRO-INTERACTION
   ========================================================= */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


projectCards.forEach((card) => {

  card.addEventListener(
    "mousemove",
    (event) => {

      if (
        window.innerWidth < 800
      ) {
        return;
      }


      const rect =
        card.getBoundingClientRect();


      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;


      const rotateX =
        ((y / rect.height) - 0.5) * -2;


      const rotateY =
        ((x / rect.width) - 0.5) * 2;


      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = "";

    }
  );

});


/* =========================================================
   8. PROFILE CARD TILT
   ========================================================= */

const profileCard =
  document.querySelector(
    ".profile-card"
  );


if (profileCard) {

  profileCard.addEventListener(
    "mousemove",
    (event) => {

      if (
        window.innerWidth < 800
      ) {
        return;
      }


      const rect =
        profileCard.getBoundingClientRect();


      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;


      const rotateX =
        ((y / rect.height) - 0.5) * -5;


      const rotateY =
        ((x / rect.width) - 0.5) * 5;


      profileCard.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-6px)`;

    }
  );


  profileCard.addEventListener(
    "mouseleave",
    () => {

      profileCard.style.transform =
        "rotate(3deg)";

    }
  );

}


/* =========================================================
   9. BUTTON RIPPLE EFFECT
   ========================================================= */

const buttons =
  document.querySelectorAll(
    ".btn"
  );


buttons.forEach((button) => {

  button.addEventListener(
    "click",
    function (event) {

      const ripple =
        document.createElement("span");


      const rect =
        button.getBoundingClientRect();


      const size =
        Math.max(
          rect.width,
          rect.height
        );


      ripple.style.width =
        `${size}px`;

      ripple.style.height =
        `${size}px`;

      ripple.style.left =
        `${event.clientX - rect.left - size / 2}px`;

      ripple.style.top =
        `${event.clientY - rect.top - size / 2}px`;

      ripple.classList.add(
        "ripple"
      );


      button.appendChild(
        ripple
      );


      setTimeout(() => {

        ripple.remove();

      }, 600);

    }
  );

});


/* =========================================================
   10. DYNAMIC CURRENT YEAR
   ========================================================= */

const footer =
  document.querySelector("footer");


if (footer) {

  const footerSpans =
    footer.querySelectorAll("span");


  if (footerSpans.length > 1) {

    footerSpans[1].textContent =
      `© ${new Date().getFullYear()} · Built with curiosity.`;

  }

}


/* =========================================================
   11. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      document.activeElement?.blur();

    }

  }
);


/* =========================================================
   12. PAGE LOADED
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

  }
);
