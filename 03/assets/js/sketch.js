var tree
var data_list = [19, 7, 1, 13, 9, 11, 29, 33]
var btns = [] //按钮
var input // 键盘数字输入
traversal_list = [] //

var FPS = 10;
var timepast = 0;

var node_select = null

var flag_sr = false
var flag_in = false
var flag_re = false
var flag_tr = false

var go = 0

function Button(x, y, width, heigth, text) {
    //位置大小及内容属性
    this.x = x
    this.y = y
    this.width = width
    this.heigth = heigth
    this.text = text

    //颜色属性 白色背景
    this.r = 255
    this.g = 255
    this.b = 255
}

Button.prototype.displayBtn = function () {
    fill(this.r, this.g, this.b)
    rect(this.x, this.y, this.width, this.heigth, 10)
    textAlign(CENTER)
    fill(0) //黑色字体
    text(this.text, this.x + this.width / 2, this.y + this.heigth / 2 + 5)
}

Button.prototype.clicked = function () {
    if (mouseIsPressed == true) {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.heigth) {
            this.r = 255
            this.g = 100
            this.b = 100
            return true
        }
    } else {
        this.r = 255
        this.g = 255
        this.b = 255
        return false
    }
}


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
    this.state = 0
}

Node.prototype.ChangeColor = function (r, g, b) {
    this.R = r
    this.G = g
    this.B = b
}

Node.prototype.Draw = function () {
    stroke(255, 0, 0)
    strokeWeight(3);
    if (this.left != null) {
        line(this.x, this.y, this.left.x, this.left.y)
    }
    if (this.right != null) {
        line(this.x, this.y, this.right.x, this.right.y)
    }
    stroke(0)
    strokeWeight(1);
    fill(this.R, this.G, this.B)
    ellipse(this.x, this.y, this.r, this.r)
    fill(0)
    textAlign(CENTER)
    text(this.value, this.x, this.y + 5)
}

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
        cur_x = x - 220 / width + 2
        cur_y = y + 20 * 2
        arguments.callee(root.left, cur_x, cur_y, cur_w)
    }
    if (root.right != null) {
        cur_x = x + 220 / width + 2
        cur_y = y + 20 * 2
        arguments.callee(root.right, cur_x, cur_y, cur_w)
    }
}

BinaryTree.prototype.Reset = function (root) {
    root.ChangeColor(255, 255, 255)
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
    if (root.right != null) {
        arguments.callee(root.right)
    }
}

// // 检查当前树是否有已被选择的节点
BinaryTree.prototype.Select = function (root) {
    var stack = []
    if (root) stack.push(root)
    while (stack.length) {
        root = stack.pop() //弹出并访问当前节点
        //检测是否按下
        if (mouseX >= root.x - root.r && mouseX <= root.x + root.r && mouseY >= root.y - root.r && mouseY <= root.y + root.r) {
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
        if (root.left) {
            stack.push(root.left)
        }
        if (root.right) {
            stack.push(root.right)
        }
    }
}

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

// 设被删除的节点为P 其父节点为PP
BinaryTree.prototype.Remove = function (root, item) {
    var P = this.Find(root, item)
    traversal_list = []
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


function setup() {
    var myCanvas = createCanvas(1080, 400);
    myCanvas.parent("p5_canvas");
    frameRate(3)
    tree = new BinaryTree()
    tree.root = tree.Insert(data_list)
    tree.Graph(tree.root, width / 2, 60, 1.6)
    input = createInput()
    input.position(220, 195)
    // tree.Draw(tree.root)

    // 初始化按钮
    btns.push(new Button(25, 30, 80, 40, 'Search'))
    btns.push(new Button(25, 30 + 50 * 1, 80, 40, 'Insert'))
    btns.push(new Button(25, 30 + 50 * 2, 80, 40, 'Remove'))
    btns.push(new Button(25, 30 + 50 * 3, 80, 40, 'Traversal'))
    btns.push(new Button(25, 30 + 50 * 4, 80, 40, 'Reset'))

}


function draw() {
    background(255, 245, 225)
    tree.Select(tree.root)
    // 搜索节点动画
    if (flag_sr) {
        console.log(traversal_list)
        if (go < traversal_list.length) {
            traversal_list[go++].ChangeColor(255, 0, 0)
        } else {
            tree.Reset(tree.root)
            node_select.state = 0
            node_select = null
            traversal_list = []
            go = 0
            flag_sr = false
        }
    }
    console.log(node_select)

    // 搜索节点
    if (btns[0].clicked() && node_select) {
        tree.Find(tree.root, node_select.value)
        console.log(traversal_list)
        flag_sr = true
    }

    //插入节点动画
    if (flag_in) {
        tree.Graph(tree.root, width / 2, 40, 1.6)
        traversal_list = []
        flag_in = false
    }

    //插入节点
    if (btns[1].clicked()) {
        var in_data = input.value()
        // 检查输入的数字是否合理
        if (!tree.isInTree(tree.root, in_data) && in_data != '') {
            console.log('success')
            tree.Insert_one(tree.root, int(in_data))
            flag_in = true
        } else {
            console.log('the value is in')
        }

    }

    //删除节点动画
    if (flag_re) {
        tree.Graph(tree.root, width / 2, 40, 1.6)
        node_select.state = 0
        node_select = null
        flag_re = false
    }

    // 删除节点
    if (btns[2].clicked() && node_select) {
        tree.Remove(tree.root, node_select.value)
        if (traversal_list.length == 2) {
            beginShape()
            curveVertex(traversal_list[0].x, traversal_list[0].y)
            curveVertex(traversal_list[1].x, traversal_list[1].y)
            endShape()
        }
        flag_re = true
    }


    //先序遍历动画
    if (flag_tr) {
        if (go < traversal_list.length) {
            traversal_list[go++].ChangeColor(255, 255, 0)
        } else {
            tree.Reset(tree.root)
            traversal_list = []
            go = 0
            flag_tr = false
        }
    }

    // 先序遍历
    if (btns[3].clicked()) {
        tree.Traversal(tree.root)
        flag_tr = true
    }

    // 重置
    if (btns[4].clicked()) {
        tree.Reset(tree.root)
        traversal_list = []
        go = 0
    }

    // 更新树
    tree.Draw(tree.root)
    //更新按钮
    for (let i = 0; i < btns.length; i++) {
        btns[i].displayBtn()
    }
}