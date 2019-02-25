$(document).ready(() => {
    let revCheck = new Reviews('js/feedback.json');
    describe('Проверка на текст в отзыве', () => {

        it('В отзыве - не только цифры', async () => {
            for (let revitem of revCheck.revItems){
                expect(revitem.text).toMatch(/\D/ig);
            }

        })
    });
});