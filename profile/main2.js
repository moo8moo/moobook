let dev = document.querySelector('.dev');
        dev.onclick = function () {
            window.location.href = 'https://www.facebook.com/mohaned.nabel.5/?locale=ar_AR';

        }
        let contpost = document.querySelector('.contpost');
        let fileInput = document.getElementById('fileInput');
        let fileInput2 = document.getElementById('fileInput2');
        let big_img_div = document.querySelector('.big_img_div');
        let box_big_div = document.querySelector('.box_big_div');
        let cont_img_big = document.querySelector('.cont_img_big');
        let img_big = document.querySelector('.img_big');
        let img_sircle = document.querySelector('.img_sircle');
        let user_name = document.querySelector('.user_name');
        let cont_p_gh = document.querySelector('.cont_p_gh');
        let p_gh = document.querySelector('.p_gh');
        let p_sir_div = document.querySelector('.p_sir_div');
        let p_sir_iner = document.querySelector('.p_sir_iner');
        let cont_p_sir_div = document.querySelector('.cont_p_sir_div');
        let p_big1 = document.querySelector('.p_big1');
        let p_big2 = document.querySelector('.p_big2');
        let p_sir1 = document.querySelector('.p_sir1');
        let p_sir2 = document.querySelector('.p_sir2');
        let box_sir = document.querySelector('.box_sir');
        let x_sir = document.querySelector('.x_sir');
        let img_box_sir = document.querySelector('.img_box_sir');
        let box_gh = document.querySelector('.box_gh');
        let img_box_gh = document.querySelector('.img_box_gh');
        let x_gh = document.querySelector('.x_gh');
        let div_img_box_gh = document.querySelector('.div_img_box_gh');
        let translateValue = 0;

        p_big2.onclick = function () {
            alert('برجاء اختيار صورة ذات عرض اكبر من الطول');

            fileInput.click();
        };

        p_sir2.onclick = function () {
            fileInput2.click();
        };

        x_sir.onclick = function () {
            box_sir.style.display = 'none';
        };

        x_gh.onclick = function () {
            let trans = document.querySelectorAll('.trans');
            translateValue = 0;
            trans.forEach(function (e) {
                e.style.transition = '0ms';
                e.style.transform = `translateX(${translateValue}%)`;
            });
            box_gh.style.translate = '0px -1000px';
            box_gh.style.height='0%';

        };

        p_big1.onclick = function () {
            box_gh.style.translate = '0px 0px';
            box_gh.style.height='100%';
            img_box_gh.src = img_big.src;
        };

        let btn2 = document.querySelector('.btn2');
        let btn = document.querySelector('.btn');
        let cont_img_box = document.querySelector('.cont_img_box');

        fileInput.onchange = function () {
            let file = fileInput.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    let img = new Image();
                    img.onload = function () {
                        // Create a canvas to resize the image
                        let canvas = document.createElement('canvas');
                        let ctx = canvas.getContext('2d');

                        // Set canvas dimensions
                        let maxWidth = 800; // Adjust the width as needed
                        let scale = maxWidth / img.width;
                        canvas.width = maxWidth;
                        canvas.height = img.height * scale;

                        // Draw the image onto the canvas
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        // Get the resized image data URL
                        let resizedImage = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality as needed (0.7 is 70% quality)

                        // Create and append the new image element
                        let div_stor = document.createElement('div');
                        let stor = document.createElement('img');
                        stor.style.width = '100%';
                        stor.style.display = 'inline-block';
                        stor.style.verticalAlign = 'middle';
                        stor.style.lineHeight = 'normal';
                        stor.src = resizedImage;

                        div_stor.appendChild(stor);
                        div_stor.style.width = '100%';
                        div_stor.style.height = 'auto';
                        div_stor.style.flexShrink = '0';
                        div_stor.classList.add('trans');

                        const children = cont_img_box.children;
                        if (children.length >= 1) {
                            cont_img_box.insertBefore(div_stor, children[1] || null);
                        } else {
                            cont_img_box.appendChild(div_stor);
                        }

                        img_big.src = resizedImage;

                        // Save the image URLs in localStorage
                        let savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
                        savedImages.unshift(resizedImage); // Add new image at the start
                        localStorage.setItem('savedImages', JSON.stringify(savedImages));

                        location.reload();
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };

        btn.onclick = function () {
            if (translateValue > -100 * (document.querySelectorAll('.trans').length - 1)) {
                translateValue -= 100;
                let trans = document.querySelectorAll('.trans');
                trans.forEach(function (e) {
                    e.style.transition = '500ms';
                    e.style.transform = `translateX(${translateValue}%)`;
                });
            }
        };

        btn2.onclick = function () {
            if (translateValue < 0) {
                translateValue += 100;
                let trans = document.querySelectorAll('.trans');
                trans.forEach(function (e) {
                    e.style.transition = '500ms';
                    e.style.transform = `translateX(${translateValue}%)`;
                });
            }
        };

        fileInput2.onchange = function () {
            let file = fileInput2.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    let img = new Image();
                    img.onload = function () {
                        // تحديد أبعاد الصورة المطلوبة
                        let canvas = document.createElement('canvas');
                        let ctx = canvas.getContext('2d');
                        let maxWidth = 800; // العرض الأقصى الذي تريده
                        let maxHeight = 500; // الارتفاع الأقصى الذي تريده
                        let width = img.width;
                        let height = img.height;

                        // حساب النسب المناسبة لتصغير الصورة
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        // تعيين أبعاد الـ canvas
                        canvas.width = width;
                        canvas.height = height;

                        // رسم الصورة على الـ canvas
                        ctx.drawImage(img, 0, 0, width, height);

                        // تحويل الصورة إلى بيانات وتحديث الـ img_sircle
                        img_sircle.src = canvas.toDataURL('image/jpeg');
                        localStorage.setItem('storedImage', img_sircle.src);
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        p_sir1.onclick = function () {
            box_sir.style.display = 'flex';
            box_sir.style.justifyContent = 'center';
            box_sir.style.alignItems = 'center';
            img_box_sir.src = img_sircle.src;
            if (parseInt(img_box_sir.style.width) >= parseInt(img_box_sir.style.height)) {
                img_box_sir.style.width = '60%';
            } else {
                img_box_sir.style.height = '70%';
            }
        };

        user_name.textContent = localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name');
        img_sircle.src = localStorage.getItem('storedImage');

        img_sircle.onclick = function (e) {
            p_sir_div.style.translate = '0px 0px';
            p_sir_iner.style.translate = '0px 0px';
            cont_p_sir_div.style.zIndex = '2';
            e.stopPropagation();
            p_gh.style.translate = '0px -120px';
            cont_p_gh.style.translate = '0px -650px';
        };

        big_img_div.onclick = function (e) {
            cont_p_gh.style.translate = '0px 0px';
            p_gh.style.translate = '0px 0px';
            e.stopPropagation();
            p_sir_div.style.translate = '0px -800px';
            p_sir_iner.style.translate = '0px -110px';
            cont_p_sir_div.style.zIndex = '0';
        };

        document.onclick = function () {
            p_gh.style.translate = '0px -120px';
            cont_p_gh.style.translate = '0px -650px';
            p_sir_div.style.translate = '0px -800px';
            p_sir_iner.style.translate = '0px -110px';
            cont_p_sir_div.style.zIndex = '0';
        };

        window.onload = function () {
            if (localStorage.pool) {
                if (localStorage.pool === 'true') {
                    document.body.style.background = '#002635';
                    document.body.style.color = 'white';
                } else {
                    document.body.style.background = 'white';
                    document.body.style.color = 'black';
                }
            }

            let savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
            if (savedImages.length > 0) {
                img_big.src = savedImages[0]; // Show the most recent image

                // Clear the existing images
                cont_img_box.innerHTML = '';

                // Add images from localStorage
                savedImages.forEach(src => {
                    let div_stor = document.createElement('div');
                    let stor = document.createElement('img');
                    stor.style.width = '100%';
                    stor.style.display = 'inline-block';
                    stor.style.verticalAlign = 'middle';
                    stor.style.lineHeight = 'normal';
                    stor.src = src;

                    div_stor.appendChild(stor);
                    div_stor.style.width = '100%';
                    div_stor.style.height = 'auto';
                    div_stor.style.flexShrink = '0';
                    div_stor.classList.add('trans');

                    cont_img_box.appendChild(div_stor);
                });
            }

            let storedImage = localStorage.getItem('storedImage');
            if (storedImage) {
                img_sircle.src = storedImage;
            }
            else {
                img_sircle.src = '../mo.png';
            }

            displayPosts(savedPosts);
        };



        // استرجاع البيانات من localStorage
        let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        let likes = JSON.parse(localStorage.getItem('likes')) || {};
        let comments = JSON.parse(localStorage.getItem('comments')) || {};

        // دالة لعرض المنشورات
        function displayPosts(posts) {
            // تحديد العنصر الذي سيتم إضافة المنشورات إليه
            let contpost = document.getElementById('contpost');

            // التأكد من وجود العنصر
            if (!contpost) {
                console.error('Element with id "contpost" not found.');
                return;
            }

            posts.forEach(postData => {
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
                paner_post_img_div.classList.add('paner_post_img_div');
                let paner_post_img = document.createElement('img');
                paner_post_img.style.width = '40px';
                paner_post_img.src = profile(); // استرجاع الصورة الشخصية
                paner_post_img_div.appendChild(paner_post_img);

                let div_after_dot = document.createElement('div');
                div_after_dot.classList.add('div_after_dot');
                let div_after_dot_iner = document.createElement('div');
                div_after_dot_iner.textContent = 'حذف المنشور';
                div_after_dot_iner.classList.add('div_after_dot_iner');
                div_after_dot.appendChild(div_after_dot_iner);

                let paner_post_img_name = document.createElement('p');
                paner_post_img_name.classList.add('paner_post_img_name');
                paner_post_img_name.textContent = username(); // استرجاع اسم المستخدم

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

                // تحديد حالة الإعجاب من localStorage
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
                    } else if (img_comment.height > 400) {
                        img_comment.classList.add('width_300');
                    } else {
                        img_comment.classList.add('width_500');
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
                        img_paner_comment.src = profile(); // استرجاع الصورة الشخصية
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
                        img_paner_comment.src = profile(); // استرجاع الصورة الشخصية
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
        function f_name() {
            let f = localStorage.getItem('first_name');
            return f;
        }
