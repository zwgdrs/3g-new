import NEWSAPPAPI from 'newsapp'
import { init, setShareData } from './../common/util/secondShare.js'
import './../common/reset.css'
import './index.less'


//广告部分
{
  const iframe = document.createElement('iframe')
  iframe.src = 'ntesad://fetch/T1348647853363/4'
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  const dom = document.querySelector('.js-ad')
  window.__newsapp_ntesad_fetch = (status, ads) => {
    if (!status || !ads || !ads.length) {
      dom.parentNode.removeChild(dom)
    } else {
      const ad = ads[0]
      const img = ad.res_url.filter(i => !!i)[0]
      let adTemplate = ``
      switch(parseInt(ad.style)){
        //图文无下载
        case 3:
          adTemplate = `<a href="${ad.action_params.link_url}" data-flight="${ad.flight_id}" data-id="${ad.id}" class="style-three">
                          <div class="inner">
                              <img src="${img}" class="img"/>
                              <div class="info">
                                  <div class="title">${ad.main_title}</div>
                                  <div class="tag">
                                      <div class="desc"></div>
                                      <div class="logo">推广</div>
                                  </div>
                              </div>
                          </div>
                        </a>`
          break;
        //图文有下载
        case 16:
          adTemplate = `<a href="${ad.action_params.link_url}" data-flight="${ad.flight_id}" data-id="${ad.id}" class="style-three">
                          <div class="inner">
                              <img src="${img}" class="img"/>
                              <div class="info">
                                  <div class="title">${ad.main_title}</div>
                                  <div class="tag">
                                      <div class="download">安装</div>
                                      <div class="logo">推广</div>
                                  </div>
                              </div>
                          </div>
                        </a>`
          break;
        //大图下载
        case 15:
          adTemplate = `
                        <a href="${ad.action_params.link_url}" data-flight="${ad.flight_id}" data-id="${ad.id}" class="style-ten">
                          <div class="ad-title">
                              <div class="logo">推广</div>
                              <div class="title">${ad.main_title}</div>
                              <div class="download">安装</div>
                          </div>
                          <img src="${img}" class="ad-bg" />
                        </a>
                      `
          break;
        //大图无下载
        case 10:
          adTemplate = `
                        <a href="${ad.action_params.link_url}" data-flight="${ad.flight_id}" data-id="${ad.id}" class="style-ten">
                          <div class="ad-title">
                              <div class="logo">推广</div>
                              <div class="title">${ad.main_title}</div>
                              <div class="go"></div>
                          </div>
                          <img src="${img}" class="ad-bg" />
                        </a>
                      `
          break;
        default:
          break;
      }
      dom.innerHTML = adTemplate
    }

  }
  dom.addEventListener('click', (e) => {
    e.preventDefault()
    const { flight, id } = dom.querySelector('a').dataset
    window.__newsapp_ntesad_event = (status) => {
      window.__newsapp_ntesad_event = null
    }
    // alert(`ntesad://click/${id}/${flight}`)
    iframe.src = `ntesad://click/${id}/${flight}`
    setTimeout(() => {
      window.location.href = dom.querySelector('a').href
    } , 100)
  }, false)
  const screenHeight = document.documentElement.clientHeight
  let send = false
  function handleScroll() {
    if (!dom || send) {
      document.removeEventListener('scroll', handleScroll)
      return
    }
    if (!dom.querySelector('a')) {
      return
    }
    if (dom.getBoundingClientRect().top < screenHeight) {
      send = true
      const { id, flight } = dom.querySelector('a').dataset
      // alert(`ntesad://show/${id}/${flight}`)
      window.__newsapp_ntesad_event = (status) => {
        window.__newsapp_ntesad_event = null
        // alert(status)
      }
      iframe.src = `ntesad://show/${id}/${flight}`
    }

  }
  document.addEventListener('scroll', handleScroll, false)
}


//分享
(() => {
  "use strict";

  //分享数据
  const title = document.getElementById('title').innerText
  const text = document.getElementById('content').innerText
  const urlImg = document.getElementById('photo').src
  const wxUrl = window.location.href

  const shareData = {
    wbText: title,
    wbPhoto: urlImg,
    wxText: text,
    wxTitle: title,
    wxUrl: wxUrl,
    wxPhoto: urlImg
  }

  //二次分享数据
  init(title,urlImg,text)

  //分享按键设置
  NEWSAPPAPI.share.setData(shareData)
  const shareDom = document.getElementById('share')
  const list = document.getElementById('list')
  const curDomList = Array.prototype.slice.call(list.children)
  const ua = navigator.userAgent
  const isNewsApp = ua.match('NewsApp') == 'NewsApp' ? true : false
  if (!isNewsApp) {
    shareDom.style.display = 'none'
    return
  }
  if (ua.match('iPhone') == 'iPhone') {
    console.log(1)
    shareDom.className = 'ios-share'
    curDomList.map((item,index) => {
      console.log(item)
      switch(index){
        case 0:
          item.href = 'share://208'
          item.children[index].className = 'wx-f logo'
          item.children[index + 1].innerText = '微信好友'
          break;
        case 1:
          item.href = 'share://209'
          item.children[0].className = 'wx-cycle logo'
          item.children[1].innerText = '微信朋友圈'
          break;
        case 2:
          item.href = 'share://207'
          item.children[0].className = 'qq-f logo'
          item.children[1].innerText = 'QQ好友'
          break;
        case 3:
          item.href = 'share://'
          item.children[0].className = 'get-more logo'
          item.children[1].innerText = '更多'
          break;
        default:
          break;
      }
    })
  } else {
    shareDom.className = 'android-share'
    curDomList.map((item,index) => {
      console.log(item)
      switch(index){
        case 0:
          item.href = 'share://205'
          item.children[index].className = 'yx-f logo'
          item.children[index + 1].innerText = '易信朋友圈'
          break;
        case 1:
          item.href = 'share://208'
          item.children[0].className = 'wx-f logo'
          item.children[1].innerText = '微信好友'
          break;
        case 2:
          item.href = 'share://209'
          item.children[0].className = 'wx-cycle logo'
          item.children[1].innerText = '微信朋友圈'
          break;
        case 3:
          item.href = 'share://'
          item.children[0].className = 'get-more logo'
          item.children[1].innerText = '更多'
          break;
        default:
          break;
      }
    })
  }



})()