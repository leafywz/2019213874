let arr = [{
    day: '',
    class: 'week'
  },
  {
    day: '一',
    class: 'week'
  },
  {
    day: '二',
    class: 'week'
  },
  {
    day: '三',
    class: 'week'
  },
  {
    day: '四',
    class: 'week'
  },
  {
    day: '五',
    class: 'week'
  }
]

clazz = [{
    num: '1',
    time: '8:00',
    class: 'clazz'
  },
  {
    num: '2',
    time: '',
    class: 'clazz'
  },
  {
    num: '3',
    time: '10:10',
    class: 'clazz'
  },
  {
    num: '4',
    time: '',
    class: 'clazz'
  },
  {
    num: '5',
    time: '14:00',
    class: 'clazz'
  },
  {
    num: '6',
    time: '',
    class: 'clazz'
  },
  {
    num: '7',
    time: '16:10',
    class: 'clazz'
  },
  {
    num: '8',
    time: '',
    class: 'clazz'
  },
  {
    num: '9',
    time: '18:30',
    class: 'clazz'
  },
  {
    num: '10',
    time: '',
    class: 'clazz'
  },
]

let lesson = [{
    course: 'Windows程序设计',
    teacher: '李源',
    place: '@N113',
    Bgcolor: '#15C377',
    class: 'course',
    introduce:'暂无相关信息'
  },
  {
    course: '微机原理与接口技术',
    teacher: '姚华雄',
    place: '@N217',
    Bgcolor: '#15C377',
    class: 'course',
    introduce:'暂无相关信息'
  },
  {
    course: '专业英语',
    teacher: '朱瑄',
    place: '@N211',
    Bgcolor: '#15C377',
    class: 'course',
    introduce:'暂无相关信息'
  },
  {
    course: 'Web程序设计',
    teacher: '涂新辉',
    place: '@N520',
    Bgcolor: '#FCC525',
    class: 'course',
    introduce:'暂无相关信息'
  },
  {
    course: '文献信息检索与利用',
    teacher: '徐晨琛',
    place: '@N307',
    Bgcolor: '#FCC525',
    class: 'course',
    introduce:'暂无相关信息'
  },
  {
    course: '信息检索技术',
    teacher: '张茂元',
    place: '@N108',
    Bgcolor: '#FCC525',
    class: 'course',
    introduce:'信息检索（Information Retrieval）是用户进行信息查询和获取的主要方式，是查找信息的方法和手段。狭义的信息检索仅指信息查询（Information Search）。即用户根据需要，采用一定的方法，借助检索工具，从信息集合中找出所需要信息的查找过程。广义的信息检索是信息按一定的方式进行加工、整理、组织并存储起来，再根据信息用户特定的需要将相关信息准确的查找出来的过程。又称信息的存储与检索。一般情况下，信息检索指的就是广义的信息检索。'
  },
  {
    course: '人工智能',
    teacher: '郭京蕾',
    place: '@N108',
    Bgcolor: '#48B0FC',
    class: 'course',
    introduce:'人工智能是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器，该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。人工智能从诞生以来，理论和技术日益成熟，应用领域也不断扩大，可以设想，未来人工智能带来的科技产品，将会是人类智慧的“容器”。人工智能可以对人的意识、思维的信息过程的模拟。人工智能不是人的智能，但能像人那样思考、也可能超过人的智能。'
  },
  {
    course: '操作系统原理',
    teacher: '叶俊民',
    place: '@N108',
    Bgcolor: '#48B0FC',
    class: 'course',
    introduce:'操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。 操作系统是用户和计算机的接口，同时也是计算机硬件和其他软件的接口。操作系统的功能包括管理计算机系统的硬件、软件及数据资源，控制程序运行，改善人机界面，为其它应用软件提供支持，让计算机系统所有资源最大限度地发挥作用，提供各种形式的用户界面，使用户有一个好的工作环境，为其它软件的开发提供必要的服务和相应的接口等。'
  },
  {
    course: 'Windows程序设计',
    teacher: '李源',
    place: '@N530',
    Bgcolor: '#48B0FC',
    class: 'course',
    introduce:'暂无相关信息'
  },
  {
    course: '信息经济学',
    teacher: '杨小溪',
    place: '@N307',
    Bgcolor: '#48B0FC',
    class: 'course',
    introduce:'暂无相关信息'
  },
  {
    course: '信息检索技术',
    teacher: '张茂元',
    place: '@N528',
    Bgcolor: '#FAA64B',
    class: 'course'
    ,
    introduce:'信息检索（Information Retrieval）是用户进行信息查询和获取的主要方式，是查找信息的方法和手段。狭义的信息检索仅指信息查询（Information Search）。即用户根据需要，采用一定的方法，借助检索工具，从信息集合中找出所需要信息的查找过程。广义的信息检索是信息按一定的方式进行加工、整理、组织并存储起来，再根据信息用户特定的需要将相关信息准确的查找出来的过程。又称信息的存储与检索。一般情况下，信息检索指的就是广义的信息检索。'
  },
  {
    course: '习近平新时代中国特色社会主义思想概论',
    teacher: '吕惠东',
    place: '@N228',
    Bgcolor: '#FAA64B',
    class: 'course',
    introduce:'暂无相关信息'
  },
  {
    course: 'Web程序设计',
    teacher: '涂新辉',
    place: '@N108',
    Bgcolor: '#FAA64B',
    class: 'course',
    introduce:'暂无相关信息'
  },
  {
    course: '编译原理',
    teacher: '郭京蕾',
    place: '@N213',
    Bgcolor: '#FAA64B',
    class: 'course',
    introduce:'“编译原理”是计算机专业非常重要的一门专业课，在计算机教学中有着举足轻重的地位。同时，编译系统是整个计算机系统中极其重要的系统软件，它的作用是把计算机高级语言最终翻译成等价的计算机指令，从而保证高级程序设计语言顺利运行。所以，“编译原理”是计算机科学中基本研究内容之一。'
  },
  {
    course: '操作系统原理',
    teacher: '叶俊民',
    place: '@N108',
    Bgcolor: '#33CABB',
    class: 'course',
    introduce:'操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。 操作系统是用户和计算机的接口，同时也是计算机硬件和其他软件的接口。操作系统的功能包括管理计算机系统的硬件、软件及数据资源，控制程序运行，改善人机界面，为其它应用软件提供支持，让计算机系统所有资源最大限度地发挥作用，提供各种形式的用户界面，使用户有一个好的工作环境，为其它软件的开发提供必要的服务和相应的接口等。'
  }
]

window.onload = function () {
  // 动态表格创建
  let schedule = document.getElementsByClassName('schedule');
  // 创建星期
  for (let i = 0; i < arr.length; i++) {
    let div = document.createElement('div');
    div.className = 'item' + String(i + 1) + " " + arr[i].class
    schedule[0].appendChild(div); //创建星期列
    let h3 = document.createElement('h3');
    h3.textContent = arr[i].day;
    div.appendChild(h3);
  }

  // 创建时间
  for (let i = 0; i < clazz.length; i++) {
    let div = document.createElement('div');
    div.className = 'item' + String(i + 7) + " " + clazz[i].class
    schedule[0].appendChild(div); //创建星期列
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    h3.textContent = clazz[i].num;
    p.textContent = clazz[i].time;
    div.appendChild(h3);
    div.appendChild(p);
  }

  for (let i = 0; i < lesson.length; i++) {
    let div = document.createElement('div');
    div.className = 'item' + String(i + 17) + " " + lesson[i].class;
    div.style.backgroundColor = lesson[i].Bgcolor;
    schedule[0].appendChild(div); //课程表
    let h3 = document.createElement('h3');
    h3.textContent = lesson[i].course;
    div.appendChild(h3);
  }


  // 当前问题,将课程详细内容也加载到显示位置，同时完善显示的 css 设置 
  // 鼠标移动响应事件处理
  function MouseOver(i) {
    const titleName = document.getElementsByClassName("details-title");
    let h2 = document.createElement('h2');
    h2.textContent = lesson[i].course;
    h2.style.class = ".details-title h2";
    h2.style.textAlign = "center";
    titleName[0].appendChild(h2);
    let l1 = document.getElementById("li-1");
    let l2 = document.getElementById("li-2");
    let bq = document.getElementById("bq");
    l1.textContent += lesson[i].teacher;
    l2.textContent += lesson[i].place;
    bq.textContent += lesson[i].introduce;
  }

  function MouseOut() {
    const titleName = document.getElementsByClassName("details-title");
    titleName[0].textContent = ""
    let l1 = document.getElementById("li-1");
    let l2 = document.getElementById("li-2");
    let bq = document.getElementById("bq");
    l1.textContent = "任课老师:";
    l2.textContent = "上课地点:";
    bq.textContent = ""

  }

  var itemList = new Array(lesson.length);
  for (let i = 0; i < itemList.length; i++) {
    itemList[i] = 'item' + String(i + 17);
  }

  for (let i = 0; i < itemList.length; i++) {
    let items = document.getElementsByClassName(itemList[i]);
    items[0].addEventListener("mouseover", MouseOver.bind(this, i));
    items[0].addEventListener("mouseout", MouseOut);
  }

}