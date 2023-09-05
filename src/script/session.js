export const SESSION_KEY = 'sessionAuth' // ключ для зберігання сесії в локальному сховищі

export const saveSession = (session) => {
  // зберігаємо сесію
  try {
    window.session = session // оновлюємо сесію в пам'яті

    localStorage.setItem(
      // зберігаємо сесію в локальному сховищі
      SESSION_KEY, // ключ
      JSON.stringify(session), // значення
    )
  } catch (er) {
    // якщо виникла помилка
    console.log(er)
    window.session = null // очищуємо сесію в пам'яті
  }
}

export const loadSession = () => {
  // завантажуємо сесію
  try {
    const session = JSON.parse(
      // парсимо сесію з локального сховища по ключу
      localStorage.getItem(SESSION_KEY), // ключ
    )

    if (session) {
      // якщо сесія є
      window.session = session // оновлюємо сесію в пам'яті
    } else {
      // якщо сесії немає
      window.session = null // очищуємо сесію в пам'яті
    }
  } catch (er) {
    // якщо виникла помилка
    console.log(er)
    window.session = null // очищуємо сесію в пам'яті
  }
}

export const getTokenSession = () => {
  // отримуємо токен сесії
  try {
    const session = getSession() // отримуємо сесію з пам'яті

    return session ? session.token : null // якщо сесія є, повертаємо токен сесії інакше null
  } catch (er) {
    console.log(er)
    return null // якщо виникла помилка, повертаємо null
  }
}

export const getSession = () => {
  // отримуємо сесію з пам'яті
  try {
    const session =
      JSON.parse(localStorage.getItem(SESSION_KEY)) ||
      window.session // отримуємо сесію з локального сховища по ключу або з пам'яті

    return session || null // якщо сесія є, повертаємо сесію інакше null
  } catch (er) {
    console.log(er)
    return null // якщо виникла помилка, повертаємо null
  }
}
