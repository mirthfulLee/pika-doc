(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{467:function(t,a,s){"use strict";s.r(a);var r=s(2),e=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"c-coding-style"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#c-coding-style"}},[t._v("#")]),t._v(" c++ coding style")]),t._v(" "),a("h3",{attrs:{id:"header-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#header-file"}},[t._v("#")]),t._v(" header file")]),t._v(" "),a("h4",{attrs:{id:"name-and-order-of-includes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#name-and-order-of-includes"}},[t._v("#")]),t._v(" Name and order of includes")]),t._v(" "),a("p",[t._v("顺序是")]),t._v(" "),a("p",[t._v("Related header, C library, C++ library, other libraries'.h"),a("code",[t._v(", your project's")]),t._v(" .h`.")]),t._v(" "),a("p",[t._v("不要使用 . 以及 .. 这样的符号")]),t._v(" "),a("p",[t._v("比如一个项目的include 头文件应该是这样")]),t._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"foo/server/fooserver.h"')])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<sys/types.h>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<unistd.h>")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<hash_map>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<vector>")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"base/basictypes.h"')])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"base/commandlineflags.h"')])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"foo/server/bar.h"')])]),t._v("\n\n")])])]),a("h3",{attrs:{id:"class"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#class"}},[t._v("#")]),t._v(" class")]),t._v(" "),a("h4",{attrs:{id:"doing-work-in-constructors"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#doing-work-in-constructors"}},[t._v("#")]),t._v(" Doing work in constructors")]),t._v(" "),a("p",[t._v("constructor 不能调用虚函数, 因为在构造的时候, 这个对象还没有完全生成, 因此调用虚函数肯定是不对的")]),t._v(" "),a("h4",{attrs:{id:"inheritance"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#inheritance"}},[t._v("#")]),t._v(" Inheritance")]),t._v(" "),a("p",[t._v("使用 override 来表示某一个函数是virtual 函数的重新实现, 这样就不需要在看代码的时候确认这个函数是否是重载, 如果在子类里面对一个父类没有的函数进行override也是会直接报错的")]),t._v(" "),a("p",[t._v("在使用struct的时候 只用在只定义数据,不包含任何方法的结构体里面，出了简单的构造函数或者init函数.")]),t._v(" "),a("p",[t._v("通过使用继承可以有效的减少代码量 并且因为继承是编译时期的 因此在编译器能够识别这些错误 接口继承(也就是定义纯虚函数) 更是能够在编译期就识别一个继承的类是否实现了全部的接口")]),t._v(" "),a("p",[t._v("但是由于继承把一个类的代码分散在各个文件里面了 因此增加了看代码的难度 并且父类定义自己的成员变量 因此访问的时候不是很方便")]),t._v(" "),a("p",[t._v("所以一定要账号 is-a 和 has-a的关系 一定确定是 a是b的一种的时候才可以使用 继承 "),a("strong",[t._v("否则尽可能的使用组合")]),t._v(" 也就是b里面有一个a的成员变量")]),t._v(" "),a("h3",{attrs:{id:"function"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#function"}},[t._v("#")]),t._v(" Function")]),t._v(" "),a("h4",{attrs:{id:"parameter-ordering"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parameter-ordering"}},[t._v("#")]),t._v(" parameter Ordering")]),t._v(" "),a("p",[t._v("函数的变量的顺序: input, 然后是output")]),t._v(" "),a("p",[t._v("尽量把一个函数控制在40行以内")]),t._v(" "),a("h4",{attrs:{id:"reference-arguments"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reference-arguments"}},[t._v("#")]),t._v(" reference Arguments")]),t._v(" "),a("p",[t._v("所有通过引用传参的变量都需要加上const, 也就是 const type &in")]),t._v(" "),a("p",[t._v("尽可能的input argument 用value 或者 const reference(当然如果这个变量就是指针, 那么传进来的时候就用指针), 然后output argument 用指针")]),t._v(" "),a("p",[t._v("还有就是如果变量需要传进来NULL的时候, 可能会用const T*")]),t._v(" "),a("h4",{attrs:{id:"function-overloading"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#function-overloading"}},[t._v("#")]),t._v(" function overloading")]),t._v(" "),a("p",[t._v("尽可能的不要使用 function overloading, 因为function overloading 增加了c++ 的复杂性. 特别是当继承的时候, 子类只实现了父类的某一个function 的时候, 这样代码的复杂度就更麻烦了. 因为不知道重载的是哪一个函数, 因此")]),t._v(" "),a("p",[t._v("尽可能的不要使用function overloading, 当遇到函数需要不用的变量类型的时候, 可以写成这种AppendString(), AppendInt() 这种")]),t._v(" "),a("h4",{attrs:{id:"default-value"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#default-value"}},[t._v("#")]),t._v(" default value")]),t._v(" "),a("p",[t._v("允许在非non-virtual 函数里面使用 default value")]),t._v(" "),a("h3",{attrs:{id:"scoping"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scoping"}},[t._v("#")]),t._v(" scoping")]),t._v(" "),a("h4",{attrs:{id:"nonmember-static-member-global-function"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#nonmember-static-member-global-function"}},[t._v("#")]),t._v(" Nonmember, static member, global function")]),t._v(" "),a("p",[t._v("如果有一个函数和一个类的对象里面的内容并不相关")]),t._v(" "),a("p",[t._v("那么这个时候有两个选择, 可以定义成class static member function, nonmember function. 那么这个时候如何选择?")]),t._v(" "),a("p",[t._v("如果这个函数和这个对象强相关, 比如是建立一个这个对象, 或者操作这个类的静态成员函数的时候, 将这个函数声明成class static member function")]),t._v(" "),a("p",[t._v("否则将这个函数声明成nonmember function, 然后用namespace 隔离开来")]),t._v(" "),a("p",[t._v("如果有一个函数只在某一个.cc 文件里面使用, 那么可以将这个函数放在unnamed namespace 或者用static 声明 static int foo() 这种")]),t._v(" "),a("h3",{attrs:{id:"other"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#other"}},[t._v("#")]),t._v(" other")]),t._v(" "),a("h4",{attrs:{id:"关于exception-的使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于exception-的使用"}},[t._v("#")]),t._v(" 关于exception 的使用")]),t._v(" "),a("ul",[a("li",[t._v("pros:\n"),a("ul",[a("li",[t._v("exception 可以发现更深层次的错误, 比如a()->b()->c()->d() 那么在d里面抛出的exception 在a里面是可以直接捕获的")]),t._v(" "),a("li",[t._v("比如在c++ 的construction 里面, 我们是无法知道这个construction 是否构造成功,")])])]),t._v(" "),a("li",[t._v("cons\n"),a("ul",[a("li",[t._v("​")])])])]),t._v(" "),a("h4",{attrs:{id:"关于返回值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于返回值"}},[t._v("#")]),t._v(" 关于返回值")]),t._v(" "),a("ol",[a("li",[t._v("在一个函数内部调用")])]),t._v(" "),a("h4",{attrs:{id:"brace-initializer-list"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#brace-initializer-list"}},[t._v("#")]),t._v(" brace initializer List")]),t._v(" "),a("p",[t._v("在c++11 里面可以直接通过{} 来初始化一个list, 这个是在c++ 11 之前都不可以的, 比如:")]),t._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  std"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("vector"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  std"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" mp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"sizeof"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sizeof"}},[t._v("#")]),t._v(" sizeof")]),t._v(" "),a("p",[t._v("在使用sizeof 的时候尽可能的去sizeof(varname), 而不是去sizeof(type). 因此这个varname 随时会更新, 如果varname 这个变量被赋值给其他对象的时候")]),t._v(" "),a("p",[t._v("注意sizeof 的时候考虑对齐的问题")]),t._v(" "),a("h4",{attrs:{id:"run-time-type-information-rtti"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#run-time-type-information-rtti"}},[t._v("#")]),t._v(" Run-Time Type Information(RTTI)")]),t._v(" "),a("p",[t._v("c++ 允许在运行的过程中使用typeid, dynamic_cast 来检查一个变量的类型, 通过dynamic_cast 在类型转换的时候进行检查, 只允许父类的指针指向子类, 而不允许子类的指针指向父类")]),t._v(" "),a("p",[t._v("但是其实用RTTI 的代码都可以用其他的方式来写, 而RTTI 不是很高效, 因此尽可能用 virtual method, 或者 Visitor pattern 模式来实现比较好")]),t._v(" "),a("h4",{attrs:{id:"cast"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cast"}},[t._v("#")]),t._v(" cast")]),t._v(" "),a("p",[t._v("尽可能的使用 c++ 的static_cast, const_cast, reinterpret_cast 而不是用c 里面的cast")]),t._v(" "),a("h4",{attrs:{id:"stream"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stream"}},[t._v("#")]),t._v(" stream")]),t._v(" "),a("p",[t._v("如果你为了debug想要打印一个对象内部的细节, 那么经常会提供一个DebugString() 是最经常的")]),t._v(" "),a("p",[t._v("不要使用stream 作为外部用户的IO, stream 性能还是不行的")]),t._v(" "),a("h4",{attrs:{id:"friend"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#friend"}},[t._v("#")]),t._v(" Friend")]),t._v(" "),a("p",[t._v("允许使用 Friend class, function")]),t._v(" "),a("p",[t._v("Friend class 虽然会破坏了类封装, 允许外部类直接访问当前这个类里面的私有成员, 常见的用法就是FooBuilder 应该能够访问Foo 里面的私有成员. 如果没有Friend class, 要么把Foo 的成员都设置成public, 要么给所有的成员变量都添加get, set 函数. 还是很不方便的.")]),t._v(" "),a("p",[t._v("Friend class 只是让某一个类可以访问这个类, 还是比让所有的成员变量都public 来说, 封装更好一些")]),t._v(" "),a("p",[t._v("因此Friend class 需要看到Foo 的私有变量, 因此经常将Friend class 放在同一个头文件里面")]),t._v(" "),a("h4",{attrs:{id:"use-of-const"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#use-of-const"}},[t._v("#")]),t._v(" use of const")]),t._v(" "),a("p",[t._v("能用const 的地方尽可能的使用const")]),t._v(" "),a("h4",{attrs:{id:"integer-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#integer-type"}},[t._v("#")]),t._v(" Integer type")]),t._v(" "),a("p",[t._v("用<stdint.h> 里面定义的int32_t, int64_t 等等, 而不适用short, long, long long 这种类型, 因为short, long 等是根据编译器和平台是不一样的")]),t._v(" "),a("h4",{attrs:{id:"_0-and-nullptr-null"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_0-and-nullptr-null"}},[t._v("#")]),t._v(" 0 and nullptr/NULL")]),t._v(" "),a("p",[t._v("Use 0 for integers, 0.0 for reals, nullptr (or NULL) for pointers, and '\\0' for chars.")]),t._v(" "),a("p",[t._v("在支持c++11 的项目里面尽可能使用nullptr")]),t._v(" "),a("h3",{attrs:{id:"comments"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#comments"}},[t._v("#")]),t._v(" Comments")]),t._v(" "),a("h4",{attrs:{id:"todo-comment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#todo-comment"}},[t._v("#")]),t._v(" TODO comment")]),t._v(" "),a("p",[t._v("写TODO comment 的时候记得写上谁写的这个TODO")]),t._v(" "),a("p",[t._v("// TODO("),a("a",{attrs:{href:"mailto:kl@gmail.com"}},[t._v("kl@gmail.com")]),t._v('): Use a "*" here for concatenation operator.')]),t._v(" "),a("h3",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("p",[t._v("最后可以用 cpplint.py 跑一下, 尽可能把错误是4, 以及4以上的给排除掉")])])}),[],!1,null,null,null);a.default=e.exports}}]);