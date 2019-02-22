const { HashTable } = require('./hash_table.js')

const hashTable = new HashTable()

console.log(hashTable.hash('a'))
console.log(hashTable.hash('b'))
console.log(hashTable.hash('c'))
console.log(hashTable.hash('d'))
hashTable.set('a', 'aaaaaaa')
hashTable.set('d', 'ddddddd')
hashTable.set('r', 'rrrrrrr')
hashTable.set('g', 'ggggggg')

console.log(hashTable.getKeys())

console.log(hashTable.hasKey('r'))
console.log(hashTable.hasKey('w'))

console.log(hashTable.getValue('d'))
console.log(hashTable.getValue('l'))

hashTable.delete('a')
hashTable.delete('t')
console.log(hashTable.getKeys())
