export const todo = (name, id) => ({
  name,
  id
});

export function indexOfObject(myArray, searchTerm, property) {
  for (let i = 0, len = myArray.length; i < len; i++)
    
    if (myArray[i][property] === searchTerm) 
      
      return i;

  return -1;

}

var arrayItems = [];
for(var i = 1; i < 10; i++) 

  arrayItems.push({ id: i, name: 'project ' + i})

export const app = {

  items: arrayItems,
  todo: [1, 2, 3],
  completed: [4, 5, 6],
  progress: [7, 8, 9]

};
