## Регистрация приложения ВКонтакте
Создайте приложение на этой странице [Страница для разработчиков VK](https://vk.com/apps?act=manage "Страница для разработчиков VK")
[![1](https://github.com/AlekseyPanaskin/PolyApp/blob/master/docs/guide_1.png?raw=true "1")](https://github.com/AlekseyPanaskin/PolyApp/blob/master/docs/guide_1.png?raw=true "1")
[![2](https://github.com/AlekseyPanaskin/PolyApp/blob/master/docs/guide_2.png?raw=true "2")](https://github.com/AlekseyPanaskin/PolyApp/blob/master/docs/guide_2.png?raw=true "2")
[![3](https://github.com/AlekseyPanaskin/PolyApp/blob/master/docs/guide_3.png?raw=true "3")](https://github.com/AlekseyPanaskin/PolyApp/blob/master/docs/guide_3.png?raw=true "3")
Скачайте [репозиторий](https://github.com/UnknownRakon/PolyDev "репозиторий") или создайте своё приложение на основе [быстрого шаблона](https://vk.com/dev/vk_apps_docs "быстрого шаблона").
## Локальная развёртка приложения
Скачанный репозиторий необходимо открыть в командной строке. *Заранее установите [node-js](https://nodejs.org/en/ "node-js")*.
В командной строке необходимо прописать команду
`npm i`
После установки всех пакетов, необходимо создать собственный репозиторий на [GitHub](https://github.com/ "GitHub").
Подключите удалённый репозиторий к своему проекту и создайте ветку gh-pages.
[![4](https://github.com/AlekseyPanaskin/PolyApp/blob/master/docs/guide_4.png?raw=true "4")](https://github.com/AlekseyPanaskin/PolyApp/blob/master/docs/guide_4.png?raw=true "4")
В корневой папке проетка найдите файл package.json.  Измените строку`  "homepage": "https://ВАШ_НИК.github.io/НАЗВАНИЕ_РЕПОЗИТОРИЯ/"`
В командной строке пропишите команду
`npm run deploy`
