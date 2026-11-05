/* =====================================================
   Free2Pay – Login Pop-up (js/login.js)
   กดปุ่ม "Log in" ที่เมนู → ป๊อปอัปขึ้นมา พื้นหลังเบลอ
   ต้องโหลด css/login.css คู่กัน
   ===================================================== */
(function () {
    var TRI = '<svg class="tri" width="30" height="26" viewBox="0 0 30 26" aria-hidden="true"><path d="M4 4h22L15 22z" fill="none" stroke="#fff" stroke-width="3.4" stroke-linejoin="round"/></svg>';

    var HTML =
        '<div class="login-modal" role="dialog" aria-modal="true" aria-labelledby="loginTitle">' +
        '<img src="../images/logoinpage.png" alt="" class="logo-web">' +
        '<div class="box-login">' +
        '<button type="button" class="btn-close" aria-label="ปิด"><i class="fa-solid fa-xmark"></i></button>' +
        '<h2 class="head-title" id="loginTitle">Set up your<br><strong>Identity</strong></h2>' +
        '<form class="login-form" novalidate>' +
        '<div class="input-group">' +
        '<input type="email" class="input-field" placeholder="E-mail..." autocomplete="email" required>' +
        '</div>' +
        '<div class="box-password">' +
        '<div class="your-password">' +
        '<input type="password" class="input-field input-pass" placeholder="Password..." autocomplete="current-password" required>' +
        '<div class="pass-actions">' +
        '<a href="#" class="forgot-link">Forgot Password?</a>' +
        '<button type="button" class="btn-eye" title="แสดง/ซ่อนรหัสผ่าน" aria-label="แสดง/ซ่อนรหัสผ่าน"><i class="fa-solid fa-eye-slash"></i></button>' +
        '</div>' +
        '</div>' +
        '<div class="social-login">' +
        '<a href="#" class="social-icon" title="Phone"><i class="fa-solid fa-phone"></i></a>' +
        '<a href="#" class="social-icon" title="Google"><i class="fa-brands fa-google"></i></a>' +
        '<a href="#" class="social-icon" title="Facebook"><i class="fa-brands fa-square-facebook"></i></a>' +
        '</div>' +
        '</div>' +
        '<div class="login-btn-wrap"><button type="submit" class="btn-login">login</button></div>' +
        '</form>' +
        '<div class="login-line"></div>' +
        '<div class="interest-section">' +
        '<h3 class="interest-title">ฉันสนใจจจ ?</h3>' +
        '<div class="interest-tags">' +
        '<div class="tags-row">' +
        '<button type="button" class="login-tag">UXUI Design</button>' +
        '<button type="button" class="login-tag">Digital Art</button>' +
        '<button type="button" class="login-tag">UX/UI Design</button>' +
        '<button type="button" class="login-tag">Handmade</button>' +
        '</div>' +
        '<div class="tags-row">' +
        '<button type="button" class="login-tag">Graphic Design</button>' +
        '<button type="button" class="login-tag">Traditional Art</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="choose">' +
        '<div class="choose-container" style="display:contents">' +
        '<div class="choose-title"><span>' + TRI + ' ฉันเป็น ?</span></div>' +
        '<div class="choose-roles">' +
        '<button type="button" class="role-pill">บุคคลที่สนใจในศิลปะ</button>' +
        '<button type="button" class="role-pill">ผู้ว่าจ้าง</button>' +
        '<button type="button" class="role-pill">นักออกแบบ</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    function init() {
        var triggers = document.querySelectorAll('.menu-links .login a');
        if (!triggers.length) return;

        var overlay = document.createElement('div');
        overlay.className = 'login-overlay';
        overlay.id = 'loginOverlay';
        overlay.innerHTML = HTML;
        document.body.appendChild(overlay);

        var lastFocus = null;
        var emailInput = overlay.querySelector('input[type="email"]');

        function open() {
            lastFocus = document.activeElement;
            overlay.classList.add('active');
            document.body.classList.add('no-scroll');
            setTimeout(function () { emailInput.focus(); }, 80);
        }

        function close() {
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }

        triggers.forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                open();
            });
        });

        // ปิด: ปุ่ม X / คลิกพื้นที่เบลอ / กด Esc
        overlay.querySelector('.btn-close').addEventListener('click', close);
        overlay.addEventListener('mousedown', function (e) {
            if (e.target === overlay) close();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) close();
        });

        // แสดง/ซ่อนรหัสผ่าน
        var pass = overlay.querySelector('.input-pass');
        var eye = overlay.querySelector('.btn-eye');
        eye.addEventListener('click', function () {
            var show = pass.type === 'password';
            pass.type = show ? 'text' : 'password';
            eye.firstElementChild.className = show ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
        });

        // ลิงก์ที่ยังไม่มีปลายทาง ไม่ให้เด้งขึ้นบนสุด
        overlay.querySelectorAll('a[href="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) { e.preventDefault(); });
        });

        // เลือกความสนใจ (เลือกได้หลายอัน)
        overlay.querySelectorAll('.login-tag').forEach(function (t) {
            t.addEventListener('click', function () {
                var on = t.classList.toggle('active');
                t.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
        });

        // เลือก role (เลือกได้อันเดียว)
        var roles = overlay.querySelectorAll('.role-pill');
        roles.forEach(function (r) {
            r.addEventListener('click', function () {
                roles.forEach(function (x) {
                    x.classList.remove('active');
                    x.setAttribute('aria-pressed', 'false');
                });
                r.classList.add('active');
                r.setAttribute('aria-pressed', 'true');
            });
        });

        // กด login (ยังไม่ต่อระบบหลังบ้าน: ตรวจช่องว่างแล้วปิดป๊อปอัป)
        overlay.querySelector('.login-form').addEventListener('submit', function (e) {
            e.preventDefault();
            var ok = true;
            overlay.querySelectorAll('.input-field').forEach(function (i) {
                var bad = !i.value.trim();
                i.style.outline = bad ? '2px solid #f4623a' : '';
                if (bad) ok = false;
            });
            if (ok) close();
        });

        // เปิดอัตโนมัติถ้า URL เป็น #login
        if (location.hash === '#login') open();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();