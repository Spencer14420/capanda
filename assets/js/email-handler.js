const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// eslint-disable-next-line no-undef
const successModal = new bootstrap.Modal(document.querySelector("#success"));

const messageSuccess = () => {
  ["#name", "#email", "#message"].forEach((element) => {
    document.querySelector(element).value = "";
  });
  document.querySelector("#messagecancel").click();
  successModal.show();
};

const sendMessage = async (data) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const response = await fetch("assets/js/email-handler.php", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      messageSuccess();
    }
  } catch (error) {
    console.error("Error sending message", error);
  }
};

const messageAlert = document.querySelector("#message-alert");

document.querySelector("#sendmessage").addEventListener("click", () => {
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  if (!email || !isEmail(email)) {
    messageAlert.innerHTML = "Please enter a valid email address";
    messageAlert.style.display = "block";
  } else if (!message) {
    messageAlert.innerHTML = "Please enter a message";
    messageAlert.style.display = "block";
  } else {
    const data = {
      name: document.querySelector("#name").value,
      email,
      message,
    };
    sendMessage(data);
  }
});