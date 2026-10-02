/* ВОРОТА FIX — каталог. Данные вынесены отдельно, чтобы позже
   заменить статику на API (WordPress REST, 1С, самописный бэкенд). */

window.VF = window.VF || {};

VF.company = {
  name: "ВОРОТА FIX",
  tagline: "автоматика",
  phone: "+7 910 425-55-55",
  phoneRaw: "+79104255555",
  email: "s89104255555@gmail.com",
  region: "Москва и Московская область",
  hours: "Ежедневно с 08:00 до 21:00",
  legal: "Индивидуальный предприниматель Смирнов Василий Михайлович",
  inn: "500408215983",
  ogrn: "324645700088375"
};

VF.categories = [
  { slug: "avtomatika", title: "Автоматика для ворот", short: "Автоматика", desc: "Приводы и готовые комплекты", accent: "indigo" },
  { slug: "shlagbaumy", title: "Шлагбаумы", short: "Шлагбаумы", desc: "Комплекты, стрелы и аксессуары", accent: "orange" },
  { slug: "vorota", title: "Ворота", short: "Ворота", desc: "Откатные, распашные и секционные", accent: "periwinkle" },
  { slug: "komplektuyushchie", title: "Комплектующие", short: "Детали", desc: "Ролики, рейки, ловители и фурнитура", accent: "orange" },
  { slug: "videonablyudenie", title: "Видеонаблюдение", short: "Камеры", desc: "Камеры, регистраторы и комплекты", accent: "orange" },
  { slug: "domofony", title: "Домофоны", short: "Домофоны", desc: "Мониторы и вызывные панели", accent: "periwinkle" },
  { slug: "skud", title: "Контроль доступа", short: "СКУД", desc: "Замки, контроллеры и считыватели", accent: "periwinkle" },
  { slug: "upravlenie", title: "Управление и безопасность", short: "GSM", desc: "GSM, пульты, фотоэлементы и лампы", accent: "orange" }
];

/* badge: hit | popular | kit | null
   stock: in | order */
VF.products = [
  /* --- Автоматика --- */
  {
    id: "came-bx-608", category: "avtomatika", brand: "CAME",
    name: "Комплект автоматики CAME BX 608", short: "CAME BX 608",
    desc: "Для откатных ворот весом до 800 кг",
    price: 38900, oldPrice: 45200, badge: "hit", stock: "in",
    specs: [["Питание", "230 В"], ["Интенсивность", "30%"], ["Макс. вес створки", "800 кг"]]
  },
  {
    id: "nice-road-400", category: "avtomatika", brand: "NICE",
    name: "Комплект автоматики Nice ROAD 400", short: "Nice ROAD 400",
    desc: "Для откатных ворот весом до 400 кг",
    price: 29500, badge: "popular", stock: "in",
    specs: [["Питание", "230 В"], ["Интенсивность", "20%"], ["Макс. вес створки", "400 кг"]]
  },
  {
    id: "doorhan-sliding-800", category: "avtomatika", brand: "DOORHAN",
    name: "Комплект DoorHan Sliding-800", short: "DoorHan Sliding-800",
    desc: "Для откатных ворот весом до 800 кг",
    price: 32800, stock: "order",
    specs: [["Питание", "220 В"], ["Скорость", "10 м/мин"], ["Макс. вес створки", "800 кг"]]
  },
  {
    id: "faac-414-kit", category: "avtomatika", brand: "FAAC",
    name: "Комплект FAAC 414 KIT", short: "FAAC 414 KIT",
    desc: "Для автоматизации распашных ворот",
    price: 54900, badge: "kit", stock: "in",
    specs: [["Створка", "до 4 м"], ["Питание", "230 В"], ["Тип", "Распашные"]]
  },
  {
    id: "nice-wingo-4024", category: "avtomatika", brand: "NICE",
    name: "Комплект Nice WINGO 4024", short: "Nice WINGO 4024",
    desc: "Линейный привод для распашных ворот до 400 кг",
    price: 41500, stock: "in",
    specs: [["Створка", "до 2,5 м"], ["Питание", "24 В"], ["Тип", "Распашные"]]
  },
  {
    id: "alutech-lg-1000", category: "avtomatika", brand: "ALUTECH",
    name: "Привод Alutech Levigato LG-1000", short: "Alutech LG-1000",
    desc: "Интенсивный привод для откатных ворот до 1000 кг",
    price: 46900, stock: "in",
    specs: [["Питание", "230 В"], ["Интенсивность", "60%"], ["Макс. вес створки", "1000 кг"]]
  },
  {
    id: "came-bx-704", category: "avtomatika", brand: "CAME",
    name: "Комплект CAME BX 704", short: "CAME BX 704",
    desc: "Для откатных ворот весом до 700 кг",
    price: 52900, stock: "in",
    specs: [["Питание", "230 В"], ["Интенсивность", "40%"], ["Макс. вес створки", "700 кг"]]
  },
  {
    id: "doorhan-sectional-2000", category: "avtomatika", brand: "DOORHAN",
    name: "Привод DoorHan Sectional-2000", short: "Sectional-2000",
    desc: "Потолочный привод для секционных ворот",
    price: 24900, stock: "in",
    specs: [["Тип", "Секционные"], ["Питание", "220 В"], ["Усилие", "2000 Н"]]
  },

  /* --- Шлагбаумы --- */
  {
    id: "came-g4000", category: "shlagbaumy", brand: "CAME",
    name: "Шлагбаум CAME G4000 под ключ", short: "CAME G4000",
    desc: "Для проездов шириной до 4 метров",
    price: 95000, badge: "popular", stock: "in",
    specs: [["Стрела", "до 4 м"], ["Питание", "230 В"], ["Интенсивность", "100%"]]
  },
  {
    id: "nice-wil4", category: "shlagbaumy", brand: "NICE",
    name: "Шлагбаум Nice WIL4", short: "Nice WIL4",
    desc: "Для СНТ, ЖК и парковок",
    price: 119000, stock: "in",
    specs: [["Стрела", "до 6 м"], ["Питание", "230 В"], ["Интенсивность", "80%"]]
  },
  {
    id: "doorhan-barrier-l", category: "shlagbaumy", brand: "DOORHAN",
    name: "Шлагбаум DoorHan Barrier L", short: "Barrier L",
    desc: "Быстрый шлагбаум для интенсивного проезда",
    price: 87000, stock: "order",
    specs: [["Стрела", "до 4,5 м"], ["Скорость", "2,5 с"], ["Питание", "220 В"]]
  },
  {
    id: "shlagbaum-strela", category: "shlagbaumy", brand: "УНИВЕРСАЛ",
    name: "Стрела для шлагбаума 4 м с подсветкой", short: "Стрела 4 м",
    desc: "Алюминиевая стрела со светоотражателями",
    price: 7900, stock: "in",
    specs: [["Длина", "4 м"], ["Материал", "Алюминий"], ["Подсветка", "Есть"]]
  },

  /* --- Ворота --- */
  {
    id: "vorota-otkatnye-4000", category: "vorota", brand: "ВОРОТА FIX",
    name: "Откатные ворота 4 м под ключ", short: "Откатные 4 м",
    desc: "С монтажом, автоматикой и пультами",
    price: 149000, badge: "popular", stock: "order",
    specs: [["Проём", "4 м"], ["Автоматика", "В комплекте"], ["Монтаж", "Включён"]]
  },
  {
    id: "vorota-raspashnye-3500", category: "vorota", brand: "ВОРОТА FIX",
    name: "Распашные ворота 3,5 м", short: "Распашные 3,5 м",
    desc: "Профнастил, с приводом и калиткой",
    price: 132000, stock: "order",
    specs: [["Проём", "3,5 м"], ["Покрытие", "Профнастил"], ["Калитка", "Есть"]]
  },
  {
    id: "vorota-sektsionnye-2500", category: "vorota", brand: "ВОРОТА FIX",
    name: "Секционные ворота 2,5×2,2 м", short: "Секционные 2500",
    desc: "Для гаража с потолочным приводом",
    price: 118000, stock: "order",
    specs: [["Размер", "2,5×2,2 м"], ["Привод", "Потолочный"], ["Утепление", "40 мм"]]
  },

  /* --- Комплектующие --- */
  {
    id: "rejka-zu", category: "komplektuyushchie", brand: "УНИВЕРСАЛ",
    name: "Зубчатая рейка М4 (1 м)", short: "Рейка М4",
    desc: "Стальная рейка для откатных ворот",
    price: 3500, stock: "in",
    specs: [["Модуль", "М4"], ["Длина", "1 м"], ["Материал", "Сталь"]]
  },
  {
    id: "fotoelementy", category: "komplektuyushchie", brand: "NICE",
    name: "Фотоэлементы NICE EPMB", short: "Фотоэлементы",
    desc: "Защита от закрытия при препятствии",
    price: 4500, stock: "in",
    specs: [["Дальность", "до 20 м"], ["Питание", "24 В"], ["Защита", "IP44"]]
  },
  {
    id: "roliki-n", category: "komplektuyushchie", brand: "УНИВЕРСАЛ",
    name: "Комплект роликов и ловителей", short: "Ролики",
    desc: "Фурнитура для откатных ворот",
    price: 8900, stock: "in",
    specs: [["Комплект", "6 шт."], ["Нагрузка", "до 800 кг"], ["Материал", "Сталь"]]
  },

  /* --- Видеонаблюдение --- */
  {
    id: "hiwatch-4mp", category: "videonablyudenie", brand: "HIWATCH",
    name: "Уличная IP-камера HiWatch 4 Мп", short: "IP-camera 4 MP",
    desc: "Для улицы, парковки и территории дома",
    price: 8900, badge: "hit", stock: "in",
    specs: [["Разрешение", "4 Мп"], ["Защита", "IP67"], ["ИК-подсветка", "до 30 м"]]
  },
  {
    id: "dahua-4mp-dome", category: "videonablyudenie", brand: "DAHUA",
    name: "Купольная IP-камера Dahua 4 Мп", short: "Dahua 4 MP",
    desc: "Для помещений и защищённых зон",
    price: 9600, badge: "popular", stock: "in",
    specs: [["Подключение", "PoE"], ["Ночная съёмка", "до 30 м"], ["Разрешение", "4 Мп"]]
  },
  {
    id: "kit-4-camera", category: "videonablyudenie", brand: "КОМПЛЕКТ",
    name: "Комплект видеонаблюдения на 4 камеры", short: "4-camera kit",
    desc: "Готовое решение для дома или небольшого объекта",
    price: 32900, oldPrice: 36500, badge: "kit", stock: "in",
    specs: [["Камеры", "4 шт."], ["Регистратор", "В комплекте"], ["Питание", "PoE"]]
  },
  {
    id: "dahua-nvr-8", category: "videonablyudenie", brand: "DAHUA",
    name: "Видеорегистратор Dahua на 8 каналов", short: "Recorder 8 CH",
    desc: "Запись архива и удалённый просмотр",
    price: 15600, stock: "order",
    specs: [["Каналы", "8"], ["Жёсткий диск", "до 10 ТБ"], ["Питание", "220 В"]]
  },

  /* --- Домофоны --- */
  {
    id: "tantos-amelie", category: "domofony", brand: "TANTOS",
    name: "Видеодомофон Tantos Amelie", short: "Video intercom",
    desc: "Цветной монитор с управлением замком",
    price: 12900, badge: "hit", stock: "in",
    specs: [["Экран", "7 дюймов"], ["Панель", "до 2 шт."], ["Память", "Есть"]]
  },
  {
    id: "novicam-legenda", category: "domofony", brand: "NOVICAM",
    name: "Вызывная панель Novicam Legenda", short: "Call panel",
    desc: "Камера, подсветка и управление замком",
    price: 6500, badge: "popular", stock: "in",
    specs: [["Камера", "2 Мп"], ["Защита", "IP66"], ["Подсветка", "ИК"]]
  },
  {
    id: "domofon-audio", category: "domofony", brand: "TANTOS",
    name: "Аудиодомофон Tantos с трубкой", short: "Audio intercom",
    desc: "Бюджетное решение для квартиры или дома",
    price: 4900, stock: "in",
    specs: [["Тип", "Аудио"], ["Трубка", "Есть"], ["Замок", "Управление"]]
  },

  /* --- СКУД --- */
  {
    id: "em-marine-reader", category: "skud", brand: "СКУД",
    name: "Считыватель карт и брелоков EM-Marine", short: "Card reader",
    desc: "Для калитки, двери или въездной группы",
    price: 4900, stock: "in",
    specs: [["Стандарт", "EM-Marine"], ["Установка", "Наружная"], ["Защита", "IP65"]]
  },
  {
    id: "magnetic-lock-300", category: "skud", brand: "СКУД",
    name: "Электромагнитный замок 300 кг", short: "Magnetic lock",
    desc: "Для дверей и систем контроля доступа",
    price: 5700, badge: "kit", stock: "order",
    specs: [["Удержание", "300 кг"], ["Питание", "12 В"], ["Установка", "Накладная"]]
  },
  {
    id: "controller-c2000", category: "skud", brand: "СКУД",
    name: "Контроллер доступа C2000-2", short: "Controller C2000",
    desc: "Управление турникетом, замком и калиткой",
    price: 11900, stock: "in",
    specs: [["Пользователи", "до 1000"], ["Интерфейс", "RS-485"], ["Питание", "12 В"]]
  },

  /* --- Управление и безопасность --- */
  {
    id: "gsm-module", category: "upravlenie", brand: "УНИВЕРСАЛ",
    name: "GSM-модуль для ворот", short: "GSM-модуль",
    desc: "Открытие со смартфона или по звонку",
    price: 7900, badge: "popular", stock: "in",
    specs: [["SIM", "1 слот"], ["Пользователи", "до 100"], ["Питание", "12–24 В"]]
  },
  {
    id: "pult-2ch", category: "upravlenie", brand: "УНИВЕРСАЛ",
    name: "Пульт дистанционного управления 2 кнопки", short: "Пульты",
    desc: "Оригинальные и совместимые модели",
    price: 1500, stock: "in",
    specs: [["Кнопки", "2"], ["Частота", "433 МГц"], ["Дальность", "до 50 м"]]
  },
  {
    id: "radiopriemnik", category: "upravlenie", brand: "УНИВЕРСАЛ",
    name: "Внешний радиоприёмник", short: "Радиоприёмники",
    desc: "Подключение пультов разных систем",
    price: 3900, stock: "in",
    specs: [["Память", "до 100 пультов"], ["Частота", "433/868 МГц"], ["Выход", "Релейный"]]
  },
  {
    id: "signal-lamp", category: "upravlenie", brand: "УНИВЕРСАЛ",
    name: "Сигнальная лампа для ворот", short: "Сигнальные лампы",
    desc: "Предупреждение о движении ворот",
    price: 2900, stock: "in",
    specs: [["Питание", "230 В"], ["Защита", "IP44"], ["Цвет", "Красный"]]
  },

  /* --- Дополнительная автоматика --- */
  {
    id: "came-bx-708", category: "avtomatika", brand: "CAME",
    name: "Комплект автоматики CAME BX 708", short: "CAME BX 708",
    desc: "Для откатных ворот весом до 700 кг",
    price: 48900, badge: "popular", stock: "in",
    specs: [["Питание", "230 В"], ["Интенсивность", "40%"], ["Макс. вес створки", "700 кг"]]
  },
  {
    id: "nice-robus-600", category: "avtomatika", brand: "NICE",
    name: "Привод Nice ROBUS 600", short: "Nice ROBUS 600",
    desc: "Интенсивный привод для откатных ворот до 600 кг",
    price: 44900, stock: "in",
    specs: [["Питание", "230 В"], ["Интенсивность", "50%"], ["Макс. вес створки", "600 кг"]]
  },
  {
    id: "doorhan-slide-1300", category: "avtomatika", brand: "DOORHAN",
    name: "Комплект DoorHan Slide-1300", short: "DoorHan Slide-1300",
    desc: "Для откатных ворот весом до 1300 кг",
    price: 57900, stock: "order",
    specs: [["Питание", "220 В"], ["Скорость", "12 м/мин"], ["Макс. вес створки", "1300 кг"]]
  },
  {
    id: "faac-740", category: "avtomatika", brand: "FAAC",
    name: "Комплект FAAC 740", short: "FAAC 740",
    desc: "Для промышленных откатных ворот",
    price: 68900, badge: "kit", stock: "in",
    specs: [["Питание", "230 В"], ["Интенсивность", "70%"], ["Макс. вес створки", "900 кг"]]
  },
  {
    id: "alutech-lg-2100", category: "avtomatika", brand: "ALUTECH",
    name: "Привод Alutech Levigato LG-2100", short: "Alutech LG-2100",
    desc: "Для тяжёлых откатных ворот до 2100 кг",
    price: 79900, stock: "in",
    specs: [["Питание", "230 В"], ["Интенсивность", "80%"], ["Макс. вес створки", "2100 кг"]]
  },
  {
    id: "nice-wingo-5024", category: "avtomatika", brand: "NICE",
    name: "Комплект Nice WINGO 5024", short: "Nice WINGO 5024",
    desc: "Для распашных ворот до 500 кг",
    price: 49500, stock: "in",
    specs: [["Створка", "до 3 м"], ["Питание", "24 В"], ["Тип", "Распашные"]]
  },

  /* --- Дополнительное видеонаблюдение --- */
  {
    id: "hikvision-4mp", category: "videonablyudenie", brand: "HIKVISION",
    name: "Уличная IP-камера Hikvision 4 Мп", short: "Hikvision 4 MP",
    desc: "Цилиндрическая камера с ИК-подсветкой",
    price: 11900, stock: "in",
    specs: [["Разрешение", "4 Мп"], ["Защита", "IP67"], ["ИК-подсветка", "до 40 м"]]
  },
  {
    id: "dahua-ptz-4mp", category: "videonablyudenie", brand: "DAHUA",
    name: "Поворотная PTZ-камера Dahua 4 Мп", short: "Dahua PTZ 4 MP",
    desc: "Обзор 360° для больших территорий",
    price: 27900, badge: "popular", stock: "order",
    specs: [["Разрешение", "4 Мп"], ["Поворот", "360°"], ["Zoom", "25x"]]
  },
  {
    id: "kit-8-camera", category: "videonablyudenie", brand: "КОМПЛЕКТ",
    name: "Комплект видеонаблюдения на 8 камер", short: "8-camera kit",
    desc: "Для дома, офиса и коммерческого объекта",
    price: 58900, oldPrice: 64900, badge: "kit", stock: "in",
    specs: [["Камеры", "8 шт."], ["Регистратор", "8 каналов"], ["Питание", "PoE"]]
  },
  {
    id: "hiwatch-nvr-4", category: "videonablyudenie", brand: "HIWATCH",
    name: "Видеорегистратор HiWatch на 4 канала", short: "HiWatch NVR 4",
    desc: "Компактный регистратор для дома",
    price: 8900, stock: "in",
    specs: [["Каналы", "4"], ["Жёсткий диск", "до 4 ТБ"], ["Питание", "220 В"]]
  },

  /* --- Дополнительные домофоны --- */
  {
    id: "tantos-vizit", category: "domofony", brand: "TANTOS",
    name: "Видеодомофон Tantos Vizit", short: "Tantos Vizit",
    desc: "Монитор 7 дюймов с записью",
    price: 14900, badge: "popular", stock: "in",
    specs: [["Экран", "7 дюймов"], ["Панель", "до 4 шт."], ["Память", "SD-карта"]]
  },
  {
    id: "commax-cdp-1020", category: "domofony", brand: "COMMAX",
    name: "Видеодомофон Commax CDP-1020", short: "Commax CDP",
    desc: "Для квартиры и частного дома",
    price: 9900, stock: "order",
    specs: [["Экран", "7 дюймов"], ["Тип", "Видео"], ["Замок", "Управление"]]
  },
  {
    id: "novicam-panel-2mp", category: "domofony", brand: "NOVICAM",
    name: "Вызывная панель Novicam 2 Мп", short: "Novicam panel",
    desc: "Металлическая панель с ИК-подсветкой",
    price: 8900, stock: "in",
    specs: [["Камера", "2 Мп"], ["Защита", "IP66"], ["Материал", "Металл"]]
  },

  /* --- Дополнительный контроль доступа --- */
  {
    id: "controller-c2000-2", category: "skud", brand: "СКУД",
    name: "Контроллер доступа C2000-2", short: "Controller C2000-2",
    desc: "Управление замком, турникетом и калиткой",
    price: 12900, stock: "in",
    specs: [["Пользователи", "до 2000"], ["Интерфейс", "RS-485"], ["Питание", "12 В"]]
  },
  {
    id: "magnetic-lock-500", category: "skud", brand: "СКУД",
    name: "Электромагнитный замок 500 кг", short: "Magnetic lock 500",
    desc: "Усиленный замок для входной группы",
    price: 8900, badge: "kit", stock: "in",
    specs: [["Удержание", "500 кг"], ["Питание", "12 В"], ["Установка", "Накладная"]]
  },
  {
    id: "turnstile-tripod", category: "skud", brand: "СКУД",
    name: "Турникет-трипод для проходной", short: "Турникет",
    desc: "Контроль прохода на объекте",
    price: 54900, stock: "order",
    specs: [["Тип", "Трипод"], ["Питание", "12 В"], ["Пропускная", "30 чел/мин"]]
  },

  /* --- Дополнительные шлагбаумы --- */
  {
    id: "came-g4040", category: "shlagbaumy", brand: "CAME",
    name: "Шлагбаум CAME G4040", short: "CAME G4040",
    desc: "Интенсивный шлагбаум для проезда до 4 м",
    price: 105000, stock: "in",
    specs: [["Стрела", "до 4 м"], ["Скорость", "2,5 с"], ["Питание", "230 В"]]
  },
  {
    id: "nice-sigma", category: "shlagbaumy", brand: "NICE",
    name: "Шлагбаум Nice SIGMA", short: "Nice SIGMA",
    desc: "Для въезда в ЖК и на парковку",
    price: 135000, badge: "popular", stock: "order",
    specs: [["Стрела", "до 6 м"], ["Питание", "230 В"], ["Интенсивность", "90%"]]
  },
  {
    id: "shlagbaum-stoyka", category: "shlagbaumy", brand: "УНИВЕРСАЛ",
    name: "Стойка опорная для стрелы шлагбаума", short: "Стойка",
    desc: "Опора для длинной стрелы",
    price: 5900, stock: "in",
    specs: [["Высота", "0,9 м"], ["Материал", "Сталь"], ["Монтаж", "Анкерный"]]
  },

  /* --- Дополнительные ворота --- */
  {
    id: "vorota-otkatnye-5000", category: "vorota", brand: "ВОРОТА FIX",
    name: "Откатные ворота 5 м под ключ", short: "Откатные 5 м",
    desc: "С автоматикой, пультами и монтажом",
    price: 179000, badge: "popular", stock: "order",
    specs: [["Проём", "5 м"], ["Автоматика", "В комплекте"], ["Монтаж", "Включён"]]
  },
  {
    id: "vorota-raspashnye-4000", category: "vorota", brand: "ВОРОТА FIX",
    name: "Распашные ворота 4 м", short: "Распашные 4 м",
    desc: "Профнастил, привод и калитка",
    price: 154000, stock: "order",
    specs: [["Проём", "4 м"], ["Привод", "В комплекте"], ["Калитка", "Есть"]]
  },
  {
    id: "vorota-sektsionnye-3000", category: "vorota", brand: "ВОРОТА FIX",
    name: "Секционные ворота 3×2,5 м", short: "Секционные 3000",
    desc: "Утеплённые, с потолочным приводом",
    price: 138000, stock: "order",
    specs: [["Размер", "3×2,5 м"], ["Привод", "Потолочный"], ["Утепление", "45 мм"]]
  },

  /* --- Дополнительные комплектующие --- */
  {
    id: "rejka-m6", category: "komplektuyushchie", brand: "УНИВЕРСАЛ",
    name: "Зубчатая рейка М6 (1 м)", short: "Рейка М6",
    desc: "Для тяжёлых откатных ворот",
    price: 4900, stock: "in",
    specs: [["Модуль", "М6"], ["Длина", "1 м"], ["Материал", "Сталь"]]
  },
  {
    id: "fotoelementy-came-dir", category: "komplektuyushchie", brand: "CAME",
    name: "Фотоэлементы CAME DIR", short: "Фотоэлементы CAME",
    desc: "Защита от закрытия при препятствии",
    price: 5900, stock: "in",
    specs: [["Дальность", "до 15 м"], ["Питание", "24 В"], ["Защита", "IP44"]]
  },
  {
    id: "lovitel-koncevoj", category: "komplektuyushchie", brand: "УНИВЕРСАЛ",
    name: "Ловитель концевой для ворот", short: "Ловитель",
    desc: "Фиксация створки в закрытом положении",
    price: 4200, stock: "in",
    specs: [["Тип", "Концевой"], ["Нагрузка", "до 800 кг"], ["Материал", "Сталь"]]
  },

  /* --- Дополнительное управление --- */
  {
    id: "pult-4ch", category: "upravlenie", brand: "УНИВЕРСАЛ",
    name: "Пульт дистанционного управления 4 кнопки", short: "Пульт 4 кнопки",
    desc: "Управление воротами и калиткой",
    price: 2200, stock: "in",
    specs: [["Кнопки", "4"], ["Частота", "433 МГц"], ["Дальность", "до 60 м"]]
  },
  {
    id: "gsm-nice-it4wifi", category: "upravlenie", brand: "NICE",
    name: "Модуль управления Nice IT4WIFI", short: "GSM Nice IT4WIFI",
    desc: "Управление воротами со смартфона",
    price: 12900, badge: "popular", stock: "in",
    specs: [["Связь", "Wi-Fi"], ["Пользователи", "до 50"], ["Питание", "24 В"]]
  },
  {
    id: "signal-lamp-led", category: "upravlenie", brand: "УНИВЕРСАЛ",
    name: "Сигнальная LED-лампа для ворот", short: "LED-лампа",
    desc: "Яркое предупреждение о движении",
    price: 3400, stock: "in",
    specs: [["Питание", "230 В"], ["Защита", "IP44"], ["Тип", "LED"]]
  }
];

VF.brands = [
  { name: "Nice", desc: "Автоматика для ворот, шлагбаумы и управление" },
  { name: "CAME", desc: "Приводы, шлагбаумы и системы контроля доступа" },
  { name: "DoorHan", desc: "Ворота, автоматика, роллеты и комплектующие" },
  { name: "Alutech", desc: "Воротные системы, приводы и роллетное оборудование" },
  { name: "FAAC", desc: "Автоматика для частных и промышленных объектов" }
];

VF.works = [
  {
    title: "Автоматизировали откатные ворота",
    place: "Частный дом • Московская область",
    task: "Открытие тяжёлых ворот без выхода из автомобиля",
    equipment: "CAME BX-608, рейка и фотоэлементы",
    works: "Монтаж привода, настройка пультов и безопасности",
    result: "Плавное открытие за 18 секунд"
  },
  {
    title: "Организовали въезд в СНТ",
    place: "СНТ • Чеховский район",
    task: "Ограничить въезд и сохранить удобный доступ жителей",
    equipment: "Шлагбаум CAME, GSM-модуль и фотоэлементы",
    works: "Основание, монтаж, подключение и добавление номеров",
    result: "Управление въездом со смартфона"
  },
  {
    title: "Установили видеонаблюдение",
    place: "Коммерческий объект • Москва",
    task: "Контролировать въезд, парковку и входную группу",
    equipment: "6 IP-камер Dahua и регистратор с архивом",
    works: "Кабельные трассы, монтаж камер и удалённый доступ",
    result: "Просмотр и уведомления в телефоне"
  }
];

VF.gateTypes = [
  {
    id: "sliding", title: "Для откатных ворот", tag: "Для створок до 2 000 кг", num: "01",
    desc: "Приводы, зубчатые рейки, фотоэлементы и готовые комплекты для частных и промышленных объектов.",
    points: ["Комплекты 220 В и 24 В", "Для бытового и интенсивного режима"],
    category: "avtomatika"
  },
  {
    id: "swing", title: "Для распашных ворот", tag: "Линейные и рычажные", num: "02",
    desc: "Комплекты приводов для одной или двух створок с блоком управления, пультами и устройствами безопасности.",
    points: ["Для открывания внутрь и наружу", "Подбор по длине и массе створки"],
    category: "avtomatika"
  },
  {
    id: "sectional", title: "Для секционных ворот", tag: "Гаражные и промышленные", num: "03",
    desc: "Потолочные и вальные приводы, направляющие, пульты и комплекты управления для ворот разного размера.",
    points: ["Потолочные и осевые приводы", "Настройка концевых положений"],
    category: "avtomatika"
  }
];

VF.mount = [
  { num: "01", title: "Откатные ворота", desc: "Монтаж автоматики", price: "от 12 000 ₽" },
  { num: "02", title: "Распашные ворота", desc: "Монтаж автоматики", price: "от 15 000 ₽" },
  { num: "03", title: "Секционные ворота", desc: "Монтаж автоматики", price: "от 18 000 ₽" }
];

VF.advantages = [
  { num: "01", title: "Подберём совместимое оборудование", desc: "Учитываем тип и вес ворот, интенсивность работы, электропитание и уже установленную автоматику." },
  { num: "02", title: "Оригинальная продукция", desc: "Поставляем оборудование известных производителей с документами и официальной гарантией." },
  { num: "03", title: "Ходовые модели в наличии", desc: "Популярные приводы, пульты, фотоэлементы и комплектующие можно получить без долгого ожидания." },
  { num: "04", title: "Установка одной командой", desc: "Приедем на объект в Москве или области, смонтируем, подключим и настроим систему под ключ." },
  { num: "05", title: "Гарантия и сервис после монтажа", desc: "Остаёмся на связи после запуска: консультируем, обслуживаем и ремонтируем оборудование." },
  { num: "06", title: "Рассчитаем комплект до покупки", desc: "Пришлите фотографию или параметры объекта — составим понятную комплектацию и предварительную смету." }
];

VF.securityItems = [
  { title: "GSM-модули", desc: "Открытие со смартфона или по звонку", price: "от 7 900 ₽" },
  { title: "Пульты", desc: "Оригинальные и совместимые модели", price: "от 1 500 ₽" },
  { title: "Радиоприёмники", desc: "Подключение пультов разных систем", price: "от 3 900 ₽" },
  { title: "Фотоэлементы", desc: "Защита от закрытия при препятствии", price: "от 4 500 ₽" },
  { title: "Сигнальные лампы", desc: "Предупреждение о движении ворот", price: "от 2 900 ₽" }
];
