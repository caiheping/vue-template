// 表单重置
export function resetForm (refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

/**
 *
 * @param data 数据源
 * @param id字段 默认 'id'
 * @param parentId 父节点字段 默认 'parentId'
 * @param children 孩子节点字段 默认 'children'
 * @param rootId 根Id 默认 0
 * @returns {{obj, list: Array}}
 */
export function handleTree (data, id='id', parentId='parentId', children='children', rootId=0) {
  const obj = {}
  data.forEach(item => {
    item[children] = []
    obj[item[id]] = item
  })
  const arr = []
  data.forEach(list => {
    if (list[parentId] !== rootId) {
      obj[list[parentId]][children].push(list)
    } else {
      arr.push(list)
    }
  })
  return {
    arr,
    obj
  }
}
