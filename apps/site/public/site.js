const signupForm = document.querySelector("[data-signup-form]");

if (signupForm instanceof HTMLFormElement) {
  const status = signupForm.querySelector("[data-form-status]");
  const submitButton = signupForm.querySelector('button[type="submit"]');

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (
      !(status instanceof HTMLElement) ||
      !(submitButton instanceof HTMLButtonElement)
    ) {
      return;
    }

    status.textContent = "Joining the expedition…";
    status.dataset.state = "pending";
    submitButton.disabled = true;

    const formData = new FormData(signupForm);
    const payload = {
      email: formData.get("email"),
      consent: formData.get("consent") === "on",
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Signup is unavailable.");
      }

      window.location.assign(result.redirect ?? "/joined");
    } catch (error) {
      status.textContent =
        error instanceof Error ? error.message : "Signup is unavailable.";
      status.dataset.state = "error";
      submitButton.disabled = false;
    }
  });
}
