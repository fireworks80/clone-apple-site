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
        messageA: document.querySelector('#scroll-section-0 .a'),
        messageB: document.querySelector('#scroll-section-0 .b'),
        messageC: document.querySelector('#scroll-section-0 .c'),
        messageD: document.querySelector('#scroll-section-0 .d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: []
      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, {start: 0.9, end: 1}],
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
      }
    },
    { 
      type: 'normal',
      // heightNum: 5,
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
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),   
        messageB: document.querySelector('#scroll-section-2 .b'),   
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),
      },
      values: {
        messageA_opacity_in: [0, 1, {start: 0.2, end: 0.3}],
        messageA_opacity_out: [1, 0, {start: 0.35, end: 0.4}],
        messageA_translateY_out: [0, -20, {start: 0.35, end: 0.4}],
        
        messageB_opacity_in: [0, 1, {start: 0.5, end: 0.6}],
        messageB_translateY_in: [20, 0, {start: 0.5, end: 0.6}],
        messageB_opacity_out: [1, 0, {start: 0.65, end: 0.7}],
        messageB_translateY_out: [0, -20, {start: 0.65, end: 0.7}],
        pinB_scaleY: [0.2, 1, {start: 0.5, end: 0.6}],

        messageC_opacity_in: [0, 1, {start: 0.7, end: 0.8}],
        messageC_opacity_out: [1, 0, {start: 0.85, end: 0.9}],
        messageC_translateY_in: [20, 0, {start: 0.7, end: 0.8}],
        messageC_translateY_out: [0, -20, {start: 0.85, end: 0.9}],
        pinC_scaleY: [0.2, 1, {start: 0.7, end: 0.8}]
      }
    },
    { 
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption')
      }
    }
  ];

  function setCanvasImages() {
    let imgElem;

    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i += 1) {
      imgElem = new Image();  
      imgElem.src = `./001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }
  }

  function setLayout() {
    // 각 스크롤 섹션의 높이 설정
    for (let i = 0; i < sceneInfo.length; i += 1) {

      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
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

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function calcValues(values, currentYOffset) {
 
    let rv;

    // 현재씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    
    
    if (values.length > 2) {
      const start = values[2].start * scrollHeight;
      const end = values[2].end * scrollHeight;
      const partScrollHeight = end - start;
      // console.log(currentYOffset);
      if (currentYOffset >= start && currentYOffset <= end) {
        rv = (currentYOffset - start) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < start) {
        rv = values[0];
      } else if (currentYOffset > end) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {

    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch(currentScene) {
      
      case 0:
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        // console.log(sequence);
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

        if (scrollRatio <= 0.22) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.42) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				}
	
				if (scrollRatio <= 0.62) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
				}
	
				if (scrollRatio <= 0.82) {
					// in
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }
        
        break;
      case 1:
        // console.log(currentYOffset);
        break;
      case 2:
        // console.log('2 play');
        objs.messageA.style.opacity = calcValues(scrollRatio <= 0.32 ? values.messageA_opacity_in : values.messageA_opacity_out, currentYOffset);
        objs.messageA.style.transform = `translate3d(0, ${calcValues(scrollRatio < 0.32 ? 0 : values.messageA_translateY_out, currentYOffset)}%, 0)`;
        objs.messageB.style.opacity = calcValues(scrollRatio <= 0.62 ? values.messageB_opacity_in : values.messageB_opacity_out, currentYOffset);
        objs.messageB.style.transform = `translate3d(0, ${calcValues(scrollRatio < 0.62 ? values.messageB_translateY_in : values.messageB_translateY_out, currentYOffset)}%, 0)`;
        objs.messageC.style.opacity = calcValues(scrollRatio <= 0.82 ? values.messageC_opacity_in : values.messageC_opacity_out, currentYOffset);
        objs.messageC.style.transform = `translate3d(0, ${calcValues(scrollRatio < 0.82 ? values.messageC_translateY_in : values.messageC_translateY_out, currentYOffset)}%, 0)`;

        if (scrollRatio <= 0.62) {
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.82) {
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }

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


  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  });
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', (e) => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  setCanvasImages();
  // setLayout();
})();