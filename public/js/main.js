if (localStorage.getItem("isSmall") === "yes") {
  sidebarId.classList.add("small-sidebar");
} else {
  sidebarId.classList.remove("small-sidebar");
}

const toggleSidebar = () => {
  if (localStorage.getItem("isSmall") === "yes") {
    localStorage.setItem("isSmall", "no");
    sidebarId.classList.remove("small-sidebar");
  } else {
    localStorage.setItem("isSmall", "yes");
    sidebarId.classList.add("small-sidebar");
  }
};









//==============خاص بأضهر الون الأحمر على القياسات الممسوحة===============
// deleted-script.js
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form[id^="delete-form-"]').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const actionUrl = form.action;
      fetch(actionUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      })
      .then(response => {
        if (response.ok) {
          window.location.reload(); // إعادة تحميل الصفحة بعد نجاح العملية
        } else {
          return response.json().then(data => {
            console.error('Error:', data);
          });
        }
      })
      .catch(error => console.error('Error:', error));
    });
  });
});
//////==============خاص بأضهر الون الأحمر على القياسات الممسوحة===============



// تكبير صورة الاوردر عند النقر عليها 

document.addEventListener('DOMContentLoaded', function() {
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');

  imageModal.addEventListener('show.bs.modal', function (event) {
    const triggerElement = event.relatedTarget; // العنصر الذي فتح المودال
    const imageUrl = triggerElement.getAttribute('src');
    modalImage.setAttribute('src', imageUrl);
  });
});