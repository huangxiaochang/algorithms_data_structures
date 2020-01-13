// 通过es6的proxy可以实现一个高性能的拷贝

/*
	拦截set: 所有赋值都在copy对象（原数据浅拷贝的对象）上进行，这样就不会影响到原对象
	拦截get: 通过属性是否已经修改的逻辑，分别从copy或者原数据中取值

	注意：只会拦截对象上的属性，不会拦截属性值对象，即只会拦截在代理对象上的属性的操作，
	不会拦截属性值对象上的操作

 */

const MY_IMMER = Symbol('my-immer1')

// 是否是纯对象
const isPlainObject = value => {
  if (
    !value ||
    typeof value !== 'object' ||
    {}.toString.call(value) != '[object Object]'
  ) {
    return false
  }
  var proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  // 是否是由Object构造函数创建的对象
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof Ctor == 'function' &&
    Ctor instanceof Ctor && // Object
    Function.prototype.toString.call(Ctor) ===
      Function.prototype.toString.call(Object)
  )
}

const isProxy = value => !!value && !!value[MY_IMMER]

function produce(baseState, fn) {
	// 用于存储已经代理的代理对象
  const proxies = new Map()
  /*
  	state: stateproxy,
  	info: infoproxy
   */
  // 存储对象的浅拷贝
  const copies = new Map()

  const objectTraps = {
    get(target, key) {
      if (key === MY_IMMER) return target
      const data = copies.get(target) || target
      const value = getProxy(data[key])
      return value
    },
    set(target, key, val) {
    	console.log(target, key, isProxy(target))
      const copy = getCopy(target)
      const newValue = getProxy(val)
      // 这里的判断用于拿 proxy 的 target
      // 否则直接 copy[key] = newValue 的话外部拿到的对象是个 proxy
      // 拷贝的对象存储的是原值，不存储proxy对象，因为proxy的对象都存于copies Map中
      copy[key] = isProxy(newValue) ? newValue[MY_IMMER] : newValue
      return true
    }
  }

  // 获取一个对象(纯对象或者数组)的代理，原始值直接返回
  const getProxy = data => {
    if (isProxy(data)) {
      return data
    }
    if (isPlainObject(data) || Array.isArray(data)) {
      if (proxies.has(data)) {
        return proxies.get(data)
      }
      // 新建一个代理对象
      const proxy = new Proxy(data, objectTraps)
      proxies.set(data, proxy)
      return proxy
    }
    return data
  }

  // 返回或者创建对象，数组的一个浅拷贝
  const getCopy = data => {
    if (copies.has(data)) {
      return copies.get(data)
    }
    // 浅拷贝
    const copy = Array.isArray(data) ? data.slice() : { ...data }
    copies.set(data, copy)
    console.log(copies, 'copies')
    return copy
  }

  // 如果已经代理和修改过，这认为是改变过
  const isChange = data => {
    if (proxies.has(data) || copies.has(data)) return true
  }
	
	// 递归，如果修改过的，则其属性值为浅拷贝的对象
  const finalize = data => {
    if (isPlainObject(data) || Array.isArray(data)) {
      if (!isChange(data)) {
        return data
      }
      const copy = getCopy(data)
      Object.keys(copy).forEach(key => {
        copy[key] = finalize(copy[key])
      })
      return copy
    }
    return data
  }

  // proxy -> baseState的proxy
  const proxy = getProxy(baseState)
  // 在baseState的proxy上设置或者修改属性，会触发get/set
  fn(proxy)

  return finalize(baseState)
}

const state = {
  info: {
    name: 'yck',
    career: {
      first: {
        name: '111'
      }
    }
  },
  data: [1]
}

const data = produce(state, draftState => {
	// draftState -》 state的代理
  draftState.info.name = 'hxc'
  // 在代理上设置或者修改属性
  // draftState.info.age = 26
  // draftState.info.career.first.name = '222'
})
console.log('-------------000')
console.log(data)
console.log(state, data === state, data)
console.log(data.data === state.data)

