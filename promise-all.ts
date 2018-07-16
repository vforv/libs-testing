const numbers = [
    1, 2, 3, 4
]

const numbers1 = [
    4, 3, 2, 1
]

class PromseAll {
    public somePromise(number) {
        return new Promise((resolve: any, reject: any) => resolve(number));
    }

    public somePromiseNew(number) {
        return new Promise((resolve: any, reject: any) => resolve(number));
    }

    public async res() {
        const someNumbers = numbers.map(async (number) => {
            const doesResolve = await this.somePromise(number);
            if (doesResolve === 2) {
                console.log('throw error');
                return;
            }
            const resolveAnother = await this.somePromiseNew(number);
            console.log(resolveAnother)
            return resolveAnother;
        })
        
        await Promise.all(someNumbers);
        console.log('done');
    }
}

const promAll = new PromseAll();

promAll.res();