unirest.get("https://montanaflynn-fifa-world-cup.p.mashape.com/games")
.header("accepts", "json")
.header("X-Mashape-Key", "gBbE53liPImshLNPuYVvZ0RiEJlAp1GzZ45jsnUeLrpLfkT8nF")
.header("X-Mashape-Host", "montanaflynn-fifa-world-cup.p.mashape.com")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
