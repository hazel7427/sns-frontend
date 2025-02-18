function getToken() {
    return localStorage.getItem('authToken');
}

function isAuthenticated(token) {
    if (!token) {
        console.log("No token");
        return Promise.resolve(false);
    }
    return fetch(`${API_BASE_URL}/user/validate-token?token=${token}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data.success;
    })
    .catch(error => {
        console.error('Error verifying token:', error);
        return false;
    });
}

function checkAuthentication(token) {
    isAuthenticated(token).then(isAuth => {
        if (!isAuth) {
            window.location.href = 'login.html'; // Redirect to login page
            return;
        }
        // ... existing code that requires authentication ...
    });
} 