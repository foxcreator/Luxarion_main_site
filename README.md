# Luxarion Games — головний сайт

Короткий огляд тех-стека проекту.

## Тех-стек

| Категорія | Технологія |
|-----------|------------|
| **Збірка** | Vite 7 |
| **Мова** | TypeScript |
| **Стилі** | Vanilla CSS |
| **Анімації** | GSAP + ScrollTrigger |
| **Скрол** | Lenis (плавний скрол) |
| **Хостинг** | GitHub Pages |
| **CI/CD** | GitHub Actions |

## Запуск

```bash
npm install
npm run dev      # dev-сервер
npm run build    # збірка
npm run preview  # перегляд збірки
```

## Структура

- `index.html`, `business.html`, `investors.html`, `partnerships.html` — сторінки
- `src/main.ts` — точка входу, анімації, логіка
- `src/style.css` — глобальні стилі
