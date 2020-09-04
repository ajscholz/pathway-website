export const mbtiData = () => {
  const processRaw = (options, questions) => {
    const optCopy = options.map(i => i)
    const iterate = new Array(questions.length).fill("")
    const processed = iterate.map((item, index) => {
      let type
      switch (index % 7) {
        case 0:
          type = ["e", "i"]
          break
        case 1:
        case 2:
          type = ["s", "n"]
          break
        case 3:
        case 4:
          type = ["t", "f"]
          break
        case 5:
        case 6:
          type = ["j", "p"]
          break
        default:
      }
      return {
        question: questions[index],
        options: [optCopy.shift(), optCopy.shift()],
        type: type,
      }
    })

    // const obj = Object.fromEntries(processed)
    // console.log(obj)
    return processed
  }

  const mbtiQuestions = [
    "When the phone rings do you:",
    "Are you more:",
    "Is it worse to:",
    "With people are you usually more:",
    "Are you more comfortable in making:",
    "Is clutter in the workplace something you:",
    "Is it your way to:",
    "Waiting in line, do you often:",
    "Are you more:",
    "Are you more interested in:",
    "In making up your mind are you more likely to go by:",
    "In sizing up others do you tend to be:",
    "Do you prefer contracts to be:",
    "Are you more satisfied having:",
    "At a party, do you:",
    "Do you tend to be more:",
    "Do you like writers who:",
    "Which appeals to you more:",
    "If you must dissappoint someone are you usually:",
    "On the job do you want your activities:",
    "Do you more often prefer:",
    "Does interacting with strangers:",
    "Facts:",
    "Do you find visionaries and theorists:",
    "In a heated discussion do you:",
    "Is it better to be:",
    "At work, is it more natural for you to:",
    "Are you more comfortable:",
    "Do you tend to:",
    "Common sense is:",
    "Children often do not:",
    "When in charge of others do you tend to be:",
    "Are you more often:",
    "Are you prone to:",
    "In most situations are you more:",
    "Do you think of yourself as:",
    "Are you more frequently:",
    "Do you speak more in:",
    "Which is more of a compliment::",
    "Which rules you more:",
    "When finishing a job, do you like to:",
    "Do you prefer to work:",
    "Are you the kind of person who:",
    "Are you inclined to take what is said:",
    "Do you more often see:",
    "Is it worse to be:",
    "In trying circumstances are you sometimes:",
    "Do you tend to choose:",
    "Are you inclined to be more:",
    "At work do you tend to:",
    "Are you more likely to trust:",
    "Are you more inclined to feel:",
    "Do you think of yourself as a:",
    "Do you value in yourself more that you are:",
    "Do you usually want things:",
    "Would you say you are more:",
    "Do you consider yourself:",
    "Do you prize in yourself:",
    "Are you drawn more to:",
    "Which seems the greater fault::",
    "Are you swayed more by:",
    "Do you feel better about:",
    "Is it preferable mostly to:",
    "Are you inclined to be:",
    "In stories do you prefer:",
    "Is it easier for you to:",
    "Which do you wish more for yourself:",
    "Do you see yourself as basically:",
    "Do you tend to notice:",
    "Are you more:",
  ]

  const mbtiOptionsRaw = [
    "hurry to get it first",
    "hope someone else will answer",
    "observant than introspective",
    "introspective than observant",
    "have your head in the clouds",
    "be in a rut",
    "firm than gentle",
    "gentle than firm",
    "critical judgements",
    "value judgements",
    "take time to straighten up",
    "tolerate pretty well",
    "make up your mind quickly",
    "pick and choose at some length",
    "chat with others",
    "stick to business",
    "sensible than ideational",
    "ideational than sensible",
    "what is actual",
    "what is possible",
    "data",
    "desires",
    "objective and impersonal",
    "friendly and personal",
    "signed, sealed, and delivered",
    "settled on a handshake",
    "a finished product",
    "work in progress",
    "interact with many, even strangers",
    "interact with a few friends",
    "factual than speculative",
    "speculative than factual",
    "say what they mean",
    "use metaphors and symbolism",
    "consistency of thought",
    "harmonious relationships",
    "frank and straightforward",
    "warm and considerate",
    "scheduled",
    "unscheduled",
    "final, unalterable statements",
    "tentative, preliminary statements",
    "energize you",
    "tax your reserves",
    "speak for themselves",
    "illustrate principles",
    "somewhat annoying",
    "rather fascinating",
    "stick to your guns",
    "look for common ground",
    "just",
    "merciful",
    "point out mistakes",
    "try to please others",
    "after a decision",
    "before a decision",
    "say right out what's on your mind",
    "keep your ears open",
    "usually reliable",
    "frequently questionable",
    "make themselves useful enough",
    "exercise their fantasy enough",
    "firm and unbending",
    "forgiving and lenient",
    "a cool-headed person",
    "a warm-hearted person",
    "nailing things down",
    "exploring possibilities",
    "deliberate than spontaneous",
    "spontaneous than deliberate",
    "an outgoing person",
    "a private person",
    "a practical sort of person",
    "a fanciful sort of person",
    "particulars than generalities",
    "generalities than particulars",
    "There's a logical person",
    "There's a sentimental person",
    "your thoughts",
    "your feelings",
    "tie up all the loose ends",
    "move on to something else",
    "to deadlines",
    "just whenever",
    "is rather talkative",
    "doesn't miss much",
    "more literally",
    "more figuratively",
    "what's right in front of you",
    "what can only be imagined",
    "a softy",
    "hard-nosed",
    "too unsympathetic",
    "too sympathetic",
    "rather carefully",
    "somewhat impulsively",
    "hurried than leisurely",
    "leisurely than hurried",
    "be sociable with your colleagues",
    "keep more to yourself",
    "your experiences",
    "your conceptions",
    "down to earth",
    "somewhat removed",
    "tough-minded person",
    "tender-hearted person",
    "reasonable",
    "devoted",
    "settled and decided",
    "just penciled in",
    "serious and determined",
    "easy going",
    "a good conversationalist",
    "a good listener",
    "a strong hold on reality",
    "a vivid imagnation",
    "fundamentals",
    "overtones",
    "to be too compassionate",
    "to be too dispassionate",
    "convincing evidence",
    "a touching appeal",
    "coming to closure",
    "keeping your options open",
    "make sure things are arranged",
    "just let things happen naturally",
    "easy to approach",
    "somewhat reserved",
    "action and adventure",
    "fantast and heroism",
    "put others to good use",
    "identify with others",
    "strength of will",
    "strength of emotion",
    "thick-skinned",
    "thin-skinned",
    "disorderliness",
    "oportunities for change",
    "routinizd than whimsical",
    "whimsical than routinized",
  ]

  const mbtiOptions = processRaw(mbtiOptionsRaw, mbtiQuestions)

  return mbtiOptions
}

export const spiritualGiftsQuestions = [
  "I like organizing services and events.",
  "I am interested in starting new churches.",
  "I enjoy working with my hands.",
  "I can tell when someone is insincere.",
  "I pray daily for people who don’t know Jesus.",
  "Encouraging others is a high priority in my life.",
  "I trust God to provide for my daily needs.",
  "I am passionate about financially investing in the Kingdom of God.",
  "I look for opportunities to pray for the sick.",
  "I enjoy doing little things that others typically do not enjoy.",
  "I often have people over to my house.",
  "I enjoy spending hours in prayer for other people.",
  "Education is very important to me.",
  "I tend to motivate others to get involved.",
  "I hurt when I see others hurting.",
  "I believe God will use me to enact His miracles.",
  "I enjoy sharing the Gospel with other people groups and nationalities.",
  "I’ve devoted considerable time to mastering my voice and/or musical instrument.",
  "Caring for the hurting is one of my highest priorities.",
  "I get frustrated when people knowingly sin.",
  "I enjoy serving behind the scenes",
  "I like creating outlines of the Bible",
  "God has used me to interpret what someone speaking in tongues is saying.",
  "I enjoy the book of Proverbs more than any other book in the Bible.",
  "I am passionate about managing details.",
  "I like to help start new ministry projects.",
  "I consider myself a craftsman or craftswoman.",
  "I sense when situations are spiritually unhealthy.",
  "I am greatly motivated by seeing people who don’t know God be saved.",
  "I come across as loving and caring.",
  "Asking God for a list of seemingly impossible things is exciting to me.",
  "I find ways to give offerings above my tithe.",
  "I believe miraculous healing is possible and still happens.",
  "Helping others is one of my greatest motivations.",
  "Creating a warm and welcoming environment is important to me.",
  "I am burdened to pray for situations affecting the world.",
  "People come to me to learn more about God and the Bible.",
  "I prefer to take the lead whenever possible.",
  "I’m very sensitive to sad stories.",
  "Miracles often happen when I’m nearby.",
  "The idea of living in another country to benefit the Gospel is exciting to me.",
  "I desire to serve the church through worship.",
  "I enjoy connecting, caring for, and coaching others.",
  "Confronting someone about a sin in their life is important to me.",
  "It bothers me when people sit around and do nothing.",
  "I share Biblical truth with others to help them grow.",
  "I pray in tongues daily.",
  "When I study Scripture, I receive unique insights from God.",
  "Creating a task list is easy and enjoyable for me.",
  "I am attracted to ministries that start new churches.",
  "Building something with my hands is very satisfying to me.",
  "I can pinpoint issues or problems quickly.",
  "Sharing the Gospel with someone I do not know is exciting and natural for me.",
  "I look for ways to encourage other people.",
  "I trust that God has my back in every situation.",
  "I want to make more money so that I can give more.",
  "God has used me to bring healing to those who are sick.",
  "Being a part of the process is fulfilling to me.",
  "I tend to make total strangers feel at home.",
  "People often ask me to pray for them.",
  "I enjoy knowing Biblical details and helping others understand them too.",
  "I delegate responsibilities to accomplish tasks.",
  "I am motivated to help people in need.",
  "I have a constant hunger to see God’s miraculous power.",
  "I focus a lot on reaching the world for Christ.",
  "I gain my deepest satisfaction through leading others in vocal or instrumental worship.",
  "I enjoy helping people who are going through a difficult time.",
  "I enjoy hearing passionate and clear preaching of God’s Word.",
  "I like to do small things that others overlook.",
  "I prefer to teach and study the Bible topically rather than verse by verse.",
  "Praying in tongues is encouraging and important to me.",
  "When faced with difficulty, I tend  to make wise decisions.",
]

const enneagramQuestionsRaw = [
  {
    type: "Type 1",
    questions: [
      "People have told me I can be overly critical or judgmental.",
      "I beat myself up when I make mistakes.",
      "I don’t feel comfortable when I try to relax. There is too much to be done.",
      "I don’t like it when people ignore or break the rules, like when the person in the fast lane at the grocery story has more items than allowed.",
      "Details are important to me.",
      "I often find that I’m comparing myself to others.",
      "If I say I’ll do it, I’ll do it.",
      "It’s hard for me to let go of resentment.",
      "I think it is my responsibility to leave the world better than I found it.",
      "I have a lot of self-discipline.",
      "I try to be careful and thoughtful about how I spend money.",
      "It seems to me that things are either right or wrong.",
      "I spend a lot of time thinking about how I could be a better person.",
      "Forgiveness is hard for me.",
      "I notice immediately when things are wrong or out of place.",
      "I worry a lot.",
      "I am really disappointed when other people don’t do their part.",
      "I like routine and don’t readily embrace change.",
      "I do my best when working on a project, and I wish others would do the same, so I wouldn’t have to redo their work.",
      "I often feel like I try harder than others to do things correctly.",
    ],
  },
  {
    type: "Type 2",
    questions: [
      "When it comes to taking care of others, I don’t know how or when to say “no”.",
      "I am a great listener, and I remember the stories that make up people’s lives.",
      "I am anxious to overcome misunderstandings in a relationship.",
      "I feel drawn to influential or powerful people.",
      "People think I’m psychic because I usually know what other people need or want.",
      "Even people I don’t know well share deep stuff about their lives with me.",
      "It seems like people who love me should already know what I need.",
      "I need to be acknowledged or appreciated for my contributions.",
      "I’m more comfortable giving than receiving.",
      "I like my home to feel like a safe and welcoming place for my family and others.",
      "I care a great deal about what people think of me.",
      "I want other people to think I love everyone, even though I don’t.",
      "I like it when the people who love me do something unexpected for me.",
      "Lots of people ask me for help, and it makes me feel valuable.",
      "When people ask me what I need, I have no idea how to answer.",
      "When I’m tired I often feel like people take me for granted.",
      "People say my emotions can feel over-the-top.",
      "I feel angry and conflicted when my needs conflict with others’.",
      "Sometimes it is hard for me to watch movies because I find it almost unbearable to see people suffer.",
      "I worry a lot about being forgiven when I make mistakes.",
    ],
  },
  {
    type: "Type 3",
    questions: [
      "It’s important for me to come across as a winner.",
      "I love walking in a room and knowing I’m make a great first impression on the crowd.",
      "I could persuade Bill Gates to buy a Mac.",
      "The keys to happiness are efficiency, productivity, and being acknowledged as the best.",
      "I don’t like it when people slow me down.",
      "I know how to airbrush failure so it looks like success.",
      "I’d rather lead than follow any day.",
      "I am competitive to a fault.",
      "I can find a wat to win over and connect with just about anyone.",
      "I am a world-class multitasker.",
      "I keep close watch on how people are responding to me in the moment.",
      "It’s hard for me to not take work along on vacation.",
      "It’s hard for me to name or access my feelings.",
      "I’m not the one to talk much about my personal life.",
      "Sometimes I feel like a phony.",
      "I love setting and accomplishing measurable goals.",
      "I like other people to know about my accomplishments.",
      "I like to be seen in the company of successful people.",
      "I don’t mind cutting corners is it gets the job done more efficiently.",
      "People say I don’t know how or when to stop working.",
    ],
  },
  {
    type: "Type 4",
    questions: [
      "I like when things are unconventional, dramatic and refined.  I’m definitely not a fan of the ordinary.",
      "I never really felt like I belonged.",
      "I have so many feelings in a day it’s hard to know which ones to pay attention to first.",
      "Some people think I’m aloof, but really I’m just unique.",
      "In social situations I tend to hang back and wait for others to approach me.",
      "Melancholy is comfortable for me, so it’s annoying when people try to cheer me up.",
      "I’m not like everyone else... phew.",
      "I’m very sensitive to criticism, and it takes a while to get over it.",
      "I spend a lot of my time trying to explain myself.",
      "When people tell me what to do, I’m often tempted to do the opposite.",
      "Sometimes I just disappear and go radio silent for a few days.",
      "I’m okay with sad songs, sad stories and sad movies. Overly happy people give me a headache.",
      "I feel there is something essential lacking in me.",
      "It’s really hard for me to settle into a relationship because I’m always looking for my ideal soulmate.",
      "I’m self-conscious. It’s hard for me to find my place in a room full of people.",
      "People say I’m too intense and my feelings overwhelm them.",
      "I’m either an artist or highly creative. I come up with one amazing, creative idea after another. It’s executing them that’s hard.",
      "Lots of people misunderstand me, and it makes me frustrated.",
      "I pull people in, but then I get nervous and push them away.",
      "I worry a lot about abandonment",
    ],
  },
  {
    type: "Type 5",
    questions: [
      "People are wasteful. I hold on to what I have.",
      "I often feel awkward around other people.",
      "I’m a listener.",
      "I’m okay if people ask me a few specific questions about myself, but I don’t  like it when people want too much information.",
      "I take care of myself, and I think others could do the same.",
      "If I want people to know how I feel I will tell them. I generally wish they wouldn’t ask.",
      "I need time alone.",
      "I think thoughts are more reliable than feelings.",
      "I need a couple of days to process an experience or know how I feel about something.",
      "Often I find that I would rather observe than participate.",
      "I trust myself. That means I think about things for a while and then  make my own decisions.",
      "I can’t understand why people get together to “just hang out.”",
      "I have to be very careful with my time and energy.",
      "I get tired when I have to be with people for too long.",
      "I often felt invisible as a child. Sometimes as an adult I choose to be invisible.",
      "Sometimes I think I should be more generous. It’s hard for me.",
      "In groups, being uninformed makes me very uncomfortable.",
      "I don’t like big social gatherings. I’d rather be with a few people.",
      "Material possessions don’t make me happy.",
      "I don’t always say things out loud, but in my head I am pretty sarcastic and cynical.",
    ],
  },
  {
    type: "Type 6",
    questions: [
      "I’m always imagining and planning for the worst.",
      "I often don’t trust people who are in authority.",
      "People say I am loyal, understanding, funny and compassionate.",
      "Most of my friends don’t have as much anxiety as I do.",
      "I act quickly in a crisis, but when things settle down I fall apart.",
      "When my partner and I are doing really well in our relationship, I find myself wondering what will happen to spoil it.",
      "Being sure I’ve made the right decision is almost impossible.",
      "I’m aware that fear has dictated many of my choices in life.",
      "I don’t like to find myself in unpredictable situations.",
      "I find it hard to stop thinking about the things I’m worried about.",
      "I’m generally not comfortable with extremes.",
      "I usually have so much to do it’s hard for me to finish tasks.",
      "I’m most comfortable when I’m around people who are pretty much like me.",
      "People tell me I can be overly pessimistic.",
      "I am slow to start, and once I do get started I find myself continuing to think about what could go wrong.",
      "I don’t trust people who give me too many compliments.",
      "It helps me to have things in some kind of order.",
      "I like to be told I am good at my job, but I get nervous when my boss wants to add to my responsibilities.",
      "I have to know people for a long time before I can really trust them.",
      "I am skeptical of things that are new and unknown.",
    ],
  },
  {
    type: "Type 7",
    questions: [
      "I’m always the first person up for a last-minute adventure.",
      "I am an optimist to a fault.",
      "It’s hard for me to finish things. When I get close to the end of a project, I start thinking about the next thing, and then I get so excited I sometimes just move on.",
      "Anticipation is the best part of life.",
      "I suffer from FOMO – Fear Of Missing Out.",
      "I don’t like making hard and fast commitments to things.",
      "People close to me say I can be argumentative and act superior.",
      "Variety and spontaneity are the spice of life.",
      "Sometimes I get so eager for the future I can hardly wait for it to get here.",
      "I usually avoid heavy conversations and confrontations.",
      "When people I care about are having a hard time, I help them look at the  bright side of the situation.",
      "Other people think I am sure of myself, but I have lots of doubts.",
      "I’m popular and have lots of friends.",
      "When things get too serious for too long I usually find a way to get people to lighten up, often by telling jokes and funny stories.",
      "I don’t like endings, so I usually wait for people to break up with me.",
      "I quickly get bored with the same routine and like to try new things.",
      "Almost everything can be more fun and entertaining with a little effort.",
      "I think people worry more than they should.",
      "Life is better than people imagine. It’s all about how you explain things to yourself.",
      "I don’t like it when people have expectations of me.",
    ],
  },
  {
    type: "Type 8",
    questions: [
      "I have been told that I’m too blunt or aggressive.",
      "Doing things halfway is not my spiritual gift.",
      "I enjoy a good verbal skirmish, just to see what others are made of.",
      "In relationships that matter to me I insist on being honest about conflicts and staying in the fight till things are worked out.",
      "It’s hard for me to trust people.",
      "Justice is worth fighting for.",
      "I can sniff out other people’s weaknesses the first time I meet them.",
      "Saying no isn’t a problem for me.",
      "I welcome opposition. Bring it.",
      "I make decisions fast and from the gut.",
      "I don’t like it when people beat around the bush.",
      "I’m wary of people who are super nice.",
      "When I walk into a room I know immediately who has the most power.",
      "I don’t have much respect for people who don’t stand up for themselves.",
      "One of my mottos is “a good offense is better than a good defense.”",
      "Don’t mess with people I love.",
      "I know I’m respected, but sometimes I want to be loved.",
      "I have no problem confronting a bully.",
      "If God wanted people to wear their hearts on their sleeves, he would have put it there.",
      "Under my tough exterior is a tender, loving heart.",
    ],
  },
  {
    type: "Type 9",
    questions: [
      "I’ll do almost anything to avoid conflict.",
      "I’m not a self-starter.",
      "Sometimes I get lost in doing trivial tasks, while things that really matter and need to get done get put off.",
      "I’m happy to go along with what others want to do.",
      "I tend to procrastinate.",
      "When I get distracted and go off task I give my attention to whatever is happening right in front of me.",
      "I often choose the path of least resistance.",
      "I find routines at work and home comforting, and I feel unsettled when something throws them off.",
      "Others see me as more peaceful than I really am.",
      "I have a hard time getting started, but once I do I really get things done.",
      "I’m a “what you see is what you get” person.",
      "I don’t think of myself as being very important.",
      "People think I’m a good listener even though I find it hard to pay attention in a long conversation.",
      "I don’t like to take work home with me.",
      "Sometimes I tune out and think about the past.",
      "I don’t enjoy big social gatherings as much as a quiet evening at home with the ones I love.",
      "Being outdoors is very soothing for me.",
      "I am often quietly stubborn when people put demands on me.",
      "It would feel selfish to spend a whole day doing whatever I want to do.",
    ],
  },
]

export const enneagramQuestions = enneagramQuestionsRaw
  .map((group, i) => {
    const questions = [...group.questions]
    const qGroups = Math.ceil(group.questions.length / 5)
    let arr = new Array(qGroups).fill("")
    return arr.map(() => ({
      type: i + 1,
      questions: questions.splice(0, 5),
    }))
  })
  .flat()