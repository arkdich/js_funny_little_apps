createPlaceholder();
getImages().then(clearPlaceholder).then(createItem);

function clearPlaceholder(data) {
    document.body.removeChild(document.querySelector(".item_placeholder"));
    return data;
}

function createPlaceholder() {
    let placeholder = document.createElement("div");
    placeholder.className = "item item_style item_placeholder";

    placeholder.innerHTML = `
    <div class="item__row item__row_placeholder bg-anim"></div>
    <div class="item__row item__row_text_padding">
        <div class="row-placeholder bg-anim m-b-35"></div>
        <div class="row-placeholder bg-anim m-tb-10"></div>
        <div class="row-placeholder bg-anim m-tb-10"></div>
        <div class="row-placeholder bg-anim m-tb-10"></div>
        <div class="item__user-block">
            <div class="item__user-img bg-anim item__user-img_placeholder"></div>
            <div class="item__user-info">
                <div class="row-placeholder bg-anim row-placeholder_w_100 m-tb-10"></div>
                <div class="row-placeholder bg-anim row-placeholder_w_100 m-tb-10"></div>
            </div>
        </div>
    </div>`;

    document.body.prepend(placeholder);
}

async function getImages() {
    let url = "https://source.unsplash.com/random/";
    let sizes = ["1280x720", "60x60"];

    let responses = sizes.map(size => {
        return fetch(url + size);
    });

    let reqs = await Promise.all(responses);

    let images = await Promise.all(reqs.map(req => req.blob()));

    return images;
}

function createItem(images) {
    let item = document.createElement("div");
    item.className = "item item_style";
    item.innerHTML = `
    <div class="item__row">
        <img src="${URL.createObjectURL(images[0])}" alt="" class="item__img">
    </div>
    <div class="item__row item__row_text_padding">
        <h3 class="item__header">Lorem ipsum dolor sit amet.</h3>
        <p class="item__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, asperiores!</p>
        <div class="item__user-block">
            <img src="${URL.createObjectURL(images[1])}" alt="" class="item__user-img">
            <div class="item__user-info">
                <h4 class="item__user-header">Lorem, ipsum dolor.</h4>
                <p class="item__user-date">16 May, 2021</p>
            </div>
        </div>
    </div>`;

    document.body.prepend(item);
}