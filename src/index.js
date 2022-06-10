const task = {
  a: {
    job: function (finish) {
      setTimeout(() => {
        console.log("a ended");
        finish("a");
      }, 500);
    }
  },
  b: {
    job: function (finish) {
      setTimeout(() => {
        console.log("b ended");
        finish("b");
      }, 150);
    }
  },
  d: {
    job: function (finish) {
      setTimeout(() => {
        console.log("d ended");
        finish("d");
      }, 200);
    },
    dependencies: ["a", "b"]
  },
  c: {
    job: function (finish) {
      setTimeout(() => {
        console.log("c ended");
        finish("c");
      }, 300);
    },
    dependencies: []
  },
  e: {
    job: function (finish) {
      setTimeout(() => {
        console.log("e ended");
        finish("e");
      }, 100);
    },
    dependencies: ["c"]
  }
};

// const recurresion
const loop = (keys, p, print) => {
  const dep = [];
  keys.forEach((key) => {
    if (task[key]?.dependencies?.length) {
      dep.push(...task[key]?.dependencies);
    }
  });
  const nonDep = keys.filter((li) => dep.indexOf(li) === -1);
  console.log(nonDep, dep);
  let len = 0;
  dep.forEach((k) => {
    task[k].job(() => {
      len++;
      if (dep.length === len) {
        nonDep.forEach((k1) => {
          task[k1].job((l) => l);
        });
      }
    });
  });

  // const marked = new Set([...arr, ...keys]);
  // console.log([...marked]);
  // const newArr = [...marked];
  // // const
  // //  dep.job(li => non.job)
  // const newLoop = (newArr, i) => {
  //   if (task[newArr[i]] && arr.length > i) {
  //     task[newArr[i]].job((li) => {
  //       newLoop(newArr, ++i);
  //     });
  //   } else {
  //     p();
  //   }
  // };
  // newLoop(newArr, 0);
  // task[]
};

function asyncGraph(task, completedCallBack) {
  // sdkhsdkhk
  const keys = Object.keys(task);
  loop(keys, (p) => {
    completedCallBack();
  });
}

asyncGraph(task, () => console.log("Async call are finised "));
