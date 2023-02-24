const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople =  [ // Array
    'Jeff Bezos',
    'Elon Musk',
    'Bernard Arnault',
    'Bill Gates',
    'Mark Zuckerberg',
    'Warren Buffet',
    'Larry Ellison',
    'Larry Page',
    'Sergey Brin',
    'Sara Rados'
];

const listItems = [];

let dragStartIndex; // variable keep track of index of each item

createList ();

function createList() {
    //copy of the Array, spreadOperator
    [...richestPeople]
    .map( a => ({value: a, sort: Math.random()})) // maping trough an object with two values, the name of the person and a random number between zero and one
    .sort((a,b) => a.sort - b.sort)  //we see a diffrent order everytime we refresh the page
    .map(a => a.value) // maping it back to the name of the person
    .forEach((person, index)=> {    // foreach iterates through every item in the Array
        //console.log(person);
        const listItem = document.createElement('li');
        
        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `<span class = 'number'> ${index + 1}</span>
        <div class = 'draggable' draggable = 'true'>
        <p class= 'person-name'>${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>`;

        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });
    addEventListener(); // gets the function
}

function dragStart() {
    //console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}

function dragEnter() {
    //console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragLeave() {
    //console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

function dragOver(e) {
    //console.log('Event: ', 'dragover');
    e.preventDefault();
}

function dragDrop() {
    //console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
   const itemOne = listItems[fromIndex].querySelector('.draggable');
   const itemTwo = listItems[toIndex].querySelector('.draggable');

   listItems[fromIndex].appendChild(itemTwo);
   listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li'); //select all with the html classname
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

check.addEventListener("click", checkOrder);