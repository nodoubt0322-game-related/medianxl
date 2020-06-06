const result = require("./result.json");
const fs = require("fs");

const arr = result.map((item) => {
  const info = item.info.map((self, index) => {
    // if (index === 0) console.log(typeof self.damage);
    if (!self.damage) return self;
    const damage = !Array.isArray(self.damage) ? [self.damage] : self.damage;
    const obj = damage ? { ...self, damage } : self;
    return obj;
  });
  return { ...item, info };
});

fs.writeFileSync("result.json", JSON.stringify(arr, null, 2));
// console.log("done");
