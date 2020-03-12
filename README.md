# xAxios
axios请求封装

## 安装
```bash 
npm install x-axios --save
```

## 使用

```js
// main.js
import http from 'x-axios/dist/http.min.js'
Vue.prototype.$http = http
```

```js
// demo.vue
this.$http.get('/api', {a:1,b:2}).then({data} => {
  // do something
})
this.$http.get('/api?a=1&b=2').then({data} => {
  // do something
})
this.$http.options('/api', {a:1,b:2}).then({data} => {
  // do something
})
this.$http.options('/api?a=1&b=2').then({data} => {
  // do something
})
this.$http.head('/api', {a:1,b:2}).then({data} => {
  // do something
})
this.$http.head('/api?a=1&b=2').then({data} => {
  // do something
})
this.$http.delete('/api', {a:1,b:2}).then({data} => {
  // do something
})
this.$http.delete('/api?a=1&b=2').then({data} => {
  // do something
})
this.$http.post('/api', {a: 1,b: 2}).then({data} => {
  // do something
})
this.$http.put('/api', {a: 1,b: 2}).then({data} => {
  // do something
})
this.$http.patch('/api', {a: 1,b: 2}).then({data} => {
  // do something
})
this.$http.postJson('/api', {a: 1,b: 2}).then({data} => {
  // do something
})
this.$http.putJson('/api', {a: 1,b: 2}).then({data} => {
  // do something
})
this.$http.patchJson('/api', {a: 1,b: 2}).then({data} => {
  // do something
})

```

## API

方法 | 说明 | 参数说明
| -- | -- | -- |
| **get(url[, params])** | get请求 | <p>`url:`请求地址</p> <p>`params:`请求参数，可在params传参或使用请求地址query传参</p> |
| **options(url[, params])** | options请求 | <p>`url:`请求地址</p> <p>`params:`请求参数，可在params传参或使用请求地址query传参</p> |
| **head(url[, params])** | head请求 | <p>`url:`请求地址</p> <p>`params:`请求参数，可在params传参或使用请求地址query传参</p> |
| **delete(url[, params])** | delete请求 | <p>`url:`请求地址</p> <p>`params:`请求参数，可在params传参或使用请求地址query传参</p> |
| **post(url, data[, config])** | post请求 | <p>`url:`请求地址,</p> <p>`data:`请求参数,</p> <p>`config:`配置信息,参考[axios官方文档](https://github.com/axios/axios)</p> |
| **put(url, data[, config])** | put请求 | <p>`url:`请求地址,</p> <p>`data:`请求参数,</p> <p>`config:`配置信息,参考[axios官方文档](https://github.com/axios/axios)</p> |
| **patch(url, data[, config])** | patch请求 | <p>`url:`请求地址,</p> <p>`data:`请求参数,</p> <p>`config:`配置信息,参考[axios官方文档](https://github.com/axios/axios)</p> |
| **postJson(url, data[, config])** | postJson请求 | <p>`url:`请求地址,</p> <p>`data:`请求参数,</p> <p>`config:`配置信息,参考[axios官方文档](https://github.com/axios/axios)</p> |
| **putJson(url, data[, config])** | putJson请求 | <p>`url:`请求地址,</p> <p>`data:`请求参数,</p> <p>`config:`配置信息,参考[axios官方文档](https://github.com/axios/axios)</p> |
| **patchJson(url, data[, config])** | patchJson请求 | <p>`url:`请求地址,</p> <p>`data:`请求参数,</p> <p>`config:`配置信息,参考[axios官方文档](https://github.com/axios/axios)</p> |
| **upload(url, data[, config])** | 上传文件（实质为post请求） | <p>`url:`请求地址,</p> <p>`data:`请求参数,</p> <p>`config:`配置信息,参考[axios官方文档](https://github.com/axios/axios)</p> |

