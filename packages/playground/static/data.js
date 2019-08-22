const homeContent = {
  title: 'Hello',
  featuredCustom: [
    'post-Rarn0He12',
    'post-Rarn0HeUo',
    'post-mfYTWoPYN',
  ],
  featured: [
    'post-Rarn0HeUo',
    'post-Rarn0He12',
    'post-mfYTWoPYN',
  ]
}

const catContent = {
  cats: [
    {
      name: 'Cat',
      desc: 'Cat is cool',
      id: 'cats-GQnCNUpF2'
    },
    {
      name: 'Dog',
      desc: 'Dog is alright',
      id: 'cats-S_Aev5Ts-B',
    },
    {
      name: 'Hippo',
      desc: 'Hippo is love',
      id: 'cats-1wpAUDyA-W',
    }
  ]
}

const post1 =
  `---
title: Hello World
id: post-mfYTWoPYN
---`

const post2 =
  `---
title: Hallo Welt
id: post-Rarn0HeUo
---`

const post3 =
  `---
title: 안녕 세상
id: post-Rarn0He12
---`

const post4 =
  `---
title: Hej världen!
id: post-HahELOG49
---`

export default {
  '_data': {
    '_home.json': {
      'content': JSON.stringify(homeContent, null, 2)
    },
    '_cats.json': {
      'content': JSON.stringify(catContent, null, 2)
    }
  },
  '_posts': {
    'hello.md': {
      'content': post1
    },
    'hi.md': {
      'content': post2
    },
    // 'ha.md': {
    //   'content': post3
    // },
    'hej.md': {
      'content': post4
    }
  }
}
