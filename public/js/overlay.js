// document.addEventListener('DOMContentLoaded', function () {
//     // إخفاء طبقة التحميل عند تحميل الصفحة لأول مرة
//     document.getElementById('loadingOverlay').style.display = 'none';

//     // وظيفة لإظهار طبقة التحميل وتعطيل الأزرار
//     function showLoading() {
//         document.getElementById('loadingOverlay').style.display = 'flex';
//         const buttons = document.querySelectorAll('button, input[type="submit"]');
//         buttons.forEach(btn => btn.disabled = true);
//     }

//     // وظيفة لإخفاء طبقة التحميل وإعادة تفعيل الأزرار
//     function hideLoading() {
//         document.getElementById('loadingOverlay').style.display = 'none';
//         const buttons = document.querySelectorAll('button, input[type="submit"]');
//         buttons.forEach(btn => btn.disabled = false);
//     }

//     // استخدام jQuery لمراقبة جميع طلبات AJAX
//     $(document).ajaxStart(function () {
//         showLoading();
//     }).ajaxStop(function () {
//         hideLoading();
//     });

//     // إعادة تعريف fetch لمراقبة جميع الطلبات
//     const originalFetch = window.fetch;
//     window.fetch = function(...args) {
//         showLoading();
//         return originalFetch.apply(this, args).then(response => {
//             hideLoading();
//             return response;
//         }).catch(error => {
//             hideLoading();
//             throw error;
//         });
//     };

//     // استهداف جميع النماذج لمراقبة إرسالها
//     $('form').on('submit', function(e) {
//         showLoading();
//     });
// });












document.addEventListener('DOMContentLoaded', function () {
    // إخفاء طبقة التحميل عند تحميل الصفحة لأول مرة
    document.getElementById('loadingOverlay').style.display = 'none';

    // وظيفة لإظهار طبقة التحميل وتعطيل الأزرار
    function showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
        const buttons = document.querySelectorAll('button, input[type="submit"]');
        buttons.forEach(btn => btn.disabled = true);
    }

    // وظيفة لإخفاء طبقة التحميل وإعادة تفعيل الأزرار
    function hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
        const buttons = document.querySelectorAll('button, input[type="submit"]');
        buttons.forEach(btn => btn.disabled = false);
    }

    // استخدام jQuery لمراقبة جميع طلبات AJAX
    $(document).ajaxStart(function () {
        showLoading();
    }).ajaxStop(function () {
        hideLoading();
    });

    // إعادة تعريف fetch لمراقبة جميع الطلبات
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        showLoading();
        return originalFetch.apply(this, args).then(response => {
            hideLoading();
            return response;
        }).catch(error => {
            hideLoading();
            throw error;
        });
    };

    // استهداف جميع النماذج لمراقبة إرسالها
    $('form').on('submit', function(e) {
        showLoading();
    });
});

