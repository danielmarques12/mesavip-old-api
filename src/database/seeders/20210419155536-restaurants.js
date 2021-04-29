const site = 'https://restaurant.com';
const phone = '(11) 93123-4566';

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'restaurants',
      [
        {
          about: `At Our Restaurant we specialize in true Italian cooking. We use the freshest ingredients that reflect authentic Sicilian cuisine with a touch of Northern Italy. Shop our retail section to pair the perfect wine with your meal.`,
          phone,
          site,
          restaurant_id: 11,
          culinary_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Housed in a National Historic Building, c.1835, and in business since 1981, Café Vermilionville is a locally-owned, award-winning culinary establishment that serves innovative, upscale creole fare.`,
          phone,
          site,
          restaurant_id: 12,
          culinary_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Our Italian menu features a variety of dishes made from the freshest ingredients to provide our diners with an authentic Italian meal. From pizzas and calzones to fish and filet mignon, we provide something for every taste, craving and budget.`,
          phone,
          site,
          restaurant_id: 13,
          culinary_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Ruth's Chris Steak House in Lafayette, LA serves the finest USDA Prime beef available, broiled at 1,800° and served on 500° plates, so your steak stays hot, juicy and delicious from first bite to last.`,
          phone,
          site,
          restaurant_id: 14,
          culinary_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Be real. Eat good. It"s all about being true to who you are: sharing with friends and family and enjoying each other's company over a good meal. The ingredients are always fresh and that is the cornerstone of our farm to table approach.`,
          phone,
          site,
          restaurant_id: 15,
          culinary_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Twin Peaks is an American sports bar and restaurant. The restaurant embodies everything about the classic sports bar. There are high definitions on virtually every wall, ensuring that every guest has a great view of the game.`,
          phone,
          site,
          restaurant_id: 16,
          culinary_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Housed in a National Historic Building, c.1835, and in business since 1981, Café Vermilionville is a locally-owned, award-winning culinary establishment that serves innovative, upscale creole fare.`,
          phone,
          site,
          restaurant_id: 17,
          culinary_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Our Italian menu features a variety of dishes made from the freshest ingredients to provide our diners with an authentic Italian meal. From pizzas and calzones to fish and filet mignon, we provide something for every taste, craving and budget.`,
          phone,
          site,
          restaurant_id: 18,
          culinary_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Ruth's Chris Steak House in Lafayette, LA serves the finest USDA Prime beef available, broiled at 1,800° and served on 500° plates, so your steak stays hot, juicy and delicious from first bite to last.`,
          phone,
          site,
          restaurant_id: 19,
          culinary_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Be real. Eat good. It"s all about being true to who you are: sharing with friends and family and enjoying each other's company over a good meal. The ingredients are always fresh and that is the cornerstone of our farm to table approach.`,
          phone,
          site,
          restaurant_id: 20,
          culinary_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Twin Peaks is an American sports bar and restaurant. The restaurant embodies everything about the classic sports bar. There are high definitions on virtually every wall, ensuring that every guest has a great view of the game.`,
          phone,
          site,
          restaurant_id: 21,
          culinary_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          about: `Housed in a National Historic Building, c.1835, and in business since 1981, Café Vermilionville is a locally-owned, award-winning culinary establishment that serves innovative, upscale creole fare.`,
          phone,
          site,
          restaurant_id: 22,
          culinary_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: () => {},
};
