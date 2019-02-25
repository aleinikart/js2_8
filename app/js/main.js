$(document).ready(() => {
    describe('Проверка на целое число', () => {
        let revCheck = new Reviews('js/feedback.json');
        it('Это челое число', async () => {
            for (let revitem of revCheck.revItems){
                expect(revitem.text).toMatch(/\D/ig);
            }

        })
    });
});