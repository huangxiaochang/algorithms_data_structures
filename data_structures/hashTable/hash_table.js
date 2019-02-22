const { linkList } = require('../linkList/link_list.js')
const defaultSize = 30

class HashTable {
	constructor (size=defaultSize) {
		this.keys = {}
		this.buckets = Array(size).fill(null).map(() => new linkList())
	}
	/*
		@params key string
		@return hash(key) number 0 - HashSize
	 */
	hash (key) {
		const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)), 0)
		return hash % this.buckets.length
	}

	set(key, value) {
		const hashKey = this.hash(key)
		const nodeList = this.buckets[hashKey]
		const node = nodeList.findNode(key, (a, b) => {
			if (a === b.key) {
				return 0
			}
			return -1
		})
		if (node) {
			node.value.value = value
		} else {
			nodeList.append({key: key, value: value})
			this.keys[key] = hashKey
		}
		return this
	}

	delete (key) {
		if (!this.hasKey(key)) {
			return false
		}
		const hashKey = this.hash(key)
		const nodeList = this.buckets[hashKey]
		const del_node = nodeList.delNodeByValue(key, (a, b) => {
			if (a === b.key) {
				return 0
			}
			return -1
		})
		delete this.keys[key]
		return del_node
	}

	getValue (key) {
		if (!this.hasKey(key)) {
			return undefined
		}

		const node = this._getNode(key)
		return node ? node.value.value : undefined
	}

	_getNode(key) {
		const hashKey = this.hash(key)
		const nodeList = this.buckets[hashKey]
		const node = nodeList.findNode(key, (key, b) => {
			if (key === b.key) {
				return 0
			}
			return -1
		})
		return node
	}

	hasKey (key) {
		return Object.hasOwnProperty.call(this.keys, key)
	}

	getKeys () {
		return Object.keys(this.keys)
	}
}

module.exports = {
	HashTable
}
