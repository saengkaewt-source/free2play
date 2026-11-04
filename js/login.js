/**
 * Free2Pay - Login Modal Popup Script
 * ทำหน้าที่เปิด/ปิดหน้าต่าง Popup เข้าสู่ระบบกลางหน้าจอ พร้อมเอฟเฟกต์พื้นหลังเบลอ
 */
(function () {
    // โครงสร้าง HTML ของ Login Modal Popup
    const popupHTML = `
    <div class="login-overlay" id="loginOverlay" aria-hidden="true">
        <div class="login-modal" role="dialog" aria-modal="true" aria-labelledby="loginTitle">

            <!-- โลโก้สติกเกอร์กลมมุมซ้ายบน -->
            <img src="../images/logoinpage.png" alt="Free2Pay" class="logo-web">

            <!-- กล่องแฟ้มสีน้ำเงิน -->
            <div class="box-login">
                <!-- ปุ่มปิด (X) -->
                <button type="button" class="btn-close" id="loginClose" aria-label="ปิดหน้าต่าง">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <h2 class="head-title" id="loginTitle">Set up your<br><strong>Identity</strong></h2>

                <!-- ฟอร์มเข้าสู่ระบบ -->
                <form class="login-form" id="loginForm">
                    <div class="input-group">
                        <input type="email" class="input-field" placeholder="E-mail..." required autocomplete="email">
                    </div>

                    <div class="box-password">
                        <div class="your-password">
                            <input type="password" class="input-field input-pass" id="loginPass" placeholder="Password..." required autocomplete="current-password">
                            <div class="pass-actions">
                                <a href="#" class="forgot-link">Forgot Password?</a>
                                <button type="button" class="btn-eye" id="togglePass" title="แสดง/ซ่อนรหัสผ่าน" aria-label="แสดง/ซ่อนรหัสผ่าน">
                                    <i class="fa-solid fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>

                        <!-- ล็อกอินผ่าน Social อื่นๆ -->
                        <div class="social-login">
                            <a href="#" class="social-icon" title="เบอร์โทรศัพท์"><i class="fa-solid fa-phone"></i></a>
                            <a href="#" class="social-icon" title="Google"><i class="fa-brands fa-google"></i></a>
                            <a href="#" class="social-icon" title="Facebook"><i class="fa-brands fa-square-facebook"></i></a>
                        </div>
                    </div>

                    <div class="login-btn-wrap">
                        <button type="submit" class="btn-login">log-in</button>
                    </div>
                </form>

                <div class="login-line"></div>

                <!-- หมวดหมู่ที่สนใจ -->
                <div class="interest-section">
                    <h3 class="interest-title">ฉันสนใจจจ ?</h3>
                    <div class="interest-tags">
                        <div class="tags-row">
                            <button type="button" class="tag-pill">UXUI Design</button>
                            <button type="button" class="tag-pill">Digital Art</button>
                            <button type="button" class="tag-pill">Painting</button>
                            <button type="button" class="tag-pill">Handmade</button>
                        </div>
                        <div class="tags-row">
                            <button type="button" class="tag-pill">Graphic Design</button>
                            <button type="button" class="tag-pill">Traditional Art</button>
                        </div>
                    </div>
                </div>
            </div><!-- box-login -->

            <!-- แถบสีส้มด้านล่าง: เลือก Role -->
            <div class="choose">
                <div class="choose-title">
                    <span>ฉันเป็น ?</span>
                </div>
                <div class="choose-roles">
                    <button type="button" class="role-pill">บุคคลที่สนใจในศิลปะ</button>
                    <button type="button" class="role-pill">ผู้ว่าจ้าง</button>
                    <button type="button" class="role-pill">นักออกแบบ</button>
                </div>
            </div>

        </div><!-- login-modal -->
    </div><!-- login-overlay -->
    `;

    function initLoginPopup() {
        // ป้องกันการใส่ซ้ำ
        if (document.getElementById('loginOverlay')) return;

        // แทรก Modal ลงในหน้าเว็บ
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const overlay = document.getElementById('loginOverlay');

        // ลบ required ออกจาก email เพื่อให้กด login ได้โดยไม่มี native validation
        const emailInputEl = overlay.querySelector('input[type="email"]');
        if (emailInputEl) emailInputEl.removeAttribute('required');
        const closeBtn = document.getElementById('loginClose');
        const form = document.getElementById('loginForm');
        const passInput = document.getElementById('loginPass');
        const eyeBtn = document.getElementById('togglePass');

        // ฟังก์ชันเปิด Popup
        function openLogin() {
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('no-scroll');
            const emailInput = overlay.querySelector('input[type="email"]');
            if (emailInput) setTimeout(() => emailInput.focus(), 150);
        }

        // ฟังก์ชันปิด Popup
        function closeLogin() {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('no-scroll');
        }

        // ดักจับการคลิกลิงก์ Log in ทุกจุดในเว็บ (ทั้ง Navbar, Footer, หรือปุ่มอื่นๆ)
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a[href*="login.html"], .js-open-login, .login a');
            if (link) {
                // ถ้าอยู่ในหน้า login.html ตรงๆ อยู่แล้ว ไม่ต้องแทรกแซง
                if (window.location.pathname.endsWith('login.html')) {
                    return;
                }
                e.preventDefault();
                openLogin();
            }
        });

        // ปิดด้วยปุ่มกากบาท (X)
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLogin);
        }

        // ปิดเมื่อคลิกที่พื้นหลังมืด/เบลอ (ด้านนอกกล่อง modal)
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                closeLogin();
            }
        });

        // ปิดเมื่อกดปุ่ม Escape (Esc)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeLogin();
            }
        });

        // สลับแสดง/ซ่อนรหัสผ่าน
        if (eyeBtn && passInput) {
            eyeBtn.addEventListener('click', function () {
                const icon = eyeBtn.querySelector('i');
                const isPass = passInput.type === 'password';
                passInput.type = isPass ? 'text' : 'password';
                if (icon) {
                    icon.classList.toggle('fa-eye', isPass);
                    icon.classList.toggle('fa-eye-slash', !isPass);
                }
            });
        }

        // เลือกหมวดที่สนใจ (เลือก/ยกเลิกได้หลายอัน)
        overlay.querySelectorAll('.tag-pill').forEach(function (tag) {
            tag.addEventListener('click', function () {
                tag.classList.toggle('active');
            });
        });

        // เลือก Role ตัวเอง (เลือกได้อันเดียว)
        const roles = overlay.querySelectorAll('.role-pill');
        roles.forEach(function (role) {
            role.addEventListener('click', function () {
                roles.forEach(r => r.classList.remove('active'));
                role.classList.add('active');
            });
        });

        // เมื่อกด Submit ฟอร์ม Login
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                const password = passInput ? passInput.value : '';
                const interests = [...overlay.querySelectorAll('.tag-pill.active')].map(t => t.textContent.trim());
                const role = overlay.querySelector('.role-pill.active')?.textContent.trim() || null;

                console.log('Login Info:', { email, password, interests, role });
                closeLogin();
            });
        }

        // ส่งออกเป็นฟังก์ชันระดับ Global ให้เรียกใช้ได้ตามต้องการ
        window.openLoginModal = openLogin;
        window.closeLoginModal = closeLogin;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoginPopup);
    } else {
        initLoginPopup();
    }
})();
