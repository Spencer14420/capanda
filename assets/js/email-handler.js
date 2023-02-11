document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");
  const nameInput = document.querySelector("#name");
  const alertMessage = document.querySelector("#message-alert");
  const messageCancel = document.querySelector("#messagecancel");
  const successModal = document.querySelector("#success");

  function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function resetForm() {
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
    messageCancel.click();
    successModal.classList.add("show");
  }

  document.querySelector("#sendmessage").addEventListener("click", () => {
    if (!isEmail(emailInput.value)) {
      alertMessage.textContent = "Please enter a valid email address";
      alertMessage.style.display = "block";
    } else if (!messageInput.value.trim()) {
      alertMessage.textContent = "Please enter a message";
      alertMessage.style.display = "block";
    } else {
      const data = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
      };

      fetch("assets/js/email-handler.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(() => {
          resetForm();
        })
        .catch((error) => console.error(error));
    }
  });
});
