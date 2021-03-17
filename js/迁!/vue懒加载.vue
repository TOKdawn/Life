

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
            img {
                width: 100%;
                height: 300px;
            }
        </style>
    </head>
    <body>
        <div id="app">
            <p v-for="item in imgs" :key="item">
                <img v-lazyload="item">
            </p>
        </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script>
        Vue.directive("lazyload", {
            // 指令的定义
            bind: function(el, binding) {
                let lazyImageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry, index) => {
                        let lazyImage = entry.target;
                        // 相交率，默认是相对于浏览器视窗
                        if(entry.intersectionRatio > 0) {
                            lazyImage.src = binding.value;
                            // 当前图片加载完之后需要去掉监听
                            lazyImageObserver.unobserve(lazyImage);
                        }

                    })
                })
                lazyImageObserver.observe(el);
            },
        });
        var app = new Vue({
            el: "#app",
            data: {
                imgs: [
                    'https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1590657907683.jpeg',
                    'https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1590657913523.jpeg',
                    'https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1590657925550.jpeg',
                    'https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1590657930289.jpeg',
                    'https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1590657934750.jpeg',
                    'https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1590657918315.jpeg',
                ]
            },
        });
    </script>
