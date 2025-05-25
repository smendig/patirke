<template>
  <footer class="footer">
    <div class="footercontainer">
      <div class="footer-main-modern">
        <span class="footer-copyright">© 2025 Patirke Mendiguren</span>
        <a
          class="footer-email"
          href="mailto:patirkem@gmail.com"
        >patirkem@gmail.com</a>
      </div>
      <div class="footer-author">
        <a
          class="github-link"
          href="https://github.com/smendig/patirke"
          target="_blank"
          rel="noopener"
          aria-label="Código fuente en GitHub"
          title="Ver código fuente en GitHub"
        >
          <img
            src="../assets/images/social/github.svg"
            alt="GitHub"
            width="20"
            height="20"
            style="filter: brightness(0) invert(1); vertical-align: middle;"
          >
          <span class="sr-only">Código fuente en GitHub</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  grid-area: footer;
  background-color: #000;
  color: #fff;
}

.footercontainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.7em;
    padding: 24px 0 32px 0;
}

.footer-main-modern {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2em;
    font-size: 1.08em;
    color: #e0e0e0;
    letter-spacing: 0.01em;
}

.footer-main-modern .footer-email {
    color: #b4b4b4;
    font-size: 0.98em;
    text-decoration: none;
    margin-top: 2px;
    transition: color 0.2s;
}

.footer-main-modern .footer-email:hover {
    color: #fff;
    text-decoration: underline;
}

.footer-main-modern span {
    font-weight: 400;
    letter-spacing: 0.02em;
}

.footer-author {
    margin-top: 0.2em;
    font-size: 0.93em;
    color: #b4b4b4;
    display: flex;
    align-items: center;
    justify-content: center;
}

.github-link {
    vertical-align: middle;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #fff;
    text-decoration: none;
}

.github-link img {
    filter: brightness(0) invert(1);
    vertical-align: middle;
    transition: opacity 0.2s;
}

.github-link:hover img {
    opacity: 0.7;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

@media only screen and (max-width: 768px) {
    .footercontainer {
        padding: 18px 0 8px 0;
        gap: 0.6em;
    }

    .footer-main-modern {
        font-size: 1em;
        gap: 0.1em;
    }

    .footer-author {
        font-size: 0.9em;
    }
}
</style>
