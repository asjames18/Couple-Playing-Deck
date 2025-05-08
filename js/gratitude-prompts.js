const prompts = [
    {
        category: "Relationships",
        text: "Something your partner did today that made you smile"
    },
    {
        category: "Relationships",
        text: "A quality you admire in your partner"
    },
    {
        category: "Relationships",
        text: "A moment you shared with your partner that brought you closer"
    },
    {
        category: "Relationships",
        text: "Something your partner taught you"
    },
    {
        category: "Relationships",
        text: "A way your partner supports your dreams"
    },
    {
        category: "Relationships",
        text: "A small gesture from your partner that meant a lot"
    },
    {
        category: "Relationships",
        text: "A way your partner makes you feel special"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed understanding"
    },
    {
        category: "Relationships",
        text: "Something your partner does that makes you feel loved"
    },
    {
        category: "Relationships",
        text: "A way your partner helps you grow"
    },
    {
        category: "Relationships",
        text: "A shared memory that brings you joy"
    },
    {
        category: "Relationships",
        text: "A way your partner shows respect for you"
    },
    {
        category: "Relationships",
        text: "Something your partner does that makes you proud"
    },
    {
        category: "Relationships",
        text: "A way your partner makes you laugh"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed courage"
    },
    {
        category: "Relationships",
        text: "Something your partner does that inspires you"
    },
    {
        category: "Relationships",
        text: "A way your partner shows patience"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed strength"
    },
    {
        category: "Relationships",
        text: "Something your partner does that makes you feel safe"
    },
    {
        category: "Relationships",
        text: "A way your partner shows trust in you"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed vulnerability"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows commitment"
    },
    {
        category: "Relationships",
        text: "A way your partner shows appreciation"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed wisdom"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows care"
    },
    {
        category: "Relationships",
        text: "A way your partner shows loyalty"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed generosity"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows dedication"
    },
    {
        category: "Relationships",
        text: "A way your partner shows affection"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed resilience"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows thoughtfulness"
    },
    {
        category: "Relationships",
        text: "A way your partner shows support"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed kindness"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows consideration"
    },
    {
        category: "Relationships",
        text: "A way your partner shows empathy"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed compassion"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows devotion"
    },
    {
        category: "Relationships",
        text: "A way your partner shows admiration"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed tenderness"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows respect"
    },
    {
        category: "Relationships",
        text: "A way your partner shows appreciation"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed understanding"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows trust"
    },
    {
        category: "Relationships",
        text: "A way your partner shows commitment"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed love"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows care"
    },
    {
        category: "Relationships",
        text: "A way your partner shows support"
    },
    {
        category: "Relationships",
        text: "A moment when your partner showed kindness"
    },
    {
        category: "Relationships",
        text: "Something your partner does that shows devotion"
    },
    {
        category: "Daily Life",
        text: "Something that made you laugh today"
    },
    {
        category: "Daily Life",
        text: "A small pleasure you experienced today"
    },
    {
        category: "Daily Life",
        text: "Something you accomplished today"
    },
    {
        category: "Daily Life",
        text: "A moment of peace you experienced"
    },
    {
        category: "Daily Life",
        text: "Something that went better than expected"
    },
    {
        category: "Daily Life",
        text: "A kind interaction you had today"
    },
    {
        category: "Daily Life",
        text: "A moment of joy you experienced"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel proud"
    },
    {
        category: "Daily Life",
        text: "A small victory you achieved"
    },
    {
        category: "Daily Life",
        text: "A moment of clarity you had"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel grateful"
    },
    {
        category: "Daily Life",
        text: "A moment of connection you experienced"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel inspired"
    },
    {
        category: "Daily Life",
        text: "A moment of contentment you felt"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel accomplished"
    },
    {
        category: "Daily Life",
        text: "A moment of relaxation you enjoyed"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel hopeful"
    },
    {
        category: "Daily Life",
        text: "A moment of excitement you experienced"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel confident"
    },
    {
        category: "Daily Life",
        text: "A moment of satisfaction you felt"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel energized"
    },
    {
        category: "Daily Life",
        text: "A moment of wonder you experienced"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel peaceful"
    },
    {
        category: "Daily Life",
        text: "A moment of gratitude you felt"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel loved"
    },
    {
        category: "Daily Life",
        text: "A moment of joy you shared"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel supported"
    },
    {
        category: "Daily Life",
        text: "A moment of connection you made"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel understood"
    },
    {
        category: "Daily Life",
        text: "A moment of kindness you received"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel appreciated"
    },
    {
        category: "Daily Life",
        text: "A moment of warmth you felt"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel valued"
    },
    {
        category: "Daily Life",
        text: "A moment of comfort you experienced"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel secure"
    },
    {
        category: "Daily Life",
        text: "A moment of peace you found"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel calm"
    },
    {
        category: "Daily Life",
        text: "A moment of serenity you experienced"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel balanced"
    },
    {
        category: "Daily Life",
        text: "A moment of harmony you felt"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel centered"
    },
    {
        category: "Daily Life",
        text: "A moment of mindfulness you practiced"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel present"
    },
    {
        category: "Daily Life",
        text: "A moment of awareness you had"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel focused"
    },
    {
        category: "Daily Life",
        text: "A moment of clarity you gained"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel organized"
    },
    {
        category: "Daily Life",
        text: "A moment of productivity you achieved"
    },
    {
        category: "Daily Life",
        text: "Something that made you feel efficient"
    },
    {
        category: "Personal Growth",
        text: "A challenge you overcame recently"
    },
    {
        category: "Personal Growth",
        text: "Something you learned about yourself"
    },
    {
        category: "Personal Growth",
        text: "A skill you're developing"
    },
    {
        category: "Personal Growth",
        text: "A way you've grown in the past year"
    },
    {
        category: "Personal Growth",
        text: "A goal you're working towards"
    },
    {
        category: "Personal Growth",
        text: "A new perspective you've gained"
    },
    {
        category: "Personal Growth",
        text: "A habit you've successfully changed"
    },
    {
        category: "Personal Growth",
        text: "A fear you've conquered"
    },
    {
        category: "Personal Growth",
        text: "A lesson you've learned from a mistake"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more confident"
    },
    {
        category: "Personal Growth",
        text: "A new interest you've discovered"
    },
    {
        category: "Personal Growth",
        text: "A way you've improved your communication"
    },
    {
        category: "Personal Growth",
        text: "A boundary you've set for yourself"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more patient"
    },
    {
        category: "Personal Growth",
        text: "A new way you handle stress"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more organized"
    },
    {
        category: "Personal Growth",
        text: "A new routine you've established"
    },
    {
        category: "Personal Growth",
        text: "A way you've improved your health"
    },
    {
        category: "Personal Growth",
        text: "A new hobby you've taken up"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more mindful"
    },
    {
        category: "Personal Growth",
        text: "A new book that changed your perspective"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more resilient"
    },
    {
        category: "Personal Growth",
        text: "A new skill you've mastered"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more compassionate"
    },
    {
        category: "Personal Growth",
        text: "A new way you express yourself"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more independent"
    },
    {
        category: "Personal Growth",
        text: "A new way you handle conflict"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more decisive"
    },
    {
        category: "Personal Growth",
        text: "A new way you practice self-care"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more adaptable"
    },
    {
        category: "Personal Growth",
        text: "A new way you manage your time"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more focused"
    },
    {
        category: "Personal Growth",
        text: "A new way you handle emotions"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more creative"
    },
    {
        category: "Personal Growth",
        text: "A new way you solve problems"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more disciplined"
    },
    {
        category: "Personal Growth",
        text: "A new way you show leadership"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more empathetic"
    },
    {
        category: "Personal Growth",
        text: "A new way you handle criticism"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more assertive"
    },
    {
        category: "Personal Growth",
        text: "A new way you practice gratitude"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more optimistic"
    },
    {
        category: "Personal Growth",
        text: "A new way you handle change"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more balanced"
    },
    {
        category: "Personal Growth",
        text: "A new way you handle pressure"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more authentic"
    },
    {
        category: "Personal Growth",
        text: "A new way you handle success"
    },
    {
        category: "Personal Growth",
        text: "A way you've become more humble"
    },
    {
        category: "Personal Growth",
        text: "A new way you handle failure"
    },
    {
        category: "Nature",
        text: "Something beautiful you saw in nature today"
    },
    {
        category: "Nature",
        text: "A weather condition you're enjoying"
    },
    {
        category: "Nature",
        text: "A natural sound that brings you peace"
    },
    {
        category: "Nature",
        text: "A plant or animal that made you smile"
    },
    {
        category: "Nature",
        text: "A natural phenomenon you witnessed"
    },
    {
        category: "Nature",
        text: "A way nature provided comfort today"
    },
    {
        category: "Nature",
        text: "A moment of awe in nature"
    },
    {
        category: "Nature",
        text: "A natural scent you enjoyed"
    },
    {
        category: "Nature",
        text: "A way nature showed its beauty"
    },
    {
        category: "Nature",
        text: "A natural texture you appreciated"
    },
    {
        category: "Nature",
        text: "A way nature provided inspiration"
    },
    {
        category: "Nature",
        text: "A moment of peace in nature"
    },
    {
        category: "Nature",
        text: "A way nature showed its power"
    },
    {
        category: "Nature",
        text: "A natural color that caught your eye"
    },
    {
        category: "Nature",
        text: "A way nature provided perspective"
    },
    {
        category: "Nature",
        text: "A moment of wonder in nature"
    },
    {
        category: "Nature",
        text: "A way nature showed its resilience"
    },
    {
        category: "Nature",
        text: "A natural pattern you noticed"
    },
    {
        category: "Nature",
        text: "A way nature provided healing"
    },
    {
        category: "Nature",
        text: "A moment of connection with nature"
    },
    {
        category: "Nature",
        text: "A way nature showed its diversity"
    },
    {
        category: "Nature",
        text: "A natural rhythm you observed"
    },
    {
        category: "Nature",
        text: "A way nature provided nourishment"
    },
    {
        category: "Nature",
        text: "A moment of joy in nature"
    },
    {
        category: "Nature",
        text: "A way nature showed its balance"
    },
    {
        category: "Nature",
        text: "A natural element you appreciated"
    },
    {
        category: "Nature",
        text: "A way nature provided shelter"
    },
    {
        category: "Nature",
        text: "A moment of serenity in nature"
    },
    {
        category: "Nature",
        text: "A way nature showed its harmony"
    },
    {
        category: "Nature",
        text: "A natural cycle you observed"
    },
    {
        category: "Nature",
        text: "A way nature provided energy"
    },
    {
        category: "Nature",
        text: "A moment of clarity in nature"
    },
    {
        category: "Nature",
        text: "A way nature showed its wisdom"
    },
    {
        category: "Nature",
        text: "A natural change you witnessed"
    },
    {
        category: "Nature",
        text: "A way nature provided guidance"
    },
    {
        category: "Nature",
        text: "A moment of renewal in nature"
    },
    {
        category: "Nature",
        text: "A way nature showed its strength"
    },
    {
        category: "Nature",
        text: "A natural gift you received"
    },
    {
        category: "Nature",
        text: "A way nature provided comfort"
    },
    {
        category: "Nature",
        text: "A moment of gratitude for nature"
    },
    {
        category: "Nature",
        text: "A way nature showed its beauty"
    },
    {
        category: "Nature",
        text: "A natural wonder you experienced"
    },
    {
        category: "Nature",
        text: "A way nature provided peace"
    },
    {
        category: "Nature",
        text: "A moment of awe in nature"
    },
    {
        category: "Nature",
        text: "A way nature showed its majesty"
    },
    {
        category: "Nature",
        text: "A natural blessing you received"
    },
    {
        category: "Nature",
        text: "A way nature provided joy"
    },
    {
        category: "Nature",
        text: "A moment of wonder in nature"
    },
    {
        category: "Health",
        text: "Something your body can do"
    },
    {
        category: "Health",
        text: "A healthy habit you've developed"
    },
    {
        category: "Health",
        text: "A way you take care of yourself"
    },
    {
        category: "Health",
        text: "A food you enjoy that's good for you"
    },
    {
        category: "Health",
        text: "A form of exercise you enjoy"
    },
    {
        category: "Health",
        text: "A way your body heals itself"
    },
    {
        category: "Health",
        text: "A healthy choice you made today"
    },
    {
        category: "Health",
        text: "A way you manage stress"
    },
    {
        category: "Health",
        text: "A moment of physical strength"
    },
    {
        category: "Health",
        text: "A way you practice self-care"
    },
    {
        category: "Health",
        text: "A healthy meal you enjoyed"
    },
    {
        category: "Health",
        text: "A way you stay hydrated"
    },
    {
        category: "Health",
        text: "A moment of mental clarity"
    },
    {
        category: "Health",
        text: "A way you get enough sleep"
    },
    {
        category: "Health",
        text: "A healthy snack you love"
    },
    {
        category: "Health",
        text: "A way you maintain flexibility"
    },
    {
        category: "Health",
        text: "A moment of physical comfort"
    },
    {
        category: "Health",
        text: "A way you practice mindfulness"
    },
    {
        category: "Health",
        text: "A healthy routine you follow"
    },
    {
        category: "Health",
        text: "A way you manage pain"
    },
    {
        category: "Health",
        text: "A moment of emotional balance"
    },
    {
        category: "Health",
        text: "A way you maintain energy"
    },
    {
        category: "Health",
        text: "A healthy drink you enjoy"
    },
    {
        category: "Health",
        text: "A way you practice deep breathing"
    },
    {
        category: "Health",
        text: "A moment of physical achievement"
    },
    {
        category: "Health",
        text: "A way you maintain posture"
    },
    {
        category: "Health",
        text: "A healthy dessert you love"
    },
    {
        category: "Health",
        text: "A way you practice gratitude"
    },
    {
        category: "Health",
        text: "A moment of mental peace"
    },
    {
        category: "Health",
        text: "A way you maintain balance"
    },
    {
        category: "Health",
        text: "A healthy breakfast you enjoy"
    },
    {
        category: "Health",
        text: "A way you practice stretching"
    },
    {
        category: "Health",
        text: "A moment of physical relaxation"
    },
    {
        category: "Health",
        text: "A way you maintain immunity"
    },
    {
        category: "Health",
        text: "A healthy lunch you enjoy"
    },
    {
        category: "Health",
        text: "A way you practice meditation"
    },
    {
        category: "Health",
        text: "A moment of mental strength"
    },
    {
        category: "Health",
        text: "A way you maintain vitality"
    },
    {
        category: "Health",
        text: "A healthy dinner you enjoy"
    },
    {
        category: "Health",
        text: "A way you practice yoga"
    },
    {
        category: "Health",
        text: "A moment of physical ease"
    },
    {
        category: "Health",
        text: "A way you maintain wellness"
    },
    {
        category: "Health",
        text: "A healthy treat you enjoy"
    },
    {
        category: "Health",
        text: "A way you practice walking"
    },
    {
        category: "Health",
        text: "A moment of mental focus"
    },
    {
        category: "Health",
        text: "A way you maintain health"
    },
    {
        category: "Health",
        text: "A healthy habit you're proud of"
    },
    {
        category: "Health",
        text: "A way you practice self-love"
    },
    {
        category: "Creativity",
        text: "A creative project you're working on"
    },
    {
        category: "Creativity",
        text: "Something you made that you're proud of"
    },
    {
        category: "Creativity",
        text: "A creative outlet you enjoy"
    },
    {
        category: "Creativity",
        text: "A piece of art that inspires you"
    },
    {
        category: "Creativity",
        text: "A creative skill you want to develop"
    },
    {
        category: "Creativity",
        text: "A way you express yourself creatively"
    },
    {
        category: "Creativity",
        text: "A creative idea you had recently"
    },
    {
        category: "Creativity",
        text: "A way you use your imagination"
    },
    {
        category: "Creativity",
        text: "A creative challenge you overcame"
    },
    {
        category: "Creativity",
        text: "A way you find inspiration"
    },
    {
        category: "Creativity",
        text: "A creative hobby you enjoy"
    },
    {
        category: "Creativity",
        text: "A way you share your creativity"
    },
    {
        category: "Creativity",
        text: "A creative moment you experienced"
    },
    {
        category: "Creativity",
        text: "A way you develop new ideas"
    },
    {
        category: "Creativity",
        text: "A creative tool you love using"
    },
    {
        category: "Creativity",
        text: "A way you overcome creative blocks"
    },
    {
        category: "Creativity",
        text: "A creative collaboration you enjoyed"
    },
    {
        category: "Creativity",
        text: "A way you document your creativity"
    },
    {
        category: "Creativity",
        text: "A creative space you've created"
    },
    {
        category: "Creativity",
        text: "A way you celebrate your creativity"
    },
    {
        category: "Creativity",
        text: "A creative risk you took"
    },
    {
        category: "Creativity",
        text: "A way you learn new creative skills"
    },
    {
        category: "Creativity",
        text: "A creative tradition you follow"
    },
    {
        category: "Creativity",
        text: "A way you inspire others creatively"
    },
    {
        category: "Creativity",
        text: "A creative breakthrough you had"
    },
    {
        category: "Creativity",
        text: "A way you maintain creative energy"
    },
    {
        category: "Creativity",
        text: "A creative gift you received"
    },
    {
        category: "Creativity",
        text: "A way you share creative knowledge"
    },
    {
        category: "Creativity",
        text: "A creative milestone you achieved"
    },
    {
        category: "Creativity",
        text: "A way you find creative solutions"
    },
    {
        category: "Creativity",
        text: "A creative community you're part of"
    },
    {
        category: "Creativity",
        text: "A way you preserve your creativity"
    },
    {
        category: "Creativity",
        text: "A creative experiment you tried"
    },
    {
        category: "Creativity",
        text: "A way you balance creativity and life"
    },
    {
        category: "Creativity",
        text: "A creative memory you cherish"
    },
    {
        category: "Creativity",
        text: "A way you nurture your creativity"
    },
    {
        category: "Creativity",
        text: "A creative goal you're pursuing"
    },
    {
        category: "Creativity",
        text: "A way you share creative resources"
    },
    {
        category: "Creativity",
        text: "A creative journey you're on"
    },
    {
        category: "Creativity",
        text: "A way you find creative balance"
    },
    {
        category: "Creativity",
        text: "A creative discovery you made"
    },
    {
        category: "Creativity",
        text: "A way you maintain creative flow"
    },
    {
        category: "Creativity",
        text: "A creative passion you pursue"
    },
    {
        category: "Creativity",
        text: "A way you share creative wisdom"
    },
    {
        category: "Creativity",
        text: "A creative legacy you're building"
    },
    {
        category: "Creativity",
        text: "A way you find creative peace"
    },
    {
        category: "Creativity",
        text: "A creative vision you have"
    },
    {
        category: "Creativity",
        text: "A way you share creative joy"
    },
    {
        category: "Community",
        text: "Someone who helped you recently"
    },
    {
        category: "Community",
        text: "A kind gesture you witnessed"
    },
    {
        category: "Community",
        text: "A way you helped someone else"
    },
    {
        category: "Community",
        text: "A community you're part of"
    },
    {
        category: "Community",
        text: "A neighbor you appreciate"
    },
    {
        category: "Community",
        text: "A way your community supports you"
    },
    {
        category: "Community",
        text: "A community event you enjoyed"
    },
    {
        category: "Community",
        text: "A way you contribute to your community"
    },
    {
        category: "Community",
        text: "A community member you appreciate"
    },
    {
        category: "Community",
        text: "A way your community grows together"
    },
    {
        category: "Community",
        text: "A community tradition you love"
    },
    {
        category: "Community",
        text: "A way you connect with neighbors"
    },
    {
        category: "Community",
        text: "A community project you're proud of"
    },
    {
        category: "Community",
        text: "A way your community helps others"
    },
    {
        category: "Community",
        text: "A community space you enjoy"
    },
    {
        category: "Community",
        text: "A way you celebrate community"
    },
    {
        category: "Community",
        text: "A community resource you value"
    },
    {
        category: "Community",
        text: "A way you build community"
    },
    {
        category: "Community",
        text: "A community leader you admire"
    },
    {
        category: "Community",
        text: "A way your community shares"
    },
    {
        category: "Community",
        text: "A community gathering you attended"
    },
    {
        category: "Community",
        text: "A way you support local businesses"
    },
    {
        category: "Community",
        text: "A community initiative you support"
    },
    {
        category: "Community",
        text: "A way your community learns"
    },
    {
        category: "Community",
        text: "A community service you use"
    },
    {
        category: "Community",
        text: "A way you participate in community"
    },
    {
        category: "Community",
        text: "A community achievement you celebrate"
    },
    {
        category: "Community",
        text: "A way your community cares"
    },
    {
        category: "Community",
        text: "A community volunteer you know"
    },
    {
        category: "Community",
        text: "A way you give back to community"
    },
    {
        category: "Community",
        text: "A community program you benefit from"
    },
    {
        category: "Community",
        text: "A way your community innovates"
    },
    {
        category: "Community",
        text: "A community partnership you value"
    },
    {
        category: "Community",
        text: "A way you strengthen community"
    },
    {
        category: "Community",
        text: "A community celebration you enjoy"
    },
    {
        category: "Community",
        text: "A way your community preserves history"
    },
    {
        category: "Community",
        text: "A community organization you support"
    },
    {
        category: "Community",
        text: "A way you engage with community"
    },
    {
        category: "Community",
        text: "A community improvement you've seen"
    },
    {
        category: "Community",
        text: "A way your community collaborates"
    },
    {
        category: "Community",
        text: "A community mentor you have"
    },
    {
        category: "Community",
        text: "A way you share with community"
    },
    {
        category: "Community",
        text: "A community tradition you participate in"
    },
    {
        category: "Community",
        text: "A way your community adapts"
    },
    {
        category: "Community",
        text: "A community resource you share"
    },
    {
        category: "Community",
        text: "A way you build community trust"
    },
    {
        category: "Community",
        text: "A community connection you value"
    },
    {
        category: "Community",
        text: "A way your community grows"
    },
    {
        category: "Community",
        text: "A community story you love"
    },
    {
        category: "Community",
        text: "A way you honor community"
    },
    {
        category: "Community",
        text: "A community legacy you're part of"
    },
    {
        category: "Community",
        text: "A way you nurture community"
    },
    {
        category: "Community",
        text: "A community vision you share"
    },
    {
        category: "Technology",
        text: "A tech tool that makes your life easier"
    },
    {
        category: "Technology",
        text: "A way technology connects you to others"
    },
    {
        category: "Technology",
        text: "A tech innovation you appreciate"
    },
    {
        category: "Technology",
        text: "A way technology helps you learn"
    },
    {
        category: "Technology",
        text: "A tech device you're grateful for"
    },
    {
        category: "Technology",
        text: "A way technology improves your work"
    },
    {
        category: "Technology",
        text: "A tech feature you use daily"
    },
    {
        category: "Technology",
        text: "A way technology entertains you"
    },
    {
        category: "Technology",
        text: "A tech app you love using"
    },
    {
        category: "Technology",
        text: "A way technology keeps you safe"
    },
    {
        category: "Technology",
        text: "A tech skill you've developed"
    },
    {
        category: "Technology",
        text: "A way technology saves you time"
    },
    {
        category: "Technology",
        text: "A tech gadget you enjoy"
    },
    {
        category: "Technology",
        text: "A way technology helps you create"
    },
    {
        category: "Technology",
        text: "A tech platform you use often"
    },
    {
        category: "Technology",
        text: "A way technology helps you communicate"
    },
    {
        category: "Technology",
        text: "A tech service you rely on"
    },
    {
        category: "Technology",
        text: "A way technology helps you organize"
    },
    {
        category: "Technology",
        text: "A tech feature that amazes you"
    },
    {
        category: "Technology",
        text: "A way technology helps you travel"
    },
    {
        category: "Technology",
        text: "A tech tool that helps you focus"
    },
    {
        category: "Technology",
        text: "A way technology helps you shop"
    },
    {
        category: "Technology",
        text: "A tech device that helps you relax"
    },
    {
        category: "Technology",
        text: "A way technology helps you exercise"
    },
    {
        category: "Technology",
        text: "A tech feature that helps you cook"
    },
    {
        category: "Technology",
        text: "A way technology helps you clean"
    },
    {
        category: "Technology",
        text: "A tech tool that helps you garden"
    },
    {
        category: "Technology",
        text: "A way technology helps you sleep"
    },
    {
        category: "Technology",
        text: "A tech feature that helps you read"
    },
    {
        category: "Technology",
        text: "A way technology helps you write"
    },
    {
        category: "Technology",
        text: "A tech tool that helps you draw"
    },
    {
        category: "Technology",
        text: "A way technology helps you listen"
    },
    {
        category: "Technology",
        text: "A tech feature that helps you watch"
    },
    {
        category: "Technology",
        text: "A way technology helps you play"
    },
    {
        category: "Technology",
        text: "A tech tool that helps you study"
    },
    {
        category: "Technology",
        text: "A way technology helps you work"
    },
    {
        category: "Technology",
        text: "A tech feature that helps you plan"
    },
    {
        category: "Technology",
        text: "A way technology helps you track"
    },
    {
        category: "Technology",
        text: "A tech tool that helps you measure"
    },
    {
        category: "Technology",
        text: "A way technology helps you monitor"
    },
    {
        category: "Technology",
        text: "A tech feature that helps you control"
    },
    {
        category: "Technology",
        text: "A way technology helps you automate"
    },
    {
        category: "Technology",
        text: "A tech tool that helps you analyze"
    },
    {
        category: "Technology",
        text: "A way technology helps you visualize"
    },
    {
        category: "Technology",
        text: "A tech feature that helps you collaborate"
    },
    {
        category: "Technology",
        text: "A way technology helps you innovate"
    },
    {
        category: "Technology",
        text: "A tech tool that helps you discover"
    },
    {
        category: "Technology",
        text: "A way technology helps you explore"
    },
    {
        category: "Home",
        text: "Something in your home that brings you comfort"
    },
    {
        category: "Home",
        text: "A space in your home you love"
    },
    {
        category: "Home",
        text: "A home improvement you're proud of"
    },
    {
        category: "Home",
        text: "A way your home supports your lifestyle"
    },
    {
        category: "Home",
        text: "A memory associated with your home"
    },
    {
        category: "Work",
        text: "Something you accomplished at work"
    },
    {
        category: "Work",
        text: "A colleague you appreciate"
    },
    {
        category: "Work",
        text: "A skill you use in your work"
    },
    {
        category: "Work",
        text: "A way your work makes a difference"
    },
    {
        category: "Work",
        text: "A work challenge you overcame"
    },
    {
        category: "Home",
        text: "A cozy spot in your home"
    },
    {
        category: "Home",
        text: "A home improvement you love"
    },
    {
        category: "Home",
        text: "A way your home comforts you"
    },
    {
        category: "Home",
        text: "A favorite room in your home"
    },
    {
        category: "Home",
        text: "A way your home protects you"
    },
    {
        category: "Home",
        text: "A home decoration you cherish"
    },
    {
        category: "Home",
        text: "A way your home welcomes you"
    },
    {
        category: "Home",
        text: "A home feature you're grateful for"
    },
    {
        category: "Home",
        text: "A way your home inspires you"
    },
    {
        category: "Home",
        text: "A home memory you treasure"
    },
    {
        category: "Home",
        text: "A way your home organizes you"
    },
    {
        category: "Home",
        text: "A home tradition you follow"
    },
    {
        category: "Home",
        text: "A way your home energizes you"
    },
    {
        category: "Home",
        text: "A home project you completed"
    },
    {
        category: "Home",
        text: "A way your home relaxes you"
    },
    {
        category: "Home",
        text: "A home appliance you value"
    },
    {
        category: "Home",
        text: "A way your home entertains you"
    },
    {
        category: "Home",
        text: "A home space you created"
    },
    {
        category: "Home",
        text: "A way your home nourishes you"
    },
    {
        category: "Home",
        text: "A home view you enjoy"
    },
    {
        category: "Home",
        text: "A way your home shelters you"
    },
    {
        category: "Home",
        text: "A home sound you love"
    },
    {
        category: "Home",
        text: "A way your home smells good"
    },
    {
        category: "Home",
        text: "A home texture you appreciate"
    },
    {
        category: "Home",
        text: "A way your home feels right"
    },
    {
        category: "Home",
        text: "A home color you enjoy"
    },
    {
        category: "Home",
        text: "A way your home looks beautiful"
    },
    {
        category: "Home",
        text: "A home plant you care for"
    },
    {
        category: "Home",
        text: "A way your home grows with you"
    },
    {
        category: "Home",
        text: "A home book you display"
    },
    {
        category: "Home",
        text: "A way your home tells stories"
    },
    {
        category: "Home",
        text: "A home photo you love"
    },
    {
        category: "Home",
        text: "A way your home preserves memories"
    },
    {
        category: "Home",
        text: "A home gift you received"
    },
    {
        category: "Home",
        text: "A way your home shows love"
    },
    {
        category: "Home",
        text: "A home meal you prepare"
    },
    {
        category: "Home",
        text: "A way your home feeds you"
    },
    {
        category: "Home",
        text: "A home drink you enjoy"
    },
    {
        category: "Home",
        text: "A way your home refreshes you"
    },
    {
        category: "Home",
        text: "A home snack you love"
    },
    {
        category: "Home",
        text: "A way your home satisfies you"
    },
    {
        category: "Home",
        text: "A home game you play"
    },
    {
        category: "Home",
        text: "A way your home entertains you"
    },
    {
        category: "Home",
        text: "A home movie you watch"
    },
    {
        category: "Home",
        text: "A way your home relaxes you"
    },
    {
        category: "Home",
        text: "A home song you sing"
    },
    {
        category: "Home",
        text: "A way your home sounds good"
    },
    {
        category: "Home",
        text: "A home dance you do"
    },
    {
        category: "Home",
        text: "A way your home moves you"
    },
    {
        category: "Work",
        text: "A work achievement you're proud of"
    },
    {
        category: "Work",
        text: "A way your work helps others"
    },
    {
        category: "Work",
        text: "A work skill you've developed"
    },
    {
        category: "Work",
        text: "A way your work challenges you"
    },
    {
        category: "Work",
        text: "A work project you enjoyed"
    },
    {
        category: "Work",
        text: "A way your work inspires you"
    },
    {
        category: "Work",
        text: "A work colleague you appreciate"
    },
    {
        category: "Work",
        text: "A way your work grows you"
    },
    {
        category: "Work",
        text: "A work tool you value"
    },
    {
        category: "Work",
        text: "A way your work organizes you"
    },
    {
        category: "Work",
        text: "A work routine you follow"
    },
    {
        category: "Work",
        text: "A way your work balances you"
    },
    {
        category: "Work",
        text: "A work space you enjoy"
    },
    {
        category: "Work",
        text: "A way your work energizes you"
    },
    {
        category: "Work",
        text: "A work goal you achieved"
    },
    {
        category: "Work",
        text: "A way your work rewards you"
    },
    {
        category: "Work",
        text: "A work mentor you have"
    },
    {
        category: "Work",
        text: "A way your work teaches you"
    },
    {
        category: "Work",
        text: "A work team you're part of"
    },
    {
        category: "Work",
        text: "A way your work collaborates"
    },
    {
        category: "Work",
        text: "A work innovation you created"
    },
    {
        category: "Work",
        text: "A way your work improves"
    },
    {
        category: "Work",
        text: "A work process you refined"
    },
    {
        category: "Work",
        text: "A way your work flows"
    },
    {
        category: "Work",
        text: "A work solution you found"
    },
    {
        category: "Work",
        text: "A way your work solves problems"
    },
    {
        category: "Work",
        text: "A work deadline you met"
    },
    {
        category: "Work",
        text: "A way your work manages time"
    },
    {
        category: "Work",
        text: "A work presentation you gave"
    },
    {
        category: "Work",
        text: "A way your work communicates"
    },
    {
        category: "Work",
        text: "A work meeting you led"
    },
    {
        category: "Work",
        text: "A way your work connects"
    },
    {
        category: "Work",
        text: "A work report you wrote"
    },
    {
        category: "Work",
        text: "A way your work documents"
    },
    {
        category: "Work",
        text: "A work plan you created"
    },
    {
        category: "Work",
        text: "A way your work strategizes"
    },
    {
        category: "Work",
        text: "A work budget you managed"
    },
    {
        category: "Work",
        text: "A way your work resources"
    },
    {
        category: "Work",
        text: "A work review you received"
    },
    {
        category: "Work",
        text: "A way your work evaluates"
    },
    {
        category: "Work",
        text: "A work training you completed"
    },
    {
        category: "Work",
        text: "A way your work develops"
    },
    {
        category: "Work",
        text: "A work certification you earned"
    },
    {
        category: "Work",
        text: "A way your work validates"
    },
    {
        category: "Work",
        text: "A work network you built"
    },
    {
        category: "Work",
        text: "A way your work connects"
    },
    {
        category: "Work",
        text: "A work legacy you're building"
    },
    {
        category: "Work",
        text: "A way your work impacts"
    }
];

export default prompts; 