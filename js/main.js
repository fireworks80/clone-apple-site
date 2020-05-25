(() => {
  let yOffset = 0; // pageYoffset 대신 사용 할 변수
  let prevScrollHeight = 0; // 현재보다 이전에 위치한 섹션들의 스크롤 높이 합
  let currentScene = 0; // 현재 scene heigh

  const sceneInfo = [
    { 
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight를 세팅 (브라우저 사이즈의 높이에 5배를 해주면 어떤 기기에서던지 같은 길이를 얻을 수 있으므로)
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0')
      }
    },
    { 
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    { 
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    { 
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    }
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 설정
    for (let i = 0; i < sceneInfo.length; i += 1) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i += 1) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= pageYOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);

  }


  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i += 1) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > (prevScrollHeight + sceneInfo[currentScene].scrollHeight)) {
      currentScene += 1;
    } 
    
    if (yOffset < prevScrollHeight && currentScene > 0) {
      currentScene -= 1;
    }

    document.body.setAttribute('id', `show-scene-${currentScene}`);
    // console.log(currentScene);
  }


  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', (e) => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  // setLayout();
})();