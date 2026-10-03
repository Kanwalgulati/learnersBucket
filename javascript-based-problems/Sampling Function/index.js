function Sampler(fn, count, context) {
  let counter = 0;
  return function (...args) {
    context = this ?? counter;
    if (++counter !== count) return;

    fn.call(context, ...args);
    counter = 0;
  };
}

function message (){
    console.log("Hello");
}

const sample = Sampler(message,4);
sample();
sample();
sample();
sample();
sample();
sample();
sample();
sample();
sample();
sample();