// 易信中，要求全局设置shareData这个变量用于分享
window.shareData = {}
function setShareData(name = '网易娱乐新闻', img = 'http://img3.cache.netease.com/utf8/radish/images/logo.png', content = '网易新闻客户端') {
    let url = location.href
    if (url.match(/from=newsapp/)) {
        url += '&f=newsapp'
    }

    window.shareData = {
        imgUrl: img,
        tImgUrl: img,
        fImgUrl: img,
        wImgUrl: img,
        href: location.href,
        timeLineLink: location.href,
        sendFriendLink: location.href,
        weiboLink: location.href,
        tTitle: name,
        tContent: content,
        fTitle: name,
        fContent: content,
        wContent: name
    }
}
export function init(name,img,content) {
    setShareData(name,img,content)

    const callbackUrl = window.location.href

    document.addEventListener('WeixinJSBridgeReady', function(){
        console.log(1)
        console.log(window.WeixinJSBridge)
        window.WeixinJSBridge.on('menu:share:appmessage', function(){
            console.log(2)
            window.WeixinJSBridge.invoke('sendAppMessage', {
                "img_url": img,
                "link": callbackUrl,
                "desc": content,
                "title": name
            }, function(){
                console.log(3)
                // neteaseTracker && neteaseTracker(false, callbackUrl + '&spsf=wx', '', 'sps')
            })

        })
        window.WeixinJSBridge.on('menu:share:timeline', function(){
            window.WeixinJSBridge.invoke('shareTimeline',{
                "imgUrl": shareData.imgUrl,
                "img_width": "80",
                "img_height": "80",
                "link": shareData.href,
                "desc": shareData.tContent,
                "title": shareData.tTitle
            }, function(){
                // neteaseTracker && neteaseTracker(false, callbackUrl + '&spsf=wx', '', 'sps')
            })
        })
    })

    document.addEventListener('YixinJSBridgeReady', function(){

        window.YixinJSBridge.on('menu:share:appmessage', function(argv){
            window.YixinJSBridge.invoke('sendAppMessage', {
                "img_url": shareData.imgUrl,
                "link": shareData.href,
                "desc": shareData.fContent,
                "title": shareData.fTitle
            }, function(){
                // neteaseTracker && neteaseTracker(false, callbackUrl + '&spsf=yx', '', 'sps')
            })
        })

        window.YixinJSBridge.on('menu:share:timeline', function(){
            window.YixinJSBridge.invoke('shareTimeline',{
                "img_url": shareData.imgUrl,
                "img_width": "80",
                "img_height": "80",
                "link": shareData.href,
                "desc": shareData.tContent,
                "title": shareData.tTitle
            }, function(){
                // neteaseTracker && neteaseTracker(false, callbackUrl + '&spsf=yx', '', 'sps')
            })
        })
    })
}


