import { ICatalogPizza } from '../types/Pizza';

const catalog: ICatalogPizza[] = [
  {
    id: '1',
    name: 'Чизбургер-пицца',
    imgUrl: './pizzas/cheeseburger_pizza.png',
    types: {
      thin: {
        inStock: true,
        price: 50,
      },
      traditional: {
        inStock: true,
        price: 75,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 30,
      },
      M: {
        inStock: true,
        price: 40,
      },
      L: {
        inStock: true,
        price: 45,
      },
    },
    categories: ['meat', 'grill'],
  },
  {
    id: '2',
    name: 'Сырная',
    imgUrl: './pizzas/cheese.png',
    types: {
      thin: {
        inStock: true,
        price: 45,
      },
      traditional: {
        inStock: false,
        price: 0,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 100,
      },
      M: {
        inStock: false,
        price: 0,
      },
      L: {
        inStock: false,
        price: 0,
      },
    },
    categories: ['vegetarian'],
  },
  {
    id: '3',
    name: 'Креветки по-азиатски',
    imgUrl: './pizzas/asian_shrimp.png',
    types: {
      thin: {
        inStock: true,
        price: 33,
      },
      traditional: {
        inStock: false,
        price: 0,
      },
    },
    sizes: {
      S: {
        inStock: false,
        price: 0,
      },
      M: {
        inStock: true,
        price: 48,
      },
      L: {
        inStock: true,
        price: 60,
      },
    },
    categories: ['meat', 'grill', 'spicy'],
  },
  {
    id: '4',
    name: 'Сырный цыпленок',
    imgUrl: './pizzas/cheese_chicken.png',
    types: {
      thin: {
        inStock: true,
        price: 11,
      },
      traditional: {
        inStock: true,
        price: 20,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 15,
      },
      M: {
        inStock: true,
        price: 18,
      },
      L: {
        inStock: true,
        price: 20,
      },
    },
    categories: ['meat'],
  },
  {
    id: '5',
    name: 'Цыпленок барбекю',
    imgUrl: './pizzas/barbecue_chicken.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 30,
      },
      traditional: {
        inStock: true,
        price: 40,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 40,
      },
      M: {
        inStock: true,
        price: 45,
      },
      L: {
        inStock: true,
        price: 55,
      },
    },
    categories: ['meat', 'grill'],
  },
  {
    id: '6',
    name: 'Сосиски барбекю',
    imgUrl: './pizzas/BBQ_sausages.jpeg',
    types: {
      thin: {
        inStock: false,
        price: 0,
      },
      traditional: {
        inStock: true,
        price: 56,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 70,
      },
      M: {
        inStock: true,
        price: 45,
      },
      L: {
        inStock: false,
        price: 0,
      },
    },
    categories: ['meat', 'grill', 'spicy'],
  },
  {
    id: '7',
    name: 'Цыпленок Ранч',
    imgUrl: './pizzas/chicken_ranch.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 80,
      },
      traditional: {
        inStock: true,
        price: 110,
      },
    },
    sizes: {
      S: {
        inStock: false,
        price: 0,
      },
      M: {
        inStock: false,
        price: 0,
      },
      L: {
        inStock: true,
        price: 100,
      },
    },
    categories: ['meat'],
  },
  {
    id: '8',
    name: 'Чоризо Фреш',
    imgUrl: './pizzas/chorizo_fresh.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 80,
      },
      traditional: {
        inStock: true,
        price: 110,
      },
    },
    sizes: {
      S: {
        inStock: false,
        price: 0,
      },
      M: {
        inStock: true,
        price: 70,
      },
      L: {
        inStock: true,
        price: 75,
      },
    },
    categories: ['meat'],
  },
  {
    id: '9',
    name: 'Диабло',
    imgUrl: './pizzas/diablo.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 80,
      },
      traditional: {
        inStock: true,
        price: 110,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 30,
      },
      M: {
        inStock: true,
        price: 35,
      },
      L: {
        inStock: true,
        price: 40,
      },
    },
    categories: ['meat', 'spicy'],
  },
  {
    id: '10',
    name: 'Двойной пепперони',
    imgUrl: './pizzas/double_peperoni.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 53,
      },
      traditional: {
        inStock: true,
        price: 59,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 44,
      },
      M: {
        inStock: true,
        price: 55,
      },
      L: {
        inStock: true,
        price: 66,
      },
    },
    categories: ['meat', 'grill'],
  },
  {
    id: '11',
    name: 'Четыре сезона',
    imgUrl: './pizzas/four_seasons.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 70,
      },
      traditional: {
        inStock: true,
        price: 75,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 40,
      },
      M: {
        inStock: false,
        price: 0,
      },
      L: {
        inStock: true,
        price: 50,
      },
    },
    categories: ['meat', 'grill'],
  },
  {
    id: '12',
    name: 'Гриль овощи',
    imgUrl: './pizzas/grilled_vegetables.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 70,
      },
      traditional: {
        inStock: true,
        price: 75,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 40,
      },
      M: {
        inStock: true,
        price: 47,
      },
      L: {
        inStock: true,
        price: 50,
      },
    },
    categories: ['vegetarian', 'grill'],
  },

  {
    id: '13',
    name: 'Ветчина и сыр',
    imgUrl: './pizzas/ham_and_cheese.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 70,
      },
      traditional: {
        inStock: true,
        price: 75,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 40,
      },
      M: {
        inStock: true,
        price: 47,
      },
      L: {
        inStock: true,
        price: 50,
      },
    },
    categories: ['meat'],
  },
  {
    id: '14',
    name: 'Ветчина и грибы',
    imgUrl: './pizzas/ham_and_mushrooms.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 35,
      },
      traditional: {
        inStock: true,
        price: 40,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 30,
      },
      M: {
        inStock: true,
        price: 35,
      },
      L: {
        inStock: false,
        price: 0,
      },
    },
    categories: ['meat'],
  },
  {
    id: '15',
    name: 'Гавайская',
    imgUrl: './pizzas/hawai.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 40,
      },
      traditional: {
        inStock: true,
        price: 45,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 90,
      },
      M: {
        inStock: false,
        price: 0,
      },
      L: {
        inStock: false,
        price: 0,
      },
    },
    categories: ['meat'],
  },
  {
    id: '16',
    name: 'Домашняя',
    imgUrl: './pizzas/homemade.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 25,
      },
      traditional: {
        inStock: true,
        price: 30,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 60,
      },
      M: {
        inStock: true,
        price: 65,
      },
      L: {
        inStock: true,
        price: 70,
      },
    },
    categories: ['meat'],
  },
  {
    id: '17',
    name: 'Мясная',
    imgUrl: './pizzas/meat.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 35,
      },
      traditional: {
        inStock: true,
        price: 40,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 50,
      },
      M: {
        inStock: true,
        price: 55,
      },
      L: {
        inStock: true,
        price: 70,
      },
    },
    categories: ['meat'],
  },
  {
    id: '18',
    name: 'Пепперони',
    imgUrl: './pizzas/pepperoni.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 10,
      },
      traditional: {
        inStock: true,
        price: 20,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 30,
      },
      M: {
        inStock: true,
        price: 40,
      },
      L: {
        inStock: true,
        price: 50,
      },
    },
    categories: ['meat'],
  },
  {
    id: '19',
    name: 'Овощи и грибы',
    imgUrl: './pizzas/vegetables_and_mushrooms.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 10,
      },
      traditional: {
        inStock: true,
        price: 20,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 30,
      },
      M: {
        inStock: true,
        price: 40,
      },
      L: {
        inStock: true,
        price: 50,
      },
    },
    categories: ['vegetarian'],
  },
];

export default catalog;
