document.addEventListener("DOMContentLoaded", function() {
    // 平滑滚动到锚点
    const smoothScroll = () => {
        const links = document.querySelectorAll("a[href^=\"#\"]");
        links.forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const targetId = this.getAttribute("href");
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // 考虑导航栏高度
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth"
                    });
                }
            });
        });
    };

    // 导航栏滚动效果
    const navbarScrollEffect = () => {
        const navbar = document.querySelector(".navbar");
        window.addEventListener("scroll", function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                navbar.style.background = "rgba(255, 255, 255, 0.98)";
                navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
            } else {
                navbar.style.background = "rgba(255, 255, 255, 0.95)";
                navbar.style.boxShadow = "none";
            }
        });
    };

    // 数字动画效果
    const animateNumbers = () => {
        const statNumbers = document.querySelectorAll(".stat-number");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ""));
                    const suffix = finalValue.replace(/[\d.]/g, "");
                    if (!isNaN(numericValue)) {
                        animateNumber(target, 0, numericValue, suffix, 2000);
                    }
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(number => {
            observer.observe(number);
        });
    };

    // 数字递增动画
    const animateNumber = (element, start, end, suffix, duration) => {
        const startTime = performance.now();
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (end - start) * easeOutQuart;
            if (suffix.includes("K")) {
                element.textContent = Math.floor(current) + "K+";
            } else if (suffix.includes("%")) {
                element.textContent = current.toFixed(1) + "%";
            } else {
                element.textContent = current.toFixed(0) + suffix;
            }
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        requestAnimationFrame(updateNumber);
    };

    // 卡片悬停效果增强
    const enhanceCardHover = () => {
        const featureCards = document.querySelectorAll(".feature-card");
        featureCards.forEach(card => {
            card.addEventListener("mouseenter", function() {
                this.style.transform = "translateY(-10px)";
            });
            card.addEventListener("mouseleave", function() {
                this.style.transform = "translateY(0)";
            });
        });
    };

    // 下载按钮点击效果
    const handleDownloadButtons = () => {
        const downloadButtons = document.querySelectorAll(".btn-download");
        downloadButtons.forEach(button => {
            button.addEventListener("click", function(e) {
                e.preventDefault();
                const ripple = document.createElement("span");
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                this.style.position = "relative";
                this.style.overflow = "hidden";
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
                setTimeout(() => alert("下载即将开始！感谢您选择 Sync Pro。"), 300);
            });
        });
    };

    // 滚动时的元素动画
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".feature-card, .download-card, .about-content");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-up");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // 响应式菜单（移动端）
    const setupMobileMenu = () => {
        const navContainer = document.querySelector(".nav-container");
        const navLinks = document.querySelector(".nav-links");
        
        // 创建汉堡菜单按钮
        const menuBtn = document.createElement("button");
        menuBtn.className = "mobile-menu-btn";
        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "Toggle navigation menu");
        navContainer.appendChild(menuBtn);

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            if (navLinks.classList.contains("active")) {
                menuBtn.innerHTML = "✕";
                menuBtn.setAttribute("aria-expanded", "true");
            } else {
                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });

        // 点击链接后自动关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    menuBtn.innerHTML = "☰";
                    menuBtn.setAttribute("aria-expanded", "false");
                }
            });
        });
    };

// 更新日志下拉滑块功能
const setupAccordion = () => {
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".accordion-icon");
            const isExpanded = this.getAttribute("aria-expanded") === "true";

            // 切换当前面板
            if (isExpanded) {
                this.setAttribute("aria-expanded", "false");
                icon.textContent = "+";
                content.style.maxHeight = "0px";
                content.setAttribute("aria-hidden", "true");
            } else {
                // 先收起所有其他面板
                document.querySelectorAll(".accordion-header").forEach(otherHeader => {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherIcon = otherHeader.querySelector(".accordion-icon");
                    if (otherHeader !== this && otherHeader.getAttribute("aria-expanded") === "true") {
                        otherHeader.setAttribute("aria-expanded", "false");
                        otherIcon.textContent = "+";
                        otherContent.style.maxHeight = "0px";
                        otherContent.setAttribute("aria-hidden", "true");
                    }
                });

                // 再展开当前面板
                this.setAttribute("aria-expanded", "true");
                icon.textContent = "−";

                // 强制浏览器重新计算高度，确保scrollHeight的准确性
                // 关键点：将maxHeight设置为'auto'可以确保内容完全显示，但会失去CSS过渡效果
                // 为了保留过渡效果，我们先将maxHeight设置为'auto'，获取高度后立即设置为该值
                content.style.maxHeight = 'none'; // 先将maxHeight设置为'none'以获取准确的高度
                const contentHeight = content.scrollHeight + "px"; // 获取准确的高度
                content.style.maxHeight = '0px'; // 恢复到0，准备开始过渡

                // 强制重绘，确保过渡效果能生效
                content.offsetHeight; // 触发浏览器重绘

                content.style.maxHeight = contentHeight; // 设置为准确的高度以展开
                content.setAttribute("aria-hidden", "false");
            }
        });
    });
};

    // 页面加载后的入场动画
    const introAnimations = () => {
        const heroIcon = document.querySelector(".hero-icon");
        if (heroIcon) {
            heroIcon.style.opacity = "0";
            heroIcon.style.transform = "scale(0.8) translateY(20px)";
            setTimeout(() => {
                heroIcon.style.transition = "all 1s ease-out";
                heroIcon.style.opacity = "1";
                heroIcon.style.transform = "scale(1) translateY(0)";
            }, 500);
        }
        
        const heroTitle = document.querySelector(".hero-title");
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            heroTitle.textContent = "";
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    heroTitle.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            setTimeout(typeWriter, 1000);
        }
    };

    // 初始化所有功能
    smoothScroll();
    navbarScrollEffect();
    animateNumbers();
    enhanceCardHover();
    handleDownloadButtons();
    animateOnScroll();
    setupMobileMenu();
    setupAccordion();
    introAnimations();
});