export class ContactForm {
  constructor(serverScript) {
    this.serverScript = serverScript;
    this.successModal = new bootstrap.Modal(document.querySelector("#success"));
    this.messageAlert = document.querySelector("#message-alert");
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document
      .querySelector("#sendmessage")
      .addEventListener("click", () => this.handleSubmit());
  }

  isEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  messageSuccess() {
    ["#name", "#email", "#message"].forEach((element) => {
      document.querySelector(element).value = "";
    });
    document.querySelector("#contactCancel").click();
    this.successModal.show();
  }

  async sendMessage(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    try {
      const response = await fetch(this.serverScript, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        this.messageSuccess();
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  }

  handleSubmit() {
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    if (!email || !this.isEmail(email)) {
      this.displayAlert("Please enter a valid email address");
      return;
    }

    if (!message) {
      this.displayAlert("Please enter a message");
      return;
    }

    const data = {
      name: document.querySelector("#name").value,
      email,
      message,
    };

    this.sendMessage(data);
  }

  displayAlert(message) {
    this.messageAlert.innerHTML = message;
    this.messageAlert.style.display = "block";
  }
}
