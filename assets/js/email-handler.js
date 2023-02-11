function isEmail(email) {
  const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function messageSuccess() {
  $("#name").val("");
  $("#email").val("");
  $("#message").val("");
  $("#messagecancel").click();
  $("#success").modal("show");
}

$("#sendmessage").click(() => {
  if (!$("#email").val() || !isEmail($("#email").val())) {
    $("#message-alert").html("Please enter an email address");
    $("#message-alert").show();
  } else if (!$("#message").val()) {
    $("#message-alert").html("Please enter a message");
    $("#message-alert").show();
  } else {
    const data = {
      name: $("#name").val(),
      email: $("#email").val(),
      message: $("#message").val(),
    };

    $.ajax({
      type: "POST",
      url: "assets/js/email-handler.php",
      data,
      success: () => {
        messageSuccess();
      },
    });
  }
});
