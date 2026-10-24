// 滚动时更新深度计 + 让版块逐个浮上来
// 这一段就是「网页的交互」，不需要任何框架

const gauge = document.querySelector('.depth__bubble');
const value = document.querySelector('.depth__value');
const rail = document.querySelector('.depth__rail');

function updateDepth() {
  if (!gauge || !value || !rail) return;
  const max = document.body.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  const meters = Math.round(ratio * 320);
  gauge.style.top = `calc(${ratio * 100}% - 2px)`;
  value.textContent = `−${String(meters).padStart(3, '0')} m`;
}
window.addEventListener('scroll', updateDepth, { passive: true });
window.addEventListener('resize', updateDepth);
updateDepth();

// 进入视口就加 .in，触发淡入
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// 首屏的字逐个浮起（CSS 已经写了延迟，这里只负责触发）
document.body.classList.add('ready');
