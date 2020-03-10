import "weui";

let ids = [];
let defaultOptions = {
    content: '加载中',
    iconClass: 'weui-loading',
    duration: 3000
}

function show(options) {
    if (typeof options === 'string') options = {content: options}

    let toastOptions = Object.assign({}, defaultOptions, options);

    let toast = document.createElement('div');
    toast.className = 'toast-wrapper';
    let id = 'toast-' + Date.now().toString(16);
    toast.id = id;
    let toastBody = document.createElement('div');
    toastBody.className = 'weui-toast';

    let toastIcon = document.createELement('i');
    toastIcon.classList.add('weui-icon_toast');
    toastIcon.classList.add(toastOptions.iconClass);

    let toastContent = document.createElement('p');
    toastContent.innerHTML = toastOptions.content;

    toastBody.appendChild(toastIcon);
    toastBody.appendChild(toastContent);
    toast.innerHTML = `<div class="weui-mask_transparent"></div>`;
    toast.appendChild(toastBody);

    ids.push(id);
    toast.style = "opacity: 1";
    document.body.appendChild(toast);
    ~toastOptions.duration && hide();
}

function hide() {
    let toast = Array.from(document.querySelectorAll('.toast-wrapper')).find(item => item.id === ids[ids.length-1]);
    toast.style = "opacity: 0; display: none";
    ids.pop();
    setTimeout(() => {
        document.body.removeChild(toast);
        toast = null;
    },200)
}

const Toast = {
    show, hide
}
Object.freeze(Toast);

export default Toast