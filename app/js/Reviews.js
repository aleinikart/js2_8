class Reviews {
    constructor(source, container = '#revblock'){
        this.source = source;
        this.container = container;
        this.revItems = [];
        this._init();
        this._addReview();
        this._approve();
        this._deletRev();
    }

    async _init(){
        await fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let review of data){
                    this.revItems.push(review);
                    this._renderReview(review);
                }
                console.log(this.revItems)
            })
    }
    _renderReview(review){
        let newRev = new Review(review.id, review.author, review.text, review.isApproved);
    }

    static async newRew(){
        let rev = new Reviews(source);
        await rev._init();
        return rev;
    }

    _addReview(){
        $('#leaverev').on('submit', (e)=> {
            e.preventDefault();
            let sentAuthor = $('#leaverev [name="name"]').val();
            let sentText = $('#leaverev [name="text"]').val();
            if(sentAuthor.match(/^[a-zа-яё \-]{2,}$/ig) !== null && sentText !== ''){

                let idReserved = [];

                for (let item of this.revItems){
                    idReserved.push(item.id);

                }

                Array.prototype.max = function () {
                    return Math.max.apply(null, this);
                };
                let sentId = idReserved.max()+1;
                let newRev = new Review(sentId, sentAuthor, sentText, false);
                this.revItems.push({id: sentId, author: sentAuthor, text: sentText, isApproved: false});
                console.log(this.revItems);
                $('#leaverev [name="name"]').val('');
                $('#leaverev [name="text"]').val('');
            }
        });

    }

    _approve(){
        $('#revblock').on('click', '[data-approve="false"]', (e) =>{
            let revId = +$(e.target).parents('.revitem').data('id');
            for (let item of this.revItems){
                if(item.id === revId){
                   item.isApproved = true;
                }
            }
            $(e.currentTarget).attr("data-approve", "true");
            console.log(this.revItems);
        });
    }
    _deletRev(){
        $('#revblock').on('click', '[data-delete]', (e) =>{
            let revId = +$(e.target).parents('.revitem').data('id');
            for (let item of this.revItems){
                if(item.id === revId){
                    this.revItems = this.revItems.filter((item) => item.id !== revId);
                    $(`.revitem[data-id="${item.id}"]`).remove();
                }
            }
            console.log(this.revItems);
        });
    }


}

class Review {
    constructor(id, author, text, isApproved = false, container = '#revblock'){
        this.id = id;
        this.author = author;
        this.text = text;
        this.isApproved = isApproved;
        this.container = container;
        this._render();
    }

    _render(){
        let $wrapper = $('<div/>', {
            class: 'revitem',
            "data-id": this.id

        });
        let $idnumber = $(`<span class="revid">Отзыв №${this.id}</span>`)
        let $author = $('<strong/>', {
            class: 'author',
            text: this.author
        });
        let $text = $(`<div class="text"><p>${this.text}</p></div>`);

        let $approve = $(`<div data-approve="${this.isApproved}"><svg><use xlink:href="#check"></svg></div>`);
        let $delete = $(`<div data-delete><svg><use xlink:href="#trash"></svg></div>`);


        $idnumber.appendTo($wrapper);
        $author.appendTo($wrapper);
        $text.appendTo($wrapper);
        $approve.appendTo($wrapper);
        $delete.appendTo($wrapper);
        $(this.container).append($wrapper);
    }
}