class Session {
  static #list = [] // приватний список сесій

  constructor(user) {
    this.token = Session.generateCode() // генеруємо токен сесії
    this.user = {
      // зберігаємо користувача
      email: user.email,
      isConfirm: user.isConfirm,
      role: user.role,
      id: user.id,
    }
  }

  static generateCode = () => {
    // метод генерації токену сесії
    const length = 6 // довжина токену
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' // набір символів для генерації токену

    let result = '' // результат генерації токену

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      ) // вибираємо випадковий індекс з набору символів
      result += characters[randomIndex] // додаємо символ до результату
    } // повторюємо доки не буде сформовано токен

    return result // повертаємо результат
  }

  static create = (user) => {
    // метод створення сесії
    const session = new Session(user)

    this.#list.push(session) // додаємо сесію до списку

    return session // повертаємо сесію
  }

  static get = (token) => {
    // метод отримання сесії по токену зі списку сесій
    return (
      this.#list.find((item) => item.token === token) ||
      null
    )
  }
}

module.exports = {
  Session,
}

console.log(Session.generateCode())
