import axios from 'axios';
import toast from '../toast';

const reqQueue = [];
const DEFAULT_CONTENT_TYPE = {'Content-Type': 'application/x-www-form-urlencoded'};
const FILE_CONTENT_TYPE = {"Content-Type": "multipart/form-data"};
const JSON_CONTENT_TYPE = {"Content-Type": "application/json"};

// axios初始化一些常用的配置项
(function axiosInit() {
    axios.defaults.baseURL = process.env.API_URL;
    // axios.defaults.timeout = 5000;
    //=>设置在POST请求中基于请求主体向服务器发送内容的格式，默认是RAW，项目中常用的是URL-ENCODEED格式
    axios.defaults.headers['Content-Type'] = 'appliction/x-www-form-urlencoded';

    axios.defaults.transformRequest = [function (data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }];

    axios.defaults.transformResponse = data => {
        // data:服务器返回的内容
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (e) {
                console.log(e);
            }
        }
        return data;
    };

    axios.defaults.validateStatus = status => {
        // status: 响应状态码 200到300之间为响应成功
        return status >= 200 && status < 300;
    }
})();

const instance = axios.create();
// axios拦截请求
instance.interceptors.request.use(config => {
    // 显示loading
    toast.show({
        content: '加载中...',
        duration: -1
    });
    // 加入cancelToken，可以手动取消请求
    if (sessionStorage.getItem('token')) config.header['token'] = sessionStorage.getItem('token');
    let reqId = Date.now().toString(16); // 请求的唯一id;
    let cancelToken = new axios.CancelToken(cancel => { // cancel是执行取消的方法，接受入参message。
        reqQueue.push({id: reqId, method: config.method, url: config.url, cancel: cancel}); // 发起请求时，将当前请求加入到请求队列
    });
    config.reqId = reqId;
    config.cancelToken = cancelToken;
    return config
}, err => {
    return Promise.reject(err)
})
// axios拦截响应
instance.interceptors.response.use(response => {
    // 隐藏loading
    toast.hide();
    // 请求结束时，从请求队列中移除当前请求
    let index = reqQueue.findIndex(item => item.id === response.config.reqId);
    ~index && reqQueue.splice(index, 1);
    return response
}, err => {
    // 隐藏loading
    setTimeout(() => toast.hide(), 2000)
    return Promise.reject(err)
})

function transformParams(url, params) {
    if (url.indexOf('?') > -1) {
        let search = url.split('?')[1];
        search.split('&').forEach(item => {
            let keyValue = item.split('=');
            params[keyValue[0]] = keyValue[1];
        })
    }
}

const http = {
    get(url, params = {}) {
        transformParams(url, params)
        return instance.get(url, {params})
    },
    delete(url, params = {}) {
        transformParams(url, params)
        return instance.delete(url, {params});
    },
    head(url, params = {}) {
        transformParams(url, params)
        return instance.head(url, {params});
    },
    options(url, params = {}) {
        transformParams(url, params)
        return instance.options(url, {params});
    },
    post(url, data = {}, config = {}) {
        config.headers = Object.assign({}, config.headers, DEFAULT_CONTENT_TYPE)
        return instance.post(url, data, config);
    },
    put(url, data = {}, config = {}) {
        config.headers = Object.assign({}, config.headers, DEFAULT_CONTENT_TYPE)
        return instance.put(url, data, config);
    },
    patch(url, data = {}, config = {}) {
        config.headers = Object.assign({}, config.headers, DEFAULT_CONTENT_TYPE)
        return instance.patch(url, data, config);
    },
    postJson(url, data = {}, config = {}) {
        config.headers = Object.assign({}, config.headers, JSON_CONTENT_TYPE)
        return instance.post(url, data, config);
    },
    putJson(url, data = {}, config = {}) {
        config.headers = Object.assign({}, config.headers, JSON_CONTENT_TYPE)
        return instance.put(url, data, config);
    },
    patchJson(url, data = {}, config = {}) {
        config.headers = Object.assign({}, config.headers, JSON_CONTENT_TYPE)
        return instance.patch(url, data, config);
    },
    upload(url, data = {}) {
        let formData = new FormData();
        let keys = Object.keys(data);
        keys.forEach(key => {
            formData.append(key, data[key]);
        });
        return instance.post(url, formData, {
            headers: FILE_CONTENT_TYPE,
            timeout: 0
        });
    },
}
Object.freeze(http);

export default http