const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.querySelector('.sign-up form');
const signInForm = document.querySelector('.sign-in form');

registerBtn.addEventListener('click', () => {
  document.querySelector('.container').classList.add("active");
});

loginBtn.addEventListener('click', () => {
  document.querySelector('.container').classList.remove("active");
});

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = signUpForm.querySelector('input[placeholder="Name"]').value;
  const email = signUpForm.querySelector('input[type="email"]').value;
  const password = signUpForm.querySelector('input[type="password"]').value;

  if (name && email && password) {
    localStorage.setItem(email, password);
    alert('Registration successful!');
    signUpForm.reset();
    
    window.location.href="menu page.html";
  } else {
    alert('Please fill in all fields');
  }
});

signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signInForm.querySelector('input[type="email"]').value;
  const password = signInForm.querySelector('input[type="password"]').value;

  if (email && password) {
    const storedPassword = localStorage.getItem(email);

    if (storedPassword === password) {
      alert('Login successful!');
      
      window.location.href="menu page.html";
      signInForm.reset();
    } else {
      alert('Invalid email or password');
    }
  } else {
    alert('Please fill in all fields');
  }
});