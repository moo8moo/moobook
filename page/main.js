let main = document.querySelector('.main');
let btn = document.getElementById('btn');
let cont = document.querySelector('.bubbled-rectangle');
let sid = document.querySelectorAll('.sid');
let sidbar = document.querySelector('.sidbar');
let box = document.querySelector('.box-sh');
let tl = document.getElementById('tl');
let wel = document.querySelector('.wel');
const textarea = document.getElementById('auto-resize-textarea');
let log = document.getElementById('log-o');
let paner = document.querySelector('.paner');
let uploadImageButton = document.getElementById('upload-image-button');
let imageInput = document.getElementById('image-input');
let imgPost = document.getElementById('img-post');
let nshr = document.querySelector('.nshr');
let contpost = document.querySelector('.contpost');
let cancel = document.querySelector('.cancel');
let bell = document.querySelector('.bell');
let not = document.querySelector('.not');



bell.onclick = function (event) {
    not.classList.toggle('hight_50');
    event.stopPropagation();

}
cancel.onclick = function () {
    textarea.value = '';
    cancel.style.display = 'none';
    imgPost.innerHTML = '';
}
log.onclick = function () {
    location.replace('../index.html');
}

textarea.addEventListener('input', () => {
    autoResize();
    if (textarea.value === '') {
        cancel.style.display = 'none';
    } else {
        cancel.style.display = 'inline';
    }
});

function autoResize() {
    textarea.style.height = 'fit-content';
    textarea.style.height = textarea.scrollHeight + 'px';
}

uploadImageButton.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                // Create a canvas element
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas dimensions to match image dimensions
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the image on the canvas
                ctx.drawImage(img, 0, 0);

                // Compress the image to reduce size (you can adjust the quality parameter)
                const compressedImage = canvas.toDataURL('image/jpeg', 0.5); // Quality between 0 and 1

                // Store compressed image in Local Storage
                localStorage.setItem('compressedImage', compressedImage);

                // Create and display the image element
                const imgElement = document.createElement('img');
                imgElement.src = compressedImage;
                imgElement.style.width = '100%';
                imgElement.style.maxHeight = '100%';
                imgElement.style.borderRadius = '10px';
                imgPost.innerHTML = '';
                imgPost.appendChild(imgElement);
                cancel.style.display = 'inline';
            };
        };
        reader.readAsDataURL(file);
    }
});

let likes = JSON.parse(localStorage.getItem('likes')) || {};

nshr.onclick = function () {
    cancel.style.display = 'none';
    let post = document.createElement('div');
    post.classList.add('post');

    let text = textarea.value.trim(); // إزالة المسافات الفارغة من النص
    let imgSrc = imgPost.querySelector('img') ? imgPost.querySelector('img').src : '';

    // شرط للتحقق من أن textarea تحتوي على حرف واحد على الأقل أو imgSrc ليس فارغاً
    if (text.length === 0 && !imgSrc) {
        alert("يرجى إدخال نص أو اختيار صورة قبل النشر.");
        return; // إنهاء الوظيفة إذا لم يتحقق أي من الشرطين
    }

    let postContent = document.createElement('div');
    postContent.innerHTML = `<p>${text}</p>`;
    postContent.style.margin = '0px';
    postContent.style.height = 'auto';

    if (imgSrc) {
        let img = document.createElement('img');
        img.src = imgSrc;
        img.style.width = '100%';
        img.style.maxHeight = '600px';
        img.style.borderRadius = '10px';
        img.style.margin = '0px';
        postContent.appendChild(img);
    }

    let paner_post = document.createElement('div');
    paner_post.classList.add('paner-post');
    let paner_post_img_div = document.createElement('div');
    paner_post_img_div.classList.add('paner_post_img_div');
    let paner_post_img = document.createElement('img');
    paner_post_img.style.width = '40px';
    paner_post_img.style.height = '45px';
    paner_post_img.src = "mu f.jpg";
    paner_post_img_div.appendChild(paner_post_img);
    paner_post.appendChild(paner_post_img_div);

    let paner_post_img_name = document.createElement('p');
    paner_post_img_name.classList.add('paner_post_img_name');
    paner_post_img_name.textContent = 'mohaned nabel';

    paner_post.appendChild(paner_post_img_name);

    let three_dot = document.createElement('button');
    three_dot.classList.add('fas', 'fa-ellipsis-h', 'three-dot');
    paner_post.appendChild(three_dot);

    let div_after_dot = document.createElement('div');
    div_after_dot.classList.add('div_after_dot');
    let div_after_dot_iner = document.createElement('div');
    div_after_dot_iner.textContent = 'حذف المنشور';
    div_after_dot_iner.classList.add('div_after_dot_iner');
    div_after_dot.appendChild(div_after_dot_iner);

    let bottom_post = document.createElement('div');
    bottom_post.classList.add('bottom_post');
    let div_like = document.createElement('div');
    div_like.textContent = 'اعجبني';
    div_like.classList.add('div_like');
    let div_comment = document.createElement('div');
    div_comment.textContent = 'تعليق';
    div_comment.classList.add('div_comment');
    bottom_post.appendChild(div_like);
    bottom_post.appendChild(div_comment);

    let like_result = document.createElement('p');
    like_result.textContent = 'لقد قمت بالتفاعل برمز الاعجاب على هذا المنشور';
    like_result.style.display = 'none'; // اخفائه في البداية
    like_result.classList.add('like_result');


    post.appendChild(div_after_dot);
    post.appendChild(paner_post);
    post.appendChild(postContent);
    post.appendChild(like_result);
    post.appendChild(bottom_post);
    contpost.appendChild(post);

    // إضافة المنشور في أعلى القائمة
    if (contpost.firstChild) {
        contpost.insertBefore(post, contpost.firstChild);
    } else {
        contpost.appendChild(post);
    }

    // حفظ المنشور في localStorage
    let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    let postId = Date.now(); // استخدام timestamp كمعرف فريد
    savedPosts.unshift({ id: postId, text, imgSrc });
    localStorage.setItem('posts', JSON.stringify(savedPosts));

    // Clear the textarea and image
    textarea.value = '';
    imgPost.innerHTML = '';

    // Add event listeners for dynamic content
    document.addEventListener('click', function (event) {
        if (!div_after_dot_iner.contains(event.target)) {
            div_after_dot_iner.style.transform = 'translate(0px, -50px)';
            div_after_dot.style.transform = 'translate(0px, 0px)';
        }
    });

    three_dot.addEventListener('click', function (event) {
        div_after_dot_iner.style.transform = 'translate(-10px, 50px)';
        div_after_dot.style.display = "block";
        event.stopPropagation();
    });

    div_after_dot_iner.onclick = function () {
        post.remove();

        // إزالة المنشور من localStorage
        savedPosts = savedPosts.filter(p => p.id !== postId);
        localStorage.setItem('posts', JSON.stringify(savedPosts));
    };

    div_like.onclick = function () {
        let postIndex = savedPosts.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
            if (likes[postId] === false || likes[postId] === undefined) {
                likes[postId] = true;
                like_result.style.display = 'block';
                like_result.style.color = 'green';
                div_like.style.color = '#00ff4c';
            } else {
                likes[postId] = false;
                like_result.style.display = 'none';
                div_like.style.color = 'white';
            }
            localStorage.setItem('likes', JSON.stringify(likes));
        }
    };
    window.location.reload();


}
window.onload = function () {
    // إعداد التهيئة
    wel.style.height = '50px';
    setTimeout(function () {
        wel.style.height = '0px';
    }, 2000);

    // تحميل المنشورات والإعجابات من localStorage
    let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    let likes = JSON.parse(localStorage.getItem('likes')) || {};
    let comments = JSON.parse(localStorage.getItem('comments')) || {};

    savedPosts.forEach(postData => {
        let post = document.createElement('div');
        post.classList.add('post');

        let img = document.createElement('img');
        img.style.position = 'relative';
        img.style.zIndex = '0';
        img.style.opacity = '.98';
        img.style.cursor = 'pointer';

        let postContent = document.createElement('div');
        postContent.innerHTML = `<p>${postData.text}</p>`;
        if (postData.imgSrc) {
            img.src = postData.imgSrc;
            img.style.width = '100%';
            img.style.maxHeight = '600px';
            img.style.borderRadius = '10px';
            postContent.appendChild(img);
        }

        let paner_post = document.createElement('div');
        paner_post.classList.add('paner-post');
        let three_dot = document.createElement('button');
        three_dot.classList.add('fas', 'fa-ellipsis-h', 'three-dot');

        let paner_post_img_div = document.createElement('div');
        paner_post_img_div.onclick=function(){
            head_img.click();
        }
        paner_post_img_div.classList.add('paner_post_img_div');
        let paner_post_img = document.createElement('img');
        paner_post_img.style.width = '40px';
        let pro = profile();
        paner_post_img.src = pro;
        paner_post_img_div.appendChild(paner_post_img);

        let div_after_dot = document.createElement('div');
        div_after_dot.classList.add('div_after_dot');
        let div_after_dot_iner = document.createElement('div');
        div_after_dot_iner.textContent = 'حذف المنشور';
        div_after_dot_iner.classList.add('div_after_dot_iner');
        div_after_dot.appendChild(div_after_dot_iner);

        let paner_post_img_name = document.createElement('p');
        paner_post_img_name.onclick=function(){
            head_img.click();
        }
        paner_post_img_name.classList.add('paner_post_img_name');
        paner_post_img_name.textContent = username();

        paner_post.appendChild(paner_post_img_div);
        paner_post.appendChild(paner_post_img_name);
        paner_post.appendChild(three_dot);

        let bottom_post = document.createElement('div');
        bottom_post.classList.add('bottom_post');
        let div_like = document.createElement('div');
        div_like.classList.add('div_like', 'fa', 'fa-thumbs-up');
        let div_comment = document.createElement('div');
        div_comment.classList.add('div_comment', 'fas', 'fa-comment');
        div_comment.style.color = 'white';
        bottom_post.appendChild(div_like);
        bottom_post.appendChild(div_comment);

        let like_result = document.createElement('p');
        like_result.classList.add('like_result');
        like_result.textContent = 'لقد قمت بالتفاعل برمز الاعجاب على هذا المنشور';

        // استخدام معرف المنشور (أو الفهرس) لتحديد حالة "أعجبني" في localStorage
        if (likes[postData.id] === false || likes[postData.id] === undefined) {
            like_result.style.display = 'none';
            div_like.style.color = 'white';
        } else {
            like_result.style.display = 'block';
            like_result.style.color = 'green';
            div_like.style.color = '#00ff4c';
        }

        let comment_result = document.createElement('div');
        comment_result.classList.add('comment_result');
        let img_comment = document.createElement('img');
        img_comment.classList.add('img_comment');
        img_comment.src = img.src;

        // تطبيق الشروط لتعديل عرض وطول الصورة
        img_comment.onload = function () {
            if (img_comment.width > 800) {
                img_comment.classList.add('hight_300');
                // img_comment.style.objectFit = 'cover';
            } else if (img_comment.height > 400) {
                img_comment.classList.add('width_300');
                // img_comment.style.objectFit = 'cover';
            } else {
                img_comment.classList.add('width_500');
                // img_comment.style.height = 'auto';
            }
        };

        let inp_comment = document.createElement('input');
        inp_comment.placeholder = "اكتب تعليقا";
        inp_comment.classList.add('inp_comment');

        let inp_btn_comment = document.createElement('button');
        inp_btn_comment.classList.add('fas', 'fa-chevron-circle-right', 'inp_btn_comment');

        let x = document.createElement('button');
        x.textContent = 'x';
        x.classList.add('x');

        let br = document.createElement('br');

        let cont_comment = document.createElement('div');
        cont_comment.style.width = "70%";
        cont_comment.style.borderRadius = '15px';
        cont_comment.style.color = 'white';
        cont_comment.style.marginLeft = '9%';
        cont_comment.style.marginBottom = '90px';

        inp_btn_comment.onclick = function () {
            if (inp_comment.value !== '') {
                let comment = inp_comment.value;

                let paner_cont_comment = document.createElement('div');

                let img_paner_comment = document.createElement('img');
                let pro = profile();
                img_paner_comment.src = pro;
                img_paner_comment.style.width = '30px';

                let img_paner_comment_div = document.createElement('div');
                img_paner_comment_div.style.width = '30px';
                img_paner_comment_div.style.height = '30px';
                img_paner_comment_div.style.overflow = 'hidden';
                img_paner_comment_div.style.borderRadius = '50%';
                img_paner_comment_div.appendChild(img_paner_comment);

                let name_paner_comment = document.createElement('p');
                name_paner_comment.textContent = username();
                name_paner_comment.style.color = '#00ffea';

                paner_cont_comment.appendChild(img_paner_comment_div);
                paner_cont_comment.appendChild(name_paner_comment);
                paner_cont_comment.style.display = 'flex';
                paner_cont_comment.style.alignItems = 'center';
                paner_cont_comment.style.gap = '5px';
                paner_cont_comment.style.width = '100%';

                let tex_comment = document.createElement('p');
                tex_comment.style.display = 'flex';
                tex_comment.style.flexWrap = 'wrap';
                tex_comment.style.justifyContent = 'flex-start';
                tex_comment.style.padding = '10px';
                tex_comment.style.width = 'fit-content';
                tex_comment.style.background = '#00537a';
                tex_comment.style.borderRadius = '10px';
                tex_comment.style.marginTop = '-8px';
                tex_comment.textContent = comment;

                cont_comment.appendChild(paner_cont_comment);
                cont_comment.appendChild(br);
                cont_comment.appendChild(tex_comment);

                comment_result.scrollTop = comment_result.scrollHeight;

                inp_comment.value = '';

                // حفظ التعليقات في localStorage
                if (!comments[postData.id]) {
                    comments[postData.id] = [];
                }
                comments[postData.id].push(comment);
                localStorage.setItem('comments', JSON.stringify(comments));
            }
        }

        let tl_comment = document.createElement('h2');
        tl_comment.textContent = 'التعليقات';
        tl_comment.style.color = 'white';

        comment_result.appendChild(img_comment);
        comment_result.appendChild(br);
        comment_result.appendChild(tl_comment);
        comment_result.appendChild(inp_comment);
        comment_result.appendChild(inp_btn_comment);
        comment_result.appendChild(x);
        comment_result.appendChild(br);
        comment_result.appendChild(cont_comment);

        // تحميل التعليقات المحفوظة من localStorage
        if (comments[postData.id]) {
            comments[postData.id].forEach(comment => {
                let paner_cont_comment = document.createElement('div');

                let img_paner_comment = document.createElement('img');
                let pro = profile();
                img_paner_comment.src = pro;
                img_paner_comment.style.width = '30px';

                let img_paner_comment_div = document.createElement('div');
                img_paner_comment_div.style.width = '30px';
                img_paner_comment_div.style.height = '30px';
                img_paner_comment_div.style.overflow = 'hidden';
                img_paner_comment_div.style.borderRadius = '50%';
                img_paner_comment_div.appendChild(img_paner_comment);

                let name_paner_comment = document.createElement('p');
                name_paner_comment.textContent = username();
                name_paner_comment.style.color = '#00ffea';

                paner_cont_comment.appendChild(img_paner_comment_div);
                paner_cont_comment.appendChild(name_paner_comment);
                paner_cont_comment.style.display = 'flex';
                paner_cont_comment.style.alignItems = 'center';
                paner_cont_comment.style.gap = '5px';
                paner_cont_comment.style.width = '100%';

                let tex_comment = document.createElement('p');
                tex_comment.style.display = 'flex';
                tex_comment.style.flexWrap = 'wrap';
                tex_comment.style.justifyContent = 'flex-start';
                tex_comment.style.padding = '10px';
                tex_comment.style.width = 'fit-content';
                tex_comment.style.background = '#00537a';
                tex_comment.style.borderRadius = '10px';
                tex_comment.style.marginTop = '-8px';
                tex_comment.textContent = comment;

                cont_comment.appendChild(paner_cont_comment);
                cont_comment.appendChild(br);
                cont_comment.appendChild(tex_comment);
            });
        }

        post.appendChild(div_after_dot);
        post.appendChild(paner_post);
        post.appendChild(postContent);
        post.appendChild(like_result);
        post.appendChild(bottom_post);
        contpost.appendChild(post);
        contpost.appendChild(comment_result);

        x.onclick = function () {
            comment_result.style.display = 'none';
        }

        img.onclick = function () {
            div_comment.click();
        }

        div_comment.onclick = function () {
            comment_result.style.display = 'flex';
        }

        div_like.onclick = function () {
            if (likes[postData.id] === false || likes[postData.id] === undefined) {
                likes[postData.id] = true;
                like_result.style.display = 'block';
                like_result.style.color = 'green';
                div_like.style.color = '#00ff4c';
            } else {
                likes[postData.id] = false;
                like_result.style.display = 'none';
                div_like.style.color = 'white';
            }
            localStorage.setItem('likes', JSON.stringify(likes));
        };

        document.addEventListener('click', function (event) {
            if (!div_after_dot_iner.contains(event.target)) {
                div_after_dot_iner.style.transform = 'translate(0px, -50px)';
                div_after_dot.style.transform = 'translate(0px, 0px)';
                not.classList.remove('hight_50');
                not.classList.add('no_hight');
            }
            div_after_dot.style.zIndex = '0';
        });

        three_dot.addEventListener('click', function (event) {
            div_after_dot_iner.style.transform = 'translate(-10px, 50px)';
            div_after_dot.style.display = "block";
            div_after_dot_iner.onclick = function () {
                post.remove();

                // إزالة المنشور من localStorage
                savedPosts = savedPosts.filter(p => p.id !== postData.id);
                localStorage.setItem('posts', JSON.stringify(savedPosts));
            };
            event.stopPropagation();
            div_after_dot.style.zIndex = '2';
        });
    });

    // إعداد الوضع الداكن أو الفاتح بناءً على localStorage
    if (localStorage.pool) {
        let m = JSON.parse(localStorage.pool);
        if (m === true) {
            btn.classList.add('trn');
            main.classList.add('mod');
            document.body.style.color = 'white';
            tl.style.color = 'white';
            sidbar.classList.remove('light');
            sidbar.classList.add('dark');
            sid.forEach(button => button.classList.add('sid-dark'));
            paner.style.background = '#032c4d';
        } else {
            document.body.style.color = 'black';
            tl.style.color = '#08324d';
            sidbar.classList.add('light');
            sid.forEach(button => button.classList.add('sid-light'));
            paner.style.background = 'white';
        }
    } else {
        document.body.style.color = 'black';
        tl.style.color = 'black';
        sidbar.classList.add('light');
        sid.forEach(button => button.classList.add('sid-light'));
    }
};
window.addEventListener('storage', function (event) {
    if (event.key === 'posts' || event.key === 'likes' || event.key === 'comments') {
        loadPostsAndSettings();  // إعادة تحميل المنشورات والإعجابات والتعليقات
    } else if (event.key === 'pool') {
        applyDarkMode(JSON.parse(event.newValue));  // تحديث الوضع الداكن/الفاتح
    }
});
cont.addEventListener('click', () => {
    if (!btn.classList.contains('trn')) {
        btn.classList.add('trn');
        main.classList.add('mod');
        document.body.style.color = 'white';
        tl.style.color = 'white';
        sidbar.classList.remove('light');
        sidbar.classList.add('dark');
        sid.forEach(button => {
            button.classList.remove('sid-light');
            button.classList.add('sid-dark');
        });
        paner.style.background = '#032c4d';
        localStorage.setItem('pool', true);
    } else {
        btn.classList.remove('trn');
        main.classList.remove('mod');
        document.body.style.color = 'black';
        tl.style.color = '#08324d';
        sidbar.classList.remove('dark');
        sidbar.classList.add('light');
        sid.forEach(button => {
            button.classList.remove('sid-dark');
            button.classList.add('sid-light');
        });
        paner.style.background = 'white';
        localStorage.setItem('pool', false);
    }
});

sid[0].addEventListener('click', () => {
    if (sidbar.classList.contains('open')) {
        sidbar.classList.remove('open');
        box.classList.remove('iso');
        box.style.opacity = '0';
    } else {
        sidbar.classList.add('open');
        box.classList.add('iso');
        box.style.opacity = '1';
    }
});

box.addEventListener('click', () => {
    if (sidbar.classList.contains('open')) {
        sidbar.classList.remove('open');
        box.classList.remove('iso');
        box.style.opacity = '0';
    }
});
let scroll_up = document.querySelector('.scroll_up');
let lastScrollTop = 0; // Variable to keep track of the last scroll position

window.addEventListener('scroll', function () {
    let currentScrollTop = window.scrollY;

    if (currentScrollTop >= 500) {
        scroll_up.style.display = 'block';
        if (currentScrollTop < lastScrollTop) {
            // Scrolling up
            scroll_up.style.display = 'none';
        }
    } else {
        scroll_up.style.display = 'none';
    }

    // Update the last scroll position
    lastScrollTop = currentScrollTop;
});

scroll_up.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function profile() {
    // استرجاع URL الصورة من localStorage أو من مصدر آخر
    const storedImage = localStorage.getItem('storedImage');
    return storedImage || 'mu f.jpg'; // عودة صورة افتراضية إذا لم تكن هناك صورة محفوظة
}
function username() {
    let f = localStorage.getItem('first_name');
    let l = localStorage.getItem('last_name');
    let u = f + ' ' + l;
    return u;
}
function f_name(){
    let f = localStorage.getItem('first_name');
    return f;
}

if (localStorage.getItem('profileImageUrl')) {
    let pro = profile();
    let img1 = document.querySelector('.img1');
    img1.src = pro;
}
else {
    let pro = profile();
    let img1 = document.querySelector('.img1');
    img1.src = pro;
}
let user1=document.querySelector('.user1');
user1.textContent=f_name()+" ";
let head_img=document.querySelector('.profile_img');
head_img.onclick=function(){
    window.location.href='../profile/index.html';
}
let pp=document.querySelector('.pp');
pp.onclick=function(){

    head_img.click();
}