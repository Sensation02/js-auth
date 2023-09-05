export class List {
  STATE = {
    // статуси
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
  }

  status = null
  data = null
  element = null

  updateStatus = (status, data) => {
    // метод оновлення статусу. він приймає статус і дані
    this.status = status // оновлюємо статус

    if (data) this.data = data // якщо дані є, оновлюємо їх

    this.updateView() // оновлюємо відображення
  }

  updateView = () => {} // метод оновлення відображення (абстрактний)

  loadData = async () => {}

  convertData = () => {}
}
