class User {
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  } // список ролей користувача

  static #list = [] // приватний список користувачів

  static #count = 1 // приватний лічильник користувачів

  constructor({ email, password, role }) {
    this.id = User.#count++ // генеруємо ідентифікатор користувача і збільшуємо лічильник для наступного користувача

    this.email = String(email).toLowerCase() // зберігаємо електронну пошту користувача в нижньому регістрі
    this.password = String(password) // зберігаємо пароль користувача
    this.role = User.#convertRole(role) // зберігаємо роль користувача
    this.isConfirm = false // зберігаємо статус підтвердження реєстрації користувача. його ми будемо підтверджувати після реєстрації
  }

  static #convertRole = (role) => {
    // метод конвертації ролі користувача в число
    role = Number(role) // конвертуємо роль в число

    if (isNaN(role)) {
      // якщо роль не є числом (NaN)
      role = this.USER_ROLE.USER // встановлюємо роль за замовчуванням (USER)
    }

    role = Object.values(this.USER_ROLE).includes(role)
      ? role
      : this.USER_ROLE.USER // якщо роль не входить в список ролей, встановлюємо роль за замовчуванням (USER)

    return role // повертаємо роль
  }

  static create(data) {
    // метод створення користувача
    const user = new User(data) // створюємо користувача

    console.log(user)

    this.#list.push(user) // додаємо користувача до списку

    console.log(this.#list)

    return user // повертаємо користувача
  }

  static getByEmail(email) {
    // метод отримання користувача по електронній пошті
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLowerCase(),
      ) || null // отримуємо користувача зі списку по електронній пошті користувача (email) або null
    )
  }

  static getById(id) {
    // метод отримання користувача по ідентифікатору
    return (
      this.#list.find((user) => user.id === Number(id)) ||
      null // отримуємо користувача зі списку по ідентифікатору користувача (id) або null
    )
  }

  static getList = () => this.#list // метод отримання списку користувачів
}

module.exports = { User }
