/*
Shortcut key:
0-9 : Select colors.
D : Switch between day and night.
B : Switch the brush type.
Space : Play/Pause.
T : Timer tool.
E : Eraser.
C : Clear canvas.
S : Save canvas to PNG file.
L Shift: Hide the menu.
*/

// 待修改

// 存在 问题 删除和增加元素的显示，需要更具体且动画时间不能过快

////////////////////////////////////////////
//Global Variable
////////////////////////////////////////////
var objs = [];
var btns = [];
var FPS = 60;
var timepast = 0;
var speed = 5000000;
var isPlaying = true;
var isAcceleratoring = true;
var isMenuHide = false;

// node tree
var tree
var data_list = [19, 7, 1, 13, 9, 11, 29, 33]
var input // 键盘数字输入
var in_data
traversal_list = []

var node_select = null

var flag_sr = false
var flag_in = false
var flag_re = false
var flag_tr = false

var go = 0


////////////////////////////////////////////
//FunctionButton
////////////////////////////////////////////
function FuncBtn(X, Y, W, H, CMD) {
    this.x = X;
    this.y = Y;
    this.w = W;
    this.h = H;
    this.cmd = CMD;
}

// 鼠标在按钮上
FuncBtn.prototype.isMouseInBtn = function () {
    if (mouseX >= this.x && mouseX <= this.x + this.w &&
        mouseY >= this.y && mouseY <= this.y + this.h) {
        return true;
    } else {
        return false;
    }
}

// 点击后的时间响应
FuncBtn.prototype.clickBtn = function () {
    print("ClickBtn!");
    if (this.cmd == "pause") {
        isPlaying = false;
        for (var i = 0; i < objs.length; i++) {
            objs[i].isPlaying = false;
        }
        this.cmd = "play";
    } else if (this.cmd == "play") {
        isPlaying = true;
        for (var i = 0; i < objs.length; i++) {
            objs[i].isPlaying = true;
        }
        this.cmd = "pause";
    } else if (this.cmd == "accelerator") {
        isAcceleratoring = true
        speed = 1000000
        this.cmd = "decelerate";
    } else if (this.cmd == "decelerate") {
        isAcceleratoring = false
        speed = 5000000
        this.cmd = "accelerator";
    } else if (this.cmd == "clear") {
        traversal_list = []
        tree.Reset(tree.root)
        // 问题在这里
        if(node_select!=null){
            node_select.state = 0
            node_select = null
        }
        in_data = undefined
        go = 0
        flag_in = false
        flag_re = false
        flag_sr = false
        flag_tr = false
    } else if (this.cmd == "save") {
        saveCanvas("Painting", "png")
    } else if (this.cmd == "search") {
        if (node_select) {
            tree.Find(tree.root, node_select.value)
            flag_sr = true
        }
    } else if (this.cmd == "insert") {
        in_data = input.value()
        // 检查输入的数字是否合理
        if (!tree.isInTree(tree.root, in_data) && in_data != '') {
            console.log('success')
            tree.Find(tree.root, int(in_data))
            flag_in = true
        } else {
            console.log('the value is in')
        }

    } else if (this.cmd == "remove") {
        if (node_select) {
            tree.Find_Re(tree.root, node_select.value)
            flag_re = true
        }
    } else if (this.cmd == "traversal") {
        tree.Traversal(tree.root)
        flag_tr = true
    }
}


FuncBtn.prototype.displayBtn = function () {
    stroke(0);
    strokeWeight(1);
    fill(255, 255, 255);
    rect(this.x, this.y, this.w, this.h, 5);

    if (this.cmd == "pause") {
        fill(0);
        translate(this.x + this.w / 2, this.y + this.h / 2);
        rectMode(CENTER);
        rect(-4, 0, 4, 15);
        rect(4, 0, 4, 15);
        rectMode(CORNER);
        resetMatrix();
    } else if (this.cmd == "play") {
        fill(0);
        translate(this.x + this.w / 2, this.y + this.h / 2);
        triangle(-2, -8, -2, 8, 6, 0);
        resetMatrix();
    } else if (this.cmd == "accelerator" || this.cmd == "decelerate") {
        translate(this.x + this.w / 2, this.y + this.h / 2);
        noFill();
        ellipse(0, 0, 22, 22);
        ellipse(0, 0, 25, 25);
        fill(0);
        ellipse(0, 0, 3, 3);
        strokeWeight(2);
        line(0, 0, 5, 0);
        line(0, 0, 0, -7);
        resetMatrix();
    } else if (this.cmd == "clear") {
        fill(0);
        noStroke();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        textSize(15);
        textAlign(CENTER);
        textStyle(BOLD);
        text("Clear", 0, 5);
        resetMatrix();
    } else if (this.cmd == "save") {
        fill(0);
        noStroke();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        textSize(15);
        textAlign(CENTER);
        textStyle(BOLD);
        text("Save", 0, 5);
        resetMatrix();
    } else if (this.cmd == "search") {
        fill(0);
        noStroke();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        textSize(15);
        textAlign(CENTER);
        textStyle(BOLD);
        text("Search", 0, 5);
        resetMatrix();
    } else if (this.cmd == "insert") {
        fill(0);
        noStroke();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        textSize(15);
        textAlign(CENTER);
        textStyle(BOLD);
        text("Insert", 0, 5);
        resetMatrix();
    } else if (this.cmd == "remove") {
        fill(0);
        noStroke();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        textSize(15);
        textAlign(CENTER);
        textStyle(BOLD);
        text("Remove", 0, 5);
        resetMatrix();
    } else if (this.cmd == "traversal") {
        fill(0);
        noStroke();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        textSize(15);
        textAlign(CENTER);
        textStyle(BOLD);
        text("Traversal", 0, 5);
        resetMatrix();
    }
}


////////////////////////////////////////////
//Node 
////////////////////////////////////////////


function Node(value, left, right) {
    this.value = value
    this.left = left
    this.right = right

    //位置，大小，颜色属性
    this.x = 0
    this.y = 0
    this.r = 30

    this.R = 255
    this.G = 255
    this.B = 255

    //其他属性
    this.state = 0 //节点是否处于选中状态

    this.line_l = false //左边线颜色
    this.line_r = false //右边线颜色

    this.isfirst = true //是否为第一次访问
    this.border_color = false //边框的颜色是否变化
}

Node.prototype.ChangeColor = function (r, g, b) {
    this.R = r
    this.G = g
    this.B = b
}

Node.prototype.Draw = function () {
    stroke(0)
    strokeWeight(2);
    if (this.left != null) {
        if (this.line_l) {
            stroke(250, 132, 43)
        }
        line(this.x, this.y, this.left.x, this.left.y)
    }
    stroke(0)
    if (this.right != null) {
        if (this.line_r) {
            stroke(250, 132, 43)
        }
        line(this.x, this.y, this.right.x, this.right.y)
    }
    stroke(0)
    if (this.border_color) {
        stroke(250, 132, 43)
    }
    strokeWeight(2);
    fill(this.R, this.G, this.B)
    ellipse(this.x, this.y, this.r, this.r)
    fill(0)
    strokeWeight(0);
    textSize(15)
    textAlign(CENTER)
    text(this.value, this.x, this.y + 5)
}


////////////////////////////////////////////
//Tree 
////////////////////////////////////////////

function BinaryTree() {
    this.root = null
}

// 给予坐标
BinaryTree.prototype.Graph = function (root, x, y, width) {
    var cur_x = x
    var cur_y = y
    var cur_w = width * 2
    root.x = cur_x
    root.y = cur_y
    if (root.left != null) {
        cur_x = x - 300 / width + 2
        cur_y = y + 25 * 2
        arguments.callee(root.left, cur_x, cur_y, cur_w)
    }
    if (root.right != null) {
        cur_x = x + 300 / width + 2
        cur_y = y + 25 * 2
        arguments.callee(root.right, cur_x, cur_y, cur_w)
    }
}

BinaryTree.prototype.Reset = function (root) {
    root.ChangeColor(255, 255, 255)
    root.line_l = false
    root.line_r = false
    root.border_color = false
    root.isfirst = true
    root.state = 0
    if (root.right != null) {
        arguments.callee(root.right)
    }
    if (root.left != null) {
        arguments.callee(root.left)
    }
}

BinaryTree.prototype.Draw = function (root) {
    root.Draw()
    if (root.right != null) {
        arguments.callee(root.right)
    }
    if (root.left != null) {
        arguments.callee(root.left)
    }
}

BinaryTree.prototype.isInTree = function (root, value) {
    var stack = []
    if (root) stack.push(root)
    while (stack.length) {
        root = stack.pop() //弹出并访问当前节点
        if (root.value == value) {
            return true
        }
        if (root.left) {
            stack.push(root.left)
        }
        if (root.right) {
            stack.push(root.right)
        }
    }
    return false
}

// 先序遍历
BinaryTree.prototype.Traversal = function (root) {
    traversal_list.push(root)
    if (root.left != null) {
        arguments.callee(root.left)
    }
    traversal_list.push(root)
    if (root.right != null) {
        arguments.callee(root.right)
    }
}

// 选择节点
BinaryTree.prototype.Select = function (root) {
    var stack = []
    if (root) stack.push(root)
    while (stack.length) {
        root = stack.pop() //弹出并访问当前节点
        //检测是否按下
        if (mouseX >= root.x - root.r && mouseX <= root.x + root.r &&
            mouseY >= root.y - root.r && mouseY <= root.y + root.r) {
            if (mouseIsPressed == true) {
                if (root.state == 0) {
                    if (!tree.Check_Select(tree.root)) {
                        root.ChangeColor(255, 255, 0)
                        root.state = 1
                        node_select = root
                        break
                    }
                } else {
                    root.ChangeColor(255, 255, 255)
                    root.state = 0
                    node_select.state = 0
                    node_select = null
                }
            }
        }
        if (root.right) {
            stack.push(root.right)
        }
        if (root.left) {
            stack.push(root.left)
        }
    }
}

// 检查当前树是否有已被选择的节点
BinaryTree.prototype.Check_Select = function (root) {
    var stack = []
    if (root) stack.push(root)
    while (stack.length) {
        root = stack.pop() //弹出并访问当前节点
        if (root.state == 1) {
            return true
        }
        if (root.left) {
            stack.push(root.left)
        }
        if (root.right) {
            stack.push(root.right)
        }
    }
    return false
}


// 初始化是 插入节点列表
BinaryTree.prototype.Insert = function (seq) {
    if (this.root == null) {
        this.root = new Node(seq[0], null, null)
    }
    for (let i = 1; i < seq.length; i++) {
        let current = this.root
        while (true) {
            data = current.value
            if (seq[i] > data) {
                if (current.right == null) {
                    current.right = new Node(seq[i], null, null)
                    break
                } else {
                    current = current.right
                }
            } else {
                if (current.left == null) {
                    current.left = new Node(seq[i], null, null)
                    break
                } else {
                    current = current.left
                }
            }
        }
    }
    return this.root
}

BinaryTree.prototype.Insert_one = function (root, value) {
    node = new Node(value, null, null)
    node.x = 900
    node.y = 300
    if (root == null) {
        root = node
    } else {
        while (root) {
            if (root.value > node.value) {
                if (root.left == null) {
                    root.left = node
                    break
                } else {
                    root = root.left
                }
            } else {
                if (root.right == null) {
                    root.right = node
                    break
                } else {
                    root = root.right
                }
            }
        }
    }
}

// 查找选择中的节点
BinaryTree.prototype.Find = function (root, item, seed = null) {
    if (seed == null) {
        node = root
    } else {
        node = seed
    }
    while (node) {
        traversal_list.push(node)
        if (item > node.value) {
            node = node.right
        } else if (item < node.value) {
            node = node.left
        } else {
            return node
        }
    }
}

BinaryTree.prototype.Find_P = function (root, item, seed = null) {
    if (seed == null) {
        node = root
    } else {
        node = seed
    }
    parent = null
    while (node) {
        if (item > node.value) {
            parent = node
            node = node.right
        } else if (item < node.value) {
            parent = node
            node = node.left
        } else {
            return parent
        }
    }

}

BinaryTree.prototype.Find_Re = function (root, item) {
    var P = this.Find(root, item)
    if (P == root) {
        return
    }
    //要删除的节点有两个子节点
    if (P.left != null && P.right != null) {
        //查找右子树中最小节点
        minP = P.right
        traversal_list.push(minP)
        while (minP.left != null) {
            minP = minP.left
            traversal_list.push(minP)
        }
    }
    //要删除的节点有一个子节点
    else if (P.left != null) {
        traversal_list.push(P.left)
    } else if (P.right != null) {
        traversal_list.push(P.right)
    }
}

// 设被删除的节点为P 其父节点为PP
BinaryTree.prototype.Remove = function (root, item) {
    traversal_list = []
    var P = this.Find(root, item)
    var PP = this.Find_P(root, item)
    if (P == root) {
        return
    }
    //要删除的节点有两个子节点
    if (P.left != null && P.right != null) {
        //查找右子树中最小节点
        minP = P.right
        minPP = P //minPP 为 minP的父节点
        while (minP.left != null) {
            minPP = minP
            minP = minP.left
        }

        if (minPP.right == minP) {
            minP.left = P.left
            if (PP.left == P) {
                PP.left = minP
            } else {
                PP.right = minP
            }
        }

        if (minPP.left == minP) {
            //取巧版
            // P.value = minP.value
            // if (minP.right != null) {
            //     minPP.left = minP.right
            //     delete minP
            // } else {
            //     minPP.left = null
            // }

            // 修改版，注意:此处需要分左右
            if (minP.right != null) {
                minPP.left = minP.right
            } else {
                minPP.left = null
            }
            minP.right = P.right
            minP.left = P.left
            if (PP.left == P) {
                PP.left = minP
            } else {
                PP.right = minP
            }
        }
    }
    //要删除的节点有一个子节点
    else if (P.left != null) {
        if (PP.left == P) {
            PP.left = P.left
        } else {
            PP.right = P.left
        }
    } else if (P.right != null) {
        if (PP.left == P) {
            PP.left = P.right
        } else {
            PP.right = P.right
        }
    }
    //要删除的节点没有子节点
    else {
        if (PP.left == P) {
            PP.left = null
        } else {
            PP.right = null
        }
    }
}

////////////////////////////////////////////
//Setup
////////////////////////////////////////////

function setup() {
    frameRate(FPS);
    var myCanvas = createCanvas(1080, 400);
    myCanvas.parent("p5_canvas");
    noCursor();
    strokeCap(PROJECT);

    // Tree
    tree = new BinaryTree()
    tree.root = tree.Insert(data_list)
    tree.Graph(tree.root, width / 2, 60, 1.6)

    //Function Buttons
    btns.push(new FuncBtn(25, 20, 80, 32, "search"));
    btns.push(new FuncBtn(25, 20 + 40 * 1, 80, 32, "insert"));
    btns.push(new FuncBtn(25, 20 + 40 * 2, 80, 32, "remove"));
    btns.push(new FuncBtn(25, 20 + 40 * 3, 80, 32, "traversal"));
    if (isPlaying) {
        btns.push(new FuncBtn(25, 20 + 40 * 4, 80, 32, "pause"));
    } else {
        btns.push(new FuncBtn(25, 20 + 40 * 4, 80, 32, "play"));
    }
    if (isAcceleratoring) {
        btns.push(new FuncBtn(25, 20 + 40 * 5, 80, 32, "accelerator"));
    } else {
        btns.push(new FuncBtn(25, 20 + 40 * 5, 80, 32, "decelerate"));
    }
    btns.push(new FuncBtn(25, 20 + 40 * 6, 80, 32, "clear"));
    btns.push(new FuncBtn(25, 20 + 40 * 7, 80, 32, "save"));

    //input 
    input = createInput()
    input.position(220, 180)
}


////////////////////////////////////////////
//Draw
////////////////////////////////////////////
function draw() {
    background(255, 245, 225);
    timepast += 1 / FPS;
    if (!isMenuHide) {
        if (timepast < 2) {
            noStroke();
            textAlign(LEFT);
            textSize(15);
            fill(0);
            text("BinaryTree v1.0 - Made By Leafywz", 10, height - 10);
        } else if (timepast < 5) {
            noStroke();
            textAlign(LEFT);
            textSize(15);
            fill(0);
            text("Press Left Shift to hide Menu    Press S to Search    Press I to Insert    Press R to Remove    Press T to Traversal.", 10, height - 10);
        }
        else if (timepast < 8) {
            noStroke();
            textAlign(LEFT);
            textSize(15);
            fill(0);
            text("Press Space to Stop/Run   Press A to Accelerator/Decelerate    Press C to Clear.", 10, height - 10);
        }
    }


    // 检查当前是否右节点被选中
    tree.Select(tree.root)

    //===================
    //Drawing Something
    //===================

    // 搜索节点动画
    if (flag_sr && isPlaying) {
        for (let i = 0; i < speed; i++) {
            let date = new Date()
        }
        if (go < traversal_list.length) {

            //下一个节点在该节点的左还是右
            if (traversal_list[go].left == traversal_list[go + 1]) {
                traversal_list[go].line_l = true
            }
            if (traversal_list[go].right == traversal_list[go + 1]) {
                traversal_list[go].line_r = true
            }
            traversal_list[go].border_color = true //边框亮起
            traversal_list[go++].ChangeColor(250, 132, 43)

        } else {
            tree.Reset(tree.root)
            node_select.state = 0
            node_select = null
            traversal_list = []
            go = 0
            flag_sr = false
        }
    }

    //插入节点动画
    if (flag_in && isPlaying) {
        for (let i = 0; i < speed; i++) {
            let date = new Date()
        }
        if (go < traversal_list.length) {
            //下一个节点在该节点的左还是右
            if (traversal_list[go].left == traversal_list[go + 1]) {
                traversal_list[go].line_l = true
            }
            if (traversal_list[go].right == traversal_list[go + 1]) {
                traversal_list[go].line_r = true
            }
            traversal_list[go].border_color = true //边框亮起
            traversal_list[go++].ChangeColor(250, 132, 43)
        } else if (go == traversal_list.length) {
            tree.Insert_one(tree.root, int(in_data))
            go += 1
        } else {
            tree.Reset(tree.root)
            tree.Graph(tree.root, width / 2, 60, 1.6)
            traversal_list = []
            in_data = undefined
            go = 0
            flag_in = false
        }
    }

    //删除节点动画
    if (flag_re && isPlaying) {
        for (let i = 0; i < speed; i++) {
            let date = new Date()
        }
        console.log(traversal_list)
        if (go < traversal_list.length) {
            //下一个节点在该节点的左还是右
            if (traversal_list[go].left == traversal_list[go + 1]) {
                traversal_list[go].line_l = true
            }
            if (traversal_list[go].right == traversal_list[go + 1]) {
                traversal_list[go].line_r = true
            }
            traversal_list[go].border_color = true //边框亮起
            traversal_list[go++].ChangeColor(250, 132, 43)
        } else if (go == traversal_list.length) {
            tree.Remove(tree.root, node_select.value)
            go += 1
        } else {
            tree.Graph(tree.root, width / 2, 60, 1.6)
            tree.Reset(tree.root)
            node_select.state = 0
            node_select = null
            traversal_list = []
            go = 0
            flag_re = false
        }

    }

    //先序遍历动画
    if (flag_tr && isPlaying) {
        for (let i = 0; i < speed; i++) {
            let date = new Date()
        }
        if (go < traversal_list.length) {

            //下一个节点在该节点的左还是右
            if (traversal_list[go].left == traversal_list[go + 1]) {
                traversal_list[go].line_l = true
            }
            if (traversal_list[go].right == traversal_list[go + 1]) {
                traversal_list[go].line_r = true
            }

            // 是否第一次访问该节点
            if (traversal_list[go].isfirst) { //是否第一次访问该节点
                traversal_list[go].border_color = true //边框亮起
                traversal_list[go++].isfirst = false
            } else {
                traversal_list[go++].ChangeColor(250, 132, 43)
            }

        } else {
            tree.Reset(tree.root)
            traversal_list = []
            go = 0
            flag_tr = false
        }
    }

    tree.Draw(tree.root)

    //=======================
    //Cursor Icon
    //=======================
    //Menu
    stroke(0);
    strokeWeight(2);
    if (!isMenuHide) {
        for (var i = 0; i < btns.length; i++) {
            btns[i].displayBtn();
            if (btns[i].isMouseInBtn()) {
                cursor(HAND);
            }
        }
    }

    //Canvas
    if (mouseX > 105 || isMenuHide) {
        cursor(ARROW);
    }

}

function mouseClicked() {
    if (!isMenuHide) {
        for (var i = 0; i < btns.length; i++) {
            if (btns[i].isMouseInBtn()) {
                btns[i].clickBtn();
            }
        }
    }
    return false;
}

////////////////////////////////////////////
//Shortcut Key
////////////////////////////////////////////

function keyPressed() {
    //print("keyCode is"+keyCode);
    if (keyCode == 83) { //S
        btns[0].clickBtn();
    }
    if (keyCode == 73) { //I
        btns[1].clickBtn();
    }
    if (keyCode == 82) { //R
        btns[2].clickBtn();
    }
    if (keyCode == 84) { //T
        btns[3].clickBtn();
    }
    if (keyCode == 32) { //Space  暂停键
        btns[4].clickBtn();
    }
    if (keyCode == 65) { //A  加速键
        btns[5].clickBtn();
    }
    if (keyCode == 67) { //C  清除键
        btns[6].clickBtn();
    }
    if (keyCode == 16) { //Shift L 工具栏
        if(!isMenuHide){
            input.hide()
        }else{
            input.show()
        }
        isMenuHide = !isMenuHide;
    }
}

////////////////////////////////////////////
//To be continued...
////////////////////////////////////////////