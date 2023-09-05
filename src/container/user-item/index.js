import { USER_ROLE } from '../../script/user'

import { List } from '../../script/list'

class UserItem extends List {
  constructor() {
    super() // викликаємо конструктор батьківського класу

    this.element = document.querySelector('#user-item') // отримуємо елемент списку користувачів по ідентифікатору
    if (!this.element) throw new Error('Element is null') // якщо елемент не знайдено, викидаємо помилку

    this.id = new URLSearchParams(location.search).get('id') // отримуємо ідентифікатор користувача з параметрів запиту (пошуку)
    if (!this.id) location.assign('/user-list') // якщо ідентифікатор не знайдено, переходимо на сторінку списку користувачів

    this.loadData() // завантажуємо дані користувача
  }

  loadData = async () => {
    // метод завантаження даних користувача
    this.updateStatus(this.STATE.LOADING) // встановлюємо статус завантаження

    try {
      // спробуємо завантажити дані користувача
      const res = await fetch(
        `/user-item-data?id=${this.id}`, // відправляємо запит на сервер з ідентифікатором користувача
        {
          method: 'GET', // метод GET
        },
      )

      const data = await res.json() // отримуємо дані з сервера (JSON)

      if (res.ok) {
        // якщо сервер повернув статус 200
        this.updateStatus(
          this.STATE.SUCCESS, // встановлюємо статус успішного завантаження
          this.convertData(data), // конвертуємо дані користувача
        )
      } else {
        // якщо сервер повернув статус 400 або 500
        this.updateStatus(this.STATE.ERROR, data) // встановлюємо статус помилки завантаження
      }
    } catch (error) {
      // якщо сталася помилка
      console.log(error)
      this.updateStatus(this.STATE.ERROR, {
        message: error.message, // встановлюємо статус помилки завантаження
      })
    }
  }

  convertData = (data) => {
    // метод конвертації даних користувача
    return {
      ...data, // повертаємо дані користувача і розбиваємо їх на окремі поля
      user: {
        // конвертуємо дані користувача
        ...data.user, // повертаємо дані користувача і розбиваємо їх на окремі поля
        role: USER_ROLE[data.user.role], // конвертуємо роль користувача
        confirm: data.user.isConfirm ? 'Yes' : 'No', // конвертуємо статус підтвердження реєстрації користувача в рядок (Yes або No)
      },
    }
  }

  updateView = () => {
    // метод оновлення представлення
    this.element.innerHTML = ''

    switch (
      this.status // в залежності від статусу завантаження встановлюємо відповідне представлення
    ) {
      case this.STATE.LOADING: // якщо статус завантаження
        this.element.innerHTML = `
					<div class="data">
						<span class="data__title">ID</span>
						<span class="data__value skeleton"></span>
					</div>
					<div class="data">
						<span class="data__title">Email</span>
						<span class="data__value skeleton"></span>
					</div>
					<div class="data">
						<span class="data__title">Role</span>
						<span class="data__value skeleton"></span>
					</div>
					<div class="data">
						<span class="data__title">Email confirmed?</span>
						<span class="data__value skeleton"></span>
					</div>
				`
        break

      case this.STATE.SUCCESS: // якщо статус успішного завантаження
        const { id, email, role, confirm } = this.data.user

        this.element.innerHTML = `
					<div class="data">
						<span class="data__title">ID</span>
						<span class="data__value">${id}</span>
					</div>
					<div class="data">
						<span class="data__title">Email</span>
						<span class="data__value ">${email}</span>
					</div>
					<div class="data">
						<span class="data__title">Role</span>
						<span class="data__value ">${role}</span>
					</div>
					<div class="data">
						<span class="data__title">Email confirmed?</span>
						<span class="data__value ">${confirm}</span>
					</div> 
				`
        break

      case this.STATE.ERROR: // якщо статус помилки завантаження
        this.element.innerHTML = `
					<span class="alert alert--error">${this.data.message}</span>
				`
        break
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.session || !window.session.user.isConfirm) {
    // якщо користувач не авторизований або не підтвердив реєстрацію
    location.assign('/') // переходимо на головну сторінку
  }

  new UserItem() // створюємо екземпляр класу списку користувачів
})
