import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserList extends List {
  constructor() {
    super()

    this.element = document.querySelector('#user-list')
    if (!this.element) throw new Error('Element is null')

    this.loadData()
  }

  loadData = async () => {
    // метод завантаження даних з сервера
    this.updateStatus(this.STATE.LOADING) // оновлюємо статус

    try {
      const res = await fetch('/user-list-data', {
        method: 'GET',
      }) // отримуємо дані з сервера

      const data = await res.json() // перетворюємо дані в json формат

      if (res.ok) {
        // перевіряємо чи все ок
        this.updateStatus(
          // оновлюємо статус
          this.STATE.SUCCESS, // передаємо статус успіху
          this.convertData(data), // передаємо дані в конвертер
        )
      } else {
        // якщо помилка
        this.updateStatus(this.STATE.ERROR, data) // передаємо статус помилки
      }
    } catch (error) {
      // якщо помилка
      console.log(error)
      this.updateStatus(this.STATE.ERROR, {
        // передаємо статус помилки
        message: error.message, // передаємо повідомлення про помилку
      })
    }
  }

  convertData = (data) => {
    //метод конвертації даних з сервера. він приймає деякі дані з сервера і повертає об'єкт з конвертованими даними
    return {
      ...data, // розпилюємо дані з сервера
      list: data.list.map((user) => ({
        // конвертуємо ці дані
        ...user, // знову розпилюємо дані
        role: USER_ROLE[user.role], // конвертуємо роль
      })),
    }
  }

  updateView = () => {
    // метод оновлення відображення. він оновлює відображення відповідно до статусу
    this.element.innerHTML = '' // очищуємо відображення

    console.log(this.status, this.data)

    switch (
      this.status // перевіряємо статус
    ) {
      case this.STATE.LOADING: // якщо статус завантаження
        this.element.innerHTML = `
					<div class="user">
						<span class="user__title skeleton"></span>
						<span class="user__sub skeleton"></span>
					</div>
					<div class="user">
						<span class="user__title skeleton"></span>
						<span class="user__sub skeleton"></span>
					</div>
					<div class="user">
						<span class="user__title skeleton"></span>
						<span class="user__sub skeleton"></span>
					</div>
					<div class="user">
						<span class="user__title skeleton"></span>
						<span class="user__sub skeleton"></span>
					</div>
				`
        break

      case this.STATE.SUCCESS: // якщо статус успіху
        this.data.list.forEach((item) => {
          this.element.innerHTML += `
						<a href="/user-item?id=${item.id}" class="user user--click">
							<span class="user__title">${item.email}</span>
							<span class="user__sub">${item.role}</span>
						</a>
					`
        })
        break

      case this.STATE.ERROR: // якщо статус помилки
        this.element.innerHTML = `
					<span class="alert alert--error">${this.data.message}</span>
				`
        break
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (!window.session || !window.session.user.isConfirm) {
      // перевіряємо чи є сесія і чи підтверджений юзер
      location.assign('/') // якщо ні, то перенаправляємо на головну сторінку
    }
  } catch (e) {}

  new UserList() // створюємо екземпляр класу UserList і відразу запускаємо його
})
