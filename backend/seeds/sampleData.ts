import { Knex } from "knex";
import { article, plans, productnails, shops, users } from "../excel";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  async function seedRow(table: any, data: any): Promise<[{ id: number }]> {
    let { hash_password, ...filter } = data;

    // console.log("select", table, filter);
    let row = await knex(table).select("id").where(filter).first();
    if (row) {
      return [{ id: row.id }];
    }

    let [{ id }] = await knex.insert(data).into(table).returning("id");

    return [{ id }];
  }

  function generateRng() {
    let rand = Math.floor(Math.random() * 89) + 1;
    return rand;
  }

  // Deletes ALL existing entries
  await knex("collection").del();
  await knex("like").del();
  await knex("article").del();
  await knex("message").del();
  await knex("notification").del();
  await knex("booking").del();
  await knex("users_package").del();
  await knex("shop_members").del();
  await knex("shop_products_photo").del();
  await knex("shop_intro_photos").del();
  await knex("shop_plan").del();
  await knex("shop").del();
  await knex("users").del();
  // Inserts seed entries

  let hash_password = await hashPassword("kkkkkkkk");

  let userIDArr = [];
  let shopIDArr = [];
  let planIDArr = [];
  let packageIDArr = [];

  for (let i = 0; i < users.length; i++) {
    let userID = await seedRow("users", {
      username: users[i].username,
      hash_password: hash_password,
      nick_name: users[i].nickname,
      phone_number: 69993641,
      email: "Doonygayclub@gmail.com",
      identity: "shop_owner",
      image: users[i].image,
    });
    console.log("userID", userID);
    userIDArr.push(userID[0].id);
    console.log("userIDARR", userIDArr);

    let shopID = await seedRow("shop", {
      owner: userID[0].id,
      name: shops[i].shopname,
      area: shops[i].area,
      address: shops[i].address,
      open_time: "13:30",
      close_time: "23:00",
      image: shops[i].image,
      intro: shops[i].intro,
      shop_status: "active",
      shop_tel: 21800000,
    });
    shopIDArr.push(shopID[0].id);
  }

  for (let i = 0; i < plans.length; i++) {
    let planID = await seedRow("shop_plan", {
      plan_name: plans[i].plan_name,
      intro: plans[i].intro,
      image: plans[i].image,
      shop_id: shopIDArr[0],
      cancel_period: 172800000,
      price: 5000,
      types: "package",
      buy_period: new Date(),
      due_period: 31556952000,
      package_qty: 10,
      plan_status: "active",
    });
    planIDArr.push(planID[0].id);
  }

  for (let i = 0; i < planIDArr.length; i++) {
    console.log("users_id from users_package loop", userIDArr[0]);
    let packageID = await seedRow("users_package", {
      users_id: userIDArr[0],
      shop_plan_id: planIDArr[i],
      buy_time: new Date("01-02-2023"),
      due_time: new Date("01-02-2024"),
    });
    packageIDArr.push(packageID[0].id);
  }

  for (let i = 0; i < packageIDArr.length; i++) {
    await seedRow("booking", {
      shop_plan_id: planIDArr[0],
      users_id: userIDArr[0],
      package_id: packageIDArr[i],
      schedule: "2023-03-05",
      booking_status: "apply",
      apply_time: "2023-02-09",
    });
  }

  for (let i = 0; i < article.length; i++) {
    await seedRow("article", {
      users_id: userIDArr[0],
      title: article[i].title,
      main_img: article[i].main_img,
      html_content: article[i].html_content,
      views: article[i].views,
      article_status: article[i].article_status,
    });
  }

  for (let i = 0; i < shops.length; i++) {
    for (let a = 0; a < 10; a++) {
      await seedRow("shop_products_photo", {
        images: productnails[generateRng()].image,
        shop_id: shopIDArr[0],
      });
    }
  }

  await seedRow("users", {
    username: "admin",
    hash_password: hash_password,
    nick_name: "admin",
    phone_number: 69993641,
    email: "admin@gmail.com",
    identity: "admin",
    image: "https://picsum.photos/seed/admin-2/200/200",
  });
  // let usernames = [
  //   "DonnyDrunk",
  //   "小司機Donny",
  //   "小司機Leo",
  //   "Dennis Ho",
  //   "Ariel",
  //   "Beeno",
  //   "Been sir",
  //   "Drunk Jer",
  //   "Beeno T",
  //   "Cute cat",
  //   "The wolf of Wall Street",
  //   "Come to daddy",
  //   "sad boy",
  //   "Java Gangster",
  //   "sensei",
  //   "Leo",
  //   "Mody",
  //   "SlySly",
  //   "Smartie",
  //   "Jer",
  //   "Dickson",
  //   "Sly",
  // ];
  // let nick_names = [
  //   "DonnyDrunk",
  //   "小司機Donny",
  //   "小司機Leo",
  //   "Dennis Ho",
  //   "Ariel",
  //   "Beeno",
  //   "Been sir",
  //   "Drunk Jer",
  //   "Beeno T",
  //   "Cute cat",
  //   "The wolf of Wall Street",
  //   "Come to daddy",
  //   "sad boy",
  //   "Java Gangster",
  //   "sensei",
  //   "Leo",
  //   "Mody",
  //   "SlySly",
  //   "Smartie",
  //   "Jer",
  //   "Dickson",
  //   "Sly",
  // ];

  // let usersID = [];
  // for (let i = 0; i < 21; i++) {
  //   let userID = await seedRow("users", {
  //     username: usernames[i % 20],
  //     hash_password: hash_password,
  //     nick_name: nick_names[i % 20],
  //     phone_number: 69993641,
  //     email: "Doonygayclub@gmail.com",
  //     identity: "shop_owner",
  //     image: `user${i}.jpeg`,
  //   });
  //   usersID.push(userID);
  // }

  // let names = [
  //   "Nail Rituals",
  //   "Hands Down Nail Services",
  //   "Pearls Nail Salon",
  //   "All hands",
  //   "Mani-Pedi",
  //   "Sister’s Nails",
  //   "Pink Petals",
  //   "Posh & Polished",
  //   "Pink Me Up",
  //   "Everything Nails",
  //   "Polish n Style",
  //   "Oh My Nails",
  //   "Barefoot Nail Bar",
  //   "Polished Too",
  //   "Beyond Manicures",
  //   "UrbanMinutes",
  //   "Express Nails",
  //   "Personal Touch Salon",
  //   "Nail Nation",
  //   "Polish Up",
  // ];
  // let areas = [
  //   "灣仔區",
  //   "中西區",
  //   "東區",
  //   "南區",
  //   "沙田區",
  //   "離島區",
  //   "九龍城區",
  //   "元朗區",
  //   "黃大仙區",
  //   "觀塘區",
  //   "深水埗區",
  //   "油尖旺區",
  //   "葵青區",
  //   "荃灣區",
  //   "屯門區",
  //   "北區",
  //   "大埔區",
  //   "西貢區",
  //   "大埔區",
  //   "西貢區",
  //   "灣仔區",
  //   "灣仔區",
  //   "灣仔區",
  //   "灣仔區",
  //   "灣仔區",
  // ];
  // let addresses = [
  //   "香港灣仔謝斐道182號地下",
  //   "香港皇后大道西470號石塘咀皇后大廈6樓",
  //   "北角英皇道663號泓富產業千禧廣場12樓",
  //   "黃竹坑黃竹大道888地下",
  //   "沙田大圍美田路200號",
  //   "愉景灣堂中心8樓",
  //   "九龍九龍城農圃道15號",
  //   "元朗商場5樓04號鋪",
  //   " 荷里活廣場19號鋪",
  //   "E-Max九龍灣國際展貿中心10樓",
  //   "石硤尾美荷樓2樓04室",
  //   "廣東道500號展貿中心10樓",
  //   "葵青區葵涌興芳路223號新都會廣場5樓",
  //   "荃灣楊屋道88號Plaza88商廈8樓",
  //   "屯門友愛邨友愛路7號",
  //   "	上水清城路8號",
  //   "大埔運頭角里26號",
  //   "將軍澳林盛路1號",
  //   "大埔廣福道182號",
  //   "將軍澳調景嶺嶺光街10號",
  //   "香港銅鑼灣高士威道120號",
  //   "香港跑馬地藍塘道123號",
  //   "香港灣仔皇后大道東281號",
  //   "香港掃桿埔東院道９號",
  //   "香港藍塘道１５７號",
  // ];
  // let intros = [
  //   "近 20 年經驗​豐富的專業美甲團隊，致力提供卓越及貼心的美甲服務，店舗遍佈港九新界",
  //   "從指尖、手部到足部護理，讓您時刻展現自信迷人神采",
  //   "重視產品來源及品質，爲顧客採用歐美進口的優質產品，如 O.P.I、Bio Seaweed、NCLA、CND 及 Heidi 等品牌",
  //   "透過指尖傳遞流行趨勢及美容知識",
  //   "坊間美甲店眾多，價錢下至一百多元，上至千元都有，想以合理及實惠價錢做Gel甲？本店以下$400樓下任做美甲潮流款式，一個價錢就可選做不同款式，無需怕有額外收費，立即Bookmark！",
  //   "相信每一款美甲都有屬於它的故事，對於顧客而言有著獨一無二的意義。它可能蘊藏了羞澀的心意、見證了生命中重要的一刻，或者代表了值得紀念的時光，我們想將顧客的故事透過美甲訴說。",
  //   "深信指尖是每個人性格的延伸，10 Perfect Nails為男士提供全面的指甲修護服務和為女士提供不同的指甲彩妝服務，讓你的獨特氣質延續到指間。品牌的資深美甲師更會定期前往日本、美國、意大利等地深造，培養最敏銳的潮流觸覺，帶來最優質的水療手足護理。",
  //   "引入創新的美甲技術，提供專業及高質的美甲服務，以滿足客人各種需求。集結過百種的美甲護甲及手部護理產品，所有產品均經過嚴格認可測試，確保質量皆屬優良。我們歡迎你來體驗專業的修指甲、趾甲服務，店內亦提供手部及足部護理，人工造甲服務、以及 Calgel 彈性植甲及指甲畫花等美甲護甲服務。",
  //   "提供不同的 美甲 、 gel甲 及 修甲 服務，適合愛扮靚的你！",
  //   "地方寬敞，即使同時多人在進行美甲，也完全不會感到擠擁，是三五知己一同前來享受美甲服務的好地方。",
  // ];
  // let shopsID = [];
  // for (let i = 0; i < 41; i++) {
  //   let shopID = await seedRow("shop", {
  //     owner: usersID[0],
  //     name: names[i % 20],
  //     area: areas[i % 25],
  //     address: addresses[i % 25],
  //     intro: intros[i % 10],
  //     open_time: "13:30",
  //     close_time: "23:00",
  //     image: `nailssalon${i}.jpeg`,
  //     shop_status: "active",
  //     shop_tel: 218000000,
  //   });
  //   shopsID.push(shopID);
  // }

  // let plan_names = [
  //   "Valentine's Day Big Disscout",
  //   "Thankful Week",
  //   "5週年店感謝日",
  //   "10週年店酬賓",
  //   "Big Discount",
  //   "Girls Day",
  //   "Polish Day",
  //   "Nail day",
  //   "恭喜發財套餐",
  //   "Summer Holiday!",
  //   "秋季減價",
  //   "情人節優惠",
  //   "HALLOWEEN  Discount",
  //   "Women's Day",
  //   "Christmas set",
  // ];
  // let introduction = [
  //   "情人節優惠，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "Thankful Week，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "5週年店感謝日，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "10週年店酬賓，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "Big Discount，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "Girls Day，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "Polish Day，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "Nail day，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "恭喜發財套餐，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "秋季減價，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "情人節優惠，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "HALLOWEEN  Discount，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "Women's Day，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "Christmas set，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  //   "聖誕優惠，以優惠價買套票(一套十張)送美甲套裝一set，仲可以同朋友share!詳情請向店員查詢。",
  // ];
  // let shop_ids = [1, 2, 3, 4, 5, 6];
  // let prices = [
  //   8000, 5000, 3000, 4500, 3300, 2000, 6000, 999, 1000, 2800, 6000,
  // ];
  // for (let i = 0; i < 10; i++) {
  //   let shopPlanID = await seedRow("shop_plan", [
  //     {
  //       plan_name: plan_names[i % 16],
  //       intro: introduction[i % 16],
  //       image: `package${i}.jpeg`,
  //       shop_id: shopsID[i % 6],
  //       cancel_period: 172800000,
  //       price: prices[i % 10],
  //       types: "package",
  //       buy_period: new Date(),
  //       due_period: 31556952000,
  //       package_qty: 10,
  //       plan_status: "active",
  //     },
  //   ]);

  //   let shop_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  //   for (let i = 0; i < 41; i++) {
  //     await seedRow("shop_intro_photos", {
  //       images: `nailssalon${i}.jpeg`,
  //       shop_id: shop_ids[i % 12],
  //     });

  //     let productsIntros = [
  //       "度身定造彩繪",
  //       "summer colors",
  //       "櫻花色系列",
  //       "魅力紅色，聖誕新年必備",
  //       "帶點春日氣息的人氣紫色系列～",
  //       "人氣牛油果綠",
  //       "溫柔氣質型茶色，文青OL之間的話題必選",
  //       "little Daisy，活力四散！",
  //       "新推出，星光寶藍，成為party焦點必備的美甲色！",
  //     ];
  //     let shopsID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  //     let colors = [
  //       "彩繪",
  //       "橙色",
  //       "紅色",
  //       "粉紅色",
  //       "紫色",
  //       "綠色",
  //       "茶色",
  //       "透明",
  //       "黑色",
  //     ];
  //     for (let color of colors) {
  //       for (let b = 0; b < 10; b++) {
  //         await seedRow("shop_products_photo", {
  //           images: `美甲${color}${b}.jpeg`,
  //           intro: productsIntros[b % 9],
  //           shop_id: shopsID[b % 2.5],
  //         });
  //       }
  //     }

  //     await seedRow("shop_members", {
  //       users_id: usersID[1],
  //       shop_id: shopsID[0],
  //     });

  //     let usersPackageID = await seedRow("users_package", [
  //       {
  //         users_id: usersID[1],
  //         shop_plan_id: shopPlanID[0],
  //         buy_time: new Date("01-02-2023"),
  //         due_time: new Date("01-02-2024"),
  //       },
  //       {
  //         users_id: usersID[1],
  //         shop_plan_id: shopPlanID[1],
  //         buy_time: new Date("01-12-2021"),
  //         due_time: new Date("01-12-2022"),
  //       },
  //     ]);

  //       await seedRow("booking", [
  //         {
  //           users_id: usersID[1],
  //           shop_plan_id: shopPlanID[0],
  //           package_id: usersPackageID[0],
  //           schedule: new Date("2023-03-02T00:00:00"),
  //           booking_status: "finish",
  //           apply_time: new Date("2023-02-01T00:00:00"),
  //           confirm_time: new Date("2023-02-02T00:00:00"),
  //           finish_time: new Date("2023-02-03T00:00:00"),
  //         },
  //         {
  //           users_id: usersID[1],
  //           shop_plan_id: shopPlanID[0],
  //           package_id: usersPackageID[0],
  //           booking_status: "confirm",
  //           schedule: new Date("2023-03-02"),
  //           apply_time: new Date("2023-02-02"),
  //           confirm_time: new Date("2023-02-03"),
  //         },
  //         {
  //           users_id: usersID[1],
  //           shop_plan_id: shopPlanID[0],
  //           package_id: usersPackageID[0],
  //           schedule: new Date("2023-03-02"),
  //           booking_status: "apply",
  //           apply_time: new Date("2023-01-15"),
  //         },

  //         {
  //           users_id: usersID[1],
  //           shop_plan_id: shopPlanID[0],
  //           package_id: usersPackageID[0],
  //           schedule: new Date("02-03-2023"),
  //           booking_status: "reject",
  //           apply_time: new Date("2023-02-01"),
  //           reject_time: new Date("2023-02-02"),
  //         },

  //         {
  //           users_id: usersID[1],
  //           shop_plan_id: shopPlanID[0],
  //           package_id: usersPackageID[0],
  //           schedule: new Date("02-03-2023"),
  //           booking_status: "cancel",
  //           apply_time: new Date("2023-01-05"),
  //           confirm_time: new Date("2023-01-06"),
  //           cancel_time: new Date("2023-01-10"),
  //         },
  //       ]);

  //       await seedRow("notification", {
  //         users_id: usersID[1],
  //         link: "/booking.html?booking=${booking_id}",
  //         content: "Booking has been confirmed",
  //       });

  //       await seedRow("message", {
  //         sender: usersID[0],
  //         receiver: usersID[1],
  //         sender_shop: shopsID[0],
  //         receiver_shop: shopsID[0],
  //         content: "親，提提你明天預約了下午三點半。",
  //       });

  //       let names = [
  //         "Nail Rituals",
  //         "Hands Down Nail Services",
  //         "Pearls Nail Salon",
  //         "All hands",
  //         "Mani-Pedi",
  //         "Sister’s Nails",
  //         "Pink Petals",
  //         "Posh & Polished",
  //         "Pink Me Up",
  //         "Everything Nails",
  //         "Polish n Style",
  //         "Oh My Nails",
  //         "Barefoot Nail Bar",
  //         "Polished Too",
  //         "Beyond Manicures",
  //         "UrbanMinutes",
  //         "Express Nails",
  //         "Personal Touch Salon",
  //         "Nail Nation",
  //         "Polish Up",
  //       ];
  //       let areas = [
  //         "灣仔區",
  //         "中西區",
  //         "東區",
  //         "南區",
  //         "沙田區",
  //         "離島區",
  //         "九龍城區",
  //         "元朗區",
  //         "黃大仙區",
  //         "觀塘區",
  //         "深水埗區",
  //         "油尖旺區",
  //         "葵青區",
  //         "荃灣區",
  //         "屯門區",
  //         "北區",
  //         "大埔區",
  //         "西貢區",
  //         "大埔區",
  //         "西貢區",
  //         "灣仔區",
  //         "灣仔區",
  //         "灣仔區",
  //         "灣仔區",
  //         "灣仔區",
  //       ];
  //       let addresses = [
  //         "香港灣仔謝斐道182號地下",
  //         "香港皇后大道西470號石塘咀皇后大廈6樓",
  //         "北角英皇道663號泓富產業千禧廣場12樓",
  //         "黃竹坑黃竹大道888地下",
  //         "沙田大圍美田路200號",
  //         "愉景灣堂中心8樓",
  //         "九龍九龍城農圃道15號",
  //         "元朗商場5樓04號鋪",
  //         " 荷里活廣場19號鋪",
  //         "E-Max九龍灣國際展貿中心10樓",
  //         "石硤尾美荷樓2樓04室",
  //         "廣東道500號展貿中心10樓",
  //         "葵青區葵涌興芳路223號新都會廣場5樓",
  //         "荃灣楊屋道88號Plaza88商廈8樓",
  //         "屯門友愛邨友愛路7號",
  //         "	上水清城路8號",
  //         "大埔運頭角里26號",
  //         "將軍澳林盛路1號",
  //         "大埔廣福道182號",
  //         "將軍澳調景嶺嶺光街10號",
  //         "香港銅鑼灣高士威道120號",
  //         "香港跑馬地藍塘道123號",
  //         "香港灣仔皇后大道東281號",
  //         "香港掃桿埔東院道９號",
  //         "香港藍塘道１５７號",
  //       ];
  //       let intros = [
  //         "近 20 年經驗​豐富的專業美甲團隊，致力提供卓越及貼心的美甲服務，店舗遍佈港九新界",
  //         "從指尖、手部到足部護理，讓您時刻展現自信迷人神采",
  //         "重視產品來源及品質，爲顧客採用歐美進口的優質產品，如 O.P.I、Bio Seaweed、NCLA、CND 及 Heidi 等品牌",
  //         "透過指尖傳遞流行趨勢及美容知識",
  //         "坊間美甲店眾多，價錢下至一百多元，上至千元都有，想以合理及實惠價錢做Gel甲？本店以下$400樓下任做美甲潮流款式，一個價錢就可選做不同款式，無需怕有額外收費，立即Bookmark！",
  //         "相信每一款美甲都有屬於它的故事，對於顧客而言有著獨一無二的意義。它可能蘊藏了羞澀的心意、見證了生命中重要的一刻，或者代表了值得紀念的時光，我們想將顧客的故事透過美甲訴說。",
  //         "深信指尖是每個人性格的延伸，10 Perfect Nails為男士提供全面的指甲修護服務和為女士提供不同的指甲彩妝服務，讓你的獨特氣質延續到指間。品牌的資深美甲師更會定期前往日本、美國、意大利等地深造，培養最敏銳的潮流觸覺，帶來最優質的水療手足護理。",
  //         "引入創新的美甲技術，提供專業及高質的美甲服務，以滿足客人各種需求。集結過百種的美甲護甲及手部護理產品，所有產品均經過嚴格認可測試，確保質量皆屬優良。我們歡迎你來體驗專業的修指甲、趾甲服務，店內亦提供手部及足部護理，人工造甲服務、以及 Calgel 彈性植甲及指甲畫花等美甲護甲服務。",
  //         "提供不同的 美甲 、 gel甲 及 修甲 服務，適合愛扮靚的你！",
  //         "地方寬敞，即使同時多人在進行美甲，也完全不會感到擠擁，是三五知己一同前來享受美甲服務的好地方。",
  //       ];
  //       for (let i = 0; i < 41; i++) {
  //         await seedRow("shop", {
  //           owner: usersID[i % 20],
  //           name: names[i % 20],
  //           area: areas[i % 25],
  //           address: addresses[i % 25],
  //           intro: intros[i % 10],
  //           open_time: "13:30",
  //           close_time: "23:00",
  //           image: `nailssalon${i}.jpeg`,
  //           shop_status: "active",
  //           shop_tel: 218000000,
  //         });
  //       }

  //       for (let i = 0; i < 50; i++) {
  //         await seedRow("notification", {
  //           users_id: usersID[0],
  //           link: "/",
  //           content: "testing...",
  //         });
  //       }

  //       await seedRow("like", {
  //         users_id: usersID[1],
  //         shop_id: shopsID[0],
  //       });

  //       await seedRow("collection", [
  //         {
  //           collection_owner_id: usersID[1],
  //           shop_id: shopsID[0],
  //         },

  //         {
  //           collection_owner_id: usersID[1],
  //           follow_id: usersID[0],
  //         },
  //       ]);
  //     }
  //   }
  // }
}
