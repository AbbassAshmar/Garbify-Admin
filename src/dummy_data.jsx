import blueHoody from "../src/assets/blueHoody.png";

export const FlatCategories = [
    {
        id: 1,
        name: "Men",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["Sports", "Casual","formal","shityshityshit","not shity", "this is shit"],
        description:"Category for men clothing. Acting as a gender."
    },
    {
        id: 2,
        name: "Sports",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["shoes", "fits"],
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        id: 3,
        name: "Women",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["Sports", "Casual","formal"],
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        id: 6,
        name: "Kids",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["Sports", "Casual","formal"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 389,
        name: "Men Formal",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 397,
        name: "Men Formal",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 379,
        name: "Men Formal",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 87,
        name: "Men Formal",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 76,
        name: "Men Formal",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 65,
        name: "Men Formal",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 436,
        name: "Men Formal",
        image:blueHoody,
        parent_id: null,
        total_sales:4553,
        total_products:4343,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 546,
        name: "jfiw",
        image:blueHoody,
        parent_id: null,
        total_sales:453,
        total_products:4343,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 43,
        name: "ewaf",
        image:blueHoody,
        parent_id: null,
        total_sales:9435,
        total_products:4343,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 363,
        name: "jasio Fojifrmal",
        image:blueHoody,
        parent_id: null,
        total_sales:540,
        total_products:2390,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 36,
        name: "kki Fojrmal",
        image:blueHoody,
        parent_id: null,
        total_sales:9504,
        total_products:2094,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 35,
        name: "kri kk",
        image:blueHoody,
        parent_id: null,
        total_sales:8234,
        total_products:5849,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    },
    {
        id: 34,
        name: "kaka Formal",
        image:blueHoody,
        parent_id: null,
        total_sales:2933,
        total_products:3209,
        children: ["golden", "grey","black"],
        description:" Duis dignissim diam sit amet libero ultricies, ac molestie nulla vestibulum. Vestibulum tempor, purus ut venenatis elementum,",
    }
]



export const NestedCategories ={
    categories: [
      {
        id: 1,
        name: "Men",
        parent_id: null,
        children: [
          {
            id: 2645,
            name: "Sports",
            parent_id: 1,
            children: [
              {
                id: 3,
                name: "Shoes",
                parent_id: 2,
                children: [
                  {
                    id: 4,
                    name: "Brand",
                    parent_id: 3,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 256,
            name: "Sports",
            parent_id: 1,
            children: [
              {
                id: 23,
                name: "Shoes",
                parent_id: 2,
                children: [
                  {
                    id: 564,
                    name: "Brand",
                    parent_id: 3,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 54,
            name: "Sports",
            parent_id: 1,
            children: [
              {
                id: 7653,
                name: "Shoes",
                parent_id: 2,
                children: [
                  {
                    id: 4564,
                    name: "Brand",
                    parent_id: 3,
                    children: []
                  },
				  {
                    id: 4024,
                    name: "Fuck",
                    parent_id: 3,
                    children: []
                  },
				  {
                    id: 40243,
                    name: "My",
                    parent_id: 3,
                    children: []
                  },
				  {
                    id: 40213,
                    name: "Life",
                    parent_id: 3,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 5,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 656,
            name: "Sports",
            parent_id: 5,
            children: [
              {
                id: 758,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 68,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 25,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 6,
            name: "Sports",
            parent_id: 52,
            children: [
              {
                id: 947,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 80,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 554,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 306,
            name: "Sports",
            parent_id: 5,
            children: [
              {
                id: 700,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 800,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 722,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 822,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 565,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 633,
            name: "Sports",
            parent_id: 5,
            children: [
              {
                id: 733,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 855,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 77,
                name: "Shoes",
                parent_id: 68,
                children: [
                  {
                    id: 85,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 2865,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 6856,
            name: "Sports",
            parent_id: 5,
            children: [
              {
                id: 343,
                name: "Shoes",
                parent_id: 63,
                children: [
                  {
                    id: 868,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 786,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 948,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 759,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 8,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 247,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 2348,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 437,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 438,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 27,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 658,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 987,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 98,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 479,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 8976,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 7976,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 864,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
}
  