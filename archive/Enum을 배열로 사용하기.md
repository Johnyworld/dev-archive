# Enum을 배열로 사용하기


```js
enum JobType {
  Engineer: 'ENGINEER',
  Designer: 'DESIGNER',
  ProductManager: 'PRODUCT_MANAGER'
}

const jobs = Object.values(JobType) // [ 'ENGINEER', 'DESIGNER', 'PRODUCT_MANAGER' ]
```