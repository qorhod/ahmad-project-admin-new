document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    document.getElementById("userNameError").textContent = "";
    document.getElementById("passwordError").textContent = "";
  
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        userName: document.getElementById("exampleInputUserName").value,
        password: document.getElementById("exampleInputPassword1").value,
      }),
      headers: { "Content-Type": "application/json" },
    });
  
    const data = await res.json();
    console.log(data);
  
    if (data.notFoundUser) {
      document.getElementById("userNameError").textContent = data.notFoundUser;
    }
  
    if (data.redirectUrl) {
      location.assign(data.redirectUrl);
    }
  
    if (data.passwordError) {
      document.getElementById("passwordError").textContent = data.passwordError;
    }
  });
  