<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - EL Kayan</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>

<!-- ================= NAVBAR ================= -->
<nav id="mainNavbar" class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
        <a class="navbar-brand fw-bold fs-4 text-black" href="{{ url('/') }}">
            <i class="bi bi-building-fill me-1"></i> EL Kayan
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-lg-center">
                <li class="nav-item">
                    <a class="nav-link fw-semibold {{ Request::is('/') ? 'active' : '' }}" href="{{ url('/') }}">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold {{ Request::is('about-us') ? 'active' : '' }}" href="{{ route('about-us') }}">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold {{ Request::is('properties') ? 'active' : '' }}" href="{{ route('properties.index') }}">Properties</a>
                </li>
                <li class="nav-item">
                    <a class="btn btn-custom btn-sm fw-bold ms-2" href="{{ route('register.form') }}">
                        <i class="bi bi-person-plus me-1"></i> Sign Up
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- ================= LOGIN FORM ================= -->
<div class="login-box">
    <h2>Login with your account</h2>
    <p class="helper-text">Use the email you registered with. Password must be at least 8 characters.</p>

    <form action="{{ route('login') }}" method="POST" id="loginForm">
        @csrf
        <div class="input-box">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Enter your email" required>
            <small id="email-feedback" class="validation-msg"></small>
        </div>

        <div class="input-box">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter your password" required minlength="8">
            <small id="password-feedback" class="validation-msg"></small>
        </div>

        <div class="forgot-password">
            <a href="{{ route('password.request') }}">Forgot your password?</a>
        </div>

        <button type="submit" class="login-btn">Login</button>
    </form>

    <div class="signup-link">
        <p>Don't have an account? <a href="{{ route('register.form') }}">Sign up</a></p>
    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- AJAX Script -->
<script>
    const emailInput = document.getElementById('email');
    const feedback = document.getElementById('email-feedback');
    const passwordFeedback = document.getElementById('password-feedback');
    const loginForm = document.getElementById('loginForm');

    const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    emailInput.addEventListener('input', function() {
        const email = emailInput.value;

        if(email.length > 5 && isEmailValid(email)) {
            fetch('{{ route("check.email") }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                if(data.exists) {
                    feedback.style.color = 'green';
                    feedback.textContent = 'Email exists ✅';
                } else {
                    feedback.style.color = 'red';
                    feedback.textContent = 'Email not found ❌';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            feedback.textContent = '';
        }
    });

    password.addEventListener('input', function () {
        if (password.value.length < 8) {
            passwordFeedback.textContent = 'Password must be at least 8 characters';
            passwordFeedback.style.color = 'red';
        } else {
            passwordFeedback.textContent = 'Looks good';
            passwordFeedback.style.color = 'green';
        }
    });

    loginForm.addEventListener('submit', function(e) {
        let hasError = false;

        if (!isEmailValid(emailInput.value)) {
            feedback.style.color = 'red';
            feedback.textContent = 'Enter a valid email address';
            hasError = true;
        }

        if (feedback.textContent === 'Email not found ❌') {
            e.preventDefault();
            alert('Cannot login: email not found in database.');
            return;
        }

        if (password.value.length < 8) {
            passwordFeedback.textContent = 'Password must be at least 8 characters';
            passwordFeedback.style.color = 'red';
            hasError = true;
        }

        if (hasError) {
            e.preventDefault();
        }
    });
</script>

</body>
</html>
