/**
 * szp-react-redux
 * 实现自定义 Provider connect
 */

 import React, {Component} from 'react'

 /**
  * Provider 组件类
  */
 export class Provider extends Component {
  static propType = {
    store: PropTypes.object.isRequired
  }

  // 声明向子组件提供哪些context数据
  static childContextTypes = {
    store: PropTypes.object.isRequired
  }
  // 为子组件提供包含store的context
  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
   return this.props.children // 返回子标签
  }
 }

 /**
  * connect 函数
  * @mapStateToProps: 函数,用来确定一般属性
  * @mapDispathToProps: 对象,用来确定内部dispatch的属性
  * 
  * return 一个函数(接收一个组件)
  */
 export function connect (mapStateToProps, mapDispathToProps) {

  return (WrapComponent) => {
    return class ConnectComponent extends Component {
      static contextTypes = {
        store: PropTypes.object.isRequired
      }

      constructor (props, context) {
        super(props, context)

        // 得到store
        const store = context.store
        // 包含一般属性对象
        const stateProps = mapStateToProps(store.getState())
        // 包含函数对象
        const dispatchProps = this.bindActionCreators(mapDispathToProps)

        // 将所有的一般属性保存在state中
        this.state = { ...stateProps }
        // 将所有的函数属性对象保存组件对象
        this.dispatchProps = dispatchProps
      }

      /**
       * 根据mapdispatchToProps返回一个包含分发action的函数的对象
       */
      bindActionCreators = (mapDispathToProps) => {
        const keys = Object.keys(mapDispathToProps)
        return keys.reduce((preDispatchProps, key) => {
          // 添加一个包含dispatch语句的方法
          preDispatchProps[key] = (...args) => { // 透传
            this.context.store.dispatch(mapDispathToProps[key](...args))
          }
          return preDispatchProps
        }, {})
      }

      componentDidMount () { 
        const store = this.context.store
        // 注册监听
        this.context.store.subscribe(() => {
          // redux中产生了一个新state,更新当前组件的状态
          this.setState(mapStateToProps(store.getState()))
        })
      }

      render () {
        return <WrapComponent {...this.state} {...this.dispatchProps} />
      }
    }
  }
 }