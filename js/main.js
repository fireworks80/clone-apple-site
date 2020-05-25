(() => {
  let yOffset = 0; // pageYoffset 대신 사용 할 변수
  let prevScrollHeight = 0; // 현재보다 이전에 위치한 섹션들의 스크롤 높이 합
  let currentScene = 0; // 현재 scene heigh
  let enterNewScene = false;

  const sceneInfo = [
    { // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight를 세팅 (브라우저 사이즈의 높이에 5배를 해주면 어떤 기기에서던지 같은 길이를 얻을 수 있으므로)
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        msgA: document.querySelector('#scroll-section-0 .a'),
        msgB: document.querySelector('#scroll-section-0 .b'),
        msgC: document.querySelector('#scroll-section-0 .c'),
        msgD: document.querySelector('#scroll-section-0 .d')
      },
      values: {
        msgA_opacity: [0, 1]
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

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i += 1) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);

  }

  function calcValues(values, currentYOffset) {
    let rv;

    // 현재씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    rv = scrollRatio * (values[1] - values[0]) + values[0];
    return rv;
  }

  function playAnimation() {

    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch(currentScene) {
      
      case 0:
        let msgA_opacity_in = calcValues(values.msgA_opacity, currentYOffset);
        objs.msgA.style.opacity = msgA_opacity_in;
        console.log(msgA_opacity_in);
        break;
      case 1:
        // console.log(currentYOffset);
        break;
      case 2:
        // console.log('2 play');
        break;
      case 3:
        // console.log('3 play');
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i += 1) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > (prevScrollHeight + sceneInfo[currentScene].scrollHeight)) {
      enterNewScene = true;
      currentScene += 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    } 
    
    if (yOffset < prevScrollHeight && currentScene > 0) {
      enterNewScene = true;
      currentScene -= 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    
    // scene가 바뀔때는 animation을 건너 뛰어서 음수값이 안나오게
    if (enterNewScene) return;
    playAnimation();
  }


  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', (e) => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  // setLayout();
})();