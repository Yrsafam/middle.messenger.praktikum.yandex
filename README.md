# Учебный проект - Мессенджер

Данный проект представляет собой реализацию мессенджера в рамках учебного курса `Яндекс.Практикум`.

## Макет

- [Figma](https://www.figma.com/file/sdkELKYUF7kgChZHkQcrBd/Chat-%7C-Practicum?type=design&node-id=1%3A460&mode=dev)

## Разработка

```shell
git clone https://github.com/Yrsafam/middle.messenger.praktikum.yandex.git
```

```shell
cd middle.messenger.praktikum.yandex
```

```shell
npm install
```

Запуска проект в режиме разработки:

```shell
npm run dev
```

Сборка проекта:

```shell
npm run build
```

Запуска проекта в режиме production:

```shell
npm run start
```

Запуск `express` сервера для раздачи статики:

```shell
npm run server
```

Запуск `eslint` для проверки кода проекта:

```shell
npm run lint
```

Запуск `stylelint` для проверки стилей проекта:

```shell
npm run lint:styles
```

## Страницы

- [Список чатов](http://localhost:3000/messenger)
- [Авторизация](http://localhost:3000/)
- [Регистрация](http://localhost:3000/sign-up)
- [Профиль](http://localhost:3000/settings)
- [Редактирование профиля](http://localhost:3000/profile-edit)
- [Изменение пароля](http://localhost:3000/change-password)
- [404](http://localhost:3000/404)
- [500](http://localhost:3000/500)

## Netlify

- [Ссылка](https://bejewelled-mermaid-8640f0.netlify.app/)

## Фичи версии 0.2.0

- Валидация форм
- Типизация
- Компонентный подход
- HTTP клиент
- Линтинг
- Подключен REST API
- Авторизация, регистрация, изменение профиля, чаты
- Подключен Websocket
