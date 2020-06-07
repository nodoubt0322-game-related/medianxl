const count = 72;
const txt = 1;
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://docs.median-xl.com/doc/items/tiereduniques";

axios.get(url).then((res) => {
  cb1(res);
});

const obj = {
  id: count,
  name: "",
  img: "",
  info: [],
};

const cb1 = (res) => {
  const $ = cheerio.load(res.data);
  const table = $(".uniques").eq(count).html();

  if (txt) return fs.writeFileSync("temp.txt", table);

  obj.name = $(".item-unique", table).html().trim();
  obj.img = $("tr>td>img", table).attr("src");

  $("tr>td>span", table).each((index, item) => {
    // const data = oneHand($, item);
    // const data = oneHandNoColor($, item);
    // const data = twoHandele($, item);
    // const data = twoHand1d($, item);
    // const data = twoHand2d($, item);
    // const data = element($, item);
    const data = other($, item);

    obj.info.push(data);
  });
  // console.log(obj);
  fs.writeFileSync("temp.json", JSON.stringify(obj, null, 2));
  const result = require("./result.json");
  result.push(obj);
  fs.writeFileSync("result.json", JSON.stringify(result, null, 2));
  console.log("done");
};

function element($, item) {
  const tier = $("b", item).html().trim();
  let requirement = $("span", item)
    .eq(0)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  requirement.pop();

  let attribute = $("span", item)
    .eq(1)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  attribute.pop();
  const data = { tier, requirement, attribute };
  return data;
}

function twoHandele($, item) {
  const tier = $("b", item).html().trim();

  let requirement = $("span", item)
    .eq(0)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  requirement.pop();

  let attribute = $("span", item)
    .eq(1)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  attribute.pop();
  const data = { tier, requirement, attribute };
  return data;
}

function twoHand1d($, item) {
  const tier = $("b", item).html().trim();
  const damage = $("span", item).eq(0).html().trim().split("<br>")[0].trim();

  let requirement = $("span", item)
    .eq(0)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  requirement.pop();
  requirement.shift();

  let attribute = $("span", item)
    .eq(1)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  attribute.pop();
  const data = { tier, damage, requirement, attribute };
  return data;
}

function twoHand2d($, item) {
  const tier = $("b", item).html().trim();
  const damage1 = $("span", item).eq(0).html().trim() + " " + $("span", item).eq(1).html().trim().replace("<br>", "");
  const damage2 = $("span", item).eq(2).html().trim() + " " + $("span", item).eq(3).html().trim().replace("<br>", "");
  const damage = [damage1, damage2];
  let requirement = $("span", item)
    .eq(4)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  requirement.pop();
  requirement.shift();

  let attribute = $("span", item)
    .eq(5)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  attribute.pop();
  const data = { tier, damage, requirement, attribute };
  return data;
}

function oneHandNoColor($, item) {
  const tier = $("b", item).html().trim();
  const damage = $("span", item).eq(0).html().trim().split("<br>")[0];

  let requirement = $("span", item)
    .eq(0)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  requirement.pop();
  requirement.shift();

  let attribute = $("span", item)
    .eq(1)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  attribute.pop();
  const data = { tier, damage, requirement, attribute };
  return data;
}

function oneHand($, item) {
  const tier = $("b", item).html().trim();
  const damage = $("span", item).eq(0).html().trim() + " " + $("span", item).eq(1).html().trim().replace("<br>", "");

  let requirement = $("span", item)
    .eq(2)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  requirement.pop();

  let attribute = $("span", item)
    .eq(3)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  attribute.pop();
  const data = { tier, damage, requirement, attribute };
  return data;
}

function other($, item) {
  const tier = $("b", item).html().trim();

  const damage = [$("span", item).eq(0).html().trim() + " " + $("span", item).eq(1).html().trim().replace("<br>", "")];
  // const damage = [$("span", item).eq(0).html().trim().split("<br>")[0].trim()];

  // const damage1 = $("span", item).eq(0).html().trim().split("<br>")[0].trim();
  // const damage2 = $("span", item).eq(0).html().trim().split("<br>")[1].trim();
  // const damage1 = $("span", item).eq(0).html().trim() + " " + $("span", item).eq(1).html().trim().replace("<br>", "");
  // const damage2 = $("span", item).eq(2).html().trim() + " " + $("span", item).eq(3).html().trim().replace("<br>", "");
  // const damage = [damage1, damage2];

  const char = $("span", item).eq(2).html().trim().replace("(", "").replace(")", "").replace("<br>", "");

  // const r1 = $("span", item).eq(0).html().trim().split("<br>")[1].trim();
  // const r2 = $("span", item).eq(0).html().trim().split("<br>")[2].trim();
  // const r3 = $("span", item).eq(0).html().trim().split("<br>")[3].trim();
  // const r4 = $("span", item).eq(0).html().trim().split("<br>")[4].trim();
  // const r5 = $("span", item).eq(6).html().trim().split("<br>")[1].trim();
  // const requirement = [r1, r2, r3, r4];

  let requirement = $("span", item)
    .eq(3)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  requirement.pop();
  // requirement.shift();
  // requirement.shift();

  let attribute = $("span", item)
    .eq(4)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  attribute.pop();
  // const data = { tier, requirement, attribute };
  // const data = { tier, damage, requirement, attribute };
  // const data = { tier, char, requirement, attribute };
  const data = { tier, char, damage, requirement, attribute };
  return data;
}
