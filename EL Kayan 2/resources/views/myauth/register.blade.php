<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - EL Kayan</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/register.css') }}">
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
                    <a class="btn btn-custom btn-sm fw-bold ms-2" href="{{ route('login.form') }}">
                        <i class="bi bi-box-arrow-in-right me-1"></i> Login
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- ================= REGISTER FORM ================= -->
<div class="login-box">
    <h2>Create your account</h2>

    <form action="{{ route('register') }}" method="POST" id="registerForm" novalidate>
        @csrf
        <div class="form-layout">
            <div class="form-section">
                <div class="input-box">
                    <label for="name">Full Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter your full name" required>
                    <small class="validation-msg" id="nameFeedback"></small>
                </div>

                <div class="input-box">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" required>
                    <small class="validation-msg" id="emailFeedback"></small>
                </div>

                <div class="input-box">
                    <label for="phone">Phone</label>
                    <input type="text" name="phone" id="phone" placeholder="Enter your phone number" required>
                    <small class="validation-msg" id="phoneFeedback"></small>
                </div>

                <div class="input-box">
                    <label for="birth_date">Birth Date</label>
                    <input type="date" name="birth_date" id="birth_date">
                    <small class="validation-msg" id="birthFeedback"></small>
                </div>

                <div class="input-box">
                    <label for="gender">Gender</label>
                    <select name="gender" id="gender">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <small class="validation-msg" id="genderFeedback"></small>
                </div>

                <div class="input-box">
                    <label for="location">Location</label>
                    <input type="text" name="location" id="location" placeholder="Enter your location">
                    <small class="validation-msg" id="locationFeedback"></small>
                </div>

                <div class="dual-inputs">
                    <div class="input-box">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" required minlength="8">
                        <small class="validation-msg" id="passwordFeedback"></small>
                    </div>
                    <div class="input-box">
                        <label for="password_confirmation">Confirm Password</label>
                        <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm your password" required>
                        <small class="validation-msg" id="confirmFeedback"></small>
                    </div>
                </div>

                <div class="input-box">
                    <label for="role">Role</label>
                    <select name="role" id="role" required>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>

                <button type="submit" class="login-btn">Sign Up</button>
            </div>

            <div class="requirements-card">
                <p class="requirements-title">Requirements (update as you type)</p>
                <ul class="requirements-list" id="requirementsList">
                    <li data-rule="name"><span class="status-icon">•</span>Full name is at least 3 characters</li>
                    <li data-rule="email"><span class="status-icon">•</span>Valid email address</li>
                    <li data-rule="phone"><span class="status-icon">•</span>Phone number has 10 or 11 digits</li>
                    <li data-rule="birth_date"><span class="status-icon">•</span>Birth date selected</li>
                    <li data-rule="gender"><span class="status-icon">•</span>Gender selected</li>
                    <li data-rule="location"><span class="status-icon">•</span>Location entered</li>
                    <li data-rule="password"><span class="status-icon">•</span>Password ≥ 8 characters</li>
                    <li data-rule="confirm"><span class="status-icon">•</span>Passwords match</li>
                    <li data-rule="role"><span class="status-icon">•</span>Role selected</li>
                </ul>
            </div>
        </div>
    </form>

    <div class="signup-link">
        <p>Already have an account? <a href="{{ route('login.form') }}">Log in</a></p>
    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- Custom JS -->
<script src="{{ asset('js/register.js') }}"></script>

</body>
</html>
