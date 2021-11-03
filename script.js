
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

function getMerge(old_, new_)
{
    if(!new_ || Object.keys(new_).length == 0) return old_;
    if(!old_ || Object.keys(old_).length == 0) return new_;
    if(typeof old_ == "string") return new_;
    for(let key of Object.keys(old_)){
      console.log(old_[key], new_[key])
      old_[key] = getMerge(old_[key], new_[key])
    }
    for(let key of Object.keys(new_)){
      if(!old_[key]) old_[key] = new_[key]
    }
    return old_;
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

function merge()
{
    var oldJson = document.getElementById("oldjson").value
    var newJson = document.getElementById("newjson").value
    try{
      eval(`var old = ${oldJson}`);
    }
    catch(err){
      alert("OLD: " + err)
      return;
    }

    try{
      eval(`var new_ = ${newJson}`);
    }
    catch(err){
      alert("NEW: " + err)
      return;
    }

    console.log('parsing ', old , ' and ', new_)

    const merge = getMerge(old, new_);

    document.getElementById("result").value = merge ? JSON.stringify(merge, null, "  ") : "NO CHANGES"
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