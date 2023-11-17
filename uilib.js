
class Select {
    constructor(original) {
        this.original = original;
        this.dom = this.build();
    }
    build() {
        const parent = $('<div class="uilib uilib-selector"></div>')
        const selected = $('<div class="selected"><span></span><i class="fa-solid fa-chevron-down"></i></div>');
        selected.on("click", function() {
            parent.toggleClass("open")
        })
        parent.append(selected);
        const optList = $('<ul></ul>');
        parent.append(optList);
        const opts = $(this.original).children("option")
        let selFound = false;
        const _this = this;
        opts.each(function() {
            const attr = $(this).attr("selected")
            const opt = $('<li data-value="' + $(this).attr("value") + '"><span>' + $(this).text() + '</span></li>');
            opt.on("click", function() {
                const val = $(this).attr("data-value");
                const text = $(this).children("span").text();
                const li = optList.children("li[data-value='" + selected.attr("data-value") + "']");
                li.show();
                selected.attr("data-value", val);
                selected.children("span").text(text);
                $(this).hide();
                parent.removeClass("open");
                $(_this.original).val(val)
                $(_this.original).change();
            })
            optList.append(opt)
            if(attr != undefined) {
                selected.attr("data-value", $(this).attr("value"));
                selected.children("span").text($(this).text());
                opt.hide();
                selFound = true;
            }
        })
        if(!selFound) {
            const first = optList.children("li:first-child");
            first.hide();
            selected.attr("data-value", $(opts[0]).attr("value"));
            selected.children("span").text($(opts[0]).text());
        }
        $(document).on("mousedown",function(e) {
            if(!parent.is(e.target) && $(parent).has(e.target).length === 0) {
                parent.removeClass("open")
            }
        })
        return parent;
    }
}

function initSelections() {
    const selects = $("select.uilib");
    selects.each(function() {
        const dom = new Select($(this))
        $(this).hide()
        $(dom.dom).insertAfter($(this))
    })
}

window.onload = function() {
    if(typeof $ != "function") {
        //Check if jquery is found
        console.error("Jquery is not found")
        return;
    }
    initSelections();
}