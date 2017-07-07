export const todo = (name, id) => ({
  name,
  id
});

export function indexOfObject(myArray, searchTerm, property) {
  for (let i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
}

export const app = {
  items: [
    {
      id: 1,
      name: 'project 1'
    },
    {
      id: 2,
      name: 'project 2'
    },
    {
      id: 3,
      name: 'project 3'
    },
    {
      id: 4,
      name: 'project 4'
    },
    {
      id: 5,
      name: 'project 5'
    },
    {
      id: 6,
      name: 'project 6'
    },
    {
      id: 7,
      name: 'project 7'
    },
    {
      id: 8,
      name: 'project 8'
    },
    {
      id: 9,
      name: 'project 9'
    }
  ],
  todo: [1, 2, 3],
  completed: [4, 5, 6],
  progress: [7, 8, 9]
};
