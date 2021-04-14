// const promises = [];
// const myPromiseFunction = deneme => { return deneme }
// for(let i = 0; i < 10; i++) {
//   promises.push(myPromiseFunction(i));
// }
// Promise.all(promises).then(results => {
//   console.log(results);
//   // results is an array of the data resulting from each promise
// }).catch(errors => {
//   console.log(errors);
//   // errors is an array of any error that happened on any of the promises.
// });
// const getData = turn => {return turn + 1}
// const getMoreData = turn => {return turn + 1}
// const getEvenMoreData = turn => {return turn + 1}
// const getUltimateData = turn => {return turn + 1}

// async function myFunc() {
//   const a = await getData(5);
//   const b = await getMoreData(a);
//   const c = await getEvenMoreData(b);
//   const d = await getUltimateData(c);
//   console.log(d);
//   // and you can also RETURN this!
//   return d;
// }

// myFunc().then(console.log); // prints the value of d
const underAged = async (myAge) => {return (myAge >= 18) ? "Here's your drink!" : ("I can't serve you alcohol!");}


// And then we can use it
underAged(21).then(console.log).catch(console.error);
// logs "Here's your drink!"

underAged(17).then(console.log).catch(console.error);
// logs error "I can't serve you alcohol!"