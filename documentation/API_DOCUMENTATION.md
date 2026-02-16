# API Документация

## Swagger/OpenAPI Документация

BlogPro API полностью документирован с использованием спецификации OpenAPI 3.0 со Swagger UI.

### Доступ к документации

- **Swagger UI**: http://localhost:5000/api-docs
- **JSON Schema**: http://localhost:5000/api-docs.json

### Доступные эндпоинты

#### Аутентификация
- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход пользователя
- `POST /api/auth/logout` - Выход пользователя
- `GET /api/auth/me` - Получить текущего пользователя
- `POST /api/auth/forgot-password` - Запрос сброса пароля
- `POST /api/auth/reset-password/:token` - Сброс пароля
- `GET /api/auth/verify/:token` - Верификация email

#### Блог посты
- `GET /api/blog` - Получить все блог посты (с пагинацией)
- `GET /api/blog/search` - Поиск блог постов
- `GET /api/blog/{id}` - Получить блог пост по ID
- `POST /api/blog` - Создать новый блог пост (требуется авторизация)
- `PUT /api/blog/{id}` - Обновить блог пост (требуется авторизация)
- `DELETE /api/blog/{id}` - Удалить блог пост (требуется авторизация)

#### Категории
- `GET /api/categories` - Получить все категории
- `GET /api/categories/tree` - Получить дерево категорий
- `POST /api/categories` - Создать категорию (требуется авторизация)
- `PUT /api/categories/{id}` - Обновить категорию (требуется авторизация)
- `DELETE /api/categories/{id}` - Удалить категорию (требуется авторизация)

#### Медиа
- `GET /api/media` - Получить медиа файлы с категоризацией
- `POST /api/media` - Загрузить медиа файл с автоматической категоризацией (требуется авторизация)
- `DELETE /api/media/{id}` - Удалить медиа файл (требуется авторизация)
- `DELETE /api/media/bulk` - Массовое удаление медиа файлов (требуется авторизация)

#### Редактор
- `POST /api/editor/upload-image` - Загрузить изображение для текстового редактора (требуется авторизация)

#### Пользователи (только для администраторов)
- `GET /api/users` - Получить всех пользователей
- `GET /api/users/{id}` - Получить пользователя по ID
- `PUT /api/users/{id}` - Обновить пользователя
- `DELETE /api/users/{id}` - Удалить пользователя

#### Контакты
- `POST /api/contact` - Отправить контактную форму
- `GET /api/contact` - Получить контактные сообщения (только для администраторов)

#### Аналитика (только для администраторов)
- `GET /api/analytics/overview` - Общий обзор аналитики
- `GET /api/analytics/page-views` - Просмотры страниц
- `GET /api/analytics/sessions` - Данные сессий
- `GET /api/analytics/realtime` - Данные в реальном времени

#### Настройки (только для администраторов)
- `GET /api/settings` - Получить настройки сайта
- `PUT /api/settings` - Обновить настройки сайта

#### Меню (только для администраторов)
- `GET /api/menu` - Получить структуру меню
- `PUT /api/menu` - Обновить структуру меню

#### Site Editor (только для администраторов)
- `GET /api/site-editor/config` - Получить конфигурацию редактора сайта
- `PUT /api/site-editor/config` - Обновить конфигурацию редактора сайта

## Footer Configuration API

### Обзор
Footer Configuration API предоставляет полный набор эндпоинтов для управления конфигурациями футера с поддержкой Redis кэширования, WebSocket синхронизации и контроля версий.

### Эндпоинты

#### Публичные эндпоинты
- `GET /api/footer/config` - Получить активную конфигурацию футера

#### Административные эндпоинты (требуется авторизация)
- `GET /api/footer/configs` - Получить все конфигурации футера
- `POST /api/footer/config` - Создать новую конфигурацию футера
- `PUT /api/footer/config/:id` - Обновить конфигурацию футера
- `DELETE /api/footer/config/:id` - Удалить конфигурацию футера
- `POST /api/footer/activate/:id` - Активировать конфигурацию футера
- `GET /api/footer/history/:id` - Получить историю изменений конфигурации
- `POST /api/footer/preview` - Предварительный просмотр конфигурации

### Структура данных FooterConfig

```typescript
interface FooterConfig {
  id?: number;
  version: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  
  layout: {
    type: 'grid' | 'flex' | 'columns';
    columns: number;
    gap: string;
    maxWidth: string;
  };
  
  blocks: FooterBlock[];
  
  styles: {
    theme: 'light' | 'dark' | 'custom';
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    borderColor: string;
    padding: string;
    margin: string;
  };
  
  responsive: {
    mobile: Partial<FooterConfig>;
    tablet: Partial<FooterConfig>;
  };
  
  visibility: {
    showOnScroll: boolean;
    hideOnPages: string[];
    showOnlyOnPages: string[];
  };
}
```

### Примеры запросов и ответов

#### Получить активную конфигурацию
```http
GET /api/footer/config
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "version": 1,
    "isActive": true,
    "layout": {
      "type": "grid",
      "columns": 3,
      "gap": "2rem",
      "maxWidth": "1200px"
    },
    "blocks": [
      {
        "id": "brand-block",
        "type": "brand",
        "position": { "x": 0, "y": 0 },
        "size": { "width": "100%", "height": "auto" },
        "content": {
          "title": "BlogPro",
          "description": "Профессиональная блог-платформа"
        },
        "styles": {
          "textAlign": "left",
          "color": "#333"
        }
      }
    ],
    "styles": {
      "theme": "light",
      "backgroundColor": "#ffffff",
      "textColor": "#333333",
      "linkColor": "#0066cc",
      "borderColor": "#e0e0e0",
      "padding": "2rem",
      "margin": "0"
    },
    "responsive": {
      "mobile": { "layout": { "columns": 1 } },
      "tablet": { "layout": { "columns": 2 } }
    },
    "visibility": {
      "showOnScroll": false,
      "hideOnPages": [],
      "showOnlyOnPages": []
    }
  }
}
```

#### Создать новую конфигурацию
```http
POST /api/footer/config
Authorization: Bearer {token}
Content-Type: application/json

{
  "version": 1,
  "isActive": false,
  "layout": {
    "type": "grid",
    "columns": 4,
    "gap": "1.5rem",
    "maxWidth": "1400px"
  },
  "blocks": [
    {
      "id": "brand-block-new",
      "type": "brand",
      "position": { "x": 0, "y": 0 },
      "size": { "width": "100%", "height": "auto" },
      "content": {
        "title": "New Brand",
        "description": "Updated description"
      },
      "styles": {
        "textAlign": "center",
        "color": "#fff"
      }
    }
  ],
  "styles": {
    "theme": "dark",
    "backgroundColor": "#1a1a1a",
    "textColor": "#ffffff",
    "linkColor": "#3b82f6",
    "borderColor": "#374151",
    "padding": "3rem",
    "margin": "0"
  },
  "responsive": {
    "mobile": { "layout": { "columns": 1 } },
    "tablet": { "layout": { "columns": 2 } }
  },
  "visibility": {
    "showOnScroll": true,
    "hideOnPages": ["/admin"],
    "showOnlyOnPages": []
  }
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "version": 1,
    "isActive": false,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z",
    "createdBy": "admin-user-id",
    // ... остальные поля конфигурации
  },
  "message": "Footer configuration created successfully"
}
```

#### Активировать конфигурацию
```http
POST /api/footer/activate/2
Authorization: Bearer {token}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "isActive": true,
    // ... обновленная конфигурация
  },
  "message": "Footer configuration activated successfully"
}
```

### Кэширование

Footer API использует Redis кэширование для оптимальной производительности:

- **Активная конфигурация**: Кэшируется на 5 минут (TTL: 300 секунд)
- **Все конфигурации**: Кэшируется на 5 минут
- **Автоматическая инвалидация**: При создании, обновлении или удалении конфигураций

### WebSocket события

Footer API интегрирован с WebSocket для обновлений в реальном времени:

- `footer_config_updated` - Конфигурация футера обновлена
- `footer_activated` - Новая конфигурация активирована
- `footer_preview_updated` - Предпросмотр обновлен

### Ошибки

#### Валидация данных (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "code": "invalid_type",
      "expected": "number",
      "received": "string",
      "path": ["layout", "columns"],
      "message": "Expected number, received string"
    }
  ]
}
```

#### Конфигурация не найдена (404)
```json
{
  "success": false,
  "message": "Footer configuration not found"
}
```

#### Нет прав доступа (403)
```json
{
  "success": false,
  "message": "Access denied. Admin role required."
}
```

### Аутентификация

API использует JWT токен-основанную аутентификацию. Включите токен в заголовок Authorization:

```javascript
fetch('/api/endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Форматы ответов

#### Успешный ответ
```json
{
  \"success\": true,
  \"data\": {
    // Данные ответа
  },
  \"message\": \"Операция выполнена успешно\"
}
```

#### Ответ с ошибкой
```json
{
  \"success\": false,
  \"error\": \"Тип ошибки\",
  \"message\": \"Человекочитаемое сообщение об ошибке\",
  \"statusCode\": 400,
  \"timestamp\": \"2024-01-01T00:00:00.000Z\"
}
```

### Пагинация

Эндпоинты с пагинацией принимают следующие параметры:

- `page` - Номер страницы (по умолчанию: 1)
- `limit` - Количество элементов на странице (по умолчанию: 10, максимум: 100)
- `sort` - Поле для сортировки (по умолчанию: 'createdAt')
- `order` - Порядок сортировки ('asc' или 'desc', по умолчанию: 'desc')

Пример:
```
GET /api/blog?page=2&limit=20&sort=title&order=asc
```

### Поиск

Поисковые эндпоинты поддерживают следующие параметры:

- `q` - Поисковый запрос
- `category` - Фильтр по категории
- `tags` - Фильтр по тегам
- `status` - Фильтр по статусу (draft, published)

Пример:
```
GET /api/blog/search?q=react&category=web-development&status=published
```

### Ограничение скорости

- Общие эндпоинты: 1000 запросов за 15 минут
- Эндпоинты аутентификации: 20 запросов за 15 минут
- Администраторы: Без ограничений

### Коды состояния HTTP

- `200` - Успешный запрос
- `201` - Ресурс создан
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Доступ запрещен
- `404` - Ресурс не найден
- `409` - Конфликт (например, дублирующийся email)
- `422` - Ошибка валидации
- `429` - Слишком много запросов
- `500` - Внутренняя ошибка сервера

### Валидация данных

Все входящие данные валидируются с использованием Zod схем. Ошибки валидации возвращаются в следующем формате:

```json
{
  \"success\": false,
  \"error\": \"Validation Error\",
  \"message\": \"Ошибка валидации данных\",
  \"details\": [
    {
      \"field\": \"email\",
      \"message\": \"Неверный формат email\"
    }
  ]
}
```

### WebSocket события

API также поддерживает WebSocket соединения для обновлений в реальном времени:

- **Подключение**: `ws://localhost:5000/ws`
- **События**:
  - `blog_post_created` - Новый блог пост создан
  - `blog_post_updated` - Блог пост обновлен
  - `blog_post_deleted` - Блог пост удален
  - `user_registered` - Новый пользователь зарегистрирован
  - `documentation_created` - Новый документ создан
  - `documentation_updated` - Документ обновлен
  - `documentation_deleted` - Документ удален
  - `footer_updated` - Конфигурация футера обновлена
  - `footer_activated` - Новая конфигурация футера активирована
  - `cache_invalidated` - Кэш инвалидирован

### Разработка

Для добавления документации нового эндпоинта:

1. Добавьте JSDoc комментарии с `@swagger` тегами над обработчиками маршрутов
2. Ссылайтесь на существующие схемы в `server/config/swagger.ts`
3. Документация автоматически обновится при перезапуске сервера

### Примеры использования

#### Регистрация пользователя
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'user123',
    email: 'user@example.com',
    password: 'securePassword123',
    firstName: 'Иван',
    lastName: 'Иванов'
  })
});
```

#### Создание блог поста
```javascript
const response = await fetch('/api/blog', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Мой новый пост',
    description: 'Краткое описание поста',
    content: 'Полное содержимое поста...',
    categoryId: 1,
    tags: ['react', 'javascript'],
    status: 'published'
  })
});
```

#### Создание конфигурации футера
```javascript
const response = await fetch('/api/footer/config', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    layout: {
      type: 'grid',
      columns: 3,
      gap: '2rem',
      maxWidth: '1200px'
    },
    blocks: [
      {
        id: 'brand-block',
        type: 'brand',
        position: { x: 0, y: 0 },
        content: {
          logo: '/uploads/logo.png',
          title: 'BlogPro',
          description: 'Профессиональная блог-платформа'
        }
      }
    ],
    styles: {
      theme: 'dark',
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      linkColor: '#3b82f6'
    }
  })
});
```