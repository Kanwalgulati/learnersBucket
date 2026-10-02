// // Given a list of timestamps and commodity prices , find out heighest commodity price at given timestamps. timestamps are not 
// // necessarily in sorted order , there can be multiple entries for a timestamp as WEBGL_lose_context.Given
// // Follow Up : 
// //     after each timestamp , commodity price entry we are putting a checkpoint, 
// //     given a timestamp and checkpoint find maximum commodiy prices till then.


// const Store = function(){
//     this.store = new Map();
//     this.add = function(timestamp,price){
//         //fisrt we will check if that timestamp already exist if yes
//         //then push price in that timestamp
//         if(this.store.has(timestamp)){
//             const prices = this.store.get(timestamp);
//             this.store.set(timestamp,[price,...prices]);
//         }
//         //if not create a new entry 
//         else{
//             this.store.set(timestamp,[price]);
//         }
//     }
//     //to get heighest price from commodity

//     this.heighestPrice = function(timestamp){
//         const prices = this.store.get(timestamp)??[];
//         return Math.max(...prices)??0;
//     }
// }

// const s  = new Store();
// s.add(1,1);
// s.add(1,4);
// s.add(1,2);
// // console.log(s.heighestPrice(1));

// //now if we introduce a checkpoint also then we need to update the code



// const checkPointStore = function(){
//     this.checkPointStore = new Map();
//     this.add = function (timestamp,price,checkpoint){
//         //first check if timestamp is present or not
//         if(this.checkPointStore.has(timestamp)){
//             const prices = this.checkPointStore.get(timestamp);
//             this.checkPointStore.set(timestamp,[...prices,price])
//         }
//         else{
//             this.checkPointStore.set(timestamp,[price]);
//         }

//         //now we will check for if checkpoint is available or not
//         if(checkpoint){
//             const prices = this.checkPointStore.get(timestamp);
//             this.checkPointStore.set(timestamp,[...prices,checkpoint]);
//         }
//     }

//     //now for gettting heighest commodity price
//     this.heighestPrice = (timestamp,checkpoint)=>{
//         let prices = this.checkPointStore.get(timestamp);
//         if(checkpoint){
//             let checkpoitIndex = prices.findIndex(e=>e===checkpoint);
//             console.log("checkpoint index",checkpoitIndex,prices,checkpoint)
//             prices=prices.slice(0,checkpoitIndex);
//         }
//         // console.log("pricesss",prices);
//         return this.getMax(prices);

//     }
//     this.getMax = (prices)=>{
//         const filteredPrices = prices.filter(e=>Number(e))
//         return Math.max(...filteredPrices??0)
//     }
// }

// const cS = new checkPointStore();
// cS.add(1,1);
// cS.add(1,4);
// cS.add(1,2);
// cS.add(1,3,"a");
// cS.add(1,6);
// cS.add(1,7);
// cS.add(1,8,"b");

// console.log(cS.heighestPrice(1,"a"));
// console.log(cS.heighestPrice(1,"b"));

const CheckPointStore = function () {
    this.store = new Map();

    this.add = function (timestamp, price, checkpoint = null) {
        if (!this.store.has(timestamp)) {
            this.store.set(timestamp, []);
        }

        this.store.get(timestamp).push({
            price,
            checkpoint
        });
    };

    this.highestPrice = function (timestamp, checkpoint = null) {
        const entries = this.store.get(timestamp) || [];

        // If no checkpoint is provided,
        // return the maximum price for the timestamp.
        if (checkpoint === null) {
            return this.getMax(entries);
        }

        // Find the checkpoint.
        const checkpointIndex = entries.findIndex(
            entry => entry.checkpoint === checkpoint
        );

        // Checkpoint doesn't exist.
        if (checkpointIndex === -1) {
            return 0;
        }

        // Include the price associated with the checkpoint.
        const entriesTillCheckpoint = entries.slice(0, checkpointIndex + 1);

        return this.getMax(entriesTillCheckpoint);
    };

    this.getMax = function (entries) {
        if (entries.length === 0) {
            return 0;
        }

        return Math.max(...entries.map(entry => entry.price));
    };
};


// Example
const cS = new CheckPointStore();

cS.add(1, 1);
cS.add(1, 4);
cS.add(1, 2);
cS.add(1, 3, "a");
cS.add(1, 6);
cS.add(1, 7);
cS.add(1, 8, "b");

console.log(cS.highestPrice(1, "a")); // 4
console.log(cS.highestPrice(1, "b")); // 8
console.log(cS.highestPrice(1));      // 8