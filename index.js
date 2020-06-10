const count = 80;
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
  fs.writeFileSync("temp.txt", table);

  if (txt) return;

  obj.name = $(".item-unique", table).html().trim();
  obj.img = $("tr>td>img", table).attr("src");

  $("tr>td>span", table).each((index, item) => {
    const data = other($, item);

    obj.info.push(data);
  });
  // console.log(obj);
  // fs.writeFileSync("temp.json", JSON.stringify(obj, null, 2));
  const result = require("./result.json");
  result.push(obj);
  fs.writeFileSync("result.json", JSON.stringify(result, null, 2));
  console.log("done");
};

function other($, item) {
  const tier = $("b", item).html().trim();

  const damage = [$("span", item).eq(0).html().trim() + " " + $("span", item).eq(1).html().trim().replace("<br>", "")];
  // const damage = [$("span", item).eq(0).html().trim().split("<br>")[0].trim()];

  // const damage1 = $("span", item).eq(0).html().trim().split("<br>")[0].trim();
  // const damage2 = $("span", item).eq(0).html().trim().split("<br>")[1].trim();
  // const damage1 = $("span", item).eq(0).html().trim() + " " + $("span", item).eq(1).html().trim().replace("<br>", "");
  // const damage2 = $("span", item).eq(2).html().trim() + " " + $("span", item).eq(3).html().trim().replace("<br>", "");
  // const damage = [damage1, damage2];

  const r1 = $("span", item).eq(2).html().trim().replace("(", "").replace(")", "").replace("<br>", "");
  const r2 = $("span", item).eq(3).html().trim().split("<br>")[0].trim();
  const r3 = $("span", item).eq(3).html().trim().split("<br>")[1].trim() + " " + $("span", item).eq(4).html().trim().split("<br>")[0].trim();
  const r4 = $("span", item).eq(5).html().trim().split("<br>")[0].trim();
  const r5 = $("span", item).eq(5).html().trim().split("<br>")[1].trim();
  const requirement = [r1, r2, r3, r4, r5];

  // let requirement = $("span", item)
  //   .eq(3)
  //   .html()
  //   .trim()
  //   .split("<br>")
  //   .map((self) => self.trim());
  // requirement.pop();
  // requirement.unshift($("span", item).eq(2).html().trim().replace("(", "").replace(")", "").replace("<br>", ""));
  // requirement.shift();
  // requirement.shift();

  // let attribute = $("span", item)
  //   .eq(4)
  //   .html()
  //   .trim()
  //   .split("<br>")
  //   .map((self) => self.trim());
  // attribute.pop();

  let attribute = $("span", item)
    .eq(6)
    .html()
    .trim()
    .split("<br>")
    .map((self) => self.trim());
  attribute.pop();
  // attribute.unshift($("span", item).eq(4).children("span").html().trim());

  // const data = { tier, requirement, attribute };
  const data = { tier, damage, requirement, attribute };
  // const data = { tier, char, requirement, attribute };
  // const data = { tier, char, damage, requirement, attribute };
  return data;
}
