Я выбрала:
Архитектура: Feature-Based + Core/Shared.
Паттерн: Facade (сервис состояния поверх API-сервиса).
Состояние: Signals в сервисах, RxJS только для поиска и HTTP-запросов.
Методология: OOD.


Раньше одна всё было раскидано по разным папкам. Например, пользователи: компоненты в одном месте, сервисы в другом, интерфейс в третьем. Чтобы понять что шде, приходилось бегать по всему проекту.

Теперь так: core  то, что нужно всему приложению и существует в одном экземпляре (авторизация, интерсепторы, хедер, футер, общие сервисы). shared  директивы, пайпы, enumы и интерфейсы без привязки к конкретной фиче. features  каждая фича в своей папке, и всё по ней лежит рядом.

Корзину вынесла в отдельную features/cart, потому что у неё свои данные и своё состояние, а используется она и в списке продуктов, и на странице товара.

Facade: в каждой фиче два сервиса — один только ходит в API, другой хранит состояние и вызывает первый. Компонент работает только со вторым и не знает про HTTP вообще. Удобно, если захочу поменять способ получения данных — трогать компоненты не придётся.

Состояние на сигналах, потому что оно простое: списки, фильтры, корзина. RxJS беру только там, где реально нужны потоки — debounce для поиска, HTTP-запросы.

Почему не остальное:
Не Layered (всё по типу файла: компоненты отдельно, сервисы отдельно, интерфейсы отдельно)  именно так часть проекта и была устроена раньше, и это главная проблема, которую я чинила.
Не Redux  для продуктов и корзины actions, reducers и effects это слишком много для такой простой задачи. Сигналы дают то же самое, но без лишнего кода.

Не DDD это про сложную предметную область, а у меня простые сущности: продукт, пользователь, пост, корзина. DDD тут было бы лишним усложнением.

Не TDD  у меня нет тестов вообще, и переходить на TDD значит менять весь процесс разработки, а не просто структуру.

Минусы моего решения:
Граница между core и shared местами на моё усмотрение, не жёсткое правило.
Хедер лежит в core, но использует CartService из features/cart, чтобы показать количество товаров. Получается, core зависит от features в этом одном месте. Сделала так осознанно, дублировать корзину в core ради формальной чистоты смысла нет.

Сигналы в сервисах публичные, то есть компонент технически может менять их напрямую, в обход методов сервиса. Можно закрыть через .asReadonly(), но я этого не делала.

Структура папок:
Серийный номер тома: 0000020A 7682:2E24
C:\USERS\ADMIN\DESKTOP\НОВАЯ ПАПКА (2)\ANGULAR-SIMULATOR\SRC\APP
│   app.component.html
│   app.component.scss
│   app.component.ts
│   app.config.ts
│   app.routes.ts
│   
├───core
│   │   configuration.token.ts
│   │   
│   ├───auth
│   │   │   admin.guard.ts
│   │   │   auth.guard.ts
│   │   │   auth.service.ts
│   │   │   
│   │   └───interfaces
│   │           IAuthResponse.ts
│   │           IAuthUser.ts
│   │           IToken.ts
│   │           UserRole.ts
│   │           
│   ├───enums
│   │       Language.ts
│   │       Message.ts
│   │       Theme.ts
│   │       
│   ├───interceptors
│   │       auth.interceptor.ts
│   │       error.interceptor.ts
│   │       logging.interceptor.ts
│   │       
│   ├───interfaces
│   │       IApplicationConfiguration.ts
│   │       ILanguage.ts
│   │       IMessage.ts
│   │       INavigation.ts
│   │       ITheme.ts
│   │       
│   ├───layout
│   │   ├───footer
│   │   │       footer.component.html
│   │   │       footer.component.scss
│   │   │       footer.component.ts
│   │   │       
│   │   ├───header
│   │   │       header.component.html
│   │   │       header.component.scss
│   │   │       header.component.ts
│   │   │       
│   │   ├───layout
│   │   │       layout.component.html
│   │   │       layout.component.scss
│   │   │       layout.component.ts
│   │   │       
│   │   ├───loader
│   │   │       loader.component.html
│   │   │       loader.component.scss
│   │   │       loader.component.ts
│   │   │       
│   │   └───message
│   │           message.component.html
│   │           message.component.scss
│   │           message.component.ts
│   │           
│   └───services
│           language.service.ts
│           loader.service.ts
│           local-storage.service.ts
│           message.service.ts
│           theme.service.ts
│           
├───features
│   ├───auth
│   │   └───login
│   │           login.component.html
│   │           login.component.scss
│   │           login.component.ts
│   │           
│   ├───cart
│   │   │   cart-api.service.ts
│   │   │   cart.service.ts
│   │   │   
│   │   ├───cart
│   │   │       cart.component.html
│   │   │       cart.component.scss
│   │   │       cart.component.ts
│   │   │       
│   │   └───interfaces
│   │           ICart.ts
│   │           ICartItem.ts
│   │           ICartProduct.ts
│   │           ICartProductRequest.ts
│   │           ICartResponse.ts
│   │           
│   ├───home
│   │   ├───home-page
│   │   │       home-page.component.html
│   │   │       home-page.component.scss
│   │   │       home-page.component.ts
│   │   │       
│   │   └───interfaces
│   │           IArticle.ts
│   │           IDestination.ts
│   │           ILocation.ts
│   │           IOffer.ts
│   │           IParticipant.ts
│   │           IReport.ts
│   │           
│   ├───not-found
│   │   └───not-found-page
│   │           not-found-page.component.html
│   │           not-found-page.component.scss
│   │           not-found-page.component.ts
│   │           
│   ├───posts
│   │   │   IPost.ts
│   │   │   IPostsApiResponse.ts
│   │   │   post-api.service.ts
│   │   │   post.resolver.ts
│   │   │   post.service.ts
│   │   │   posts.component.html
│   │   │   posts.component.scss
│   │   │   posts.component.ts
│   │   │   
│   │   ├───post-create
│   │   │       post-create.component.html
│   │   │       post-create.component.scss
│   │   │       post-create.component.ts
│   │   │       
│   │   ├───post-detail
│   │   │       post-detail.component.html
│   │   │       post-detail.component.scss
│   │   │       post-detail.component.ts
│   │   │       
│   │   └───post-edit-dialog
│   │           post-edit-dialog.component.html
│   │           post-edit-dialog.component.scss
│   │           post-edit-dialog.component.ts
│   │           
│   ├───products
│   │   │   product-api.service.ts
│   │   │   product.resolver.ts
│   │   │   product.service.ts
│   │   │   
│   │   ├───interfaces
│   │   │       ICategory.ts
│   │   │       IProduct.ts
│   │   │       IProductQueryParams.ts
│   │   │       IProductResponse.ts
│   │   │       ISelectOption.ts
│   │   │       
│   │   ├───product-detail
│   │   │       product-detail.component.html
│   │   │       product-detail.component.scss
│   │   │       product-detail.component.ts
│   │   │       
│   │   └───products
│   │           products.component.html
│   │           products.component.scss
│   │           products.component.ts
│   │           
│   └───users
│       │   user-api.service.ts
│       │   user.service.ts
│       │   
│       ├───create-user
│       │       create-user.component.html
│       │       create-user.component.scss
│       │       create-user.component.ts
│       │       
│       ├───interfaces
│       │       IUser.ts
│       │       
│       ├───user-card
│       │       user-card.component.html
│       │       user-card.component.scss
│       │       user-card.component.ts
│       │       
│       ├───users-filter
│       │       users-filter.component.html
│       │       users-filter.component.scss
│       │       users-filter.component.ts
│       │       
│       └───users-page
│               users-page.component.html
│               users-page.component.scss
│               users-page.component.ts
│               
├───playground
│   │   collection.ts
│   │   training.ts
│   │   
│   ├───change-detection-test
│   │       change-detection-test.component.html
│   │       change-detection-test.component.scss
│   │       change-detection-test.component.ts
│   │       
│   ├───change-detector-ref-test
│   │       change-detector-ref-test.component.html
│   │       change-detector-ref-test.component.scss
│   │       change-detector-ref-test.component.ts
│   │       
│   ├───child
│   │       child.component.html
│   │       child.component.scss
│   │       child.component.ts
│   │       
│   └───parent
│           parent.component.html
│           parent.component.scss
│           parent.component.ts
│           
└───shared
    ├───directives
    │       animated-gradient.directive.ts
    │       bold-text.directive.ts
    │       
    ├───enums
    │       Color.ts
    │       Format.ts
    │       
    ├───interfaces
    │       IGradientConfiguration.ts
    │       
    └───pipes
            phone-format.pipe.ts
            plural.pipe.ts
