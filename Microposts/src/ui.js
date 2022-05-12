class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  showPosts(posts) {
    let output = "";

    posts.forEach((post) => {
      output += `
        <div class="card bg-secondary text-white mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil text-success"></i></a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove text-danger"></i></a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  showAlert(msg, className) {
    this.clearAlert();

    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".posts-container");
    const posts = document.querySelector("#posts");
    container.insertBefore(div, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  clearIdInput() {
    this.idInput.value = "";
  }

  // Fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  // Change form state
  changeFormState(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "posts-submit btn btn-warning btn-block mt-3";

      // Create cancel button
      const button = document.createElement("button");
      button.className = "posts-cancel btn btn-light btn-block mt-3";
      button.appendChild(document.createTextNode("Cancel Edit"));
      const cardForm = document.querySelector(".card-form");
      const formEnd = document.querySelector(".form-end");
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = "Post It";
      this.postSubmit.className = "posts-submit btn btn-primary btn-block mt-3";
      // Remove cancel Button
      if (document.querySelector(".posts-cancel"))
        document.querySelector(".posts-cancel").remove();
      // Clear Id from hidden field
      this.clearIdInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();
