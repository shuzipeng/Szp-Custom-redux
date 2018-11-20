redux 模块 : 对象  
1. createStore(reducer): 接收一个reducer函数,返回一个store对象`createtore(reducer)`  
2. combineReducers(reducers): 接收多个包含reducer函数的对象,返回一个新的reducer函数  
`combineReducers({reducer1, reducer2, reducer3, ...})  `  
3. store 对象  
getState():得到内部管理的state对象  
dispatch(action):分发action,触发reducer调用,返回一个新的state调用所有绑定的listener  
subscribe(listen):	绑定一个state的监视器  
***
react-redux模块:  
1. Provider: 组建类,通过context向子组件提供store  
2. connect函数,接收mapStateToProps(包含一般属性),mapDispathToProps(包含函数属性)
3. 返回一个接收组件的函数,组件内再接收添加于组件内的state和包含dispatch的方法
	