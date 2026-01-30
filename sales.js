const $ = (sel, parent = document) => parent.querySelector(sel)
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel))

function eur(amount) {
  try {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
      amount,
    )
  } catch {
    return `${amount}€`
  }
}

function wireCtas() {
  const btns = document.querySelectorAll('[data-cta="access"]')
  for (const b of btns) {
    b.addEventListener('click', async (e) => {
      e.preventDefault()

      const plan = (b.dataset.plan === 'yearly' ? 'yearly' : 'monthly')
      let email = getLoggedInEmail()
      if (!email) {
        const entered = prompt('Enter your email address to continue to secure checkout:')
        if (!entered || !entered.trim()) return
        email = entered.trim()
        if (!email.includes('@') || email.length < 5) {
          alert('Please enter a valid email address.')
          return
        }
      }

      const originalText = b.textContent
      b.disabled = true
      b.textContent = 'Redirecting…'

      try {
        const response = await fetch('/api/payment/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, email: email.toLowerCase() }),
        })

        let data
        try {
          data = await response.json()
        } catch (_) {
          throw new Error('Something went wrong. Please try again or contact support.')
        }

        if (response.ok && data.url) {
          window.location.href = data.url
          return
        }
        throw new Error(data.error || 'Unable to start checkout. Please try again.')
      } catch (err) {
        console.error('Checkout error:', err)
        alert(err.message || 'Something went wrong. Please try again or contact sales@cloneboard.example.')
        b.disabled = false
        b.textContent = b.dataset.originalText || originalText
      }
    })
  }
}

function fillDemoNumbers() {
  const revenue = $('#demo-revenue')
  const arpu = $('#demo-arpu')
  if (revenue) revenue.textContent = eur(28450)
  if (arpu) arpu.textContent = eur(22)
}

function wireFaq() {
  const questions = $$('.faq-q')
  for (const q of questions) {
    q.addEventListener('click', () => {
      const expanded = q.getAttribute('aria-expanded') === 'true'
      q.setAttribute('aria-expanded', expanded ? 'false' : 'true')
      const a = q.nextElementSibling
      if (a && a.classList && a.classList.contains('faq-a')) {
        a.hidden = expanded
      }
    })
  }
}

function wireSmoothAnchors() {
  const links = $$('a[href^="#"]')
  for (const a of links) {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href') || ''
      const id = href.slice(1)
      const el = id ? document.getElementById(id) : null
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}

const AUTH_STORAGE_KEY = 'userEmail'
const AUTH_TOKEN_KEY = 'authToken'

function getLoggedInEmail() {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) || null
  } catch {
    return null
  }
}

function getAuthToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY) || null
  } catch {
    return null
  }
}

function setLoggedIn(email, token) {
  try {
    if (email) {
      localStorage.setItem(AUTH_STORAGE_KEY, email)
      if (token) localStorage.setItem(AUTH_TOKEN_KEY, token)
      else localStorage.removeItem(AUTH_TOKEN_KEY)
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }
  } catch (_) {}
}

function setLoggedInEmail(email) {
  setLoggedIn(email, getAuthToken())
}

function updateAuthUI() {
  const email = getLoggedInEmail()
  const navOut = document.getElementById('navLoggedOut')
  const navIn = document.getElementById('navLoggedIn')
  const footerLogin = document.getElementById('footerLoginLink')
  const footerSignUp = document.getElementById('footerSignUpLink')
  const footerIn = document.getElementById('footerLoggedIn')
  if (navOut) navOut.style.display = email ? 'none' : 'inline-flex'
  if (navIn) navIn.style.display = email ? 'inline-flex' : 'none'
  if (footerLogin) footerLogin.style.display = email ? 'none' : ''
  if (footerSignUp) footerSignUp.style.display = email ? 'none' : ''
  if (footerIn) footerIn.style.display = email ? 'inline' : 'none'
}

function showAuthTab(mode) {
  const loginForm = document.getElementById('loginForm')
  const signupForm = document.getElementById('signupForm')
  const tabLogin = document.getElementById('authTabLogin')
  const tabSignup = document.getElementById('authTabSignup')
  if (mode === 'signup') {
    if (loginForm) loginForm.style.display = 'none'
    if (signupForm) signupForm.style.display = 'grid'
    if (tabLogin) { tabLogin.classList.remove('auth-tab--active'); tabLogin.setAttribute('aria-selected', 'false') }
    if (tabSignup) { tabSignup.classList.add('auth-tab--active'); tabSignup.setAttribute('aria-selected', 'true') }
    const inp = document.getElementById('signupEmailInput')
    if (inp) inp.focus()
  } else {
    if (loginForm) loginForm.style.display = 'grid'
    if (signupForm) signupForm.style.display = 'none'
    if (tabLogin) { tabLogin.classList.add('auth-tab--active'); tabLogin.setAttribute('aria-selected', 'true') }
    if (tabSignup) { tabSignup.classList.remove('auth-tab--active'); tabSignup.setAttribute('aria-selected', 'false') }
    const inp = document.getElementById('loginEmailInput')
    if (inp) inp.focus()
  }
}

/**
 * Opens the auth modal on the given tab.
 * @param {'login'|'signup'} mode - Which form to show: 'login' or 'signup'
 */
function openAuthModal(mode) {
  const tab = mode === 'signup' ? 'signup' : 'login'
  const modal = document.getElementById('loginModal')
  const errLogin = document.getElementById('loginFormError')
  const errSignup = document.getElementById('signupFormError')
  if (modal) {
    modal.classList.add('is-open')
    modal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('login-modal-open')
    showAuthTab(tab)
    const emailInput = document.getElementById('loginEmailInput')
    const signupEmailInput = document.getElementById('signupEmailInput')
    if (emailInput) emailInput.value = getLoggedInEmail() || ''
    if (signupEmailInput) signupEmailInput.value = ''
    if (errLogin) { errLogin.textContent = ''; errLogin.style.display = 'none' }
    if (errSignup) { errSignup.textContent = ''; errSignup.style.display = 'none' }
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal')
  if (modal) {
    modal.classList.remove('is-open')
    modal.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('login-modal-open')
  }
}

function wireAuth() {
  updateAuthUI()

  const modalClose = document.getElementById('loginModalClose')
  const modalBackdrop = document.getElementById('loginModalBackdrop')
  const form = document.getElementById('loginForm')
  const emailInput = document.getElementById('loginEmailInput')
  const submitBtn = document.getElementById('loginSubmitBtn')
  const errEl = document.getElementById('loginFormError')
  const headerLogout = document.getElementById('headerLogoutBtn')
  const footerLogout = document.getElementById('footerLogoutBtn')

  // Log in → modal on Login tab; Sign up → modal on Sign up tab (empêche la navigation vers /access.html)
  document.body.addEventListener('click', function (e) {
    const el = e.target && e.target.nodeType === 1 ? e.target.closest('a, button') : null
    if (!el) return
    if (el.classList && el.classList.contains('js-open-auth-login')) {
      e.preventDefault()
      openAuthModal('login')
      return
    }
    if (el.classList && el.classList.contains('js-open-auth-signup')) {
      e.preventDefault()
      openAuthModal('signup')
    }
  })
  const navLoginBtn = document.getElementById('navLoginBtn')
  const navSignUpBtn = document.getElementById('navSignUpBtn')
  const footerLoginLink = document.getElementById('footerLoginLink')
  const footerSignUpLink = document.getElementById('footerSignUpLink')
  if (navLoginBtn) navLoginBtn.addEventListener('click', function (e) { e.preventDefault(); openAuthModal('login') })
  if (navSignUpBtn) navSignUpBtn.addEventListener('click', function (e) { e.preventDefault(); openAuthModal('signup') })
  if (footerLoginLink) footerLoginLink.addEventListener('click', function (e) { e.preventDefault(); openAuthModal('login') })
  if (footerSignUpLink) footerSignUpLink.addEventListener('click', function (e) { e.preventDefault(); openAuthModal('signup') })

  if (modalClose) modalClose.addEventListener('click', closeLoginModal)
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeLoginModal)
  const panel = document.querySelector('.login-modal-panel')
  if (panel) panel.addEventListener('click', (e) => e.stopPropagation())
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('loginModal')
      if (modal && modal.classList.contains('is-open')) closeLoginModal()
    }
  })

  const tabLogin = document.getElementById('authTabLogin')
  const tabSignup = document.getElementById('authTabSignup')
  if (tabLogin) tabLogin.addEventListener('click', () => showAuthTab('login'))
  if (tabSignup) tabSignup.addEventListener('click', () => showAuthTab('signup'))

  if (form && emailInput && submitBtn && errEl) {
    const passwordInput = document.getElementById('loginPasswordInput')
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const raw = emailInput.value.trim()
      const password = passwordInput ? passwordInput.value : ''
      if (!raw || !raw.includes('@') || raw.length < 5) {
        errEl.textContent = 'Please enter a valid email address.'
        errEl.style.display = 'block'
        return
      }
      if (!password || password.length < 1) {
        errEl.textContent = 'Please enter your password.'
        errEl.style.display = 'block'
        return
      }
      errEl.style.display = 'none'
      errEl.textContent = ''
      submitBtn.disabled = true
      submitBtn.textContent = 'Logging in…'
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: raw.toLowerCase(), password }),
        })
        const data = await res.json().catch(() => ({}))
        if (res.ok && data.success) {
          setLoggedIn(data.email, data.token)
          closeLoginModal()
          updateAuthUI()
          setTimeout(function () {
            alert('You\'re logged in. Use "My access" to open your dashboard, or "Get Access" to subscribe.')
          }, 150)
        } else {
          errEl.textContent = data.error || 'Login failed. Please try again.'
          errEl.style.display = 'block'
        }
      } catch (_) {
        errEl.textContent = 'Connection error. Please try again.'
        errEl.style.display = 'block'
      } finally {
        submitBtn.disabled = false
        submitBtn.textContent = 'Log in'
      }
    })
  }

  const signupForm = document.getElementById('signupForm')
  const signupEmailInput = document.getElementById('signupEmailInput')
  const signupPasswordInput = document.getElementById('signupPasswordInput')
  const signupConfirmInput = document.getElementById('signupConfirmInput')
  const signupSubmitBtn = document.getElementById('signupSubmitBtn')
  const signupFormError = document.getElementById('signupFormError')
  if (signupForm && signupEmailInput && signupPasswordInput && signupConfirmInput && signupSubmitBtn && signupFormError) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const email = signupEmailInput.value.trim()
      const password = signupPasswordInput.value
      const confirm = signupConfirmInput.value
      if (!email || !email.includes('@') || email.length < 5) {
        signupFormError.textContent = 'Please enter a valid email address.'
        signupFormError.style.display = 'block'
        return
      }
      if (!password || password.length < 8) {
        signupFormError.textContent = 'Password must be at least 8 characters.'
        signupFormError.style.display = 'block'
        return
      }
      if (password !== confirm) {
        signupFormError.textContent = 'Passwords do not match.'
        signupFormError.style.display = 'block'
        return
      }
      signupFormError.style.display = 'none'
      signupFormError.textContent = ''
      signupSubmitBtn.disabled = true
      signupSubmitBtn.textContent = 'Creating account…'
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.toLowerCase(), password }),
        })
        const data = await res.json().catch(() => ({}))
        if (res.ok && data.success) {
          setLoggedIn(data.email, data.token)
          closeLoginModal()
          updateAuthUI()
          setTimeout(function () {
            alert('Account created. You\'re logged in. Use "My access" or "Get Access" to continue.')
          }, 150)
        } else {
          signupFormError.textContent = data.error || 'Sign up failed. Please try again.'
          signupFormError.style.display = 'block'
        }
      } catch (_) {
        signupFormError.textContent = 'Connection error. Please try again.'
        signupFormError.style.display = 'block'
      } finally {
        signupSubmitBtn.disabled = false
        signupSubmitBtn.textContent = 'Create account'
      }
    })
  }

  if (headerLogout) headerLogout.addEventListener('click', () => { setLoggedIn(null); updateAuthUI() })
  if (footerLogout) footerLogout.addEventListener('click', () => { setLoggedIn(null); updateAuthUI() })
}

function init() {
  wireCtas()
  wireAuth()
  fillDemoNumbers()
  wireFaq()
  wireSmoothAnchors()
  window.openAuthModal = openAuthModal
  window.closeAuthModal = closeLoginModal
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

