import Cookie from 'js-cookie';

const caseInput = document.querySelector('.todo__header-input') as HTMLInputElement;
const addButton = document.querySelector('.todo__header-add') as HTMLButtonElement;
const todoUL = document.querySelector('.todo__list') as HTMLUListElement;
const clearBtn = document.querySelector('.todo__clear-items') as HTMLButtonElement;

interface CaseData {
    text: string;
    checked: boolean;
}

function todoList(): CaseData[] {
    let list: CaseData[] = [];
    if (Cookie.get('todo')) list = JSON.parse(Cookie.get('todo') as string);
    return list;
}

function renderCase(item: CaseData, index: number): string {
    return `<li>
              <div class="todo__list-case">
              <input type="checkbox" id="todo__list-checkbox-${index}" ${item.checked ? "checked" : ""}>
              <label for="todo__list-checkbox-${index}"></label>
              <p>${item.text}</p>
              </div>
              <div class="todo__list-buttons">
              <button class="todo__list-edit">&#9998;</button>
              <button class="todo__list-remove">X</button>
              </div>
              </li>`;
}

// render to-do list
function renderList(list: CaseData[]): void {
    Cookie.set('todo', JSON.stringify(list), { expires: 365, sameSite: 'none', secure: true });
    todoUL.innerHTML = list.map((item, index) => renderCase(item, index)).join('');
    if(!list.length) clearBtn.style.display = "none";
    else clearBtn.style.display = "block";
    removeCase(list);
    editCase(list);
}

// add a new case
function newCaseSection() {
    const format = /^\s*$/;
    if (format.test(caseInput.value)) return;
    const list: CaseData[] = todoList();
    const newTodo: CaseData = {
        text: caseInput.value,
        checked: false,
    };
    list.unshift(newTodo);
    caseInput.value = '';
    renderList(list);
}
addButton.addEventListener('click', newCaseSection);
caseInput.addEventListener('keydown', (e)=> {
    if(e.key === "Enter") newCaseSection();
});

// edit case
function editCase(list: CaseData[]): void {
    const editButtonAll = todoUL.querySelectorAll<HTMLButtonElement>('.todo__list-edit');
    editButtonAll.forEach((editButton, index) => {
        editButton.addEventListener('click', () => {
            const labelCheckAll = todoUL.querySelectorAll<HTMLLabelElement>('.todo__list-case label');
            const paragAll = todoUL.querySelectorAll<HTMLParagraphElement>('.todo__list-case p');
            labelCheckAll[index].style.display = "none";
            paragAll[index].innerHTML = `<input type="text" value="${list[index].text}" class="todo__list-edit-input">`;
            const editInput = todoUL.querySelector(`.todo__list-edit-input`) as HTMLInputElement;
            editInput.addEventListener('blur', ({ target }) => {
                const value: string = (target as HTMLInputElement).value;
                const format = /^\s*$/;
                if (!format.test(value)) {
                    list.splice(index, 1, { checked: list[index].checked, text: value });
                    renderList(list);
                }
                else paragAll[index].innerHTML = list[index].text;
                labelCheckAll[index].style.display = "inline";
            })

        })
    })
}

// mark the completed case
todoUL.addEventListener('change', (event) => {
    const list: CaseData[] = todoList();
    const checkboxId: string | null = (event.target as HTMLInputElement).getAttribute('id');
    const labelFor = (index: number): string | null => {
        return (todoUL.querySelector(`[for=todo__list-checkbox-${index}]`) as HTMLLabelElement).getAttribute('for');
    }
    list.forEach((item, index) => {
        if (labelFor(index) === checkboxId) {
            item.checked = !item.checked;
                if(item.checked) {
                    list.push(list[index]);
                    list.splice(index, 1);
                }
                else{
                    list.unshift(list[index]);
                    list.splice((index + 1), 1);
                }
            renderList(list);
        }
    });
});

// remove the case from the list  
function removeCase(list: CaseData[]): void {
    const removeBtnAll = todoUL.querySelectorAll<HTMLButtonElement>('.todo__list-remove');
    removeBtnAll.forEach((removeBtn, index) => {
        removeBtn.addEventListener('click', () => {
            list.splice(index, 1);
            renderList(list);
        })
    })
}

// clear items 
clearBtn.addEventListener('click', () => {
    Cookie.remove('todo', { sameSite: 'none', secure: true });
    renderList([]);
});

renderList(todoList());