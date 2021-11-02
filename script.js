
function getDiff(before, after)
{
    console.log(before, typeof before, after, typeof after)
    if(before == after) return null;
    if(!before) return after;
    if(typeof after == "string") return after;
    var res = {};
    for(var key of Object.keys(after)){
        var diff = getDiff(before[key], after[key]);
        if(diff) res[key] = diff;
    }
    return Object.keys(res).length ? res : null;
}

function diff()
{
    var beforeJson = document.getElementById("before").value
    var afterJson = document.getElementById("after").value
    try{
      eval(`var before = ${beforeJson}`);
    }
    catch(err){
      alert("BEFORE: " + err)
      return;
    }

    try{
      eval(`var after = ${afterJson}`);
    }
    catch(err){
      alert("AFTER: " + err)
      return;
    }

    console.log('parsing ', before , ' to ', after)

    const diff = getDiff(before, after);

    document.getElementById("result").value = diff ? JSON.stringify(diff, null, "  ") : "NO CHANGES"
}




/*
{
  "about": {
    "hero": {
      "title": "Support the EOS projects you love.",
      "description": "Pomelo is an open-source crowdfunding platform that multiplies your contributions."
    },
    "info": {
      "explore_grants": "EXPLORE GRANTS",
      "item_1": "Discover exciting projects",
      "item_2": "Support the ones you love",
      "item_3": "Watch contributions multiply",
      "description": "Inspired by Gitcoin, contributions are matched from a pool of funds provided by the EOS Network Foundation."
    },
  }
}


{
  "about": {
    "hero": {
      "title": "EDITED",
      "description": "Pomelo is an open-source crowdfunding platform that multiplies your contributions."
    },
    "info": {
      "explore_grants": "EXPLORE GRANTS",
      "item_2": "Support the ones you love",
      "item_3": "Watch contributions multiply",
      "description": "Inspired by Gitcoin, contributions are matched from a pool of funds provided by the EOS Network Foundation."
    },
  }
}
*/