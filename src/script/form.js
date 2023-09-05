export const REG_EXP_EMAIL = new RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
) // регулярний вираз для перевірки електронної пошти

export const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
) // регулярний вираз для перевірки пароля

export class Form {
  FIELD_NAME = {} // об'єкт з іменами полів (абстрактний)
  FIELD_ERROR = {} // об'єкт з помилками полів

  value = {} // об'єкт зі значеннями полів (абстрактний)
  error = {} // об'єкт з помилками полів
  disabled = true // флаг, який вказує на те, чи відключена кнопка

  change = (name, value) => {
    // метод зміни значення поля
    const error = this.validate(name, value) // валідуємо значення поля і отримуємо помилку (якщо є)
    this.value[name] = value // зберігаємо значення поля

    if (error) { // якщо є помилка
      this.setError(name, error) // встановлюємо помилку в залежності від наявності помилки 
      this.error[name] = error // зберігаємо помилку
    } else { // якщо помилки немає
      this.setError(name, null) // встановлюємо помилку (null)
      delete this.error[name] // видаляємо помилку 
    }

    this.checkDisabled() // перевіряємо чи відключена кнопка
  }

  setError = (name, error) => { // метод встановлення помилки
    const span = document.querySelector( 
      `.form__error[name="${name}"]`,
    ) // отримуємо елемент з помилкою по імені поля 

    const field = document.querySelector(
      `.validation[name="${name}"]`,
    ) // отримуємо елемент поля по імені поля

    if (span) { // якщо елемент з помилкою є
      span.classList.toggle(
        'form__error--active', // встановлюємо (включаємо) клас помилки
        Boolean(error),
      )
      span.innerText = error || '' // встановлюємо текст помилки (якщо є)
    }

    if (field) { // якщо елемент поля є
      field.classList.toggle(
        'validation--active',
        Boolean(error),
      ) // встановлюємо (включаємо) клас поля
    }
  }

  checkDisabled = () => { // метод перевірки чи відключена кнопка 
    let disabled = false // флаг, який вказує на те, чи відключена кнопка

    Object.values(this.FIELD_NAME).forEach((name) => { // перебираємо імена полів
      if ( // якщо є помилка або значення поля не встановлено
        this.error[name] ||
        this.value[name] === undefined
      ) {
        disabled = true // встановлюємо флаг в true
      }
    })

    const el = document.querySelector('.button') // отримуємо елемент кнопки

    if (el) {
      el.classList.toggle(
        'button--disabled',
        Boolean(disabled),
      ) // встановлюємо (включаємо) клас кнопки (відключено/включено) 
    }

    this.disabled = disabled // зберігаємо флаг
  }

  validateAll = () => { // метод валідації всіх полів (при відправці форми)
    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.value[name]) // валідуємо значення поля і отримуємо помилку (якщо є)

      if (error) {
        this.setError(name, error) // встановлюємо помилку в залежності від наявності помилки
      }
    })
  }

  setAlert = (status, text) => { // метод встановлення алерту
    const el = document.querySelector('.alert') // отримуємо елемент алерту

    if (status === 'progress') { // встановлюємо клас алерту в залежності від статусу
      el.className = 'alert alert--progress' // якщо статус progress, то встановлюємо клас alert--progress
    } else if (status === 'success') { // якщо статус success, то встановлюємо клас alert--success
      el.className = 'alert alert--success'
    } else if (status === 'error') { // якщо статус error, то встановлюємо клас alert--error
      el.className = 'alert alert--error'
    } else { // якщо статус disabled, то встановлюємо клас alert--disabled
      el.className = 'alert alert--disabled'
    }

    if (text) el.innerText = text // якщо текст є, то встановлюємо його
  }
}
