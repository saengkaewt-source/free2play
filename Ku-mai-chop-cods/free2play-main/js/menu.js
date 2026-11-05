/* =====================================================
   Free2Pay – Mobile Hamburger Menu (js/menu.js)
   ===================================================== */
(function () {
    function initMenu() {
        var nav = document.querySelector('.menu');
        var btn = document.querySelector('.menu-toggle');
        if (!nav || !btn) return;

        function setMenu(open) {
            nav.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var isOpen = nav.classList.contains('is-open');
            setMenu(!isOpen);
        });

        // ปิดเมนูเมื่อคลิกนอกเมนู
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('is-open') && !nav.contains(e.target)) {
                setMenu(false);
            }
        });

        // ปิดเมนูเมื่อคลิกลิงก์ภายในเมนู
        var links = nav.querySelectorAll('.menu-links a');
        links.forEach(function (link) {
            link.addEventListener('click', function () {
                setMenu(false);
            });
        });

        // ปิดเมื่อขยายหน้าจอกลับเป็น Desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 560) {
                setMenu(false);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
})();

