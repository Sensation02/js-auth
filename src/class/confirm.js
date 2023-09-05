class Confirm {
  // клас для підтвердження реєстрації
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode() // генеруємо код підтвердження
    this.data = data // зберігаємо дані
  }

  static generateCode = () =>
    Math.floor(Math.random() * 9000) + 1000 // генеруємо код підтвердження

  static create = (data) => {
    // метод створення підтвердження
    this.#list.push(new Confirm(data)) // додаємо підтвердження до списку

    setTimeout(() => {
      this.delete(code)
    }, 24 * 60 * 60 * 1000) //24 hours in milliseconds. якщо підтвердження не було використано протягом 24 годин, воно буде видалено

    console.log(this.#list)
  }

  static delete = (code) => {
    // метод видалення підтвердження
    const length = this.#list // довжина списку підтверджень

    this.#list = this.#list.filter(
      (item) => item.code !== code, // видаляємо підтвердження зі списку по коду підтвердження
    )

    return length > this.#list.length // повертаємо результат видалення
  }

  static getData = (code) => {
    // метод отримання даних підтвердження
    const obj = this.#list.find(
      (item) => item.code === code,
    ) // отримуємо підтвердження зі списку по коду підтвердження

    return obj ? obj.data : null // повертаємо дані підтвердження або null
  }
}

module.exports = { Confirm }
