(async function () {
    const TxSourceMap = {
        "庆余年": {
            "mod": "https://v.qq.com/x/cover/${cid}/${id}.html",
            "cid": "rjae621myqca41h",
            "ids": ["", "i0032qxbi2v", "j0032ubhl9s", "x0032o977cc", "k00329wv1ed", "t00329rbass", "y00326sr9vu", "y0032tb125l", "x00323jocrm", "m0032minvpq", "h0032kvzna4", "w0032ao1l6o", "v0032w9abwz", "l00323w4dhs", "p0032ylqkg4", "n0032mibckr", "l0033tr603q", "b0033kl134e", "x003341ds7b", "b00335ig86b", "i0033tw7pdn", "h0033evbn3l", "g00336gt00t", "w00336u0t1b", "z0033e6jyez", "w0033y11w1w", "c0033vaqexb", "k00331cqhio", "s0033qy3cr5", "c00339ka821", "z00335p6vbp", "k00334tnhys", "u003383gn30", "i0033o58mal", "o0033cp869i", "u0033m2j2uk", "i0033dpqxcu", "l0033n4arkh", "j0033p7curk", "v0033usud3k", "e003358h201", "b0033pcu7u1", "l0033cu565q", "a0033nbp009", "t0033bfj2ht", "e0033n97pay", "c0033527yjb"]
        },
        "庆余年 2": {
            "mod": "https://v.qq.com/x/cover/${cid}/${id}.html",
            "cid": "mzc002002kqssyu",
            "ids": ["", "q4100dpkd26", "r41009c9bf8", "s4100tpjpqt", "i4100pwzegu", "k4100m6fkxe", "h41009lvvhp", "c41003z45rt", "q4100vjztwh", "h41007emir3", "y41008gkoak", "y4100tslthh", "v41005or9x2", "y4100b7e2u0", "s4100fe968p", "m4100zj801z", "a4100almzhi", "d4100ndr5u0", "s410065aohl", "r4100lz2t5w", "w4100htt7as", "r4100xwke3z", "v4100dxf2pt", "f4100ar6ujy", "s4100jnna4d", "m4100u2dlv1", "x4100mukwbg", "y4100wiglir", "u4100y9fr1g", "z4100poa1e3", "b41007m5t4f", "m41009c49n6", "n41008agtwj", "u41002awauf", "q4100wnb5v5", "y4100ti88dd", "z4100cql8fi", "l410003djjv", "s4100yr0myz", "g4100j95894", "z4100bkeict", "u4100qdzpps", "i410061iqyq", "x4100wrlrtq", "v4100wryelh", "t4100bovxg4", "o4100jmqj01", "o4100eb4inc", "v41005xsrxr"]
        }
    }
    "use strict";
    const check_interval = 200;
    // 0:当前状态关闭 1:当前状态打开
    const danmaku_icons = ["\uE0B9", "\uE7A2"];
    const fontSize_icon =
        '<svg t="1707762095726" class="icon" viewBox="0 0 1064 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3633" width="24" height="24"><path d="M495.73888 195.91168a30.72 30.72 0 0 0-55.37792 2.2528L139.22304 900.79232a51.2 51.2 0 0 1-94.12608-40.30464L346.23488 157.81888c44.07296-102.8096 187.63776-108.70784 240.0256-9.8304l104.12032 196.68992a51.2 51.2 0 1 1-90.5216 47.9232l-104.12032-196.68992zM779.75552 570.28608c-10.36288-26.46016-47.9232-25.84576-57.50784 0.86016l-131.31776 367.65696a51.2 51.2 0 0 1-96.41984-34.4064l131.31776-367.65696c41.3696-115.87584 204.26752-118.3744 249.2416-3.93216l145.408 370.0736a51.2 51.2 0 1 1-95.31392 37.43744l-145.408-370.03264z" fill="#ffffff" p-id="3634" data-spm-anchor-id="a313x.search_index.0.i12.73ca3a81uN587a" class="selected"></path><path d="M163.84 593.92c0-28.2624 22.9376-51.2 51.2-51.2h266.24a51.2 51.2 0 1 1 0 102.4h-266.24c-28.2624 0-51.2-22.9376-51.2-51.2zM573.44 778.24c0-28.2624 22.9376-51.2 51.2-51.2h266.24a51.2 51.2 0 1 1 0 102.4h-266.24c-28.2624 0-51.2-22.9376-51.2-51.2z" fill="#ffffff" p-id="3635" data-spm-anchor-id="a313x.search_index.0.i13.73ca3a81uN587a" class="selected"></path></svg>';
    const filter_icons = ["\uE3E0", "\uE3D0", "\uE3D1", "\uE3D2"];
    const buttonOptions = {
        class: "paper-icon-button-light",
        is: "paper-icon-button-light",
    };
    const uiAnchorStr = "\uE034";
    const mediaContainerQueryStr = "body > div.view-videoosd-videoosd";
    const mediaQueryStr = "video";

    const fontSize_Setting = parseInt(
        window.localStorage.getItem("danmakuFontSize") ?
            window.localStorage.getItem("danmakuFontSize") :
            20
    );

    const displayButtonOpts = {
        title: "弹幕开关",
        id: "displayDanmaku",
        innerText: null,
        onclick: () => {
            if (window.ede.loading) {
                console.log("正在加载,请稍后再试");
                return;
            }
            console.log("切换弹幕开关");
            window.ede.danmakuSwitch = (window.ede.danmakuSwitch + 1) % 2;
            window.localStorage.setItem(
                "danmakuSwitch",
                window.ede.danmakuSwitch
            );
            document.querySelector("#displayDanmaku")
                .children[0].innerHTML =
                danmaku_icons[window.ede.danmakuSwitch];
            if (window.ede.danmaku) {
                window.ede.danmakuSwitch == 1 ?
                    window.ede.danmaku.show() :
                    window.ede.danmaku.hide();
            }
        },
    };

    const fontSizeSetting = {
        title: "字体大小",
        id: "fontSizeSetting",
        innerText: fontSize_icon,
        onclick: () => {
            let nowSize = parseInt(window.localStorage.getItem("danmakuFontSize"));
            if (isNaN(nowSize) || nowSize > 40) {
                nowSize = 20;
            } else {
                nowSize = nowSize + 5;
            }
            window.localStorage.setItem("danmakuFontSize", nowSize);
            console.log("修改弹幕字体大小,当前大小 : " + nowSize);
            document.querySelector("#fontSizeSetting").title = "字体大小(当前大小:" + nowSize + ")";
        },
    };

    const filterButtonOpts = {
        title: "过滤等级(下次加载生效)",
        id: "filteringDanmaku",
        innerText: null,
        onclick: () => {
            let level = window.localStorage.getItem("danmakuFilterLevel");
            level = ((level ? parseInt(level) : 0) + 1) % 4;
            console.log("切换弹幕过滤等级 : " + level);
            window.localStorage.setItem("danmakuFilterLevel", level);
            document.querySelector("#filteringDanmaku")
                .children[0].innerText =
                filter_icons[level];
        },
    };

    // ------ configs end------
    /* eslint-disable */
    /* https://cdn.jsdelivr.net/npm/danmaku/dist/danmaku.min.js */
    // prettier-ignore
    /*
       /* eslint-enable */

    class EDE {
        constructor() {
            this.chConvert = 1;
            if (window.localStorage.getItem('chConvert')) {
                this.chConvert = window.localStorage.getItem('chConvert');
            }
            // 0:当前状态关闭 1:当前状态打开
            this.danmakuSwitch = 1;
            if (window.localStorage.getItem('danmakuSwitch')) {
                this.danmakuSwitch = parseInt(window.localStorage.getItem('danmakuSwitch'));
            }
            this.danmaku = null;
            this.episode_info = null;
            this.ob = null;
            this.loading = false;
        }
    }

    function createButton(opt) {
        let button = document.createElement("button", buttonOptions);
        button.setAttribute("title", opt.title);
        button.setAttribute("id", opt.id);
        let icon = document.createElement("span");
        icon.className = "md-icon";
        icon.innerHTML = opt.innerText;
        button.appendChild(icon);
        button.onclick = opt.onclick;
        return button;
    }

    function initListener() {
        let container = document.querySelector(mediaQueryStr);
        // 页面未加载
        if (!container) {
            if (window.ede.episode_info) {
                window.ede.episode_info = null;
            }
            return;
        }
        if (!container.getAttribute("ede_listening")) {
            console.log("正在初始化Listener");
            container.setAttribute("ede_listening", true);
            container.addEventListener("play", reloadDanmaku);
            console.log("Listener初始化完成");
            reloadDanmaku("reload");
        }
    }

    function getElementsByInnerText(
        tagType,
        innerStr,
        excludeChildNode = true
    ) {
        var temp = [];
        var elements = document.getElementsByTagName(tagType);
        if (!elements || 0 == elements.length) {
            return temp;
        }
        for (let index = 0; index < elements.length; index++) {
            var e = elements[index];
            if (e.innerText.includes(innerStr)) {
                temp.push(e);
            }
        }
        if (!excludeChildNode) {
            return temp;
        }
        var res = [];
        temp.forEach((e) => {
            var e_copy = e.cloneNode(true);
            while (e_copy.firstChild != e_copy.lastChild) {
                e_copy.removeChild(e_copy.lastChild);
            }
            if (e_copy.innerText.includes(innerStr)) {
                res.push(e);
            }
        });
        return res;
    }

    function initUI() {
        // 页面未加载
        let uiAnchor = getElementsByInnerText("i", uiAnchorStr);
        if (!uiAnchor || !uiAnchor[0]) {
            return;
        }
        // 已初始化
        if (document.getElementById("danmakuCtr")) {
            return;
        }
        console.log("正在初始化UI");
        // 弹幕按钮容器div
        let parent = uiAnchor[0].parentNode.parentNode.parentNode;
        let menubar = document.createElement("div");
        menubar.id = "danmakuCtr";
        if (!window.ede.episode_info) {
            menubar.style.opacity = 0.5;
        }
        parent.append(menubar);
        // 弹幕开关
        displayButtonOpts.innerText = danmaku_icons[window.ede.danmakuSwitch];
        menubar.appendChild(createButton(displayButtonOpts));
        // 屏蔽等级
        filterButtonOpts.innerText =
            filter_icons[
                parseInt(
                    window.localStorage.getItem("danmakuFilterLevel") ?
                        window.localStorage.getItem("danmakuFilterLevel") :
                        0
                )
                ];
        menubar.appendChild(createButton(filterButtonOpts));
        //字体大小
        menubar.appendChild(createButton(fontSizeSetting));
        console.log("UI初始化完成");
    }

    function getEmbyItemInfo() {
        if (location.hash != "#!/videoosd/videoosd.html") {
            return null;
        }
        return window.require(["pluginManager"])
            .then((items) => {
                if (items) {
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        if (item.pluginsList) {
                            for (let j = 0; j < item.pluginsList.length; j++) {
                                const plugin = item.pluginsList[j];
                                if (plugin && plugin.id == "htmlvideoplayer") {
                                    return plugin._currentPlayOptions ?
                                        plugin._currentPlayOptions.item :
                                        null;
                                }
                            }
                        }
                    }
                }
                return null;
            });
    }

    async function getEpisodeInfo(is_auto = true) {
        let item = await getEmbyItemInfo();
        if (!item) {
            return null;
        }
        if (item.Type == "TvChannel") {
            return null;
        }
        let _id;
        let animeName;
        let anime_id = -1;
        let episode;
        if (item.Type == "Episode") {
            _id = item.SeasonId;
            animeName = item.SeriesName;
            episode = item.IndexNumber;
            let session = item.ParentIndexNumber;
            if (session != 1) {
                animeName += " " + session;
            }
        } else {
            _id = item.Id;
            animeName = item.Name;
            episode = "movie";
        }
        // 提前检查
        const map = new Map(Object.entries(TxSourceMap));
        if (map.get(animeName) != null) {
            return {
                type: "diy",
                animeName: animeName,
                episode: episode
            };
        }
        let episodeInfo;
        try {
            let _id_key = "_anime_id_rel_" + _id;
            let _name_key = "_anime_name_rel_" + _id;
            let _episode_key = "_episode_id_rel_" + _id + "_" + episode;
            if (is_auto) {
                if (window.localStorage.getItem(_episode_key)) {
                    return JSON.parse(window.localStorage.getItem(_episode_key));
                }
            }
            if (window.localStorage.getItem(_id_key)) {
                anime_id = window.localStorage.getItem(_id_key);
            }
            if (window.localStorage.getItem(_name_key)) {
                animeName = window.localStorage.getItem(_name_key);
            }
            if (!is_auto) {
                animeName = prompt("确认动画名:", animeName);
            }

            let searchUrl =
                "https://api.9-ch.com/cors/https://api.dandanplay.net/api/v2/search/episodes?anime=" +
                animeName +
                "&withRelated=true";
            if (is_auto) {
                searchUrl += "&episode=" + episode;
            }
            let animaInfo = await fetch(searchUrl, {
                method: "GET",
                headers: {
                    "Accept-Encoding": "gzip",
                    Accept: "application/json",
                    "User-Agent": navigator.userAgent,
                },
            })
                .then((response) => response.json())
                .catch((error) => {
                    console.log("查询失败:", error);
                    return null;
                });
            console.log("查询成功");
            console.log(animaInfo);
            let selecAnime_id = 1;
            if (anime_id != -1) {
                for (let index = 0; index < animaInfo.animes.length; index++) {
                    if (animaInfo.animes[index].animeId == anime_id) {
                        selecAnime_id = index + 1;
                    }
                }
            }
            if (!is_auto) {
                let anime_lists_str = list2string(animaInfo);
                console.log(anime_lists_str);
                selecAnime_id = prompt("选择:\n" + anime_lists_str, selecAnime_id);
                selecAnime_id = parseInt(selecAnime_id) - 1;
                window.localStorage.setItem(
                    _id_key,
                    animaInfo.animes[selecAnime_id].animeId
                );
                window.localStorage.setItem(
                    _name_key,
                    animaInfo.animes[selecAnime_id].animeTitle
                );
                let episode_lists_str = ep2string(
                    animaInfo.animes[selecAnime_id].episodes
                );
                episode = prompt(
                    "确认集数:\n" + episode_lists_str,
                    parseInt(episode)
                );
                episode = parseInt(episode) - 1;
            } else {
                selecAnime_id = parseInt(selecAnime_id) - 1;
                episode = 0;
            }
            episodeInfo = {
                type: "dandanplay",
                episodeId: animaInfo.animes[selecAnime_id].episodes[episode].episodeId,
                animeTitle: animaInfo.animes[selecAnime_id].animeTitle,
                episodeTitle: animaInfo.animes[selecAnime_id].type == "tvseries" ?
                    animaInfo.animes[selecAnime_id].episodes[episode]
                        .episodeTitle : null,
            };
            window.localStorage.setItem(_episode_key, JSON.stringify(episodeInfo));
        } catch (error) {
            return {
                type: "diy",
                animeName: animeName,
                episode: episode
            };
        }
        return episodeInfo;
    }

    function getComments(episodeId) {
        let url =
            "https://api.9-ch.com/cors/https://api.dandanplay.net/api/v2/comment/" +
            episodeId +
            "?withRelated=true&chConvert=" +
            window.ede.chConvert;
        return fetch(url, {
            method: "GET",
            headers: {
                "Accept-Encoding": "gzip",
                Accept: "application/json",
                "User-Agent": navigator.userAgent,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("弹幕下载成功: " + data.comments.length);
                return data.comments;
            })
            .catch((error) => {
                console.log("获取弹幕失败:", error);
                return null;
            });
    }

    async function createDanmaku(comments) {
        if (!comments) {
            return;
        }
        if (window.ede.danmaku != null) {
            window.ede.danmaku.clear();
            window.ede.danmaku.destroy();
            window.ede.danmaku = null;
        }
        let _comments = danmakuFilter(danmakuParser(comments));
        console.log("弹幕加载成功: " + _comments.length);

        while (!document.querySelector(mediaContainerQueryStr)) {
            await new Promise((resolve) => setTimeout(resolve, 200));
        }

        let _container = document.querySelector(mediaContainerQueryStr);
        let _media = document.querySelector(mediaQueryStr);
        window.ede.danmaku = new Danmaku({
            container: _container,
            media: _media,
            comments: _comments,
            engine: "canvas",
            // 弹幕速度，也可以用 speed API 设置。
            speed: 120
        });
        window.ede.danmakuSwitch == 1 ?
            window.ede.danmaku.show() :
            window.ede.danmaku.hide();
        if (window.ede.ob) {
            window.ede.ob.disconnect();
        }
        window.ede.ob = new ResizeObserver(() => {
            if (window.ede.danmaku) {
                console.log("Resizing");
                window.ede.danmaku.resize();
            }
        });
        window.ede.ob.observe(_container);
    }

    function reloadDanmaku(type = "check") {
        if (window.ede.loading) {
            console.log("正在重新加载");
            return;
        }
        window.ede.loading = true;

        getEpisodeInfo(type != "search")
            .then((info) => {
                return new Promise((resolve, reject) => {
                    if (!info) {
                        if (type != "init") {
                            reject("播放器未完成加载");
                        } else {
                            reject(null);
                        }
                    }
                    if (
                        type != "search" &&
                        type != "reload" &&
                        window.ede.danmaku &&
                        window.ede.episode_info &&
                        window.ede.episode_info.episodeId == info.episodeId
                    ) {
                        reject("当前播放视频未变动");
                    } else {
                        window.ede.episode_info = info;
                        // resolve(info.episodeId);
                        resolve(info);
                    }
                });
            })
            .then(
                (info) => {
                    if (info.type == "dandanplay") {
                        getComments(episodeId)
                            .then((comments) => createDanmaku(comments))
                            .then(() => {
                                console.log("弹幕就位");
                            });
                    } else {
                        console.log("正在播放 剧名 : " + info.animeName);
                        console.log("正在播放 集数 : " + info.episode);
                        const map = new Map(Object.entries(TxSourceMap));
                        let mapData = new Map(Object.entries(map.get(info.animeName)));
                        let cid = mapData.get("cid");
                        let id = mapData.get("ids");
                        let mod = mapData.get("mod");
                        let url = mod.replace("${cid}", cid).replace("${id}", id.at(info.episode));
                        console.log("源播放地址" + url);
                        getDownloadDanmakuS(url)
                            .then((comments) => {
                                createDanmaku(comments)
                            })
                            .then(() => {
                                console.log("弹幕就位");
                            });
                    }
                },
                (msg) => {
                    if (msg) {
                        console.log(msg);
                    }
                }
            )
            .then(() => {
                window.ede.loading = false;
                if (document.getElementById("danmakuCtr")) {
                    if (
                        document.getElementById("danmakuCtr")
                            .style.opacity != 1
                    ) {
                        document.getElementById("danmakuCtr")
                            .style.opacity = 1;
                    }
                }
            });
    }

    function reloadDanmakuUrl() {
        if (window.ede.loading) {
            console.log("正在重新加载");
            return;
        }
        window.ede.loading = true;
        getDownloadDanmaku()
            .then((comments) =>
                createDanmaku(comments)
                    .then(() => {
                        console.log("弹幕就位");
                    })
            )
            .then(() => {
                window.ede.loading = false;
                if (document.getElementById("danmakuCtr")) {
                    if (document.getElementById("danmakuCtr")
                        .style.opacity != 1) {
                        document.getElementById("danmakuCtr")
                            .style.opacity = 1;
                    }
                }
            });
    }

    function getDownloadDanmaku() {
        const UrlPath = prompt("请输入视频站播放地址");
        let url =
            "https://api.9-ch.com/cors/https://api.dandanplay.net/api/v2/extcomment?url=" + UrlPath
        return fetch(url, {
            method: "GET",
            headers: {
                "Accept-Encoding": "gzip",
                Accept: "application/json",
                "User-Agent": navigator.userAgent,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("弹幕下载成功: " + data.comments.length);
                return data.comments;
            })
            .catch((error) => {
                console.log("获取弹幕失败:", error);
                return null;
            });
    }

    function getDownloadDanmakuS(UrlPath) {
        let url =
            "https://api.9-ch.com/cors/https://api.dandanplay.net/api/v2/extcomment?url=" + UrlPath
        return fetch(url, {
            method: "GET",
            headers: {
                "Accept-Encoding": "gzip",
                Accept: "application/json",
                "User-Agent": navigator.userAgent,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("弹幕下载成功: " + data.comments.length);
                return data.comments;
            })
            .catch((error) => {
                console.log("获取弹幕失败:", error);
                return null;
            });
    }

    function danmakuFilter(comments) {
        let level =
            3 -
            parseInt(
                window.localStorage.getItem("danmakuFilterLevel") ?
                    window.localStorage.getItem("danmakuFilterLevel") :
                    0
            );
        if (level == 0) {
            return comments;
        }
        let limit = 9 - level * 2;
        let vertical_limit = 6;
        let arr_comments = [];
        let vertical_comments = [];
        for (let index = 0; index < comments.length; index++) {
            let element = comments[index];
            let i = Math.ceil(element.time);
            let i_v = Math.ceil(element.time / 3);
            if (!arr_comments[i]) {
                arr_comments[i] = [];
            }
            if (!vertical_comments[i_v]) {
                vertical_comments[i_v] = [];
            }
            // TODO: 屏蔽过滤
            if (vertical_comments[i_v].length < vertical_limit) {
                vertical_comments[i_v].push(element);
            } else {
                element.mode = "rtl";
            }
            if (arr_comments[i].length < limit) {
                arr_comments[i].push(element);
            }
        }
        return arr_comments.flat();
    }

    function danmakuParser($obj) {
        //const $xml = new DOMParser().parseFromString(string, 'text/xml')
        return $obj
            .map(($comment) => {
                const m = $comment.m;
                try {
                    const containsBrackets = /\[.*\]/.test(m);
                    if (containsBrackets) {
                        return null;
                    }
                } catch (err) {
                    return null;
                }
                const p = $comment.p;
                //if (p === null || $comment.childNodes[0] === undefined) return null
                const values = p.split(",");
                const mode = {
                    6: "ltr",
                    1: "rtl",
                    5: "top",
                    4: "bottom"
                } [
                    values[1]
                    ];
                if (!mode) return null;
                //const fontSize = Number(values[2]) || 25
                const fontSize = Math.round(
                    (window.screen.height > window.screen.width ?
                        window.screen.width :
                        window.screen.height / 1080) * fontSize_Setting
                );
                const colors = [
                    '#e11919',
                    '#2828a8',
                    '#C13A7BFF',
                    '#03faa6',
                    '#97FFFF',
                    '#00FFFF',
                    '#FFFAFA',
                    '#90EE90'];
                const randomIndex1 = Math.floor(Math.random() * colors.length);
                const color = colors[randomIndex1];
                const randomIndex2 = Math.floor(Math.random() * colors.length);
                const color2 = colors[randomIndex2];
                // const color = `000000${Number(values[2]).toString(16)}`.slice(
                // 	-6
                // );
                return {
                    text: $comment.m,
                    mode,
                    time: values[0] * 1,
                    style: {
                        fontSize: `${fontSize}px`,
                        color: `#${color}`,
                        border: '1px solid #337ab7',
                        textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',
                        globalAlpha: 0.75,
                        lineCap: "round",
                        font: `${fontSize}px sans-serif`,
                        fillStyle: `${color}`,
                        shadowColor: `${color2}`,
                        shadowBlur: 0.6,
                        shadowOffsetX: 0.3,
                        shadowOffsetY: 0,
                        lineWidth: 2.0,
                    },
                };
            })
            .filter((x) => x);
    }

    function list2string($obj2) {
        const $animes = $obj2.animes;
        let anime_lists = $animes.map(($single_anime) => {
            return (
                $single_anime.animeTitle +
                " 类型:" +
                $single_anime.typeDescription
            );
        });
        let anime_lists_str = "1:" + anime_lists[0];
        for (let i = 1; i < anime_lists.length; i++) {
            anime_lists_str =
                anime_lists_str +
                "\n" +
                (i + 1)
                    .toString() +
                ":" +
                anime_lists[i];
        }
        return anime_lists_str;
    }

    function ep2string($obj3) {
        const $animes = $obj3;
        let anime_lists = $animes.map(($single_ep) => {
            return $single_ep.episodeTitle;
        });
        let ep_lists_str = "1:" + anime_lists[0];
        for (let i = 1; i < anime_lists.length; i++) {
            ep_lists_str =
                ep_lists_str + "\n" + (i + 1)
                    .toString() + ":" + anime_lists[i];
        }
        return ep_lists_str;
    }

    while (!window.require) {
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
    if (!window.ede) {
        window.ede = new EDE();

        setInterval(() => {
            initUI();
        }, check_interval);
        //while (!(await getEmbyItemInfo())) {
        //    await new Promise((resolve) => setTimeout(resolve, 200));
        //}
        //if (location.hash == '#!/videoosd/videoosd.html') {
        reloadDanmaku("init");
        setInterval(() => {
            initListener();
        }, check_interval);
        //}
    }
    //}
})();